# Play Console 正式版 UI 備援流程

只有缺少可用的 Android Publisher API 憑證、且使用者已授權正式版發布時，才使用本流程。

## 進入條件

- 先搜尋可用的 Google Play 專用 connector、API 或 CLI；找到可用介面時優先使用。
- 確認 in-app Browser 技能可用並完整讀取其 `SKILL.md`。
- 在上傳檔案前讀取 Browser 的 `file-uploads` 文件。
- 使用者需登入有權管理 `com.spacein` 的 Play Console 帳戶。
- AAB 已由 `scripts/android-release.sh verify-aab` 驗證成功。

## 取得版本

1. 從應用程式清單進入 package `com.spacein`，不要依賴固定的開發人員或應用程式數字 ID。
2. 先查看「最新版本和套件」及各使用中的測試／正式軌道。
3. 取所有 APK/AAB 已使用 versionCode 的最大值再加一。
4. 若預定的 versionCode 已存在於草稿、審查中或其他軌道，重新建置下一版，不要重傳同一版。

## 建立正式版本

1. 開啟「測試及發布」→「正式版」→「版本」。
2. 若「建立新版本」停用但已有草稿，選擇「編輯版本」接續；不要任意捨棄使用者草稿。
3. 選擇「上傳」，以 Browser file chooser 上傳：

   ```text
   frontend/android/app/build/outputs/bundle/release/app-release.aab
   ```

4. 等待 Console 顯示實際版本列，例如 `21 (2.2.1)`。只有進度條完成不代表處理成功。
5. 版本名稱使用 Console 根據 AAB 建議的 `<versionCode> (<versionName>)`。
6. 版本資訊使用 `.github/whatsnew/whatsnew-zh-TW`，格式為：

   ```text
   <zh-TW>
   此版本包含效能改善與錯誤修正。
   </zh-TW>
   ```

7. 選擇「下一步」，核對 package、版本、target SDK、支援裝置與推出比例。
8. 正式全面發布使用 100%；若使用者要求分階段推出，以其指定比例為準。

## 處理檢查結果

- 任一紅色錯誤都要停止並診斷，不能略過。
- 若只有「未附去模糊化檔」警告，先確認
  `frontend/android/app/build.gradle` 的 release `minifyEnabled`：
  - `false`：記錄為不阻擋警告，可繼續。
  - `true`：先找出並上傳對應 mapping 檔，避免失去當機堆疊解析能力。
- target SDK 政策、簽章或 versionCode 錯誤都必須重新建置，不得直接送審。

## 送審

1. 選擇「儲存」。
2. 在提示中選擇「前往總覽頁面」。
3. 在「尚未送審的變更」確認只有預期的正式版變更。
4. 選擇「送審 1 項變更」；實際數字可能隨同批變更而不同，必須先逐項核對。
5. 在確認視窗選擇「將變更送審」。
6. 等待快速檢查結束，不要因頁面仍顯示 loading 就重複送出。

## 成功證據

在版本詳細資訊頁同時取得：

- 標題為預期 `<versionCode> (<versionName>)`。
- 「應用程式套件」列顯示相同版本與 target SDK。
- 狀態為：
  - `審查中`：Console 已接受送審，尚未實際上架。
  - `已在 Google Play 上架`：Google 已完成審查並實際上架。

保留該版本詳細資訊頁供使用者檢查。不得以「送審成功」替代「已上架」，也不得以商店頁仍
顯示舊版判定本次上傳失敗，因為 Google 審查與商店分發皆為非同步流程。
