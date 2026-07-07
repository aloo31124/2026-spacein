# Cypress E2E 測試

對前端核心功能的端對端（E2E）測試，涵蓋：

| Spec 檔案 | 測試核心功能 |
| --- | --- |
| `e2e/login.cy.ts` | 信箱 / 密碼登入（成功、欄位卡控、後端失敗） |
| `e2e/google-auth.cy.ts` | Google 第三方登入驗證（網頁 FedCM / One Tap） |
| `e2e/booking.cy.ts` | 預約流程（日期 → 時段 → 類型 → 選座位 → 送出） |
| `e2e/cancel-booking.cy.ts` | 取消預約（已預約清單 → 選預約 → 取消借用 → 確認） |

所有後端 API 皆以 `cy.intercept` 攔截模擬（見各 spec 與 `support/commands.ts`），
**不需連線真實後端**，也不需真實 Google OAuth 帳號。

## 執行方式

先啟動前端 dev server（預設埠 4200），再開另一個終端機執行 Cypress：

```bash
# 終端機 A：啟動前端
npm start

# 終端機 B：無頭執行全部 E2E
npm run cy:run

# 或開啟 Cypress GUI 互動執行
npm run cy:open
```

一鍵（自動起 server → 跑測試 → 關 server）：

```bash
npm run e2e
```

## 常見問題

### `bad option: --no-sandbox` / Cypress 無法啟動

若終端機環境設有 `ELECTRON_RUN_AS_NODE=1`（常見於 VS Code 內建終端機、部分 CI），
Cypress 的 Electron 會被當成純 Node 執行而拒絕瀏覽器參數。執行時先移除該變數即可：

```bash
env -u ELECTRON_RUN_AS_NODE npm run cy:run
```

## 設計備註

- 應用程式將 `window.alert` / `confirm` 覆寫為自訂彈窗（`.app-dialog-container`），
  故測試以 DOM 操作彈窗（`cy.acceptDialog()`），而非 Cypress 內建的 `window:alert`。
- 登入頁「請先登入」等快閃訊息會短暫蓋上遮罩，故互動一律加 `{ force: true }`。
- `app-input` 的點擊事件綁在內層 `.row`，切換「開始 / 結束時間」欄位需點 `.row`。
- 取消預約的日期以「執行當日」動態產生，確保日期永遠有效且落在行事曆當月。
