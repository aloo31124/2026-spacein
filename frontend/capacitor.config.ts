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
      serverClientId: environment.googleOAuth.webClientId,
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
