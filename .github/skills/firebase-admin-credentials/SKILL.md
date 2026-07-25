---
name: Firebase Admin 憑證與登入連線
description: >
  修改或診斷後端 Firebase Admin、Firestore 初始化、服務帳戶金鑰、
  Application Default Credentials、登入 401 或資料庫連線錯誤時，必須參考此文件。
---

# Firebase Admin 憑證與登入連線

## 憑證選擇

- 本機開發時，`backend/src/firestroekey.json` 存在就優先使用
  `admin.credential.cert()`，確保查詢指定 Firebase 專案。
- 部署環境不應包含服務帳戶 JSON；找不到本機金鑰時，使用
  `admin.credential.applicationDefault()` 與執行服務帳戶。
- `FIREBASE_STORAGE_BUCKET` 僅負責 Storage bucket，不用來決定 Firestore 專案。
- 日誌只能記錄憑證來源與 `project_id`，不得輸出私鑰、完整憑證或存取權杖。
- 登入日誌只記錄必要的識別資訊，不得記錄密碼、完整 request body 或 JWT。

## 安全規則

服務帳戶私鑰可直接存取雲端資源，一旦進入 Git 歷史或 Docker 映像便難以回收。
因此金鑰檔必須同時由 `backend/.gitignore` 與 `backend/.dockerignore` 排除；
若曾誤提交，需撤銷並重新建立該服務帳戶金鑰。

## 登入錯誤語意

- Firestore 查詢成功但查無使用者，或密碼不符，才回傳 401 與帳密錯誤。
- 憑證無效、權限不足、網路或 Firestore 查詢例外屬服務端錯誤，應保留例外傳遞，
  由 controller 回傳 500，不可轉成 `null` 後誤報為帳密錯誤。
- 帳密登入 API 的識別欄位是 `email`；建立 JWT 時應使用相同欄位查找使用者，
  避免讀取請求中不存在的 `account` 而產生空 token。

## 驗證

完成調整後至少確認：

1. `node --check src/firestore.js` 與登入相關檔案通過。
2. 載入 `src/firestore.js` 後，可對 `User` collection 執行唯讀查詢。
3. 啟動日誌顯示本機使用的 `project_id`，但不含任何私密欄位。
4. 模擬 Firestore 查詢失敗時，登入 API 回傳 500；真正帳密不符時維持 401。
