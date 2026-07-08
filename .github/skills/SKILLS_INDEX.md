# Skills 索引

本專案的 Skills 文檔位於 `.github/skills/` 目錄。
進行相關功能開發時，請優先閱讀對應的 SKILL.md。

## 可用 Skills

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

### 教室開放限制（擁有者預設資料 / 每周不開放時段 / 每天開放時段）
- **文檔**: `.github/skills/room-open-limit/SKILL.md`
- **適用情境**:
    * 修改或新增任何「擁有者預設資料（Owner 表）」「教室開放限制欄位（地址、電話、每周不開放時段、每天開放時段）」「預約流程行事曆不開放提醒」「時鐘頁開放時段提醒與卡控」相關前後端功能時，必須參考此檔案。
    * 涵蓋 Owner 表 doc id 設計（= ownerId 直接 upsert）、欄位規格（weeklyCloseDays 0=周日對齊 Date.getDay()、openStartTime/openEndTime "HH:mm"）、舊資料「未設定視為不限制」相容原則、前端共用工具 room-open-limit.ts 單一事實來源、教室新增帶入擁有者預設、行事曆「休」標示、時鐘時段卡控、樣式一致性規範。
    * 關鍵字：Owner 表、擁有者預設資料、weeklyCloseDays、openStartTime、openEndTime、每周不開放、每天開放時段、行事曆休、room-open-limit、教室地址、教室電話、帶入擁有者預設、booking 卡控。

### Cypress 前端 E2E 測試
- **文檔**: `.github/skills/cypress-e2e/SKILL.md`
- **補充參考**: `frontend/cypress/README.md`
- **適用情境**:
    * 新增或修改任何 Cypress E2E 測試（登入、Google 驗證、預約流程、取消預約）時，必須參考此檔案。
    * 涵蓋 cy.intercept 後端攔截規範、自訂彈窗（.app-dialog）操作、快閃訊息遮罩與 force 點擊、Google 登入模擬（onBeforeLoad 注入假 window.google + 假 JWT）、時鐘時段卡控、行事曆日期選取等硬性眉角。
    * 疑難排解：`bad option: --no-sandbox`（`ELECTRON_RUN_AS_NODE` 導致 Electron 被當 Node 執行）。
    * 關鍵字：Cypress、E2E、cy.intercept、loginByEmail、loginByGoogle、acceptDialog、app-dialog、ELECTRON_RUN_AS_NODE、預約測試、取消預約測試、Google 登入模擬。
