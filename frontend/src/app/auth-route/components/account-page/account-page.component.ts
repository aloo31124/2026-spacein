import { Component } from '@angular/core';
import { GoogleAuthService } from '../../services/google-auth.service';
import { GoogleAuthUser } from '../../models/google-auth-user.model';
import { DialogService } from 'src/app/common/dialog/services/dialog.service';

@Component({
  selector: 'app-account-page',
  templateUrl: './account-page.component.html',
  styleUrls: ['./account-page.component.scss']
})
export class AccountPageComponent {

  // 當前使用者資訊
  currentUser!: GoogleAuthUser;

  constructor(
    private googleAuthService: GoogleAuthService,
    private dialogService: DialogService,
  ) {
    this.currentUser = this.googleAuthService.getCurrentUser();
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
