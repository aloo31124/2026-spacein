----
name: Cypress 前端 E2E 測試
description: >
  本專案前端（Angular 17）使用 Cypress 撰寫端對端（E2E）測試，涵蓋登入、Google 驗證、
  預約流程、取消預約等核心功能。新增或修改任何 Cypress E2E 測試、cy.intercept 後端攔截、
  自訂彈窗（.app-dialog）操作、Google 登入模擬、預約 / 取消流程測試時，必須參考此檔案。
  執行測試遇到 `bad option: --no-sandbox`（Electron 被當 Node 執行）時亦參考本檔。
  關鍵字：Cypress、E2E、cy.intercept、loginByEmail、loginByGoogle、acceptDialog、app-dialog、
  ELECTRON_RUN_AS_NODE、預約測試、取消預約測試、Google 登入模擬。
----

## 適用範圍

- 設定：[frontend/cypress.config.ts](../../../frontend/cypress.config.ts)
- 共用指令：[frontend/cypress/support/commands.ts](../../../frontend/cypress/support/commands.ts)
- 測試檔：`frontend/cypress/e2e/*.cy.ts`
- 說明文件：[frontend/cypress/README.md](../../../frontend/cypress/README.md)

| Spec | 核心功能 |
| --- | --- |
| `login.cy.ts` | 信箱 / 密碼登入（成功、欄位卡控、後端失敗） |
| `google-auth.cy.ts` | Google 第三方登入驗證（FedCM / One Tap 模擬） |
| `booking.cy.ts` | 預約流程（日期→時段→類型→選座位→送出） |
| `cancel-booking.cy.ts` | 取消預約（已預約清單→選預約→取消借用→確認） |

---

## 硬性規範（撰寫測試務必遵守）

### 1. 後端一律以 cy.intercept 模擬，不連線真實後端
- 後端網域集中於 `environment.domain`，攔截時用 glob `**/api/...` 以跨網域比對。
- 端點區分：`roomtosite/all`（取所有座位）與 `roomtosite/:date/:start/:end`（含是否被預約）
  是不同 API，需分別攔截（後者用 `**/api/booking/roomtosite/*/*/*`）。
- 資料欄位需對齊 model：`RoomSiteIsBooking` 以欄位 **name** 對應座位名稱（siteName）。

### 2. 自訂彈窗，而非瀏覽器原生 alert / confirm
- `app.component` 於啟動時覆寫 `window.alert`，將 alert / confirm 導向自訂彈窗
  `.app-dialog-container`（見 `DialogService`）。故測試以 DOM 操作彈窗：
  - `cy.dialogShouldContain(text)`：驗證彈窗訊息。
  - `cy.acceptDialog()`：點「確定」（alert 的確定 / confirm 的確定，皆非取消鍵）。
- 含「請先登入 / 成功登入」的**快閃訊息**會於約 1.6 秒後自動關閉並短暫蓋上遮罩，
  故頁面互動一律加 `{ force: true }` 略過遮罩覆蓋檢查。
- 預約流程多個 alert（如「確定下一步」「選擇時段」「送出成功」）為**非快閃**，
  會停留至點「確定」為止，每一步都要以 `cy.acceptDialog()` 關閉才能繼續。

### 3. 元件互動細節
- `app-input`（開始 / 結束時間）的 `(click)` 綁在**內層 `.row`**，切換欄位要點
  `cy.contains('app-input .row', '結束時間')`，點 `<app-input>` host 中心可能不觸發。
- 時段卡控要求**開始時間 < 結束時間**：預設兩者皆 09:00，須先切到「結束時間」再於時鐘
  點選較晚時刻（如 10 點），並以 `should('contain','10:00')` 驗證後再按下一步。
- 行事曆日期格子文字前後含換行 / 空白，用正則點選要容忍空白：
  `new RegExp('^\\s*' + day + '\\s*$')`。
- 取消預約的預約日期以「執行當日」動態產生，確保日期永遠有效且落在當月；日期格式需與
  `calendar-picker` 一致（`year-month-day`，月 / 日**不補零**）。

### 4. Google 登入模擬
- 於 `cy.visit` 的 `onBeforeLoad` 注入假的 `window.google.accounts.id`，
  `prompt()` 回拋一組可被 `GoogleAuthService.parseJwt` 解析的假 JWT（payload 需含 name、email）。
- 全域攔截 `https://accounts.google.com/gsi/client` 回傳空腳本，避免對外連線且不覆蓋注入。

---

## 執行方式

```bash
npm start            # 終端機 A：啟動前端（埠 4200）
npm run cy:run       # 終端機 B：無頭執行全部 E2E
npm run cy:open      # 或開 GUI 互動執行
npm run e2e          # 一鍵：自動起 server → 跑測試 → 關 server
```

### 疑難排解：`bad option: --no-sandbox`
終端機若設有 `ELECTRON_RUN_AS_NODE=1`（VS Code 內建終端機、部分 CI 常見），
Cypress 的 Electron 會被當純 Node 執行而拒絕瀏覽器參數。執行時先移除該變數：

```bash
env -u ELECTRON_RUN_AS_NODE npm run cy:run
```
