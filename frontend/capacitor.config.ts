import { CapacitorConfig } from '@capacitor/cli';
// OAuth client id 統一集中於 environment（src/environments/environment.ts）
import { environment } from './src/environments/environment';

const config: CapacitorConfig = {
  appId: 'com.spacein',
  appName: 'space-in',
  webDir: 'dist/space-in',
  plugins: {
    GoogleAuth: {
      scopes: ['profile', 'email'],
      // iOS 專用 client id; 不可改用共用鍵 clientId, 否則 Android 會誤用 iOS client
      // (Android 端優先序: androidClientId → clientId → strings.xml 的 server_client_id)
      iosClientId: environment.googleOAuth.iosClientId,
      // serverClientId 必須與原生 client 同專案, 否則 Google 回傳 invalid_audience
      serverClientId: environment.googleOAuth.nativeServerClientId,
      forceCodeForRefreshToken: true,
    },
    SplashScreen: {
      launchShowDuration: 2000,
      launchAutoHide: true,
      backgroundColor: '#ffffff',
      androidSplashResourceName: 'splash',
      showSpinner: false,
    },
  },
  android: {
    // allowMixedContent: false (預設，正式環境維持 https)
    captureInput: true,
    webContentsDebuggingEnabled: false, // 正式版關閉，開發時可設為 true
  },
};

export default config;
