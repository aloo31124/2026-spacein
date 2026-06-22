import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { GoogleAuthService } from '../../services/google-auth.service';
import { RegisterService } from '../../services/register.service';
import { RouteUrlRecordService } from 'src/app/auth-route/services/route-url-record.service';
import { Capacitor } from '@capacitor/core';
import { Preferences } from '@capacitor/preferences';
import { Subscription } from 'rxjs';

/** 記憶登入信箱的儲存鍵 (web 走 localStorage、手機 android/ios 走原生儲存) */
const REMEMBERED_EMAIL_KEY = 'rememberedEmail';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit, OnDestroy {

  email = "";
  password = "";
  showPassword = false; // 密碼是否以明文顯示
  isNativeApp = false;  // 是否為原生App
  isLoading = false;    // 登入等待中, 顯示 loading 畫面

  private loadingSub?: Subscription;


  constructor(
    private googleAuthService: GoogleAuthService,
    private registerService: RegisterService,
    private routeUrlRecordService: RouteUrlRecordService<{}>
  ) { }

  ngOnInit(): void {
    alert("請先登入");
    // 使用 Capacitor 判斷是否運行在原生平台
    this.isNativeApp = Capacitor.isNativePlatform();
    console.log(" isNativeApp: ", this.isNativeApp);

    // 訂閱 Google 登入流程的 loading 狀態
    this.loadingSub = this.googleAuthService.loading$.subscribe(value => {
      this.isLoading = value;
    });
    // 載入上次記憶的登入信箱 (web / android / ios 皆適用)
    this.loadRememberedEmail();
  }

  ngOnDestroy(): void {
    this.loadingSub?.unsubscribe();
  }

  /** 切換密碼明文/隱藏顯示 */
  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  /** 讀取先前記憶的登入信箱並自動帶入欄位 */
  private async loadRememberedEmail(): Promise<void> {
    try {
      const { value } = await Preferences.get({ key: REMEMBERED_EMAIL_KEY });
      if (value) {
        this.email = value;
      }
    } catch (err) {
      console.warn("讀取記憶信箱失敗", err);
    }
  }

  async clickSignIn() {
    if(this.isNativeApp) {
      this.googleAuthService.loginByGoogleCap(); // 手機 app
    } else {
      this.googleAuthService.loginByGoogleWebFedCM(); // 網頁 web
    }
  }

  clickLogin() {
    //this.googleAuthService.loginTestAccount(this.account, this.password);
    const email = this.email;
    const password = this.password;
    if(email.trim() === "") {
      alert("信箱不可空白");
      return;
    }
    if(password.trim() === "") {
      alert("密碼不可空白");
      return;
    }

    // 開始驗證帳密, 顯示 loading
    this.isLoading = true;
    this.registerService
      .login(email, password)
      .subscribe({
        next: res => {
          console.log(res);
          if(res.isSuccess) {
            // 驗證通過, 記憶本次登入信箱 (web / android / ios)
            Preferences.set({ key: REMEMBERED_EMAIL_KEY, value: email });
            // 設定使用者
            this.registerService
              .findUser(email)
              .subscribe({
                next: findRes => {
                  if(!findRes.result.user) {
                    this.isLoading = false;
                    alert("信箱取無使用者資訊, 請稍後登入!");
                    return;
                  }
                  const user = findRes.result.user;
                  this.googleAuthService.setCurrentUser(user);
                  this.googleAuthService.setToken();
                  this.googleAuthService.checkLogin(user); // 內部會導頁並關閉 loading
                },
                error: err => {
                  this.isLoading = false;
                  alert("取得使用者資訊失敗: " + (err?.error?.message || err.message || '未知錯誤'));
                }
              });
          } else {
            // 登入失敗, 顯示後端回傳的錯誤訊息
            this.isLoading = false;
            alert(res.message || "登入失敗");
          }
        },
        error: err => {
          this.isLoading = false;
          alert("登入失敗: " + (err?.error?.message || err.message || '未知錯誤'));
        }
      });
  }

  clickForgetPassword() {
    this.routeUrlRecordService.nextPage("forget-password-mail", {});
  }

  clickRegister() {
    this.routeUrlRecordService.nextPage("register-info", {});
  }

}
