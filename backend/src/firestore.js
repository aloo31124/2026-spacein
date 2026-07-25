/*
 * Firebase / Firestore 存取集中於後端, 前端一律透過 API 請求, 不得直連。
 * 連線憑證依執行環境選擇：
 * - 本機若存在 src/firestroekey.json，優先使用該服務帳戶金鑰。
 * - 部署環境不包含本機金鑰，改用 Google Application Default Credentials。
 *
 * 原前端 web SDK 設定 (2026/07 自 frontend/src/environments/environment*.ts 移除, 備援紀錄):
 *   projectId: 'spacein-ec8ab'
 *   appId: '1:328066296243:web:b1897c1201a0f9b55843c6'
 *   storageBucket: 'spacein-ec8ab.appspot.com'
 *   apiKey: '***REMOVED***'
 *   authDomain: 'spacein-ec8ab.firebaseapp.com'
 *   messagingSenderId: '328066296243'
 *   measurementId: 'G-54HYGJ7ZDQ'
 */
const admin = require("firebase-admin");
const fs = require("fs");
const path = require("path");

const localServiceAccountPath = path.join(__dirname, "firestroekey.json");

const getCredential = () => {
  if (!fs.existsSync(localServiceAccountPath)) {
    console.info("[Firestore] 使用 Application Default Credentials");
    return admin.credential.applicationDefault();
  }

  const serviceAccount = require(localServiceAccountPath);
  console.info(
    `[Firestore] 使用本機服務帳戶憑證，project_id=${serviceAccount.project_id}`
  );
  return admin.credential.cert(serviceAccount);
};

const firebaseOptions = { credential: getCredential() };

if (process.env.FIREBASE_STORAGE_BUCKET) {
  firebaseOptions.storageBucket = process.env.FIREBASE_STORAGE_BUCKET;
}

const firebaseApp = admin.apps.length
  ? admin.app()
  : admin.initializeApp(firebaseOptions);

const db = firebaseApp.firestore();
module.exports = db;
