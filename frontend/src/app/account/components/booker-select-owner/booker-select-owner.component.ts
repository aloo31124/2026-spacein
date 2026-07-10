import { Component, Input, OnInit } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { GoogleAuthService } from 'src/app/auth-route/services/google-auth.service';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-booker-select-owner',
  templateUrl: './booker-select-owner.component.html',
  styleUrls: ['./booker-select-owner.component.scss']
})
export class BookerSelectOwnerComponent implements OnInit {

  ownerEmail = "";
  owner: any = null;
  isLoading = true;
  isSubmitting = false;
  statusMessage = "";
  statusType: "success" | "error" | "" = "";

  // 首次選擇角色完成後維持原流程回首頁；嵌入帳號頁時留在原頁顯示綁定結果。
  @Input() navigateAfterBinding = true;

  constructor(
    private router: Router,
    private accountService: AccountService,
    private googleAuthService: GoogleAuthService,
  ) {}

  ngOnInit(): void {
    const userId = this.googleAuthService.getCurrentUser()?.id;
    if(!userId) {
      this.isLoading = false;
      this.setStatus("無法取得目前使用者資料", "error");
      return;
    }

    this.accountService.getOwnerByUserId(userId).subscribe({
      next: res => {
        this.owner = res.result;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
        this.setStatus("目前無法取得綁定資料，請稍後再試", "error");
      }
    });
  }

  clickSendOwner() {
    if(this.owner || this.isSubmitting) return;

    const userId = this.googleAuthService.getCurrentUser().id;
    const ownerEmail = this.ownerEmail.trim();
    if(ownerEmail === "") {
      this.setStatus("請輸入擁有者信箱", "error");
      return;
    }

    this.isSubmitting = true;
    this.statusMessage = "";
    let selectedOwner: any = null;
    this.accountService
      .getOwner(ownerEmail)
      .pipe(
        switchMap(res => {
          selectedOwner = res.result;
          if(!selectedOwner || selectedOwner.error) {
            return throwError(() => new Error(selectedOwner?.error || "查無此擁有者"));
          }
          return this.accountService.postUserToOwner(userId, selectedOwner.id);
        }),
        switchMap(() => {
          return this.accountService.postUserToRole(userId);
        })
      ).subscribe({
        next: () => {
          this.isSubmitting = false;
          this.owner = selectedOwner;
          this.setStatus("擁有者綁定成功", "success");
          if(this.navigateAfterBinding) this.router.navigate(["/home"]);
        },
        error: err => {
          // 綁定 API 若拒絕重複修改，重新讀取伺服器資料，確保畫面維持唯讀。
          this.isSubmitting = false;
          this.owner = null;
          this.setStatus(err?.error?.error || err?.message || "擁有者綁定失敗", "error");
          this.isLoading = true;
          this.ngOnInit();
        }
      });
  }

  private setStatus(message: string, type: "success" | "error") {
    this.statusMessage = message;
    this.statusType = type;
  }
}
