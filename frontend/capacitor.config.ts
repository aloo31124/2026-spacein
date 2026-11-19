import { CapacitorConfig } from '@capacitor/cli';

// Google 原生登入改用 @capgo/capacitor-social-login（Capacitor 8 相容）。
// OAuth client id 仍統一集中於 environment，於 GoogleAuthService.initNativeGoogleLogin()
// 以 SocialLogin.initialize() 傳入，此處只設定要打包的登入提供者。
const config: CapacitorConfig = {
  appId: 'com.spacein',
  appName: 'space-in',
  webDir: 'dist/space-in',
  plugins: {
    SocialLogin: {
      providers: {
        google: true,
        facebook: false, // 不打包 Facebook SDK
        apple: false,    // 目前未提供 Apple 登入
        twitter: false,
      },
      logLevel: 1,
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
