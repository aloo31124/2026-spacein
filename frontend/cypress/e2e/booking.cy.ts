/// <reference types="cypress" />

/**
 * 核心功能測試：預約流程（座位預約）
 *
 * 完整走過：首頁 →（選擇日期）→（選擇時段）→（選擇類型）→（確認表單、選座位、送出）
 * 各後端 API 皆以 cy.intercept 模擬：
 * - GET  /api/booking/roomtosite/all               取得所有座位
 * - GET  /api/booking/roomtosite/:date/:start/:end 取得該時段教室座位（含是否被預約）
 * - GET  /api/booking/room/userId/:userId          取得教室清單
 * - POST /api/booking/add                          送出預約
 */
describe('核心功能：預約流程（座位預約）', () => {
  const rooms = [
    { id: 'room-1', name: '教室A', ownerId: 'user-123', ownerMail: 'test@example.com' },
  ];
  // 注意：RoomSiteIsBooking 以欄位 name 對應座位名稱（siteName）
  const roomSites = [
    { id: 'site-1', roomId: 'room-1', name: '座位1', roomName: '教室A', isBooking: false },
  ];
  const sites = [{ id: 'site-1', name: '座位1', roomId: 'room-1' }];

  beforeEach(() => {
    cy.intercept('GET', '**/api/booking/roomtosite/all', { statusCode: 200, body: sites }).as('allSites');
    cy.intercept('GET', '**/api/booking/roomtosite/*/*/*', { statusCode: 200, body: roomSites }).as('roomSites');
    cy.intercept('GET', '**/api/booking/room/userId/*', { statusCode: 200, body: rooms }).as('rooms');
    cy.intercept('POST', '**/api/booking/add', { statusCode: 200, body: {} }).as('addBooking');
  });

  it('可完成一筆座位預約並回到首頁', () => {
    cy.loginByEmail();

    // 首頁 → 預約空間（行事曆會自動 emit 今日日期）
    cy.contains('預約空間').click({ force: true });
    cy.location('pathname').should('eq', '/booking-date');
    cy.get('.next-btn').click({ force: true });
    cy.acceptDialog(); // 「確定下一步？選擇日期為: ...」

    // 選擇時段頁：預設開始 09:00，將結束時間設為 10:00
    // 注意：app-input 的 (click) 綁在內層 .row，需點 .row 才會切換到「結束時間」欄位
    cy.location('pathname').should('eq', '/booking-clock');
    cy.contains('app-input .row', '結束時間').click({ force: true });
    cy.contains('.clock i', '10').click({ force: true });
    // 確認結束時間確實更新為 10:00（晚於預設開始 09:00，才能通過時段卡控）
    cy.contains('app-input', '結束時間').should('contain', '10:00');
    cy.get('.next-btn').click({ force: true });
    cy.acceptDialog(); // 「選擇時段: 09:00~10:00」

    // 選擇預約類型 → 座位預約
    cy.location('pathname').should('eq', '/booking-select-type');
    cy.contains('座位預約').click({ force: true });

    // 確認表單頁：等待教室 / 座位資料載入
    cy.location('pathname').should('eq', '/booking-check-form');
    cy.wait(['@roomSites', '@rooms', '@allSites']);

    // 選擇座位（教室已預設為第一筆教室A）
    cy.contains('.select-item', '請選擇座位').click({ force: true });
    cy.get('.dialog').filter(':visible').within(() => {
      cy.contains('.row', '座位1').click();
      cy.get('.img-next').click();
    });

    // 送出預約：送出前會再次確認座位是否被搶
    cy.get('img[src*="icon_submit"]').click({ force: true });
    cy.wait('@roomSites');
    cy.wait('@addBooking');

    cy.dialogShouldContain('送出成功');
    cy.acceptDialog();
    cy.location('pathname').should('eq', '/home');
  });
});
