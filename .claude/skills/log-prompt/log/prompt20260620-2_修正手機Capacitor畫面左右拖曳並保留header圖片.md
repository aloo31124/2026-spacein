2026-06-20 10:46:23

## git commit
[fix] [RWD] 修正手機/Capacitor 畫面可左右拖曳，並保留 header 滿版圖片

- [header] 改用「header 本體 100% + 圖片略大 + overflow: hidden 裁切」策略：header 維持 width: 100% 不溢出視窗，left/right/top 歸零並加上 overflow: hidden，將溢出關在 header 框內，消除整頁可左右拖曳。
- [header] .img-header 設為 width: 102% + margin-left: -1% + max-width: none + display: block，維持背景滿版填滿（修正前一版改 100% 導致圖片縮水露邊問題），溢出由 header 裁切。
- [header] 修正盲點：overflow-x: hidden 無法裁切 position: fixed 元素，故改由固定式 header 自身 overflow: hidden 處理。
- [styles] html, body 全域兜底維持 margin 歸零、width/max-width 100%、overflow-x: hidden，新增 overscroll-behavior-x: none（關閉 WebView 水平回彈）與 position: relative。
- 排查全專案無其他超過視窗寬度元素（最寬 90vw），通過 ng build AOT 驗證（exit 0）。

## prompt 1
手機寬度，或使用 capcitor build 成 android, ios 會造成畫面可左右拖曳，
請修正此問題。

## prompt 1 response
- 探查專案結構（Angular + Capacitor），檢視全域樣式 styles.scss、index.html、app 根元件、header 元件樣式與 capacitor.config.ts。
- 找出水平溢出三個來源：
  1. styles.scss 的 `body { width: 99% }` 且未重置瀏覽器預設 8px margin、無溢出防護。
  2. header.component.scss 的 `header { width: 110%; left: -1px }` 與 `.img-header { width: 105% }`（刻意溢出做「背景填滿」）→ 主因。
  3. `.header-title { width: 100%; left: 10px }` 再往右溢出 10px。
- 第一版修正：
  - styles.scss 新增 `html, body { margin:0; padding:0; width:100%; max-width:100%; overflow-x:hidden }`，移除 body 的 width:99%。
  - header 改 `width:100%`、`left:0`、`top:0`；`.img-header` 改 `width:100%; display:block`；`.header-title` 改 `left:0`。
- 通過 `ng build`（exit 0，僅既有 `justify-content: start` 警告）。
- 提醒 App 需 `npm run build` 後 `npx cap sync` 才生效。

## prompt 2
修正失敗，請保留上方 header 圖片，
並避免拖曳

## prompt 2 response
- 診斷第一版失敗原因：
  1. header/圖片改 100% 導致背景圖不再滿版、邊緣露底色（縮水）。
  2. 關鍵盲點—`overflow-x: hidden` 加在 html/body 無法裁切 `position: fixed` 元素，故固定式 header 仍可能撐出拖曳。
- 改用新策略「header 本體 100% 不溢出 + 圖片略大滿版 + header 自身 overflow: hidden 裁切」：
  - header.component.scss：header 維持 `width:100%`、`left/right/top:0`、新增 `overflow:hidden`；`.img-header` 設 `width:102%`、`margin-left:-1%`、`max-width:none`、`display:block`（保留滿版，溢出被 header 裁掉）。
  - styles.scss：全域兜底再加 `overscroll-behavior-x: none` 與 `position: relative`。
- 用 Grep 排查全專案：唯一比視窗寬的是 header 圖片（已被裁切），其餘最寬 90vw（安全），未使用 100vw → 無其他拖曳來源。
- 通過 `ng build`（exit 0）。提供微調建議：若圖片要更滿，將 `.img-header` width 調大、margin-left 設其半值負數即可（有 overflow:hidden 不會再拖曳）。
- 再次提醒 App 需 `npm run build` + `npx cap sync` 重新打包生效。
