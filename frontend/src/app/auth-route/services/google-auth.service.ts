import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Capacitor } from '@capacitor/core';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import { GoogleAuthUser } from '../models/google-auth-user.model';
//import { UserService } from 'src/app/common/user/services/user-service.service';
import { RegisterService } from './register.service';
import { RouteUrlRecordService } from 'src/app/auth-route/services/route-url-record.service';
import { Preferences } from '@capacitor/preferences';
import { jwtDecode } from 'jwt-decode';  // 需要安裝 jwt-decode 套件

declare const google: any; // <- 補這行，因為是外部的 global 變數

@Injectable({
  providedIn: 'root'
})
export class GoogleAuthService {

  private isLoginIn = false;
  private currentUser!: GoogleAuthUser;

  constructor(
    private routeUrlRecordService: RouteUrlRecordService<{}>,
    private router: Router,
    //private userService: UserService, // 2025/04/23 棄用
    private registerService: RegisterService,
  ) { 
    // 於此取得初始資料，並捕捉 iOS 26 可能拋出的初始化錯誤
    // 注意：GoogleAuth.initialize() 型別定義回傳 void，因此使用 try/catch 而非 .catch()
    try {
      GoogleAuth.initialize({
        clientId: '587558372608-jnei0k5eh8japakn4hs4kok2mld4m0qj.apps.googleusercontent.com',
        scopes: ['profile', 'email'],
        grantOfflineAccess: true,
      });
    } catch (err) {
      console.warn('GoogleAuth initialize 失敗:', err);
    }
    this.checkToken();
    this.loadGoogleOneTapSDK();
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
    GoogleAuth.signOut();
    this.currentUser = new GoogleAuthUser({});
    this.isLoginIn = false;
    this.cleanToken();
    this.router.navigate(["/"]);
  }

  /*
   * google 第三方登入, 使用 Cap
   */
  async loginByGoogleCap() {
    // 登入判斷
    const googleUser = await GoogleAuth.signIn();
    const {id:_, ...rest} = googleUser;
    const user = {...rest, googleUserId: googleUser.id};
    if(googleUser["email"]) {
      this.registerService
        .findUser(user["email"])
        .subscribe(res => {
          if(!res.result.user) {
            this.registerUserForFirstLogin(user);
          } else {
            this.setCurrentUser({...user, id: res.result.user.id}); // 把 google user id 替換
            this.setToken();
            this.checkLogin(user);
          }
        });
    }
  }

  /*
   * 網頁時, google 第三方登入, 使用 FedCM
   */
  async loginByGoogleWebFedCM(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      google.accounts.id.initialize({
        client_id: '830518362912-qhmt6tgd8djdv57qrdivu877u6ng5j0j.apps.googleusercontent.com',
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
          this.registerService
            .findUser(user["email"])
            .subscribe(res => {
              if(!res.result.user) {
                this.registerUserForFirstLogin(user);
              } else {
                this.setCurrentUser({...user, id: res.result.user.id}); // 把 google user id 替換
                this.setToken();
                this.checkLogin(user);
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
      .subscribe(res => {
        if(!res.newUser) {
          alert("首次 google 授權, 註冊失敗, 使用者新增失敗");
        } else {
          this.registerService
            .updateUser(user)
            .subscribe(res => {
              if(!res.newUser) {
                alert("首次 google 授權, 註冊失敗, 使用者更新失敗");
              } else {
                alert("首次 google 授權, 註冊成功, 請再次登入");
              }
            })
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
  deleteUserById(id: string) {
    if(!confirm("再次確認刪除帳號? 刪除後該帳號所有預約記錄將不會保留!")) {
      return;
    }
    if(!id) {
      alert("測試帳號無法刪除 : " + this.currentUser.email);
      return;
    }
    //this.userService.deleteUserById(id);
    //this.routeUrlRecordService.nextPage("/", {}); //登出, 進入登入頁
  }

}
