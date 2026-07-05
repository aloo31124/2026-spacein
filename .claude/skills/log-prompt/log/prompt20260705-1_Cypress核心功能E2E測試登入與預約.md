2026-07-05 11:51:56

## git commit
test(#E2E測試): 新增 Cypress 前端核心功能 E2E 測試（登入 / Google 驗證 / 預約 / 取消預約）
- 導入 Cypress 13：新增 cypress.config.ts、cypress/ 目錄（support、e2e、README）與 tsconfig
- 自訂指令 commands.ts：loginByEmail、loginByGoogle（onBeforeLoad 注入假 window.google + 假 JWT）、acceptDialog、dialogShouldContain
- login.cy.ts：登入成功 / 信箱空白 / 密碼空白 / 後端驗證失敗（4 項）
- google-auth.cy.ts：Google FedCM 第三方登入驗證（2 項）
- booking.cy.ts：完整座位預約流程（日期→時段→類型→選座位→送出）
- cancel-booking.cy.ts：已預約清單→選預約→取消借用→確認刪除
- 後端一律以 cy.intercept 模擬，不連真實後端或 Google 帳號
- 修正測試眉角：app-input 點擊需綁內層 .row 切換時段欄位；行事曆日期正則容忍前後空白
- package.json 新增 cy:open / cy:run / e2e 腳本與 devDependency；.gitignore 忽略 videos/screenshots
- 新增 .github/skills/cypress-e2e/SKILL.md 並註冊進 SKILLS_INDEX.md
- 實測全數通過：8 tests / 4 specs（含登入 4、Google 2、預約 1、取消 1）
- 註記：VS Code 終端機的 ELECTRON_RUN_AS_NODE 需以 env -u 移除，Cypress Electron 方能啟動

## prompt 1
撰寫 cypress 功能，對 核心功能測試，包含 登入 與 google 驗證，已經 預約流程還有取消預約。

## prompt 1 response
- 先完整盤點前端（Angular 17）：路由 `app-routing.module.ts`、登入頁與 `GoogleAuthService`（Web FedCM / One Tap）、`RegisterService` 登入 API、`AuthGuardService`、預約四頁（date→clock→select-type→check-form）與服務、預約審視（calendar / form）取消流程、共用元件（calendar-picker、dialog、img-btn、input）、`DialogService`（覆寫 window.alert 成自訂 `.app-dialog`）、各 model 欄位與 environment。
- 關鍵設計決策：
  - 後端與 Google OAuth 全部以 `cy.intercept` 模擬，測試不連真實服務、可穩定重跑。
  - Google 驗證：`cy.visit` 的 `onBeforeLoad` 注入假 `window.google.accounts.id`，`prompt()` 回拋可被 `parseJwt` 解析的假 JWT（含 name、email）；並全域攔截 GSI 腳本回空，避免對外連線且不覆蓋注入。
  - 自訂彈窗：封裝 `cy.acceptDialog()` / `cy.dialogShouldContain()` 以 DOM 操作 `.app-dialog`；快閃訊息遮罩期間互動一律 `{ force: true }`。
- 產出檔案：`cypress.config.ts`、`cypress/tsconfig.json`、`support/e2e.ts`（忽略第三方 uncaught 例外 + 全域攔截 GSI）、`support/commands.ts`（loginByEmail、loginByGoogle、acceptDialog、dialogShouldContain、假 JWT 組裝）、`support/index.d.ts`；四支 spec `login`／`google-auth`／`booking`／`cancel-booking`；`cypress/README.md`。
- 更新 `package.json`（cypress、start-server-and-test、@types/node 與 cy:open/cy:run/e2e 腳本）、`.gitignore`（videos/screenshots）。
- 安裝 Cypress 13.17 後 `tsc -p cypress/tsconfig.json --noEmit` 型別檢查通過（exit 0）。
- 依 git-commit 規範輸出可複製 commit 區塊。

## prompt 2
請啟動 cpyress 執行一次 登入 與 預約 的測試

## prompt 2 response
- 發現並解決環境阻礙：終端機設有 `ELECTRON_RUN_AS_NODE=1`，Cypress 的 Electron 被當純 Node 執行 → 報 `bad option: --no-sandbox`；改以 `env -u ELECTRON_RUN_AS_NODE` 執行後可正常啟動 Electron 118 headless。
- 啟動 `ng serve`（4200，Compiled successfully）後跑測試，首輪發現兩支失敗並用截圖定位：
  - 預約：畫面顯示 URL 仍在 `/booking-clock`、開始 10:00 / 結束 09:00 → 判定 `app-input` 的 `(click)` 綁在內層 `.row`，點 host 未切換到「結束時間」欄位，導致時刻套用到開始時間、start≥end 卡控擋下。修正為點 `cy.contains('app-input .row', '結束時間')` 並加 `should('contain','10:00')` 驗證。
  - 取消：行事曆日期格子文字前後含換行/空白，`^day$` 正則比對失敗 → 改為 `^\s*day\s*$`。
- 依使用者要求執行「登入 + 預約」：`login.cy.ts` 4/4、`booking.cy.ts` 1/1 通過；再合跑全部四支 spec **8/8 全數通過**（登入 4、Google 2、預約 1、取消 1）。
- 收尾：停止 dev server（4200 釋放）、清除失敗截圖、更新 SKILLS_INDEX 並新增 `cypress-e2e/SKILL.md`。

## prompt 3
/log-prompt

## prompt 3 response
- Glob 查詢當日 `prompt20260705-*.md` 無既有檔，流水號取 `1`。
- 依 log-prompt 格式寫出本檔 `.claude/skills/log-prompt/log/prompt20260705-1_Cypress核心功能E2E測試登入與預約.md`：含時間戳、git commit、逐字 prompt 與回復精要。
