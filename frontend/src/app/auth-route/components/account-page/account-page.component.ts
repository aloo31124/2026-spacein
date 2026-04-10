import { Component } from '@angular/core';
import { GoogleAuthService } from '../../services/google-auth.service';
import { GoogleAuthUser } from '../../models/google-auth-user.model';
import { DialogComponent } from 'src/app/common/dialog/components/dialog/dialog.component';

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
  ) {
    this.currentUser = this.googleAuthService.getCurrentUser();
  }

  /* 
   * 登出
   */
  loginOut() {
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
