---
name: Android Google Play 自動部署
description: >
  修改、執行或診斷 SpaceIn Android AAB 建置、release 簽章、versionCode、
  GitHub Actions、Google Play Console 發布或 Play 軌道驗證時必須使用。
  適用關鍵字：Android 部署、Google Play、Play Console、AAB、upload key、
  keystore、bundleRelease、android-release.yml、com.spacein。
---

# Android Google Play 自動部署

## 不可變條件

- Android package / Capacitor appId 固定為 `com.spacein`。
- Google Play upload key 的 SHA-256 固定為
  `62:02:4B:38:3E:B7:87:B4:BE:9E:75:05:38:B3:92:E6:B4:E0:86:F5:CE:BF:90:E0:C6:E0:F0:09:59:2F:8E:37`。
  這是既有正式 AAB 的 upload certificate；若 Play Console 完成 upload key reset，
  必須同一變更更新腳本與本文件。
- `versionCode` 不可手動重複使用。CI 透過 Android Publisher API 同時查詢
  `edits.bundles.list` 與 `edits.apks.list`，取得所有既有產物最大值再加一，
  並以環境變數注入 Gradle。
- release AAB 必須同時通過 JAR 簽章、bundletool manifest 與憑證指紋驗證，
  才能交給上傳步驟。
- 腳本會依日期驗證 Google Play target API：2026-08-31 前至少 API 35，
  當日起至少 API 36，避免把政策必定拒絕的 AAB 送進上傳步驟。
- 自動部署只允許手動 dispatch 或 `android-v*` tag 觸發；
  一般 push 不應直接發布 Android 版本。

## 唯一入口

本機或 CI 完整部署唯一入口：

```bash
KEYSTORE_BASE64='...' \
KEYSTORE_PASSWORD='...' \
KEY_ALIAS='...' \
KEY_PASSWORD='...' \
GOOGLE_PLAY_SERVICE_ACCOUNT_JSON='...' \
GOOGLE_PLAY_TRACK=internal \
scripts/android-release.sh deploy
```

只建置 release、不碰 Google Play 時使用：

```bash
ANDROID_VERSION_CODE=21 \
ANDROID_VERSION_NAME=2.2.1 \
KEYSTORE_BASE64='...' \
KEYSTORE_PASSWORD='...' \
KEY_ALIAS='...' \
KEY_PASSWORD='...' \
scripts/android-release.sh build
```

只驗證既有 AAB：

```bash
scripts/android-release.sh verify-aab path/to/app-release.aab
```

查詢 Google Play 下一個可用版本碼或驗證發布結果：

```bash
GOOGLE_PLAY_SERVICE_ACCOUNT_JSON='...' \
node scripts/google-play-api.mjs next-version

GOOGLE_PLAY_SERVICE_ACCOUNT_JSON='...' \
node scripts/google-play-api.mjs deploy \
  --aab path/to/app-release.aab \
  --track internal \
  --status completed \
  --expected-version-code 21 \
  --release-name '2.2.1 (21)' \
  --whats-new-dir .github/whatsnew

GOOGLE_PLAY_SERVICE_ACCOUNT_JSON='...' \
node scripts/google-play-api.mjs verify \
  --track internal --version-code 21 --status completed
```

## GitHub Actions secrets

Repository Settings → Secrets and variables → Actions 必須設定：

- `KEYSTORE_BASE64`：`key20241001.jks` 的 base64 內容。
- `KEYSTORE_PASSWORD`
- `KEY_ALIAS`
- `KEY_PASSWORD`
- `GOOGLE_PLAY_SERVICE_ACCOUNT_JSON`：完整服務帳號 JSON。

服務帳號必須已啟用 Google Play Android Developer API，並在 Play Console
「使用者和權限」獲授權管理 `com.spacein` 的 release。腳本只在暫存目錄解碼
keystore，結束時刪除；不得將 JKS、密碼或服務帳號 JSON 寫入版控。

## 成功標準

一次部署只有在以下全部成立時才算成功：

1. Angular production build 與 `cap sync android` 成功。
2. `bundleRelease` 產生非空且已簽章的 AAB。
3. bundletool 確認 package、versionCode、versionName 正確。
4. upload certificate SHA-256 與既有正式 AAB 一致。
5. `google-play-api.mjs deploy` 依官方 Android Publisher API 完成
   edit insert、AAB media upload、track update、edit validate 與 commit。
6. `google-play-api.mjs verify` 重新建立唯讀 edit，並在指定 track 查到
   相同 versionCode 與 release status。

Google Play 商店頁存在不代表本次部署成功；必須以第 6 項 API 查核為準。

修改 Google Play API 腳本後，必須執行無外部副作用的完整 HTTP 整合測試：

```bash
node scripts/tests/google-play-api.integration.mjs
```

## 常見失敗

- `./gradlew: Permission denied`：確認 `frontend/android/gradlew` 在 Git 中為 `100755`。
- secret 顯示未設定：補齊上述五個 Actions secrets；空字串不允許進入建置。
- `Package not found`：服務帳號沒有 `com.spacein` 權限，或 Play Console 尚未建立 App。
- `APK specifies a version code that has already been used`：不得自行固定版本碼；
  重新執行 workflow，讓 API 取得下一版。
- 簽章憑證不符：停止部署，確認使用既有 `key20241001.jks`，不可改用 debug key。
- `Precondition check failed`：確認目標軌道已完成 Play Console 必要設定，
  production 首次發布前先完成測試軌道發布。
- 一般手機 App 自 2026-08-31 起需 target Android 16（API 36）；目前 API 35
  只保證該日期前可提交。升級 target SDK 時必須另做 Android 16 相容性測試。
