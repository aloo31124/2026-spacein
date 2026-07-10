---
name: 管理後台響應式表格
description: >
  修改空間管理或系統管理的搜尋結果、資料表、卡片版型、管理側欄響應式行為時使用。
  涵蓋共用 manager-table 標記、400px 容器查詢卡片切換、spacein 紫色視覺，以及 1000px 側欄自動收合規則。
---

# 管理後台響應式表格

## 適用範圍

- `frontend/src/app/manager-room/` 的搜尋結果與管理側欄。
- `frontend/src/app/manager-system/` 的搜尋結果與管理側欄。
- `frontend/src/styles.scss` 的 `.manager-table*`、`.manager-table-state`、`.search-result` 共用樣式。

## 表格標記契約

搜尋結果使用原生 `<table class="manager-table">`，外層放在 `.manager-table-container`，讓資料維持表頭與儲存格的語意關係。每個 `<th>` 加上 `scope="col"`；每個 `<td>` 的 `data-label` 必須與對應表頭一致，因為卡片版型會用它產生欄位標籤。

有編輯、刪除等操作時，以 `.manager-table__actions` 包住按鈕，使桌面與卡片版都能共用間距及換行規則。開始搜尋、沒有結果等空狀態使用 `.manager-table-state`，不要各頁重複樣式。

## 響應式原則

- `.manager-table-container` 使用 CSS container query；容器實際寬度小於 400px 時，表頭隱藏且每筆資料轉為獨立卡片。以容器寬度而非瀏覽器寬度判斷，才能支援側欄、對話框等不同內容區。
- 空間管理與系統管理的側欄以瀏覽器寬度 1000px 為斷點：小於 1000px 初次載入自動收合，跨回桌面斷點時自動展開。
- resize 僅在跨越 1000px 斷點時同步狀態，避免同一斷點內的小幅縮放覆蓋使用者手動開合選擇。

## 視覺規範

沿用 spacein 主色 `#661983` 與淺底色 `#FBE0FF`；表頭可用同色系漸層，資料列使用輕量斑馬紋、紫色透明邊框、圓角與柔和陰影。共用樣式集中在 `frontend/src/styles.scss`，避免空間管理與系統管理逐頁產生不同版本。

## 驗證

1. 執行 Angular build，確認所有表格模板與 SCSS 可編譯。
2. 在 1000px、999px 驗證側欄展開／收合。
3. 將 `.manager-table-container` 調整為 400px、399px，確認表格與卡片恰好在指定門檻切換。
4. 檢查卡片中每個值都有正確的 `data-label`，操作按鈕不溢出。
