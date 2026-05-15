import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GoogleAuthService } from '../../services/google-auth.service';
import { RegisterService } from '../../services/register.service';
import { RouteUrlRecordService } from 'src/app/auth-route/services/route-url-record.service';
import { Capacitor } from '@capacitor/core';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  email = "";
  password = "";
  isNativeApp = false;  // 是否為原生App

    
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

    // 驗證帳密
    this.registerService
      .login(email, password)
      .subscribe(res => {
        console.log(res);
        if(res.isSuccess) {
          //alert(res.message);

          // 驗證通過, 設定使用者
          this.registerService
            .findUser(email)
            .subscribe(res => {
              if(!res.result.user) {
                alert("信箱取無使用者資訊, 請稍後登入!");
                return;
              }
              const user = res.result.user;
              this.googleAuthService.setCurrentUser(user);
              this.googleAuthService.setToken();
              this.googleAuthService.checkLogin(user);
              this.routeUrlRecordService.nextPage("/home", {});
              return;
            });
        }

        alert(res.message);
        return;
      }, error => {
        alert("發生例外錯誤: " + error.error.message);
      }
    );
  }

  clickForgetPassword() {
    this.routeUrlRecordService.nextPage("forget-password-mail", {});
  }

  clickRegister() {
    this.routeUrlRecordService.nextPage("register-info", {});
  }

}
