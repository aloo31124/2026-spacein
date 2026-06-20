2026-06-20 11:05:00

## git commit
[feature] #? [登入] 密碼欄位新增顯示/隱藏切換 icon，並讓 web 與手機 (android/ios) 記憶登入信箱。

- `login-page.component.html`：密碼 input 改用 `.password-field` 包裝，`type` 依 `showPassword` 在 text/password 間切換，右側新增 inline SVG 眼睛切換鈕（含 aria-label/title 無障礙標籤，以 *ngIf 切換 eye / eye-off 兩態）。
- `login-page.component.ts`：新增 `showPassword` 狀態與 `togglePassword()`；引入 `@capacitor/preferences`，`ngOnInit` 自動帶入上次記憶信箱，登入驗證成功時以 key `rememberedEmail` 儲存。
- `login-page.component.scss`：新增 `.password-field` 與 `.toggle-password` 樣式，覆蓋既有 `.container button` 紫底圓角為透明無邊框，input 加 padding-right 避免文字被 icon 蓋住。
- 原因：採用專案既有 `@capacitor/preferences`（web 走 localStorage、原生走 android/ios 儲存），一份程式碼即可跨平台記憶信箱；眼睛圖示改用 inline SVG，免新增圖檔且可隨字色縮放。
- 已通過 `ng build` AOT 模板與型別驗證（exit 0）。
- 檔號待補：請將 `#?` 換成實際工單編號。

異動檔案：
- frontend/src/app/auth-route/components/login-page/login-page.component.html
- frontend/src/app/auth-route/components/login-page/login-page.component.ts
- frontend/src/app/auth-route/components/login-page/login-page.component.scss

## prompt 1
登入頁密碼輸入可隱藏密碼 icon，
並且 網頁 與 手機 android , ios 可記憶 帳號信箱

## prompt 1 response
- 探查結構：確認登入頁為 Angular 17（`login-page` 元件，宣告於 `app.module.ts`，已 import BrowserModule/FormsModule，`*ngIf` 可用）；專案已安裝並在 `google-auth.service.ts` 使用 `@capacitor/preferences`，決定沿用此既有慣例做跨平台儲存。
- 密碼顯示/隱藏：因專案無現成眼睛圖檔，改用 inline SVG（Feather eye / eye-off），避免新增二進位資產且可隨字色縮放。HTML 將密碼 input 包進 `.password-field`，`type` 由 `showPassword ? 'text' : 'password'` 切換，右側放 `type="button"` 切換鈕（含 aria-label/title），以 *ngIf 切換兩個 SVG。
- TS：新增 `showPassword` 與 `togglePassword()`。
- 記憶信箱：引入 `Preferences`，定義 key `rememberedEmail`；`ngOnInit` 呼叫 `loadRememberedEmail()`（含 try/catch 防呆）自動帶入上次信箱，登入「驗證成功」時才 `Preferences.set` 寫入（避免記住打錯的信箱）。`Preferences` 在 web fallback localStorage、原生走 android/ios 儲存，一份程式碼三平台通用。
- SCSS：新增 `.password-field`（relative + inline-flex）與 `.toggle-password`（絕對定位於右側、覆蓋 `.container button` 紫底圓角為透明無邊框、hover 變紫），input 加 `padding-right: 48px` 避免文字被 icon 蓋住。
- 驗證：`ng build` AOT 通過（exit 0），僅既有 `justify-content: start` 警告與本次無關。
- 確認 Skills 索引無對應登入/Angular auth 文檔，故未更新 SKILL.md；最後依規範輸出可複製的 git commit 區塊。

## prompt 2
/log-prompt

## prompt 2 response
- Glob 查得今日已有流水號 1、2 兩份 log，遞增為 3。
- 參照既有範本格式，寫出本檔 `prompt20260620-3_登入密碼顯示隱藏icon與跨平台記憶信箱.md`，含時間戳、git commit、prompt 逐字與 response 精要。
