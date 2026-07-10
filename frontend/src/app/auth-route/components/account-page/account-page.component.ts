import { Component, OnInit } from '@angular/core';
import { GoogleAuthService } from '../../services/google-auth.service';
import { GoogleAuthUser } from '../../models/google-auth-user.model';
import { DialogService } from 'src/app/common/dialog/services/dialog.service';
import { HomeService } from 'src/app/home/services/home.service';
import { AccountService } from 'src/app/account/services/account.service';
import { OwnerDefault } from 'src/app/common/owner-default/models/owner-default.model';

@Component({
  selector: 'app-account-page',
  templateUrl: './account-page.component.html',
  styleUrls: ['./account-page.component.scss']
})
export class AccountPageComponent implements OnInit {

  // 當前使用者資訊
  currentUser!: GoogleAuthUser;

  // 是否為擁有者, 是才顯示 [擁有者預設] 區塊
  isOwner = false;
  isBooker = false;

  // [擁有者預設] 表單資料
  ownerDefault = new OwnerDefault();

  constructor(
    private googleAuthService: GoogleAuthService,
    private dialogService: DialogService,
    private homeService: HomeService,
    private accountService: AccountService,
  ) {
    this.currentUser = this.googleAuthService.getCurrentUser();
  }

  ngOnInit(): void {
    if(!this.currentUser) return;
    // 檢查是否為擁有者, 是才載入 [擁有者預設] 資料
    this.homeService
      .getUserRole(this.currentUser.id)
      .subscribe(data => {
        this.isBooker = data.result.some((userToRole: any) => userToRole.role === "booker");
        if(data.result.some((userToRole: any) => userToRole.role === "owner")) {
          this.isOwner = true;
          this.loadOwnerDefault();
        }
      });
  }

  /* 載入 [擁有者預設] 資料 */
  loadOwnerDefault() {
    this.accountService
      .getOwnerDefault(this.currentUser.id)
      .subscribe(res => {
        if(res.result) {
          this.ownerDefault = new OwnerDefault(res.result);
        }
      });
  }

  /* 儲存 [擁有者預設] 資料 */
  saveOwnerDefault() {
    this.accountService
      .postOwnerDefault(this.currentUser.id, this.ownerDefault)
      .subscribe({
        next: () => {
          alert("擁有者預設資料 儲存成功");
        },
        error: err => {
          alert("擁有者預設資料 儲存失敗 : " + (err?.error?.error ?? JSON.stringify(err)));
        }
      });
  }

  /*
   * 登出
   */
  async loginOut() {
    if(!await this.dialogService.confirm("是否登出?")) {
      return;
    }
    this.googleAuthService.logout();
  }

  /* 刪除帳號 */
  deleteAccount(deleteAccount: string) {
    if(deleteAccount !== this.currentUser.email) {
      alert("輸入信箱錯誤, 刪除失敗");
      return;
    }
    this.googleAuthService.deleteUserById(this.currentUser.userFirestoreId);
  }

}
