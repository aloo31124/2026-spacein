# space-in-server-v2

space in [空間預約]
* 後端以 node.js express 建立 server api v2
* 替換 雲函式 v1

## Firebase Admin 憑證

專案不保存 Google Cloud 服務帳戶 JSON。Firebase Admin 使用 Application Default Credentials：

- Cloud Run：將 Firestore 與 Storage 權限授予服務的執行服務帳戶，不需掛載金鑰檔。
- 本機開發：將金鑰存放在版本庫外，並設定 `GOOGLE_APPLICATION_CREDENTIALS` 為該檔案的絕對路徑。
- 若使用 Storage，設定 `FIREBASE_STORAGE_BUCKET`（例如 `專案識別碼.appspot.com`）。

PowerShell 範例：

```powershell
$env:GOOGLE_APPLICATION_CREDENTIALS = 'C:\安全路徑\service-account.json'
$env:FIREBASE_STORAGE_BUCKET = '專案識別碼.appspot.com'
npm start
```

服務帳戶 JSON、`.env` 與任何私密金鑰都不得提交至 Git，亦不得複製進 Docker 映像。


