2026-07-05 16:29:55

## git commit
[fix] # [部署]前端 Dockerfile 改以 sed 僅替換 domain，修正整份覆寫 environment.prod.ts 致 googleOAuth 遺失、Cloud Build 建置失敗。
- `frontend/Dockerfile`：建置階段原以 `printf` 整份重寫 `src/environments/environment.prod.ts`（僅含 production/domain），改為 `sed` 只替換 `domain` 欄位值，保留其餘設定。
- 原因：`google-auth.service.ts` 引用 `environment.googleOAuth`，前後端分層重構（b0b18a9）保留該區塊，但 Dockerfile 覆寫使其消失，`ng build` 報 TS2339 導致 Cloud Build step 4 失敗。
- 驗證：本機以實際 `environment.prod.ts` 測試 sed 替換，domain 正確注入且 googleOAuth 完整保留；重新執行 `gcloud builds submit` 建置成功（3 分 37 秒，SUCCESS）。
- 註記：檔號 `#?` 為暫填，待補上實際工單編號。

## prompt 1
lou@loudeMacBook-Pro 2026-spacein % gcloud builds submit --config cloudbuild.yaml
Creating temporary archive of 373 file(s) totalling 1.9 MiB before compression.
Uploading tarball of [.] to [gs://spacein-493210_cloudbuild/source/1783234638.972593-8377a9c3d47345d0aedb7f537cdb3bd2.tgz]
Created [https://cloudbuild.googleapis.com/v1/projects/spacein-493210/locations/global/builds/b8d3c580-2b88-4894-910b-5d04dadd960b].
Logs are available at [ https://console.cloud.google.com/cloud-build/builds/b8d3c580-2b88-4894-910b-5d04dadd960b?project=1025423218880 ].

gcloud builds submit only displays logs from Cloud Storage. To view logs from Cloud Logging, run:
gcloud beta builds submit

Waiting for build to complete. Polling interval: 1 second(s).

BUILD FAILURE: Build step failure: build step 4 "gcr.io/cloud-builders/docker" failed: step exited with non-zero status: 1
ERROR: (gcloud.builds.submit) build b8d3c580-2b88-4894-910b-5d04dadd960b completed with status "FAILURE"

## prompt 1 response
- 以 `gcloud builds log` 撈取失敗建置 log，定位 step 4（`build-client` 前端 image 建置）於 `ng build --configuration production` 報 `TS2339: Property 'googleOAuth' does not exist`（`google-auth.service.ts` 兩處引用）。
- 根因：`frontend/Dockerfile` 建置時以 `printf` 整份重寫 `src/environments/environment.prod.ts`，只寫入 `production` 與 `domain` 兩欄位；前後端分層重構（commit b0b18a9）特意保留的 `googleOAuth` 區塊因此被蓋掉，TypeScript 編譯失敗。
- 修正：Dockerfile 改為 `sed -i "s|domain: '[^']*'|domain: '${BACKEND_URL}'|"` 只替換 domain 值，保留檔案其餘內容（googleOAuth 與未來新增欄位皆不受影響）。
- 驗證：本機複製實際 `environment.prod.ts` 測試 sed 替換，domain 正確換成 Cloud Run 後端 URL、googleOAuth 完整保留；重新執行 `gcloud builds submit`，建置 3 分 37 秒 SUCCESS（build ID c2317d08）。
- 部署結果：後端 https://spacein-server-lzctfrr6yq-de.a.run.app 、前端 https://spacein-client-lzctfrr6yq-de.a.run.app 皆上線；建議開啟前端實測 Google 登入（本次動到 OAuth 設定注入方式）。

## prompt 2
/log-prompt

## prompt 2 response
- Glob 查詢當日 `prompt20260705-*.md`，已有 3 篇（Cypress E2E 測試、方案續約導向、拔除 Firebase 直連），流水號取 4。
- 依 log-prompt 格式寫出本檔 `.claude/skills/log-prompt/log/prompt20260705-4_CloudBuild前端建置失敗googleOAuth遺失修正.md`：含時間戳、（尚未提交之）git commit 建議訊息、逐字 prompt 與回復精要。
