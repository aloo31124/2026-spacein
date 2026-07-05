/*
 * Firebase / Firestore 存取集中於後端, 前端一律透過 API 請求, 不得直連。
 * 連線憑證使用 service account (firestroekey.json), 專案: spacein-ec8ab。
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
var admin = require("firebase-admin");

var serviceAccount = require("./firestroekey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  //storageBucket: "gs://newshop-e45ca.firebasestorage.app" // 你的 Firebase Storage Bucket
});

const db = admin.firestore();
module.exports = db;