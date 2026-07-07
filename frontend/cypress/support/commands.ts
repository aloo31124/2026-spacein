/// <reference types="cypress" />

/**
 * 本檔集中定義 E2E 測試共用的自訂指令與測試資料。
 *
 * 設計重點：
 * 1. 應用程式將 window.alert / confirm 覆寫為 app.component.html 內的自訂彈窗
 *    （.app-dialog-container），因此測試以 DOM 操作彈窗，而非 Cypress 內建的
 *    window:alert 攔截。
 * 2. 登入頁 / 成功登入等「快閃訊息」會蓋上遮罩約 1.6 秒，故互動一律加 { force: true }
 *    以略過遮罩覆蓋檢查。
 * 3. 所有後端 API 皆由各指令 / spec 以 cy.intercept 攔截，測試不依賴真實後端。
 */

/** 預設測試使用者（登入後由 findUser 回傳並存入 GoogleAuthService.currentUser） */
export const TEST_USER = {
  id: 'user-123',
  name: '測試使用者',
  email: 'test@example.com',
};

/** 將字串以 base64url 編碼（供組裝假 JWT） */
function base64url(input: string): string {
  return btoa(input).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

/**
 * 組裝一組「可被 GoogleAuthService.parseJwt 解析」的假 Google 憑證（JWT）。
 * parseJwt 只取 payload（第二段）做 UTF-8 base64 解碼，故 header / signature 為佔位即可。
 */
export function fakeGoogleJwt(payload: Record<string, unknown>): string {
  const enc = (obj: unknown) =>
    base64url(unescape(encodeURIComponent(JSON.stringify(obj))));
  return `${enc({ alg: 'none', typ: 'JWT' })}.${enc(payload)}.signature`;
}

/**
 * 註冊「登入後首頁」所需的共用攔截：
 * - 使用者角色（決定首頁顯示哪些按鈕）。回傳 booker 角色即可顯示「預約空間 / 已預約」，
 *   且不會觸發 owner 的付款到期檢查。
 */
function stubHomeApis(user: typeof TEST_USER): void {
  cy.intercept('GET', '**/api/account/role/*', {
    statusCode: 200,
    body: { result: [{ userId: user.id, role: 'booker' }] },
  }).as('userRole');
}

// ---------------------------------------------------------------------------
// 自訂指令
// ---------------------------------------------------------------------------

/** 以「信箱 + 密碼」完成登入，並停在 /home */
Cypress.Commands.add('loginByEmail', (user = TEST_USER) => {
  cy.intercept('POST', '**/api/auth/login', {
    statusCode: 200,
    body: { isSuccess: true, message: '' },
  }).as('login');
  cy.intercept('GET', '**/api/auth/user/*', {
    statusCode: 200,
    body: { result: { user } },
  }).as('findUser');
  stubHomeApis(user);

  cy.visit('/');
  cy.get('input[placeholder="輸入信箱"]').clear({ force: true }).type(user.email, { force: true });
  cy.get('input[placeholder="密碼"]').clear({ force: true }).type('pw123456', { force: true });
  cy.contains('button', '登入').click({ force: true });

  cy.wait('@login');
  cy.wait('@findUser');
  cy.location('pathname', { timeout: 15000 }).should('eq', '/home');
});

/** 以「Google 第三方（網頁 FedCM / One Tap）」完成登入，並停在 /home */
Cypress.Commands.add('loginByGoogle', (user = TEST_USER) => {
  // 攔截並使真實 GSI SDK 失效，改由 onBeforeLoad 注入的假 window.google 接手
  cy.intercept('GET', 'https://accounts.google.com/gsi/client', {
    statusCode: 200,
    body: '',
    headers: { 'content-type': 'application/javascript' },
  });
  cy.intercept('GET', '**/api/auth/user/*', {
    statusCode: 200,
    body: { result: { user } },
  }).as('findUser');
  stubHomeApis(user);

  const jwt = fakeGoogleJwt({ name: user.name, email: user.email });

  cy.visit('/', {
    onBeforeLoad(win) {
      // 假 Google Identity Services：initialize 記下 callback，prompt 時回拋假憑證
      (win as any).google = {
        accounts: {
          id: {
            initialize: (config: any) => {
              (win as any).__googleCallback = config.callback;
            },
            prompt: () => {
              const cb = (win as any).__googleCallback;
              if (cb) {
                cb({ credential: jwt });
              }
            },
            renderButton: () => undefined,
            disableAutoSelect: () => undefined,
          },
        },
      };
    },
  });

  // 登入頁唯一的 app-img-btn 即為「使用 Google 登入」按鈕
  cy.get('app-img-btn').first().click({ force: true });

  cy.wait('@findUser');
  cy.location('pathname', { timeout: 15000 }).should('eq', '/home');
});

/** 驗證目前彈窗訊息包含指定文字 */
Cypress.Commands.add('dialogShouldContain', (text: string) => {
  cy.get('.app-dialog-message', { timeout: 10000 }).should('contain', text);
});

/** 點擊自訂彈窗的「確定」按鈕（alert 的確定 / confirm 的確定，皆非取消鍵） */
Cypress.Commands.add('acceptDialog', () => {
  cy.get('.app-dialog-container', { timeout: 10000 }).should('be.visible');
  cy.get('.app-dialog-container .app-dialog-btn')
    .not('.app-dialog-btn-cancel')
    .first()
    .click({ force: true });
});

export {};
