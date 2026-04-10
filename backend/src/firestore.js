var admin = require("firebase-admin");

var serviceAccount = require("./firestroekey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  //storageBucket: "gs://newshop-e45ca.firebasestorage.app" // 你的 Firebase Storage Bucket
});

const db = admin.firestore();
module.exports = db;