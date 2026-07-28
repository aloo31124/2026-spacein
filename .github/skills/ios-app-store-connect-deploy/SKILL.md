---
name: ios-app-store-connect-deploy
description: >
  修改、執行或診斷 SpaceIn iOS archive、IPA、版本升版、automatic signing、
  App Store Connect API、TestFlight build 上傳、App Review 送審、正式版自動
  發佈與狀態驗證時必須使用。
  適用關鍵字：iOS 部署、Apple Developer、App Store Connect、TestFlight、
  App Review、正式版、送審、發佈、xcarchive、IPA、altool、ASC API、com.spacein。
---

# iOS App Store Connect 自動部署

## 不可變條件

- Capacitor appId 與 Xcode bundle ID 固定為 `com.spacein`。
- Xcode target Team 固定為 `ZFR9YGJB4N`；若 Apple 帳號移轉 App，必須在同一變更
  明確更新腳本、Xcode project 與本文件。
- release 唯一入口是 `scripts/ios-release.sh`，共享 scheme `space-in` 必須指向
  `App.xcodeproj` 的 `App` application target，不可指向 Pods。
- API 私鑰只能透過 `ASC_KEY_PATH` 指向本機或 CI 暫存檔，不得提交 `.p8`、
  Issuer ID 或其他秘密。
- 此 App 未自行實作非標準或非豁免加密，只透過 Apple 系統與標準 HTTPS
  傳輸，因此 `Info.plist` 固定宣告 `ITSAppUsesNonExemptEncryption=false`。
  若未來加入自有／第三方加密實作，必須先重新判定出口合規，不可沿用此值。
- 只有 App Store Connect API 查到指定 version/build 的
  `processingState=VALID`，才算完整自動部署成功。Xcode 僅顯示 upload 成功
  仍可能處於 Processing 或後續 Failed。
- 正式版送審使用 Apple 現行 `reviewSubmissions` 與
  `reviewSubmissionItems`，不可新增依賴已 deprecated 的
  `appStoreVersionSubmissions`。
- `release` 會造成真實 App Review submission；只有使用者明確要求送審或
  發佈正式版時才執行。送出後若選 `AFTER_APPROVAL`，Apple 核准即自動上架。

## 完整部署

```bash
ASC_KEY_ID='...' \
ASC_ISSUER_ID='...' \
ASC_KEY_PATH='/secure/path/AuthKey_ABC123.p8' \
scripts/ios-release.sh deploy
```

未指定 `IOS_VERSION` 時，腳本會從 App Store Connect 的 iOS
App Store versions 與 prerelease versions 取最高版本，增加最後一段；
未指定 `IOS_BUILD_NUMBER` 時，會查相同 prerelease version 的既有 builds，
取最大正整數加一。接著依序：

1. 驗證 Capacitor、Xcode bundle ID、Team 與共享 scheme。
2. 寫入 `MARKETING_VERSION`、`CURRENT_PROJECT_VERSION`，並確認出口合規宣告。
3. 執行 Angular production build、`cap sync ios`、`pod install --deployment`。
4. 使用 automatic signing 產生 xcarchive 與 App Store Connect IPA。
5. 驗證 IPA 的 code signature、embedded provisioning profile、Team、App ID、
   到期日、version 與 build。
6. 建立或重用 App Store Connect iOS version。
7. 先以 `altool` validate，再上傳 IPA。
8. 以 App Store Connect API 輪詢指定 build，直到 `VALID` 或明確失敗。

## 正式版送審與發佈

建置、上傳、驗證並送出 App Review：

```bash
ASC_KEY_ID='...' \
ASC_ISSUER_ID='...' \
ASC_KEY_PATH='/secure/path/AuthKey_ABC123.p8' \
scripts/ios-release.sh release
```

`release` 會在 `deploy` 完成後：

1. 讀取 `.github/whatsnew/ios-zh-Hant.txt`，更新 `whatsNew`。
2. 將 `VALID` build 綁定至相同 App Store version。
3. 預設設定 `releaseType=AFTER_APPROVAL`，審核通過後自動上架。
4. 建立或重用 iOS review submission，加入 App Store version。
5. 送出 submission，等待 `WAITING_FOR_REVIEW` 或後續成功狀態。

已經上傳 build、只需送審目前 Xcode version/build：

```bash
scripts/ios-release.sh submit-review
```

只驗證目前版本已進入審查佇列：

```bash
scripts/ios-release.sh verify-review
```

每次送審前需更新版本說明檔，或以 `IOS_WHATS_NEW` 覆寫。其他選項：

- `IOS_LOCALE`：預設 `zh-Hant`。
- `IOS_RELEASE_TYPE`：`MANUAL`、`AFTER_APPROVAL` 或 `SCHEDULED`。
- `IOS_EARLIEST_RELEASE_DATE`：`SCHEDULED` 必填的 ISO 8601 日期時間。
- `IOS_REVIEW_TIMEOUT_SECONDS`／`IOS_REVIEW_POLL_SECONDS`：控制佇列驗證。

只建置、簽署與驗證 IPA，不上傳：

```bash
scripts/ios-release.sh build
```

本機 Xcode 已登入、但沒有 API Key 時可執行：

```bash
IOS_XCODE_ACCOUNT_UPLOAD=1 scripts/ios-release.sh deploy
```

此備援模式只以 `xcodebuild` 確認 Apple 接受傳輸，無法自動新增 App Store
version 或確認 build 最終處理結果；必須再到 App Store Connect 的
TestFlight → iOS → Build Uploads，核對狀態為 Complete。

## App Store Connect API 權限

API Key 至少需能讀寫 App、版本、localization、build 與 review submission。
上傳 build 可使用 Developer 角色；正式送審需符合 Apple 對 Account Holder、
Admin 或 App Manager 的角色要求。若 Key 無法建立版本或送審，腳本會停止，
不會把草稿或 upload success 當作正式版成功。

## 成功標準

完整自動部署需同時通過：

1. Release archive 建置成功。
2. xcarchive 內 bundle ID 為 `com.spacein`，且使用 Team `ZFR9YGJB4N`
   的有效 provisioning profile。
3. App Store distribution IPA code signature、bundle ID、版本與 build 正確。
4. App Store Connect 已存在本次 iOS version。
5. Apple 接受 IPA 上傳。
6. API 查到相同 version/build，且 `processingState` 為 `VALID`。
7. App Store version 已綁定相同 build，並有非空白 `whatsNew`。
8. `reviewSubmissions` 已從 `READY_FOR_REVIEW` 送出，狀態至少為
   `WAITING_FOR_REVIEW`。

只執行 `deploy` 時以第 1–6 項為準；要求正式版送審時第 1–8 項全部通過，
才可回報完成。`READY_FOR_REVIEW` 仍只是草稿，不算已送審。

## 常見失敗

- scheme 顯示 supported platforms 為空：確認 `space-in.xcscheme` 的
  BlueprintIdentifier 是 `App` target，而不是 Pods resource bundle。
- 找不到 provisioning profile：確認 Xcode 已加入 Team，或 API Key 具備
  Certificates, Identifiers & Profiles 權限，再重跑 automatic signing。
- `No signing certificate "Apple Distribution"`：讓 Xcode 建立
  cloud-managed certificate，或匯入 Team 的 distribution certificate。
- version 已存在：不要手動猜版本；移除 `IOS_VERSION`，讓 API 取得下一版。
- build number 已使用：移除 `IOS_BUILD_NUMBER`，讓 API 取得下一個正整數。
- build 顯示「缺少出口合規資訊」：檢查產物的
  `ITSAppUsesNonExemptEncryption` 是否為 `false`；舊 build 需在後台人工管理，
  修正後的新 build 會自動帶入宣告。
- build 長時間 Processing：腳本預設等 30 分鐘；可調整
  `IOS_VERIFY_TIMEOUT_SECONDS`，超時後不得當作成功。
- App Review 回報 metadata incomplete：先補齊截圖、App 審查聯絡資訊、
  登入帳密、版本說明與法規問卷，再重跑 `submit-review`；API 會重用既有草稿。
- review submission 停在 `READY_FOR_REVIEW`：代表只加入審查草稿，尚未送出；
  腳本必須 PATCH `submitted=true` 並驗證轉為 `WAITING_FOR_REVIEW`。
- `UNRESOLVED_ISSUES`、`REJECTED` 或 `METADATA_REJECTED` 都是失敗，需讀取
  App Review 訊息修正後重新送審，不可視為發布成功。
