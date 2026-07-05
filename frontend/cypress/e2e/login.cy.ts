/// <reference types="cypress" />

/**
 * 核心功能測試：登入（信箱 / 密碼）
 *
 * 覆蓋範圍：
 * - 正常登入成功並導向首頁
 * - 前端欄位卡控（信箱 / 密碼空白）
 * - 後端驗證失敗時的錯誤提示
 *
 * 後端 /api/auth/login 與 /api/auth/user/:email 皆以 cy.intercept 模擬。
 */
describe('核心功能：登入（信箱 / 密碼）', () => {
  it('輸入正確帳密可登入並導向首頁', () => {
    cy.loginByEmail();

    cy.location('pathname').should('eq', '/home');
    cy.contains('預約空間').should('be.visible');
    cy.contains('已預約').should('be.visible');
  });

  it('信箱空白時阻擋登入並提示「信箱不可空白」', () => {
    cy.visit('/');
    cy.get('input[placeholder="密碼"]').type('pw123456', { force: true });
    cy.contains('button', '登入').click({ force: true });

    cy.dialogShouldContain('信箱不可空白');
    cy.location('pathname').should('eq', '/');
  });

  it('密碼空白時阻擋登入並提示「密碼不可空白」', () => {
    cy.visit('/');
    cy.get('input[placeholder="輸入信箱"]').type('test@example.com', { force: true });
    cy.contains('button', '登入').click({ force: true });

    cy.dialogShouldContain('密碼不可空白');
    cy.location('pathname').should('eq', '/');
  });

  it('後端驗證失敗時顯示錯誤訊息且停留於登入頁', () => {
    cy.intercept('POST', '**/api/auth/login', {
      statusCode: 200,
      body: { isSuccess: false, message: '帳號或密碼錯誤' },
    }).as('login');

    cy.visit('/');
    cy.get('input[placeholder="輸入信箱"]').type('test@example.com', { force: true });
    cy.get('input[placeholder="密碼"]').type('wrong-password', { force: true });
    cy.contains('button', '登入').click({ force: true });

    cy.wait('@login');
    cy.dialogShouldContain('帳號或密碼錯誤');
    cy.location('pathname').should('eq', '/');
  });
});
