import { Component } from '@angular/core';
import { RegisterService } from '../../services/register.service';
import { RouteUrlRecordService } from 'src/app/auth-route/services/route-url-record.service';
import { switchMap, catchError, tap } from 'rxjs/operators';
import { of, throwError } from 'rxjs';

@Component({
  selector: 'app-forget-password-mail',
  templateUrl: './forget-password-mail.component.html',
  styleUrls: ['./forget-password-mail.component.scss']
})
export class ForgetPasswordMailComponent {

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
          if (!res.result?.user) {
            throw new Error('該信箱不存在');
          }
        }),

        // 2. 信箱存在，寄送驗證碼
        switchMap(() => this.registerService.sendMail(this.mail)),

        // 錯誤處理: 關閉 loading 並顯示錯誤訊息
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
            this.routeUrlRecordService.nextPage("forget-password-verity", { mail: this.mail });
          }
        },
        error: (err) => {
          // 這裡的錯誤已經被 catchError 處理，通常不會執行到這裡
          console.error('未被捕捉的錯誤:', err);
        }
      });
  }

}
