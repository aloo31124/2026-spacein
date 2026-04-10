import { Component } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { GoogleAuthService } from 'src/app/auth-route/services/google-auth.service';
import { Router } from '@angular/router';
import { switchMap, catchError, tap } from 'rxjs/operators';
import { of, EMPTY } from 'rxjs';

@Component({
  selector: 'app-booker-select-owner',
  templateUrl: './booker-select-owner.component.html',
  styleUrls: ['./booker-select-owner.component.scss']
})
export class BookerSelectOwnerComponent {

  ownerEmail = "";
  onwer: any = null;

  constructor(
    private router: Router,
    private accountService: AccountService,
    private googleAuthService: GoogleAuthService,
  ) {}

  clickSendOwner() {
    //const userId = this.googleAuthService.getCurrentUser().userFirestoreId; // google User 舊 id
    const userId = this.googleAuthService.getCurrentUser().id;
    if(this.ownerEmail.trim() === "") {
      alert("請輸入擁有者信箱");
      return;
    }


    this.accountService
      .getOwner(this.ownerEmail)
      .pipe(
        tap(res => {
          const owner = res.result;

          if (!owner) {
            alert("查無資料");
            throw new Error("查無資料");
          }
      
          if (owner.error) {
            alert(owner.error);
            throw new Error(owner.error);
          }
      
          // 儲存 owner 以供下一步使用
          this.onwer = owner;
        }),
        switchMap(() => {
          return this.accountService.postUserToOwner(userId, this.onwer.id).pipe(
            tap(res => {
              if (!res.result) {
                alert("擁有者 綁定失敗");
                throw new Error("擁有者 綁定失敗");
              }
              alert("擁有者 綁定成功");
            })
          );
        }),
        switchMap(() => {
          return this.accountService.postUserToRole(userId).pipe(
            tap(res => {
              if (!res.result) {
                alert("角色 綁定失敗");
                throw new Error("角色 綁定失敗");
              }
              alert("角色 綁定成功");
            })
          );
        }),
        catchError(err => {
          console.error("流程中斷:", err.message);
          return EMPTY; // 停止流程
        })
      ).subscribe(() => {
        // 全部成功，導向首頁
        this.router.navigate(["/home"]);
      });

  }

}
