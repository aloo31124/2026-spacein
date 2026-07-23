# Skills 索引

本專案的 Skills 文檔位於 `.github/skills/` 目錄。
進行相關功能開發時，請優先閱讀對應的 SKILL.md。

## 可用 Skills

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
