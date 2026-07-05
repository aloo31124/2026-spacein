import { TEST_USER } from './commands';

declare global {
  namespace Cypress {
    interface Chainable {
      /** 以「信箱 + 密碼」完成登入，並停在 /home */
      loginByEmail(user?: typeof TEST_USER): Chainable<void>;
      /** 以「Google 第三方登入」完成登入，並停在 /home */
      loginByGoogle(user?: typeof TEST_USER): Chainable<void>;
      /** 驗證目前自訂彈窗訊息包含指定文字 */
      dialogShouldContain(text: string): Chainable<void>;
      /** 點擊自訂彈窗的「確定」按鈕 */
      acceptDialog(): Chainable<void>;
    }
  }
}

export {};
