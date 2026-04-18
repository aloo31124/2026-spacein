import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.spacein',
  appName: 'space-in',
  webDir: 'dist/space-in',
  plugins: {
    GoogleAuth: {
      scopes: ['profile', 'email'],
      serverClientId: '328066296243-5opekodfa93rria1e8utcql4rkrbvktq.apps.googleusercontent.com',
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
