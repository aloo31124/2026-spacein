// Cypress E2E 全域支援檔案：於每個 spec 執行前自動載入
import './commands';

/**
 * 應用程式在啟動時會初始化 Firebase / Firestore、載入 Google GSI SDK，
 * 這些第三方於測試（無真實憑證）環境下可能拋出未捕捉的例外。
 * 這類例外與被測邏輯無關，故一律忽略，避免測試被非預期的第三方錯誤中斷。
 */
Cypress.on('uncaught:exception', () => false);

/**
 * 全域攔截 Google Identity Services（GSI）SDK：回傳空腳本，避免每個測試都對外
 * 連線 accounts.google.com。需要模擬 Google 登入的測試會在 onBeforeLoad 自行注入
 * 假的 window.google（見 loginByGoogle 指令），此空腳本不會覆蓋該注入。
 */
beforeEach(() => {
  cy.intercept('GET', 'https://accounts.google.com/gsi/client', {
    statusCode: 200,
    body: '',
    headers: { 'content-type': 'application/javascript' },
  });
});
