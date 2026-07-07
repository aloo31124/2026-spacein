2026-07-05 14:18:24

## git commit
[reactor] #前後端分層 前端[Angular]拔除 Firebase/Firestore 直連,一律改走後端 API,Firebase 設定集中於後端。
- 刪除 `frontend/src/app/firebase-api/` 整目錄（`FireStoreService`、`CloudFunService`），及無人引用之 Firestore 直連死服務 `UserService`、`RoomSiteService`、`ReviewRoomTempService`。
- `review-room-overview.component` 移除 temp Firestore 直查「今日剩餘」，統一由後端 `/api/review/room/rate/today` 單一來源；`home.service` 移除無人呼叫之 `getAllRoom()`。
- `app.module.ts` 移除 `provideFirebaseApp`/`provideFirestore` 初始化；`environment*.ts` 移除 firebase 設定區塊（googleOAuth 保留）。
- `package.json` 移除 `@angular/fire`、`rxfire` 相依；原 web SDK 設定備援記錄於 `backend/src/firestore.js` 註解。
- 清理 `google-auth`/`booking`/`review-booking` 服務殘留之 Firestore 註解引用；刪除帳號功能留 TODO 待後端補 API。
- 原因：後端本已以 firebase-admin 集中存取 Firestore 且 API 齊備，前端直連屬雙軌過渡碼，統一走後端 API 使分層設計一致並縮減前端相依。
- 驗證：`tsc --noEmit` 0 錯誤、`ng build --configuration production` 成功、Cypress E2E 8/8 全數通過。
- 註記：檔號 `#前後端分層` 為暫填，待補實際工單編號。

## prompt 1
請將前端 Frontend 之 angular 中對 firebase 的直接存取都拔除，
改為 api 與後端請求，
且一並將 frontend/src/environments/environment.ts
中對 firebase 的請求都一率移至後端 backend，讓設計一致。

## prompt 1 response
- 盤點結果：後端本已以 firebase-admin + service account 集中存取 Firestore（`backend/src/firestore.js`）且 API 齊備；前端殘留的 Firestore 直連多為死代碼或與 API 雙軌並行的過渡碼，故以「刪除直連、統一走 `environment.domain` 後端 API」為原則，不需新增後端 API。
- 刪除 `frontend/src/app/firebase-api/` 整目錄（`FireStoreService`、`CloudFunService` 及 spec）：`CloudFunService` 消費者早已改走後端 API 只剩無用注入，其 cloud function 網址甚至指向 `localhost:8081`，正式環境本已失效。
- 刪除三個無任何存活引用的 Firestore 直連死服務：`UserService`（消費者 2025/04/23 已註解棄用）、`RoomSiteService`、`ReviewRoomTempService`（models 皆保留）。
- `review-room-overview.component` 移除 temp Firestore 直查「今日剩餘」（原 API 與直查兩邊同時跑互相覆蓋），統一由後端 `/api/review/room/rate/today` 單一來源；`home.service` 移除無人呼叫的 `getAllRoom()`。
- `app.module.ts` 移除 `provideFirebaseApp`/`provideFirestore` 初始化；`environment.ts`/`environment.prod.ts` 移除 firebase 設定區塊（`googleOAuth` 為 Google 登入所需，保留）；`package.json` 移除 `@angular/fire`、`rxfire`（縮減 99 個套件）。
- 原前端 web SDK 設定備援記錄於 `backend/src/firestore.js` 註解，明確標示「Firestore 一律由後端存取」設計原則。
- 驗證：`tsc --noEmit -p tsconfig.app.json` 0 錯誤、`ng build --configuration production` 成功（dist 產物還原，deploy 為獨立 commit）、Cypress E2E 8/8 通過（登入 4、Google 驗證 2、預約 1、取消預約 1）。
- 注意事項：`GoogleAuthService.deleteUserById()` 刪除帳號為既有空操作（2025/04/23 已停用直刪），後端無對應 API，已留 TODO 待補；spec 檔 chai/jasmine 型別衝突為導入 Cypress 時既有問題，與本次無關。

## prompt 2
/log-prompt

## prompt 2 response
- Glob 查詢當日 `prompt20260705-*.md`，已有 2 篇（Cypress E2E 測試、方案續約導向），流水號取 3。
- 依 log-prompt 格式寫出本檔 `.claude/skills/log-prompt/log/prompt20260705-3_前端拔除Firebase直連改走後端API.md`：含時間戳、（尚未提交之）git commit 建議訊息、逐字 prompt 與回復精要。
