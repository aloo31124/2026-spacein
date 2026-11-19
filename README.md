# 2026-spacein

## Android Google Play 自動部署

Android App ID 固定為 `com.spacein`。正式 AAB 的建置、upload key 驗證、
Google Play 上傳與軌道查核由 `.github/workflows/android-release.yml` 完成，
可從 GitHub Actions 手動選擇 `internal`、`alpha`、`beta` 或 `production`。

部署前須在 GitHub Actions 設定 `KEYSTORE_BASE64`、`KEYSTORE_PASSWORD`、
`KEY_ALIAS`、`KEY_PASSWORD`、`GOOGLE_PLAY_SERVICE_ACCOUNT_JSON` 五項 secrets。
本機與 CI 共用入口為 `scripts/android-release.sh`，完整操作與成功判定請見
`.github/skills/android-google-play-deploy/SKILL.md`。

## google OAuth 授權

App ID（Bundle ID / 套件名稱）一律為 `com.spacein`，設定於：

- `frontend/capacitor.config.ts`
- `frontend/android/app/build.gradle`
- `frontend/ios/App/App/GoogleService-Info.plist`

### 用戶端 ID 一覽

> **全專案只允許存在下列三組 client id，不得再出現其他 client id。**
> 唯一來源為 `frontend/src/environments/environment.ts` 與 `environment.prod.ts` 的 `googleOAuth`，
> 其餘檔案一律引用，不可寫死字面值。詳細規範見 `.github/skills/google-oauth-client-id/SKILL.md`。

#### 網路用戶端 1（GCP 專案 1025423218880）

- 已授權的 JavaScript 來源:
    * http://localhost:4201
    * https://spacein.duckdns.org
- 已授權的重新導向 URI:
    * http://localhost:4201/\_\_/auth/handler
    * https://spacein.duckdns.org/\_\_/auth/handler
- client id: `1025423218880-ae9p8055o7jllcfja72jfd1smipdlf35.apps.googleusercontent.com`
- 用途：網頁 FedCM 登入（原生端 `SocialLogin.initialize` 目前使用 `nativeServerClientId`，對齊待辦見 google-oauth-client-id SKILL）

#### Android 用戶端 1（GCP 專案 328066296243）

- 套件名稱: com.spacein
    * 從您的 AndroidManifest.xml 檔案。
- SHA-1: 93:5C:5B:CF:85:43:61:71:D5:89:24:D3:DF:F2:EB:7A:DE:42:D0:BF
- client id: `328066296243-uo6thclvu7610suo0ktr0f6hi0k0s4kd.apps.googleusercontent.com`
- 用途：由「套件名稱 + SHA-1 憑證指紋」隱式對應，**程式與設定檔皆不引用此 id**。
  `strings.xml` 的 `server_client_id` 必須填網路用戶端，填此 id 會回傳 DEVELOPER_ERROR（錯誤碼 10）。

#### iOS 用戶端 1（GCP 專案 1025423218880）

- com.spacein
    * 即為應用程式 Info.plist 檔案中列出的軟體包 ID
- client id: `1025423218880-b6ovls4n8vse8d2ihiq6db1vd0ab0lek.apps.googleusercontent.com`
- 用途：`capacitor.config.ts` 的 `iosClientId`、`GoogleService-Info.plist` 的 `CLIENT_ID`、
  `Info.plist` 的 URL Scheme（`com.googleusercontent.apps.<client id>`），三處必須一致。

### 各檔案對應

| 檔案 | 欄位 | 使用的 client id |
|------|------|-----------------|
| `frontend/src/environments/environment*.ts` | `googleOAuth` | 三組（唯一來源） |
| `frontend/capacitor.config.ts` | `iosClientId` | iOS 用戶端 |
| `frontend/capacitor.config.ts` | `serverClientId` | 網路用戶端 |
| `frontend/android/app/src/main/res/values/strings.xml` | `server_client_id` | 網路用戶端 |
| `frontend/ios/App/App/GoogleService-Info.plist` | `CLIENT_ID` / `REVERSED_CLIENT_ID` | iOS 用戶端 |
| `frontend/ios/App/App/Info.plist` | `CFBundleURLSchemes` | iOS 用戶端（反轉格式） |
| `frontend/src/app/auth-route/services/google-auth.service.ts` | `SocialLogin.initialize` / FedCM `client_id` | 網路用戶端 |

改完 `capacitor.config.ts` 或 `environment*.ts` 後，必須執行：

```bash
cd frontend
npm run build:prod
npx cap sync android
export LANG=en_US.UTF-8 && npx cap sync ios   # 不加 LANG 會踩到 CocoaPods 的 ASCII-8BIT 錯誤
```

`ios/App/App/capacitor.config.json` 與 `android/app/src/main/assets/capacitor.config.json`
為 `cap sync` 產生檔，不可手改。

