import { Component } from '@angular/core';
import { RegisterService } from '../../services/register.service';
import { RouteUrlRecordService } from 'src/app/auth-route/services/route-url-record.service';
import { switchMap, catchError, tap } from 'rxjs/operators';
import { of, throwError } from 'rxjs';

@Component({
  selector: 'app-register-info',
  templateUrl: './register-info.component.html',
  styleUrls: ['./register-info.component.scss']
})
export class RegisterInfoComponent {

  mail = "";
  isLoading = false;

  constructor(
    private registerService: RegisterService,
    private routeUrlRecordService: RouteUrlRecordService<{}>,
  ) {}

  sendMail() {
    if(this.mail.trim() === "") {
      alert("請輸入信件");
      return;
    }

    this.isLoading = true;
    // 整合信箱檢查與註冊流程
    this.registerService
      .findUser(this.mail)
      .pipe(
        // 1. 先檢查信箱是否已註冊
        tap(res => {
          if (res.result?.user) {
            throw new Error('該信箱已註冊，可google驗證或設定忘記密碼。');
          }
        }),
        
        // 2. 信箱未註冊，寄送驗證碼
        switchMap(() => this.registerService.sendMail(this.mail)),
        
        // 3. 寄送驗證碼成功後，新增使用者
        switchMap(() => this.registerService.addUser(this.mail)),
        
        // 4. 新增使用者成功後，更新使用者資料
        switchMap(() => this.registerService.updateUser({ mail: this.mail })),
        
        // 錯誤處理
        catchError(err => {
          console.error(err);
          this.isLoading = false;
          const errorMessage = err?.error?.message || err.message || '未知錯誤';
          alert(`處理失敗: ${errorMessage}`);
          return of(null); // 結束流程
        })
      )
      .subscribe({
        next: (result) => {
          if (result !== null) {
            this.isLoading = false;
            this.routeUrlRecordService.nextPage("register-mail-verify", { mail: this.mail });
          }
        },
        error: (err) => {
          // 這裡的錯誤已經被 catchError 處理，通常不會執行到這裡
          console.error('未被捕捉的錯誤:', err);
        }
      });
  }

}
