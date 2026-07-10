---
name: manager-responsive-table
description: >
  統一 SpaceIn Angular 後台「空間管理」與「系統管理」的列表表格、窄版卡片及左側選單響應式行為。修改 manager-room 或 manager-system 的搜尋結果、資料列表、欄位標頭、表格樣式、400px 卡片切換，或 1000px 管理選單收合時使用。
---

# 管理列表響應式表格

## 共用契約

- 將列表寫成語意化 `<table class="manager-table">`，外層使用 `<div class="manager-table-shell">`。
- 提供描述內容的 `<caption>`；若不需顯示，沿用共用樣式的視覺隱藏方式。
- 每個欄位使用 `<th scope="col">`，名稱應具體且使用繁體中文，例如「使用者 ID」而非「id」。
- 每個 `<td>` 的 `data-label` 必須和對應表頭相同。容器小於 400px 時，卡片以此屬性顯示欄位名稱。
- 操作欄使用 `table-actions`，多個按鈕包在 `table-action-group`，操作按鈕使用 `table-action`；保留原本的權限或不可操作提示邏輯。
- 空資料與初始搜尋狀態使用 `result-state`，讓各頁提示風格一致。

共用樣式集中在 `frontend/src/styles.scss`。不要在各列表元件重複表格色彩、間距與卡片規則，避免不同管理頁產生視覺差異。

## 響應式規則

以 `.manager-table-shell` 的 inline size 作為判斷基準，因為側欄展開時內容寬度可能遠小於瀏覽器寬度。使用 CSS container query 在 `max-width: 399px` 時：

- 視覺隱藏 `<thead>`，但保留在 DOM 供輔助技術讀取。
- 將 `tbody` 改為卡片網格，`tr` 為單筆卡片，`td` 為「欄位名稱／值」雙欄。
- 不刪除 `<table>` 語意，也不以 TypeScript 複製兩套列表資料。

管理側欄在 `room-dashboard` 與 `sys-dashboard` 維持相同行為：瀏覽器初始寬度小於 1000px 時預設收合；視窗縮到 1000px 以下時自動收合；使用者仍可按展開按鈕操作。

## 修改流程

1. 搜尋 `manager-room`、`manager-system` 內的 `*ngFor`、`<ul>` 與既有 `manager-table`，確認所有資料列表都在範圍內。
2. 依資料模型補齊 caption、表頭、儲存格與 `data-label`，不要改變 API 欄位或原有事件處理。
3. 若新增管理入口，同步檢查兩個 dashboard 的側欄版型是否仍一致。
4. 執行 `npm run build`，確認 Angular template 與 SCSS 編譯成功。
5. 分別以大於 1000px、小於 1000px，以及表格容器小於 400px 的畫面驗證表頭、卡片欄位名稱與側欄狀態。

## 視覺基準

沿用 SpaceIn 主色 `#661983`、淡紫底 `#FBE0FF` 與圓角語彙。表頭使用主色高對比底色，資料列採淡色交錯及 hover 回饋；避免加入與現有介面無關的色系或第三方表格套件。
