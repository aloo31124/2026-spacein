import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Capacitor } from '@capacitor/core';
import { SocialLogin } from '@capgo/capacitor-social-login';
import { GoogleAuthUser } from '../models/google-auth-user.model';
import { RegisterService } from './register.service';
import { RouteUrlRecordService } from 'src/app/auth-route/services/route-url-record.service';
import { Preferences } from '@capacitor/preferences';
import { jwtDecode } from 'jwt-decode';  // 需要安裝 jwt-decode 套件
import { BehaviorSubject } from 'rxjs';
import { DialogService } from 'src/app/common/dialog/services/dialog.service';
import { environment } from 'src/environments/environment';

declare const google: any; // <- 補這行，因為是外部的 global 變數

@Injectable({
  providedIn: 'root'
})
export class GoogleAuthService {

  private isLoginIn = false;
  private currentUser!: GoogleAuthUser;

  // Google 登入流程的 loading 狀態, 供登入頁訂閱顯示等待畫面
  private loadingSubject = new BehaviorSubject<boolean>(false);
  loading$ = this.loadingSubject.asObservable();

  private setLoading(value: boolean) {
    this.loadingSubject.next(value);
  }

  constructor(
    private routeUrlRecordService: RouteUrlRecordService<{}>,
    private router: Router,
    private registerService: RegisterService,
    private dialogService: DialogService,
  ) { 
    this.initNativeGoogleLogin();
    this.checkToken();
    this.loadGoogleOneTapSDK();
  }

  /*
   * 初始化原生 Google 登入（@capgo/capacitor-social-login，僅 iOS / Android）
   * 網頁端改走 loginByGoogleWebFedCM，不需初始化外掛。
   * - webClientId：Android Credential Manager 與 token audience 使用，
   *   須與 android strings.xml 的 server_client_id 一致（environment.nativeServerClientId）
   * - iOSClientId：iOS 原生 client，須與 Info.plist URL Scheme、GoogleService-Info.plist 一致
   * - iOSServerClientId：沿用舊外掛 serverClientId，讓 iOS idToken audience 與 Android 相同
   */
  private nativeGoogleReady?: Promise<void>;

  private initNativeGoogleLogin() {
    if (!Capacitor.isNativePlatform()) {
      return;
    }
    this.nativeGoogleReady = SocialLogin.initialize({
      google: {
        webClientId: environment.googleOAuth.nativeServerClientId,
        iOSClientId: environment.googleOAuth.iosClientId,
        iOSServerClientId: environment.googleOAuth.nativeServerClientId,
        mode: 'online',
      },
    }).catch(err => {
      console.warn('SocialLogin initialize 失敗:', err);
    });
  }

  /*
   * 載入 Google OneTap SDK（僅限網頁端）
   * index.html 無 id，此處補 id 避免重複載入；原生 App 不需要 OneTap SDK
   */
  private loadGoogleOneTapSDK() {
    if (Capacitor.isNativePlatform()) {
      return;
    }
    const existingScript = document.getElementById('google-one-tap');
    if (!existingScript) {
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      script.id = 'google-one-tap';
      document.body.appendChild(script);
    }
  }


  isAuthenticated() {
    return this.isLoginIn;
  }

  getCurrentUser() {
    return this.currentUser;
  }

  /*
   * 登出 
   */
  logout() {
    if (Capacitor.isNativePlatform()) {
      SocialLogin.logout({ provider: 'google' }).catch(err => console.warn('Google 登出失敗:', err));
    }
    this.currentUser = new GoogleAuthUser({});
    this.isLoginIn = false;
    this.cleanToken();
    this.router.navigate(["/"]);
  }

  /*
   * google 第三方登入, 使用 Cap
   */
  async loginByGoogleCap() {
    // 點擊後立即顯示 loading, 涵蓋「帳號選擇 + 取得 token + 後端驗證」整個流程,
    // 避免選完帳號到後端驗證之間出現「無 loading」的空窗期
    this.setLoading(true);
    try {
      // 登入判斷 (彈出 Google 帳號選擇視窗)
      // 注意：Android 標準 BridgeActivity 不可傳 scopes（email/profile 已為預設），否則會被外掛拒絕
      await this.nativeGoogleReady;
      const { result } = await SocialLogin.login({ provider: 'google', options: {} });
      if (result.responseType !== 'online') {
        throw new Error('Google 登入模式錯誤, 未取得使用者資料');
      }
      const profile = result.profile;
      // 欄位對應舊外掛 (codetrix GoogleAuth.signIn) 的 User 結構, 後續註冊 / 登入流程不需變動
      const user: any = {
        email: profile.email,
        name: profile.name,
        familyName: profile.familyName,
        givenName: profile.givenName,
        imageUrl: profile.imageUrl,
        googleUserId: profile.id,
        authentication: {
          idToken: result.idToken,
          accessToken: result.accessToken?.token ?? '',
        },
      };
      if(user["email"]) {
        this.registerService
          .findUser(user["email"])
          .subscribe({
            next: res => {
              if(!res.result.user) {
                this.registerUserForFirstLogin(user);
              } else {
                this.setCurrentUser({...user, id: res.result.user.id}); // 把 google user id 替換
                this.setToken();
                this.checkLogin(user);
              }
            },
            error: err => {
              this.setLoading(false);
              alert("Google 登入失敗: " + (err?.error?.message || err.message || '未知錯誤'));
            }
          });
      } else {
        // signIn() 成功卻取不到 email, 過去此情況會「無 loading、無錯誤」靜默結束,
        // 現在明確關閉 loading 並提示, 避免使用者卡在無回應畫面
        this.setLoading(false);
        alert("Google 登入失敗: 無法取得 Google 帳號信箱資訊, 請重試或改用其他帳號");
      }
    } catch (err: any) {
      // 使用者取消或 Google 授權失敗
      this.setLoading(false);
      console.error('Google 登入失敗:', err);

      // 取出 Capacitor 外掛回傳的狀態碼與訊息 (call.reject 的 code 會進到 err.code)
      const code = err?.code ?? err?.errorCode ?? '';
      const message = err?.message || err?.error?.message || '未知錯誤';

      // 使用者自行取消不需跳出錯誤警告
      // (舊外掛 Android 狀態碼 12501；Credential Manager 與 iOS 以 cancel 訊息回傳)
      if (String(code) === '12501' || /cancel/i.test(String(code)) || /cancel/i.test(message)) {
        return;
      }

      // 其餘錯誤一律以 alert 顯示, 讓實機 (Android/iOS) 也能看到錯誤碼與原因
      // 常見: code 10 (DEVELOPER_ERROR) → SHA-1 憑證指紋或 OAuth Client 設定不符
      alert("Google 登入失敗 (code: " + code + "): " + message);
    }
  }

  /*
   * 網頁時, google 第三方登入, 使用 FedCM
   */
  async loginByGoogleWebFedCM(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      google.accounts.id.initialize({
        // client_id 統一集中於 environment（src/environments/environment.ts）
        client_id: environment.googleOAuth.webClientId, // specein
        callback: (res: any) => {
          console.log(" OAuth FedCM res : ", res);
          // 解析 res JWT 獲取用戶資訊, 並存入 CurrentUser
          const { credential } = res;
          const payload = this.parseJwt(credential);

          if(!payload.name) {
            alert("查無使用者信箱資訊");
            return;
          }

          const user = {
            name: payload.name,
            email: payload.email,
            authentication: {
              idToken: credential,
              accessToken: '' // One Tap 不提供 access token
            }
          }
          this.setLoading(true); // 取得憑證後, 開始後端驗證, 顯示 loading
          this.registerService
            .findUser(user["email"])
            .subscribe({
              next: findRes => {
                if(!findRes.result.user) {
                  this.registerUserForFirstLogin(user);
                } else {
                  this.setCurrentUser({...user, id: findRes.result.user.id}); // 把 google user id 替換
                  this.setToken();
                  this.checkLogin(user);
                }
              },
              error: err => {
                this.setLoading(false);
                alert("Google 登入失敗: " + (err?.error?.message || err.message || '未知錯誤'));
              }
            });
        },
        auto_select: false,
        //cancel_on_tap_outside: false,
      });

      google.accounts.id.prompt(); // 出現 OneTap 登入 UI
    });
  }

  parseJwt(token: string): any {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  
    // padding 補齊 base64 字串長度
    const padded = base64.padEnd(base64.length + (4 - base64.length % 4) % 4, '=');
  
    const jsonPayload = decodeURIComponent(
      atob(padded)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
  
    return JSON.parse(jsonPayload);
  }

  /*
   * 且首次登入, 註冊進 firestore user 表, 且 google auth 成功,
   * 依照 email 新增一筆
   */
  registerUserForFirstLogin(user: any) {
    this.registerService
      .addUser(user.email)
      .subscribe({
        next: res => {
          if(!res.newUser) {
            this.setLoading(false);
            alert("首次 google 授權, 註冊失敗, 使用者新增失敗");
          } else {
            this.registerService
              .updateUser(user)
              .subscribe({
                next: res => {
                  this.setLoading(false);
                  if(!res.newUser) {
                    alert("首次 google 授權, 註冊失敗, 使用者更新失敗");
                  } else {
                    alert("首次 google 授權, 註冊成功, 請再次登入");
                  }
                },
                error: err => {
                  this.setLoading(false);
                  alert("首次 google 授權失敗: " + (err?.error?.message || err.message || '未知錯誤'));
                }
              })
          }
        },
        error: err => {
          this.setLoading(false);
          alert("首次 google 授權失敗: " + (err?.error?.message || err.message || '未知錯誤'));
        }
      })

  }

  /*
   * 取得 userFirestoreId 並設定 current user
   */
  setCurrentUser(user: any) {
    this.currentUser = new GoogleAuthUser(user);
  }

  /* 
   * 成功登入後, 將 token 資訊 使用 csp存入手機端
   */
  async setToken() {
    await Preferences.set({key: "currentUser", value: JSON.stringify(this.currentUser)});
    await Preferences.set({key: "token", value: JSON.stringify(new Date().getTime())});
  }

  /*
   *  下次開啟 app, 檢查 token, 若在期限內便自動登入
   */
  async checkToken() {
    const _currentUser = await Preferences.get({key: "currentUser"});
    const _token = await Preferences.get({key: "token"}) || 0;
    if(!_currentUser.value) {
      return;
    }
    if(!_token.value) {
      return;
    }
    const loginDateTimeSpan = Number.parseInt(_token.value?_token.value:"0");
    const currentTimeSpan = new Date().getTime();
    if((currentTimeSpan - loginDateTimeSpan)/3600000 <= 720) {
      this.currentUser = new GoogleAuthUser(JSON.parse(!_currentUser.value?"":_currentUser.value));
      this.checkLogin(this.currentUser);
    }
    else {
      alert("閒置過久, 請重新登入");
      this.logout();
    }
  }

  /*
   * 清空 token 
   */
  async cleanToken() {
    await Preferences.remove({key: "currentUser"});
    await Preferences.remove({key: "token"});
  }
  
  /*
   * 檢查是否成功登入 
   */
  checkLogin(user: any) {
    this.setLoading(false); // 流程結束, 關閉 loading
    if (this.currentUser) {
      alert(user.email + " 成功登入!");
      this.isLoginIn = true;
      this.routeUrlRecordService.nextPage("home", {});
    }
    else {
      alert("無法取得使用者資訊");
    }
  }

  /* 
   * 測試 帳密登入, 供給 apple 測試人員使用
   */
  loginTestAccount(account:string, password:string) {
    if(account === "testuser" && password === "123456") {
      this.getTestUserInfo();
    } else {
      alert("帳密錯誤");
    }
  }

  /*
   * 取得測試登入帳號 
   */
  getTestUserInfo() {
    this.currentUser = new GoogleAuthUser({
      id: "testid",
      name: "testname",
      email: "tesetmail@testmail.com",
      imageUrl: "testurl",
      authentication: {},
    });
    alert("測試帳號: " + this.currentUser.email);
    this.isLoginIn = true;
    this.routeUrlRecordService.nextPage("home", {});
  }

  /* 
   * 刪除使用者帳號
   * 配合 ios 上架規範
   */
  async deleteUserById(id: string) {
    if(!await this.dialogService.confirm("再次確認刪除帳號? 刪除後該帳號所有預約記錄將不會保留!")) {
      return;
    }
    if(!id) {
      alert("測試帳號無法刪除 : " + this.currentUser.email);
      return;
    }
    // TODO: 原 Firestore 直刪已於 2025/04/23 棄用, 待後端提供刪除帳號 API 後於此串接
    //this.routeUrlRecordService.nextPage("/", {}); //登出, 進入登入頁
  }

}
