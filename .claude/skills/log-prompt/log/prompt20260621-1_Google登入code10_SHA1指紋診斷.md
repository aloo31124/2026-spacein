2026-06-21 16:09:28

## git commit
本次為純診斷與設定排查，未變更任何程式碼或專案檔案，故無對應 git commit。

修正動作落在 Firebase Console（新增 SHA-1 指紋），非 repo 內檔案異動。

## prompt 1
google 登入失敗 code 10

## prompt 1 response
- 判定 code 10 為 Google Sign-In 的 `DEVELOPER_ERROR`，屬設定問題（SHA-1 / OAuth Client / google-services.json 不一致），非程式碼 bug。
- 檢查 `frontend/android/app/google-services.json`：專案 `spacein-ec8ab`（project_number `328066296243`），Android OAuth client 註冊指紋 `1fee7acc...`。
- 檢查 `google-auth.service.ts` 與 `strings.xml`：Android 端 `server_client_id` = `328066296243-5opekodfa93rria1e8utcql4rkrbvktq`，與 google-services.json 同專案，OK。
- 發現 `release/` 內有 `deployment_cert.der`、`upload_certificate.pem`，研判有開 Google Play App Signing。
- 以 openssl 計算指紋比對：
  - Firebase 註冊 = 上傳金鑰 SHA-1 `1FEE7ACC...3D57C1B1` ✅
  - Play 部署憑證 SHA-1 `935C5BCF85436171D58924D3DFF2EB7ADE42D0BF` ❌ 未註冊
- 結論：Play 用部署憑證重簽 app，但 Firebase 只註冊上傳金鑰指紋，故商店版登入 code 10。
- 修正建議：將 `93:5C:5B:CF:...:DE:42:D0:BF` 加進 Firebase（含 SHA-256），重抓 google-services.json 重 build。
- 另指出 `google-auth.service.ts:38` 的 web `initialize` clientId 用到別專案 `587558372608-...`，非 code 10 主因但建議統一。

## prompt 2
93:5C:5B:CF:85:43:61:71:D5:89:24:D3:DF:F2:EB:7A:DE:42:D0:BF 從何而來

## prompt 2 response
- 說明該 SHA-1 來自 repo 內 `frontend/android/app/release/deployment_cert.der`。
- 計算指令：`openssl x509 -inform DER -in deployment_cert.der -noout -fingerprint -sha1`。
- 說明 `deployment_cert.der` = Play Console「應用程式簽署金鑰憑證」、`upload_certificate.pem` = 上傳金鑰憑證。
- 提供 Play Console 自行核對路徑：測試與發布 → 應用程式完整性 → 應用程式簽署金鑰憑證。

## prompt 3
還是失敗

## prompt 3 response
- 研判失敗主因為「測試的 build 簽署用 SHA-1 未註冊」，依測試方式不同所需指紋不同。
- 用 Android Studio JBR keytool 算出 debug.keystore 指紋：
  - SHA-1 `52:B7:B4:B8:17:71:22:E8:07:9C:2A:C3:3F:B3:53:53:0B:2E:D7:1A`（未註冊）
  - SHA-256 `7E:AA:E9:F2:...:8D:A1:71`
- 整理對照表：debug build → `52B7B4B8`（未註冊，本機測試 code 10 主因）；本機 release → `1FEE7ACC`（已註冊）；Play 商店 → `935C5BCF`（剛加的）。
- 建議將 debug 與 Play 兩把 SHA-1 一併加進 Firebase，提醒生效有 5 分鐘~數小時延遲、需重抓 google-services.json 並完全移除舊 app 重裝。
- 反問使用者實際是用哪種方式安裝 app，以鎖定該註冊哪一把。
