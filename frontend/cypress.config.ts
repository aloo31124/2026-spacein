import { defineConfig } from 'cypress';

/**
 * Cypress E2E 設定
 * - baseUrl 指向 `ng serve` 設定埠 4201（執行測試前請先 `npm start`）
 * - 所有後端 API 皆以 cy.intercept 攔截（見各 spec），故測試不需連線真實後端
 */
export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:4201',
    specPattern: 'cypress/e2e/**/*.cy.ts',
    supportFile: 'cypress/support/e2e.ts',
    fixturesFolder: 'cypress/fixtures',
    defaultCommandTimeout: 10000,
    video: false,
    screenshotOnRunFailure: true,
    viewportWidth: 414,
    viewportHeight: 896,
  },
});
