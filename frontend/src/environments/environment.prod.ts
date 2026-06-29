export const environment = {
  production: true,
  domain: 'https://api-2qiy7ro3ea-uc.a.run.app',

  // Firebase / Firestore 設定（spacein-ec8ab 專案）
  firebase: {
    projectId: 'spacein-ec8ab',
    appId: '1:328066296243:web:b1897c1201a0f9b55843c6',
    storageBucket: 'spacein-ec8ab.appspot.com',
    apiKey: '***REMOVED***',
    authDomain: 'spacein-ec8ab.firebaseapp.com',
    messagingSenderId: '328066296243',
    measurementId: 'G-54HYGJ7ZDQ',
  },

  // Google OAuth 2.0 Client ID 設定
  googleOAuth: {
    // Capacitor GoogleAuth 外掛初始化 (GoogleAuth.initialize) 使用
    initClientId: '587558372608-jnei0k5eh8japakn4hs4kok2mld4m0qj.apps.googleusercontent.com',
    // 網頁 FedCM 登入與原生 serverClientId 使用（specein）
    webClientId: '328066296243-5opekodfa93rria1e8utcql4rkrbvktq.apps.googleusercontent.com',
  },
};
