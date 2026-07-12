/// <reference types="cypress" />

/**
 * 核心功能測試：Google 第三方登入驗證（網頁 GIS 官方按鈕）
 *
 * 真實 Google OAuth 無法於自動化測試中完成，故：
 * - 於 onBeforeLoad 注入假的 window.google.accounts.id（見 loginByGoogle 指令），
 *   點擊 renderButton() 產生的按鈕時回拋一組可解析的假 JWT 憑證。
 * - 後端 findUser 以 cy.intercept 回傳既有使用者，模擬「已註冊帳號」直接登入成功。
 */
describe('核心功能：Google 第三方登入驗證', () => {
  it('關閉第一次帳號選擇後可再次點擊並登入既有帳號', () => {
    cy.loginByGoogle();

    cy.location('pathname').should('eq', '/home');
    cy.contains('預約空間').should('be.visible');
    cy.contains('已預約').should('be.visible');
  });

  it('可帶入不同 Google 使用者資訊完成登入', () => {
    const googleUser = {
      id: 'g-user-9',
      name: '谷歌測試員',
      email: 'gtester@example.com',
    };

    cy.loginByGoogle(googleUser);

    cy.location('pathname').should('eq', '/home');
    cy.contains('預約空間').should('be.visible');
  });
});
