/// <reference types="cypress" />

/**
 * 核心功能測試：取消預約
 *
 * 流程：首頁 → 已預約（行事曆）→ 點選當日日期 → 選擇該筆預約 → 取消頁 → 取消借用 → 確認刪除
 * 後端 API 以 cy.intercept 模擬：
 * - GET    /api/booking/all         取得使用者所有預約（依 mail 過濾）
 * - DELETE /api/booking/delete/:id  刪除（取消）預約
 *
 * 預約日期以「執行當日」動態產生，確保日期永遠有效且落在行事曆當月，避免因固定日期
 * 過期而無法點選。日期格式需與 calendar-picker 一致（year-month-day，月 / 日不補零）。
 */
describe('核心功能：取消預約', () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const day = today.getDate();
  const startDate = `${year}-${month}-${day}`;

  const booking = {
    id: 'booking-1',
    userId: 'user-123',
    mail: 'test@example.com',
    startDate,
    endDate: startDate,
    startTime: '09:00',
    endTime: '10:00',
    bookingType: 'site',
    roomId: 'room-1',
    roomName: '教室A',
    siteId: 'site-1',
    siteName: '座位1',
  };

  beforeEach(() => {
    cy.intercept('GET', '**/api/booking/all', { statusCode: 200, body: [booking] }).as('allBooking');
    cy.intercept('DELETE', '**/api/booking/delete/*', { statusCode: 200, body: {} }).as('deleteBooking');
  });

  it('可從已預約清單取消一筆預約', () => {
    cy.loginByEmail();

    // 首頁 → 已預約
    cy.contains('已預約').click({ force: true });
    cy.location('pathname').should('eq', '/review-booking-calendar');
    cy.wait('@allBooking');

    // 點選當日日期，開啟該日已預約時段彈窗
    // 注意：日期格子文字前後含換行 / 空白，故正則需容忍空白（避免 ^day$ 因空白比對失敗）
    cy.contains('.calendar-content .no-selected', new RegExp('^\\s*' + day + '\\s*$')).click({ force: true });
    cy.get('.dialog').filter(':visible').within(() => {
      cy.get('.dialog-content .row').first().click();
      cy.get('.img-next').click();
    });

    // 進入取消頁，點擊「取消借用」並於確認彈窗按「確定」
    cy.location('pathname').should('eq', '/review-booking-form');
    cy.contains('button', '取消借用').click({ force: true });
    cy.dialogShouldContain('確定取消借用');
    cy.acceptDialog();

    // 刪除成功，回到已預約行事曆
    cy.wait('@deleteBooking');
    cy.dialogShouldContain('成功刪除');
    cy.acceptDialog();
    cy.location('pathname').should('eq', '/review-booking-calendar');
  });
});
