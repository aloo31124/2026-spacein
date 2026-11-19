export const environment = {
  production: false,
  domain: 'https://api-2qiy7ro3ea-uc.a.run.app',

  // Firebase / Firestore 一律由後端存取, 設定集中於 backend/src/firestore.js

  // Google OAuth 2.0 Client ID 設定
  //
  // 【硬性規範】原生 (iOS/Android) 的 client 與 serverClientId 必須屬於「同一個 GCP 專案」,
  // 否則 Google 會回傳 invalid_audience (iOS 錯誤碼 -61440)。
  // 本專案原生端一律使用專案編號 328066296243。
  googleOAuth: {
    // 舊 codetrix GoogleAuth 外掛 (已移除) 使用; 目前程式未引用, 待 client id 對齊時一併清理
    initClientId: '587558372608-jnei0k5eh8japakn4hs4kok2mld4m0qj.apps.googleusercontent.com',
    // 網頁 FedCM 登入使用（specein）; 僅網頁端, 不可用於原生 serverClientId
    webClientId: '1025423218880-ae9p8055o7jllcfja72jfd1smipdlf35.apps.googleusercontent.com',
    // iOS OAuth Client ID（專案 328066296243, 對應 GoogleService-Info.plist 的 CLIENT_ID）
    iosClientId: '328066296243-tsktg9damg8qqdvdmb472rhsvam1oe8g.apps.googleusercontent.com',
    // 原生端 serverClientId, 須為「與原生 client 同專案」的 Web Client ID
    // (與 android/app/src/main/res/values/strings.xml 的 server_client_id 一致)
    nativeServerClientId: '328066296243-5opekodfa93rria1e8utcql4rkrbvktq.apps.googleusercontent.com',
  },
};
