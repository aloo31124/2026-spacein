---
name: Cloud Run 部署與前端 API domain
description: >
  修改 cloudbuild.yaml、frontend/Dockerfile、backend/Dockerfile，
  或診斷「部署後前端呼叫錯誤的 API domain / CORS 失敗 / 打到舊後端」時，必須參考此文件。
---

# Cloud Run 部署與前端 API domain

## 部署指令

```bash
# 前端 API domain 沿用 environment.prod.ts（預設、常用）
gcloud builds submit --config cloudbuild.yaml --project spacein-493210

# 需要讓前端改打本次部署的 spacein-server 時，才明確指定 _BACKEND_URL
gcloud builds submit --config cloudbuild.yaml --project spacein-493210 \
    --substitutions=_BACKEND_URL=https://spacein-server-xxxxxxxxxx-de.a.run.app
```

## 前端 API domain 的唯一來源

- 前端呼叫後端的網址來自 `environment.domain`；production 建置時 `angular.json` 的
  `fileReplacements` 會以 `environment.prod.ts` 取代 `environment.ts`，
  因此**正式環境只看 `frontend/src/environments/environment.prod.ts` 的 `domain`**。
- `frontend/Dockerfile` 的 `ARG BACKEND_URL` **預設必須留空**。留空時不執行 `sed`，
  沿用版控中的 `domain`；只有明確傳值時才覆寫。
- `cloudbuild.yaml` 的 `_BACKEND_URL` 預設為空字串，且**不得**改回自動帶入
  `gcloud run services describe` 查到的 Cloud Run URL。

## 硬性規範：不可自動覆寫 domain

曾發生的錯誤做法是在部署流程中查出剛部署好的 `spacein-server` URL，
再以 build arg 覆寫 `environment.prod.ts` 的 `domain`。
其後果是無論版控中設定哪個 API domain，部署出來的前端一律改打
`https://spacein-server-<hash>-de.a.run.app`，導致打到非預期的後端、
CORS 失敗，且 `backend/src/services/pay-ecpay.service.js` 中硬寫的
ECPay 回呼網址與前端實際 domain 不一致。

因此：**部署流程不得推測或自動決定前端的 API domain**，
要換後端時改 `environment.prod.ts` 並進版控，或臨時以 `_BACKEND_URL` 覆寫。

## Cloud Run URL 區域代碼

服務網址格式為 `<service>-<projectHash>-<regionCode>.a.run.app`：

- `-de` = `asia-east1`（本專案 `cloudbuild.yaml` 部署的區域）
- `-uc` = `us-central1`（舊 `api` 服務所在區域）

診斷「打到錯誤後端」時，可直接由區域代碼判斷前端指向的是哪一組服務。

## 驗證

完成調整後至少確認：

1. `cloudbuild.yaml` 中所有 `waitFor` 參照的 step id 都存在，且無殘留的
   `server_url.txt` 或 `get-server-url` 參照。
2. 未帶 `_BACKEND_URL` 建置時，Cloud Build log 出現
   「前端建置沿用 environment.prod.ts 既有 domain」，
   且緊接印出的 `environment.prod.ts` 內 `domain` 與版控一致。
3. 帶 `_BACKEND_URL` 建置時，log 出現「前端建置覆寫後端 URL: ...」且 `domain` 已替換。
4. 部署後於瀏覽器 DevTools Network 確認 API 請求的 host 與預期相符。
