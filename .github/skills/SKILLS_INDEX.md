# Skills 索引

本專案的功能規範 Skills 位於 `.github/skills/`，可重複執行的 Agent Skills 位於
`.agents/skills/`。
進行相關功能開發時，請優先閱讀對應的 SKILL.md。

## 可用 Skills

### Android AAB 正式版部署 v1
- **文檔**: `.agents/skills/deploy-android-aab-v1/SKILL.md`
- **補充參考**: `.agents/skills/deploy-android-aab-v1/references/play-console-production.md`
- **適用情境**:
    * 依目前程式碼建立下一個 Android 版本、產生已簽署 AAB、升版 versionCode、
      上傳或送審 Google Play 正式版，以及驗證 Console 發布狀態時使用。
    * 優先重用 `scripts/android-release.sh` 與 Publisher API；沒有服務帳號時才改走
      已登入的 Play Console UI 備援流程。
    * 關鍵字：Android AAB、版本升版、正式版發布、Google Play 送審、
      Play Console、deploy-android-aab-v1。

### Android Google Play 自動部署
- **文檔**: `.github/skills/android-google-play-deploy/SKILL.md`
- **適用情境**:
    * 修改、執行或診斷 Android AAB 建置、release 簽章、versionCode、GitHub Actions、Google Play Console 發布或 Play 軌道驗證時，必須參考此檔案。
    * 涵蓋 `com.spacein` 固定 App ID、既有 upload key 憑證指紋、五項 Actions secrets、Google Play API 自動版本碼，以及上傳後 API 查核成功標準。
    * 關鍵字：Android 部署、Google Play、Play Console、AAB、upload key、keystore、bundleRelease、android-release.yml、com.spacein。

### Cloud Run 部署與前端 API domain
- **文檔**: `.github/skills/cloud-run-deploy/SKILL.md`
- **適用情境**:
    * 修改 `cloudbuild.yaml`、`frontend/Dockerfile`、`backend/Dockerfile`，或診斷「部署後前端呼叫錯誤的 API domain、打到舊後端、CORS 失敗」時，必須參考此檔案。
    * 涵蓋前端 API domain 的唯一來源（`environment.prod.ts` + angular fileReplacements）、`_BACKEND_URL` / `ARG BACKEND_URL` 預設留空的硬性規範、禁止部署流程自動覆寫 domain，以及 Cloud Run 網址區域代碼（`-de` asia-east1 / `-uc` us-central1）判讀。
    * 關鍵字：cloudbuild、Cloud Run、部署、BACKEND_URL、_BACKEND_URL、environment.prod.ts、domain、fileReplacements、spacein-server、spacein-client、a.run.app。

### Google OAuth Client ID 與原生登入設定
- **文檔**: `.github/skills/google-oauth-client-id/SKILL.md`
- **適用情境**:
    * 修改或診斷 Google 登入設定時，必須參考此檔案。涵蓋 `capacitor.config.ts` 的 SocialLogin 區塊、`@capgo/capacitor-social-login` 初始化、`environment.ts` / `environment.prod.ts` 的 `googleOAuth` 欄位、iOS `GoogleService-Info.plist` 與 `Info.plist` URL Scheme、Android `strings.xml` 的 `server_client_id`。
    * 涵蓋「原生 client 與 serverClientId 必須同 GCP 專案」之硬性規範、各平台 client id 解析優先序差異（禁用共用鍵 `clientId`、Android 不讀 `serverClientId`）、client id 集中於 environment 的管理方式、iOS 三處設定同步規則，以及 `npx cap sync` 產生檔不可手改的規範。
    * 疑難排解：`invalid_audience`（iOS code `-61440`）、`DEVELOPER_ERROR`（Android code `10`）、回呼導不回 App、`pod install` 的 `ASCII-8BIT` 編碼錯誤。
    * 關鍵字：Google 登入、OAuth、client id、invalid_audience、-61440、GoogleAuth、capacitor.config、iosClientId、serverClientId、server_client_id、GoogleService-Info.plist、REVERSED_CLIENT_ID、URL Scheme、cap sync。

### iOS WebView 繁體中文字型
- **文檔**: `.github/skills/ios-traditional-chinese-font/SKILL.md`
- **適用情境**:
    * 修改或診斷 Capacitor iOS、WKWebView、iOS Simulator 的繁體中文顯示成問號、方框或缺字時，必須參考此檔案。
    * 涵蓋 HTML `zh-Hant-TW` 語系、Fontsource 內嵌 Noto Sans TC、表單控制項字型繼承，以及 production build、`cap sync ios` 與 Simulator 快取排查。
    * 關鍵字：iOS、WKWebView、Simulator、繁體中文、問號、缺字、font-family、Noto Sans TC、Fontsource、input、button、placeholder。

### Firebase Admin 憑證與登入連線
- **文檔**: `.github/skills/firebase-admin-credentials/SKILL.md`
- **適用情境**:
    * 修改或診斷後端 Firebase Admin、Firestore 初始化、服務帳戶金鑰、Application Default Credentials、登入 401 或資料庫連線錯誤時，必須參考此檔案。
    * 涵蓋本機 `firestroekey.json` 優先順序、部署環境預設憑證、安全排除規則，以及帳密錯誤與資料庫例外的 HTTP 狀態區分。
    * 關鍵字：Firebase Admin、Firestore、firestroekey、服務帳戶、ADC、登入、401、資料庫連線。

### 空間預約日期時間與共用選擇視窗
- **文檔**: `.github/skills/booking-date-time-ui/SKILL.md`
- **適用情境**:
    * 修改空間預約行事曆、時鐘選擇器、booking 欄位排版或共用 `app-dialog` 時，必須參考此檔案。
    * 涵蓋白色行事曆區左右拖曳換月、欄位單行省略、可視區內置中視窗、長選項換行與清單滾動、hover 互動、粉紅選取狀態，以及以頁內文字取代時段 alert。
    * 關鍵字：calendar-picker、clock-picker、booking、app-dialog、左右拖曳、選擇時段、粉紅反白、欄位不換行、彈出視窗。

### 管理列表響應式表格
- **文檔**: `.github/skills/manager-responsive-table/SKILL.md`
- **適用情境**:
    * 修改「空間管理」或「系統管理」的搜尋結果、列表表格、欄位標頭與操作欄時，必須參考此檔案。
    * 涵蓋 SpaceIn 共用表格視覺、表格容器小於 400px 的卡片切換，以及瀏覽器小於 1000px 的管理側欄自動收合。
    * 關鍵字：manager-table、manager-table-shell、data-label、container query、空間管理、系統管理、列表、表格、側欄收合。

### skills 文件創建6原則
- **文檔**: `.github/skills/skill-design-6-principles/SKILL.md`
- **補充參考**: `.github/skills/skill-design-6-principles/eval-loop-test.md`
- **適用情境**: 
    * 創建 skills 文件時，必須閱讀此文件，包含:
    * 已經存在之功能需另外創建新 skills 文件說明。
    * 或使用 speckit、openspec 等工具開發之新功能完成後，也必須創建新的 skills 文件說明。
    * 關鍵字: skills、產生skills、speckit.implement、開發完成。


### Formio 自訂義表單
- **文檔**: `.github/skills/formio-spec/SKILL.md`
- **補充參考**: `.github/skills/formio-spec/formio-ui-reference.md`
- **適用情境**: 
    * 修改 formio 相關前後端所有功能時，都必需要參考此檔案中的規範與說明。
    * formio 相關 表單設計、表單渲染、表單提交、FormioBuilder 整合、FormioForm 組件 與 開發調整所有功能皆需參考此檔案。

### Vue 3 組件撰寫風格
- **文檔**: `.github/skills/vue-coding-style/SKILL.md`
- **適用情境**: 
    * 修改前端相關 vue 時候，都必須參考此檔案中的規範與說明。
    * Vue 3 組件開發、Composition API、`<script setup>` 撰寫規範，只要修改到前端 vue 組件相關的程式碼，請優先參考此檔案。

### iframe 嵌入整合
- **文檔**: `.github/skills/iframe-integration/SKILL.md`
- **適用情境**:
    * 修改或新增任何 iframe 嵌入功能、postMessage 通訊、iframe 路由頁面時，必須參考此檔案。
    * 涵蓋 iframe 包裝元件、expand/shrink 動態尺寸機制、iframe HTML 生成與剪貼簿複製、API 認證旁路、IFRAME 模組功能開關等規範。
    * 關鍵字：iframe、postMessage、expandIframe、shrinkIframe、FlowEditIframe、SignIframe、ExternalPage、嵌入外部系統。

### Web Component 打包
- **文檔**: `.github/skills/web-component-build/SKILL.md`
- **適用情境**:
    * 修改或新增 Web Component 打包設定、自訂元素標籤、FlowEditElement 包裝層、mock 模組、假資料時，必須參考此檔案。
    * 涵蓋 defineCustomElement 註冊流程、Vite library 模式建置（ES/UMD/IIFE）、Shadow DOM 停用策略、mock-router / mock-api-service 替換架構、假資料系統（mockData）、Props HTML 屬性對應。
    * 關鍵字：web component、custom element、defineCustomElement、flow-edit-element、build:wc、IIFE、UMD、mockData、vite.config.webcomponent、dist-webcomponent。

### ECPay 綠界金流整合
- **文檔**: `.github/skills/ecpay-payment/SKILL.md`
- **適用情境**:
    * 修改或新增後端 ECPay 付款流程、付款參數產生、付款結果回呼（ReturnURL/ClientBackURL）、付款歷史紀錄寫入、使用者方案升級等任何金流相關邏輯時，必須參考此檔案。
    * 涵蓋 ECPay SDK 參數格式硬性規範（`MerchantTradeDate` 須為 `yyyy/MM/dd HH:mm:ss` 台北時區、`MerchantTradeNo` 長度限制、`TotalAmount` 整數要求）、`CheckMacValue` 驗證、`planTimeType` 到期日計算、環境變數設定等。
    * 關鍵字：ECPay、綠界、ecpay_aio_nodejs、aio_check_out_all、MerchantTradeDate、MerchantTradeNo、CheckMacValue、付款、金流、訂單、儲值、方案、pay-ecpay.service.js。

### 擁有者預設資料與教室開放時段卡控
- **文檔**: `.github/skills/owner-default-room-open-rule/SKILL.md`
- **適用情境**:
    * 修改或新增「擁有者預設資料（預設地址/電話/每周不開放星期/每天開放時段）」、「教室開放資訊欄位」、「空間預約之教室不開放時段卡控」、「預約流程卡控提醒（行事曆/時鐘頁）」相關前後端功能時，必須參考此檔案。
    * 涵蓋 Owner 表結構（以 ownerId 為文件 id 的 upsert）、前後端共用欄位命名、共用表單元件 app-owner-default-form、預約存檔前卡控規則（日期手動解析避免時區誤差、HH:mm 補零比較）、卡控失敗 400 錯誤訊息格式、前端即時提醒機制與共用規則 util（room-open-rule.util.ts）。
    * 關鍵字：擁有者預設、Owner表、closedWeekdays、openStartTime、openEndTime、每周不開放、每天開放時段、預約卡控、checkRoomOpenRule、owner-default-form、帶入擁有者預設、卡控提醒、room-open-rule.util、不開放教室提醒、openRuleRoomList。

### Cypress 前端 E2E 測試
- **文檔**: `.github/skills/cypress-e2e/SKILL.md`
- **補充參考**: `frontend/cypress/README.md`
- **適用情境**:
    * 新增或修改任何 Cypress E2E 測試（登入、Google 驗證、預約流程、取消預約）時，必須參考此檔案。
    * 涵蓋 cy.intercept 後端攔截規範、自訂彈窗（.app-dialog）操作、快閃訊息遮罩與 force 點擊、Google 登入模擬（onBeforeLoad 注入假 window.google + 假 JWT）、時鐘時段卡控、行事曆日期選取等硬性眉角。
    * 疑難排解：`bad option: --no-sandbox`（`ELECTRON_RUN_AS_NODE` 導致 Electron 被當 Node 執行）。
    * 關鍵字：Cypress、E2E、cy.intercept、loginByEmail、loginByGoogle、acceptDialog、app-dialog、ELECTRON_RUN_AS_NODE、預約測試、取消預約測試、Google 登入模擬。
