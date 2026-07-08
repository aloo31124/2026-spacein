import { Component, OnInit } from '@angular/core';
import { GoogleAuthService } from '../../services/google-auth.service';
import { GoogleAuthUser } from '../../models/google-auth-user.model';
import { DialogService } from 'src/app/common/dialog/services/dialog.service';
import { HomeService } from 'src/app/home/services/home.service';
import { AccountService } from 'src/app/account/services/account.service';
import { createWeeklyDayOptions, timeToMinutes, WeeklyDayOption } from 'src/app/common/room-site/models/room-open-limit';

@Component({
  selector: 'app-account-page',
  templateUrl: './account-page.component.html',
  styleUrls: ['./account-page.component.scss']
})
export class AccountPageComponent implements OnInit {

  // 當前使用者資訊
  currentUser!: GoogleAuthUser;

  // 是否為 擁有者owner, 是才顯示 擁有者預設資料 區塊
  isOwner = false;
  // 擁有者預設資料 (Owner 表)
  ownerProfile = {
    address: "",
    phone: "",
    openStartTime: "09:00",
    openEndTime: "18:00",
  };
  // 每周不開放時段 checkbox 選項
  weeklyDayOptions: WeeklyDayOption[] = createWeeklyDayOptions();

  constructor(
    private googleAuthService: GoogleAuthService,
    private dialogService: DialogService,
    private homeService: HomeService,
    private accountService: AccountService,
  ) {
    this.currentUser = this.googleAuthService.getCurrentUser();
  }

  ngOnInit(): void {
    if(!this.currentUser) {
      return;
    }
    // 檢查 當前使用者 是否為 擁有者owner, 是才載入 擁有者預設資料
    this.homeService
      .getUserRole(this.currentUser.id)
      .subscribe(data => {
        if(data.result?.some((userToRole: any) => userToRole.role === "owner")) {
          this.isOwner = true;
          this.loadOwnerProfile();
        }
      });
  }

  /*
   * 載入 擁有者預設資料 (Owner 表)
   */
  loadOwnerProfile() {
    this.accountService
      .getOwnerProfile(this.currentUser.id)
      .subscribe(res => {
        const profile = res.result;
        if(!profile) {
          return; // 尚未設定過, 使用畫面預設值
        }
        this.ownerProfile.address = profile.address ?? "";
        this.ownerProfile.phone = profile.phone ?? "";
        this.ownerProfile.openStartTime = profile.openStartTime ?? "";
        this.ownerProfile.openEndTime = profile.openEndTime ?? "";
        const weeklyCloseDays: number[] = profile.weeklyCloseDays ?? [];
        this.weeklyDayOptions.forEach(option => {
          option.checked = weeklyCloseDays.includes(option.value);
        });
      });
  }

  /*
   * 儲存 擁有者預設資料 (Owner 表)
   */
  clickSaveOwnerProfile() {
    // 卡控 開放時段: 兩者皆填才有效, 且 開始需早於結束
    const { openStartTime, openEndTime } = this.ownerProfile;
    if((openStartTime && !openEndTime) || (!openStartTime && openEndTime)) {
      alert("每天開放時段 需同時填寫 開始與結束時間");
      return;
    }
    if(openStartTime && openEndTime && timeToMinutes(openStartTime) >= timeToMinutes(openEndTime)) {
      alert("每天開放時段 開始時間必須早於結束時間");
      return;
    }

    const weeklyCloseDays = this.weeklyDayOptions
      .filter(option => option.checked)
      .map(option => option.value);

    this.accountService
      .saveOwnerProfile({
        ownerId: this.currentUser.id,
        ...this.ownerProfile,
        weeklyCloseDays,
      })
      .subscribe({
        next: () => {
          alert("擁有者預設資料 儲存成功");
        },
        error: err => {
          alert("擁有者預設資料 儲存失敗 err " + err);
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
