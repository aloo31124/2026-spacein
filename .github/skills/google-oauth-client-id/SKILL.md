---
name: Google OAuth Client ID 與原生登入設定
description: >
  修改或診斷 Google 登入設定時，必須參考此文件。適用於 capacitor.config.ts 的
  SocialLogin 區塊與 GoogleAuthService 的 SocialLogin.initialize、environment.ts / environment.prod.ts 的 googleOAuth 欄位、
  iOS 的 GoogleService-Info.plist 與 Info.plist URL Scheme、Android 的
  strings.xml server_client_id，以及排查 invalid_audience（iOS code -61440）、
  DEVELOPER_ERROR（Android code 10）、登入彈窗開不起來等 OAuth 錯誤時。
---

# Google OAuth Client ID 與原生登入設定

本專案自 2.3.0（Capacitor 8）起使用 `@capgo/capacitor-social-login`，
取代已停止維護、僅支援 Capacitor 5 的 `@codetrix-studio/capacitor-google-auth`。
Client ID 散落在多個平台檔案，且**各平台讀取來源不同**，是登入錯誤的主要來源。

## 硬性規範

> **原生端（iOS / Android）的 client 與 serverClientId 必須屬於同一個 GCP 專案。**

Google 授權端點會在使用者選擇帳號**之前**就驗證 `audience` 參數。
兩者跨專案時直接回傳：

```
invalid_audience: The audience client and the client need to be in the same project.
```

iOS 對應錯誤碼 `-61440`（AppAuth 的 OAuth authorization error）。

本專案原生端一律使用專案編號 **328066296243**。

## 各平台的 Client ID 讀取來源

Client ID 由 `GoogleAuthService.initNativeGoogleLogin()` 以 `SocialLogin.initialize({ google })`
傳入（僅原生平台；網頁端走 FedCM，不初始化外掛）。`capacitor.config.ts` 的 `SocialLogin`
區塊只設定要打包的 providers（僅 `google: true`），**不放任何 client id**：

| `initialize` 欄位 | 平台 | 本專案實際使用 |
|------|------|--------------|
| `webClientId` | Android（Credential Manager 的 token audience） | `nativeServerClientId`（= `strings.xml` 的 `server_client_id`） |
| `iOSClientId` | iOS 原生 client | `iosClientId` |
| `iOSServerClientId` | iOS idToken audience | `nativeServerClientId` |

- Android 的 `webClientId` 必須填 **Web 類型** client；填 Android 類型 client 會回傳 DEVELOPER_ERROR。
  Android client 只需在 GCP 登記「套件名稱 + SHA-1」，程式不引用。
- Android 標準 `BridgeActivity` 下 `SocialLogin.login()` **不可傳 `scopes`**（email/profile 已為預設，
  傳入會被外掛拒絕）；要額外 scope 需改寫 MainActivity。
- 失敗時以 Logcat 過濾 `GoogleProvider` / `CapgoSocialLogin`，外掛會印出 package、signing SHA-1、遮罩後的 webClientId。

## Client ID 集中管理

所有 client id 集中於 `frontend/src/environments/environment.ts` 與 `environment.prod.ts`
的 `googleOAuth`，其他檔案只做引用，不可寫死字面值：

| 欄位 | 用途 | 專案 |
|------|------|------|
| `initClientId` | 舊 codetrix 外掛 `GoogleAuth.initialize()` 使用；**2.3.0 起程式未引用**，待與 README 三組 client id 對齊時清除 | 587558372608 |
| `webClientId` | 網頁 FedCM / One Tap 登入；**不可用於原生 serverClientId** | 1025423218880 |
| `iosClientId` | iOS OAuth Client，須與 `GoogleService-Info.plist` 的 `CLIENT_ID` 一致 | 328066296243 |
| `nativeServerClientId` | 原生端 serverClientId，須與原生 client 同專案；與 `strings.xml` 的 `server_client_id` 一致 | 328066296243 |

## iOS 必須同步的三處

修改 iOS client id 時，以下三者的專案編號必須完全一致，缺一不可：

1. `frontend/ios/App/App/GoogleService-Info.plist` 的 `CLIENT_ID` / `REVERSED_CLIENT_ID`
2. `frontend/ios/App/App/Info.plist` 的 `CFBundleURLSchemes`
   （必須等於 `REVERSED_CLIENT_ID`，即 `com.googleusercontent.apps.<client id>`，
   否則 OAuth 回呼無法導回 App）
3. `environment*.ts` 的 `iosClientId` 與 `nativeServerClientId`（經 `SocialLogin.initialize` 傳入）

`ios/App/App/capacitor.config.json` 與 `android/app/src/main/assets/capacitor.config.json`
是 `npx cap sync` 由 `capacitor.config.ts` 產生的檔案。
改完 `capacitor.config.ts` 後必須執行 `npm run build:prod && npx cap sync ios`，
不可只手改產生檔，否則下次 sync 會被覆蓋。

## 疑難排解

| 症狀 | 原因 |
|------|------|
| iOS `invalid_audience` / code `-61440` | client 與 serverClientId 跨專案 |
| Android code `10`（DEVELOPER_ERROR） | SHA-1 憑證指紋未登記，或 `server_client_id` 非 Web 類型 |
| 點登入無反應、回呼後停在瀏覽器 | `Info.plist` 的 URL Scheme 與 `REVERSED_CLIENT_ID` 不符 |
| `pod install` 報 `Unicode Normalization not appropriate for ASCII-8BIT` | CocoaPods + Ruby 4 的編碼問題，需先 `export LANG=en_US.UTF-8` |

## 驗證

改完設定後至少確認：

1. `environment*.ts` 的 `iosClientId` 與 `nativeServerClientId` 專案編號相同（2.3.0 起 client id
   不再寫入 `capacitor.config.json`，改由 `SocialLogin.initialize` 於執行期傳入）。
2. 建置後的 App bundle 內，`capacitor.config.json`、`GoogleService-Info.plist` 的
   `CLIENT_ID`、`Info.plist` 的 URL Scheme 三者專案編號一致：
   ```bash
   plutil -extract CLIENT_ID raw <App.app>/GoogleService-Info.plist
   plutil -extract CFBundleURLTypes.0.CFBundleURLSchemes.0 raw <App.app>/Info.plist
   ```
3. **端對端實測必須用真實 Google 帳號完成登入**，且建議在實機而非 Simulator。

   已實測確認：Google 授權端點**不會**在登入前驗證 `audience`
   （帶入完全不存在的 audience 仍正常回傳登入頁；但亂填 `client_id` 會當場失敗）。
   因此「能載入到 Google 帳號輸入畫面」**不足以**證明 audience 正確，
   `invalid_audience` 只在帳號通過驗證後才會浮現。

   實測時以日誌確認：
   ```bash
   xcrun simctl spawn <UDID> log stream --style compact --predicate 'process == "App"' \
     | grep -iE "invalid_audience|-61440"
   ```

### Simulator 的已知干擾（非產品缺陷）

在 Simulator 驗證 Google 登入時，可能遇到與 OAuth 無關的環境問題，
不可據此判定設定修正失敗：

- `Google 登入失敗 (code: -2): keychain error`
  —— 以 `xcodebuild ... CODE_SIGNING_ALLOWED=NO` 或無有效 provisioning profile 建置時，
  App 沒有任何 entitlements（`codesign -d --entitlements -` 輸出為空、簽章為 `adhoc, linker-signed`），
  GoogleSignIn 因此無法存取 keychain。
  事後用 `codesign --force --sign -` 補簽 entitlements 會被 SpringBoard 拒絕啟動
  （`FBSOpenApplicationServiceErrorDomain code=1`），**無法用重簽繞過**；請改用實機驗證。
- 授權頁全黑後跳回 App —— Simulator 的 `SafariViewService` / WebKit 子程序取不到 run assertion。
- **iOS 會拒絕合成事件點擊「App 想要使用 google.com 登入」這個授權同意對話框**。
  這是 `ASWebAuthenticationSession` 防自動化 OAuth 釣魚的安全機制，不是缺陷，無法繞過。
  App 內一般按鈕可正常接收 CGEvent 合成點擊，唯獨此系統對話框不行。
  **結論：Google 登入流程無法用自動化完成端對端驗證，必須人工操作。**

### 不需登入即可驗證的項目（自動化可涵蓋的上限）

對授權端點送請求即可驗證 client 的存在與類型，作為設定正確性的前置檢查：

```bash
# 用 https redirect 測「存在性」
#   → redirect_uri_mismatch / 400 = client 存在
#   → invalid_client      / 401 = client 不存在（打錯字）
curl -s -L "https://accounts.google.com/o/oauth2/v2/auth?client_id=<CLIENT>\
&redirect_uri=https%3A%2F%2Fexample.com%2Fcb&response_type=code&scope=openid"

# 用 App 的 custom scheme 測「類型」
#   → 回應含 identifierId（真正的登入表單）= 原生型 client，且該 URL Scheme 正確
#   → invalid_request / 400、無 identifierId = 非原生型，即 Web client
```

`serverClientId` 應通過「存在」且「非原生型」；`iosClientId` 應通過「存在」且「接受 App 的 URL Scheme」。
但**這兩項通過不等於 audience 正確** —— audience 仍須靠真人登入才會驗證。
