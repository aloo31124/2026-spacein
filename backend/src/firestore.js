/*
 * Firebase / Firestore 存取集中於後端, 前端一律透過 API 請求, 不得直連。
 * 連線憑證使用 Google Application Default Credentials：
 * - Cloud Run 使用執行服務帳戶。
 * - 本機以 GOOGLE_APPLICATION_CREDENTIALS 指向版本庫外的金鑰檔。
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

const firebaseOptions = {
  credential: admin.credential.applicationDefault(),
};

if (process.env.FIREBASE_STORAGE_BUCKET) {
  firebaseOptions.storageBucket = process.env.FIREBASE_STORAGE_BUCKET;
}

const firebaseApp = admin.apps.length
  ? admin.app()
  : admin.initializeApp(firebaseOptions);

const db = firebaseApp.firestore();
module.exports = db;
