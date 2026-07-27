2026-06-20 07:45:02

## git commit
[feature] [登入] 帳密與 Google OAuth 登入新增 loading 等待畫面，並修正登入失敗與忘記密碼信箱不存在的錯誤處理。
- 複用既有 `app-loading-basic` 元件，於登入頁帳密登入、Google OAuth 登入等待後端期間顯示全螢幕 loading 遮罩（同時防止重複送出）。
- Google 登入流程驗證邏輯在 `GoogleAuthService` 內，新增 `loading$`（BehaviorSubject）對外提供等待狀態，登入頁訂閱同步顯示；特意不在 One Tap 跳窗期間顯示遮罩，避免蓋住 Google 選帳號 UI。
- 忘記密碼、註冊信箱送出頁面補上同一個 loading 等待畫面。
- [fix] 修正帳密登入「成功時也誤跳 res.message」問題，改為僅在失敗時顯示後端回傳錯誤訊息（res.message / error.error.message）。
- [fix] 修正忘記密碼信箱不存在時缺少 catchError，導致 isLoading 卡在 true 且不顯示錯誤訊息的問題。
- 通過 `tsc --noEmit` 型別檢查與 `ng build` AOT 模板驗證（exit 0）。

異動檔案：
- frontend/src/app/auth-route/services/google-auth.service.ts
- frontend/src/app/auth-route/components/login-page/login-page.component.ts
- frontend/src/app/auth-route/components/login-page/login-page.component.html
- frontend/src/app/auth-route/components/forget-password-mail/forget-password-mail.component.ts
- frontend/src/app/auth-route/components/forget-password-mail/forget-password-mail.component.html
- frontend/src/app/auth-route/components/register-info/register-info.component.html

## prompt 1
登入畫面中 帳密登入 與 google OAuth 登入後，需有 loading 等待畫面。
若登入失敗，需 response 顯示錯誤訊息。

忘記密碼，或 註冊 時，輸入信箱之 等待也需一樣的 loading 等待畫面。

## prompt 1 response
- 探查既有結構：確認專案為 Angular，已存在共用 `app-loading-basic` 元件（`isLoading` Input、全域宣告於 AppModule、以 position:fixed 全螢幕遮罩呈現），決定複用而非新建。
- 登入頁帳密登入（`login-page.component.ts`）：點擊登入時 `isLoading = true`，改用 `subscribe({ next, error })`，成功導頁／失敗／例外皆關閉 loading；並修正原本「成功也跳 res.message」的 bug，改為僅失敗時顯示後端錯誤訊息。
- Google OAuth 登入（`google-auth.service.ts`）：新增 `loading$`（BehaviorSubject）與 `setLoading()`，於取得憑證後開始呼叫後端時開啟、在 checkLogin／首次註冊／各錯誤分支關閉；登入頁 `ngOnInit` 訂閱 `loading$`、`ngOnDestroy` 取消訂閱。Cap 與 FedCM 兩條路徑都補上 try/catch 與 error 分支顯示錯誤訊息。
- 忘記密碼（`forget-password-mail`）：模板補上 `app-loading-basic`；並修正 ts 缺少 `catchError` 造成「信箱不存在時 loading 卡住且不顯示錯誤」的 bug，比照 register-info 加上 catchError 關閉 loading 並 alert。
- 註冊信箱頁（`register-info`）：ts 原已正確處理 isLoading，僅模板補上 `app-loading-basic`。
- 驗證：`tsc --noEmit -p tsconfig.app.json` 通過；`ng build --configuration development` 通過（exit 0，僅既有 SCSS autoprefixer 警告，與本次無關）。
- 文件：檢視 `.github/skills/SKILLS_INDEX.md`，現有 Skills（Vue/Formio/iframe/Web Component/skill 設計）皆不涵蓋本次 Angular 登入 loading 與錯誤處理，故無對應文件需更新。
