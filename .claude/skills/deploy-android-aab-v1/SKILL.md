---
name: deploy-android-aab-v1
description: >
  在 SpaceIn 專案建立下一個 Android 版本，依目前程式碼產生並驗證已簽署 AAB，
  再透過 Android Publisher API 或已登入的 Google Play Console 上傳、送審並核對結果。
  使用者要求 Android AAB、versionCode 升版、Google Play／Play Console 發布、正式版送審、
  部署驗證，或需要接續失敗的 Android 發布流程時，必須使用此技能。
---

# Android AAB 正式版部署 v1

以專案現有腳本執行確定性建置與驗證，僅在沒有可用 Publisher API 憑證時改走
Play Console UI。將「已送審」與「已上架」分開回報，避免把 Google 的非同步審查誤報成上架完成。

## 先讀取專案規範

1. 讀取根目錄 `AGENTS.md`。
2. 完整讀取 `.github/skills/android-google-play-deploy/SKILL.md`；該檔案是 appId、
   upload certificate、target SDK 政策與成功條件的權威來源。
3. 若需要操作 Play Console UI，完整讀取
   [Play Console 正式版流程](references/play-console-production.md)。

## 安全界線

- 只有使用者明確要求上傳、部署、送審或發布時，才可改動 Google Play 外部狀態；
  若只要求產生 AAB，停在本機驗證成功。
- 不得輸出、記錄或提交 keystore 密碼、JKS base64、服務帳號 JSON、OAuth token。
- 不得使用 debug key 或新建 upload key 取代 `frontend/android/app/release` 的既有正式金鑰。
- 保留工作樹中既有修改；部署不代表可以 commit、push 或清除其他變更。
- 發現套件 ID、憑證指紋或 versionCode 不符時停止，不要以關閉驗證的方式繼續。

## 工作流程

### 1. 盤點現況

執行唯讀檢查：

```bash
git status --short
scripts/android-release.sh --help
```

確認：

- `frontend/capacitor.config.ts` 與 `frontend/android/app/build.gradle` 都使用 `com.spacein`。
- `frontend/android/app/release/key20241001.jks` 存在，但仍受 Git ignore 保護。
- 簽署密碼來自既有安全環境或由使用者提供；找不到時停止並指出缺少哪個值。
- `.github/whatsnew/whatsnew-zh-TW` 有本次版本資訊。

### 2. 選擇發布路徑

優先使用 Publisher API，因為它能跨 APK/AAB 查詢全域最高 versionCode，並在 commit 後
重新讀取軌道驗證。具備 `GOOGLE_PLAY_SERVICE_ACCOUNT_JSON` 時執行：

```bash
GOOGLE_PLAY_TRACK=production \
GOOGLE_PLAY_RELEASE_STATUS=completed \
scripts/android-release.sh deploy
```

此入口會自動取得下一個 versionCode，預設以 `frontend/package.json` 的版本作為
versionName，並依序完成建置、簽章驗證、上傳、commit 與軌道查核。

沒有服務帳號、但使用者已登入 Play Console 時，改用 UI 備援流程。先在 Console 的
「最新版本和套件」核對所有軌道已使用的最大 versionCode，再加一；不要只看公開商店頁。

### 3. 建置 UI 備援所需 AAB

將密碼與 alias 放入目前程序的環境變數，不要寫入檔案或命令輸出。若安全環境只提供本機
JKS，可在目前 shell 中衍生 `KEYSTORE_BASE64`，但不得印出值。

```bash
export ANDROID_VERSION_CODE="<Console 最大值 + 1>"
export ANDROID_VERSION_NAME="<frontend/package.json 版本或使用者指定版本>"
export KEYSTORE_BASE64="$(base64 < frontend/android/app/release/key20241001.jks | tr -d '\n')"
scripts/android-release.sh build
```

`build` 另需已設定的 `KEYSTORE_PASSWORD`、`KEY_ALIAS`、`KEY_PASSWORD`。產物固定為：

```text
frontend/android/app/build/outputs/bundle/release/app-release.aab
```

### 4. 在上傳前再次驗證

```bash
scripts/android-release.sh verify-aab \
  frontend/android/app/build/outputs/bundle/release/app-release.aab
shasum -a 256 \
  frontend/android/app/build/outputs/bundle/release/app-release.aab
```

只有輸出同時證明 package、versionCode、versionName、target SDK、JAR 簽章與 upload
certificate 正確，才可上傳。

### 5. 發布與驗證

- API 路徑以 `google-play-api.mjs verify` 在目標軌道找到相同 versionCode 與 status
  作為部署成功證據。
- UI 路徑在版本詳細資訊頁找到相同版本，且狀態為「審查中」或「已在 Google Play 上架」，
  才算 Console 已接受發布。
- 「審查中」只代表送審成功；必須明確回報仍待 Google 審查。
- 只有 Console 顯示「已在 Google Play 上架」時，才可宣稱已實際上架。

最後回報 appId、版本、軌道、推出比例、Console 狀態、AAB 絕對路徑、檔案 SHA-256，
以及任何不阻擋發布的警告。商店頁存在或本機 build 成功，均不足以單獨證明部署成功。

## 驗證技能相關修改

修改此技能或 Android Publisher API 腳本後，執行：

```bash
python3 "${CODEX_HOME:-$HOME/.codex}/skills/.system/skill-creator/scripts/quick_validate.py" \
  .agents/skills/deploy-android-aab-v1
node scripts/tests/google-play-api.integration.mjs
git diff --check
```

建立技能本身不應觸發真實部署。若要用真實正式版做 forward test，先取得使用者明確同意，
因為它會建立不可重複使用的 versionCode 並改動正式發布狀態。
