2026-06-20 13:05:26

## git commit
[update] #? [管理空間] 左上角 icon 改用 inline SVG 預設元件，並優化手機板 RWD。

- `header.component.html`：`.icon-bar` 上一頁/會員中心由 `icon_back.png`、`icon_user.png` 改為 `<button>`+inline SVG，補 aria-label/title。
- `header.component.scss`：原 `.icon-bar img` 改 `.iconBtn` 樣式，覆蓋全域 button 紫底圓角為透明圖示鈕，圖示色沿用 `#FBE0FF`。
- `room-dashboard.component.html`：展開/收合選單鈕由 `icon_next.png`、`icon_back.png` 改為 inline SVG 漢堡/關閉圖示，補無障礙標籤。
- `room-dashboard.component.scss`：外層容器加 `box-sizing: border-box` 修正 90vw+padding 溢出（手機可左右拖曳主因），內容區改 `flex:1; min-width:0`；新增 `@media (max-width:600px)` 直向堆疊、降 padding、選單與按鈕等寬、search-bar 垂直化。
- 原因：PNG 圖示在 Android WebView 渲染不一致且依賴載入；改 inline SVG 可跨平台一致、隨字色縮放、免外部資源；RWD 修正手機水平溢出與窄螢幕擠壓。
- 舊 PNG 仍被 booking/calendar-picker/payment/sys-dashboard 引用，故保留資產不刪除；本次無對應 SKILL.md 需同步。
- 已通過 ng build（AOT，exit 0）。檔號待補：請將 `#?` 換成實際工單編號。

異動檔案：
- frontend/src/app/common/header/components/header/header.component.html
- frontend/src/app/common/header/components/header/header.component.scss
- frontend/src/app/manager-room/components/room-dashboard/room-dashboard.component.html
- frontend/src/app/manager-room/components/room-dashboard/room-dashboard.component.scss

## prompt 1
將 安卓版 左上角的 icon 圖片替換為 預設元件，
並優化管理空間 手機板 RWD

## prompt 1 response
- 探查結構：用 Explore agent 定位兩處目標——共用 header 元件（`common/header`，`.icon-bar` 內 `icon_back.png`、`icon_user.png`，固定於左上角 top:30px/left:10px）與管理空間 `room-dashboard`（`icon_next.png` 展開、`icon_back.png` 收合選單）。確認專案未安裝 icon 套件，僅登入頁用過 inline SVG，定調沿用 inline SVG 模式。
- 釐清需求：以 AskUserQuestion 詢問「左上角 icon」指哪一個，使用者選「兩者都換」（header 返回/帳號 icon 與管理空間選單 icon 皆換）。
- header 改動：HTML 兩個 `<img>` 改為 `<button>`+inline SVG（箭頭、人像），補 aria-label/title；SCSS 將 `.icon-bar img` 改為 `.iconBtn` 樣式，覆蓋全域 button 紫底圓角為透明圖示鈕，圖示色用 `#FBE0FF`（沿用 header 標題色，於底圖上清晰）。
- 管理空間 icon：展開鈕改 SVG 漢堡圖示、收合鈕改 SVG 關閉(X)圖示，皆為 `<button>` 並補無障礙標籤；SCSS 加圖示鈕透明樣式（白底頁面展開鈕用主色 `#661983`、紫底選單內收合鈕用 `#FBE0FF`）。
- 管理空間 RWD：找出水平拖曳主因為 `width:90vw + padding:40px` 未設 box-sizing → 總寬超出視窗。加 `box-sizing: border-box`、內容區 `flex:1; min-width:0`；新增 `@media (max-width:600px)` 改直向堆疊、padding 40→12px、選單 width:100% 且按鈕等寬、search-bar 垂直化。
- 範圍控管：sys-dashboard（系統管理）雖同 icon 模式但非「管理空間」，未更動；舊 PNG 仍被 booking/calendar-picker/payment/sys-dashboard 引用，故保留資產不刪。
- 驗證：`ng build`（AOT）通過 exit 0、5.49s，僅既有 `justify-content: start` autoprefixer 警告與本次無關。確認 Skills 索引（Formio/Vue/iframe/Web Component）皆與本次 Angular UI 無關，無需同步 SKILL.md；最後輸出可複製的 git commit 區塊。

## prompt 2
/log-prompt

## prompt 2 response
- 取得當前時間戳 2026-06-20 13:05:26；Glob 查得今日已有流水號 1、2、3 三份 log，遞增為 4。
- 參照既有範本格式，寫出本檔 `prompt20260620-4_左上角icon改SVG並優化管理空間手機RWD.md`，含時間戳、git commit、prompt 逐字與 response 精要、異動檔案清單。
