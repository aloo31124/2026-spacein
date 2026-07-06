2026-07-06 06:10:00（14:40 追加修正更新）

## git commit
[fix] # [共用]header 底圖修正頂端白色細縫與圖片 404：裁掉 PNG 頂端透明列、圖檔改走 /assets 靜態路徑。
- `header.component.scss`：`.img-header-main` 併入 `.img-header` 選擇器，補套用滿版樣式（`width:102%`、`display:block`、`margin-left:-1%`）。
- `header.component.scss`：共用圖片規則加 `margin-top:-3px`，配合 header 既有 `overflow:hidden` 裁掉 PNG 原圖頂端 1~2 列全透明像素（頂端白色細縫的真正主因）。
- `header.component.scss`：六張底圖 `content:url()` 由 `~src/assets/...` 改為 `/assets/...` 靜態路徑；原寫法編譯後被改寫成只剩檔名（如 `url('2000px.png')`）且檔案未輸出，乾淨重啟的 dev server 上全部 404、header 圖整個消失。
- 驗證：headless Edge + CDP 取樣 PNG 頂端像素證實透明列；修正後 390/800/1280 三斷點圖片皆 200 載入、imgRect.y=-3；10 倍放大截圖頁面頂端滿版紫色無細縫；`ng build --configuration production` 成功且 dist 內 URL 正確指向 /assets。
- 註記：檔號 `#?` 為暫填，待補上實際工單編號。

## prompt 1
上方 header 圖片與 網頁top 還留下一絲空隙，請修正讓 header 圖片填滿

## prompt 1 response
- 檢視 `header.component.html/scss`、`app.component.html/scss`、`styles.scss`、`index.html`、`capacitor.config.ts`，排除 body margin、safe-area、CSS transform 等常見成因。
- 本機啟動 `ng serve`，以 headless Edge 搭配 CDP（`Runtime.evaluate`）量測首頁 header 與 `<img>` 實際 DOM 幾何。
- 定位第一個問題：滿版樣式（`width:102%`、`display:block`、`margin-left:-1%`）只套用在 `.img-header`（次頁底圖），首頁 `.img-header-main` 遺漏，圖片維持 `display:inline` 產生行內留白且未依容器寬度縮放。
- 修正：把 `.img-header-main` 併入 `.img-header` 選擇器共用滿版樣式；量測 header 容器高度與圖片高度由不一致（167px vs 163px）變為完全相同。

## prompt 2
/log-prompt

## prompt 2 response
- Glob 查詢當日流水號取 1，寫出本紀錄檔。

## prompt 3
header 上方圖片仍然有空隙，上述寫法無效，請修正之。

## prompt 3 response
- 改用更深入的驗證：CDP canvas 取樣 PNG 頂端像素 + 10 倍放大截圖頁面頂端，找到兩個真正根因：
  1. **PNG 原圖頂端有全透明像素列**：main 三張圖頂端 2 列、secondary 三張圖頂端 1 列整列 alpha=0，即使排版貼齊 top:0 仍會透出白底形成「一絲空隙」——這才是使用者持續看到細縫的主因。
  2. **`~src/assets/...` 路徑編譯後失效**：component scss 的 `content:url("~src/...")` 編譯後被改寫成只剩檔名（`url('400px.png')`）且檔案未輸出，乾淨重啟的 dev server 上六張圖全 404、header 高度變 0；先前看似正常是舊 dev server 記憶體殘留舊資產。
- 修正：(1) 共用圖片規則加 `margin-top:-3px`，讓 header 既有 `overflow:hidden` 裁掉透明列；(2) 六個 `content:url()` 改為 `/assets/images/header/...` 靜態路徑（angular.json 已將 `src/assets` 複製為 `/assets`，dev/prod/Capacitor 三環境皆穩定）。
- 驗證：390/800/1280 三斷點皆 200 載入、imgRect.y=-3、header 高度=圖片高度-3px；10 倍放大截圖確認頁面最頂端滿版紫色無白色細縫；主頁與次頁（register-select）截圖皆正常；`ng build --configuration production` 建置成功，dist 產出 URL 正確為 `/assets/...` 且圖檔存在。

## prompt 4
/log-prompt

## prompt 4 response
- Glob 查詢當日 `prompt20260706-*.md`，已有本檔（流水號 1），本次為同一段對話的延續，故補寫 prompt 4 與其回復精要於既有檔案，未另建新檔。
