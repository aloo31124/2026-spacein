export const environment = {
  production: true,
  domain: 'https://api-2qiy7ro3ea-uc.a.run.app',

  // Firebase / Firestore 一律由後端存取, 設定集中於 backend/src/firestore.js

  // Google OAuth 2.0 Client ID 設定
  googleOAuth: {
    // Capacitor GoogleAuth 外掛初始化 (GoogleAuth.initialize) 使用
    initClientId: '587558372608-jnei0k5eh8japakn4hs4kok2mld4m0qj.apps.googleusercontent.com',
    // 網頁 FedCM 登入與原生 serverClientId 使用（specein）
    webClientId: '1025423218880-ae9p8055o7jllcfja72jfd1smipdlf35.apps.googleusercontent.com',
  },
};
