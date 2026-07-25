# space-in-server-v2

space in [空間預約]
* 後端以 node.js express 建立 server api v2
* 替換 雲函式 v1

## Firebase Admin 憑證

Firebase Admin 會依執行環境選擇憑證：

- Cloud Run：將 Firestore 與 Storage 權限授予服務的執行服務帳戶，不需掛載金鑰檔。
- 本機開發：`src/firestroekey.json` 存在時會優先載入該服務帳戶金鑰。
- 本機未提供上述檔案時：回退使用 Application Default Credentials，可設定 `GOOGLE_APPLICATION_CREDENTIALS` 為版本庫外金鑰的絕對路徑。
- 若使用 Storage，設定 `FIREBASE_STORAGE_BUCKET`（例如 `專案識別碼.appspot.com`）。

PowerShell 範例：

```powershell
$env:FIREBASE_STORAGE_BUCKET = '專案識別碼.appspot.com'
npm start
```

`src/firestroekey.json` 已由 `.gitignore` 與 `.dockerignore` 排除。服務帳戶 JSON、`.env`
與任何私密金鑰都不得提交至 Git，亦不得複製進 Docker 映像。


