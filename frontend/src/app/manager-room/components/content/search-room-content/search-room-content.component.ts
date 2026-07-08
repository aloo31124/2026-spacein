import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

import { GoogleAuthService } from 'src/app/auth-route/services/google-auth.service';
import { RoomDashboardService } from 'src/app/manager-room/services/room-dashboard.service';
import { AccountService } from 'src/app/account/services/account.service';
import { createWeeklyDayOptions, timeToMinutes, WeeklyDayOption } from 'src/app/common/room-site/models/room-open-limit';

@Component({
  selector: 'app-search-room-content',
  templateUrl: './search-room-content.component.html',
  styleUrls: ['./search-room-content.component.scss']
})
export class SearchRoomContentComponent {

  model:string = ""; // 新增 add , 編輯 edit
  room: any; // 編輯,檢視 教室

  name: string = "";

  // 教室開放限制欄位 (新增時 預設帶入 擁有者預設資料)
  address: string = "";
  phone: string = "";
  openStartTime: string = "";
  openEndTime: string = "";
  // 每周不開放時段 checkbox 選項
  weeklyDayOptions: WeeklyDayOption[] = createWeeklyDayOptions();

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private googleAuthService: GoogleAuthService,
    private roomDashboardService: RoomDashboardService,
    private accountService: AccountService,
  ) {}

  ngOnInit(): void {
    // 取得 model (新增 add , 編輯 edit), 若編輯, 取得編輯方案
    this.activatedRoute.queryParams.subscribe(params => {
      this.model = params['model'];
      if(this.model === 'edit') {
        this.room = this.roomDashboardService.getRoom();
        this.name = this.room.name;
        this.address = this.room.address ?? "";
        this.phone = this.room.phone ?? "";
        this.openStartTime = this.room.openStartTime ?? "";
        this.openEndTime = this.room.openEndTime ?? "";
        this.setWeeklyDayOptions(this.room.weeklyCloseDays ?? []);
      }
      // 新增時 預設帶入 擁有者預設資料
      if(this.model === 'add') {
        this.importOwnerProfile(false);
      }
    });
  }

  /*
   * 帶入 擁有者預設資料 (Owner 表)
   * isManual: 使用者按下 [重新帶入擁有者預設] 按鈕觸發, 才顯示提示訊息
   */
  importOwnerProfile(isManual: boolean) {
    const ownerId = this.googleAuthService.getCurrentUser().id;
    this.accountService
      .getOwnerProfile(ownerId)
      .subscribe({
        next: res => {
          const profile = res.result;
          if(!profile) {
            if(isManual) {
              alert("尚未設定擁有者預設資料, 請先至 帳號頁面 設定");
            }
            return;
          }
          this.address = profile.address ?? "";
          this.phone = profile.phone ?? "";
          this.openStartTime = profile.openStartTime ?? "";
          this.openEndTime = profile.openEndTime ?? "";
          this.setWeeklyDayOptions(profile.weeklyCloseDays ?? []);
          if(isManual) {
            alert("已重新帶入 擁有者預設資料");
          }
        },
        error: err => {
          if(isManual) {
            alert("擁有者預設資料 取得失敗 err " + err);
          }
        }
      });
  }

  /* 依 每周不開放時段 陣列 勾選 checkbox 選項 */
  setWeeklyDayOptions(weeklyCloseDays: number[]) {
    this.weeklyDayOptions.forEach(option => {
      option.checked = weeklyCloseDays.includes(option.value);
    });
  }

  /* 取得 已勾選之 每周不開放時段 陣列 */
  getWeeklyCloseDays(): number[] {
    return this.weeklyDayOptions
      .filter(option => option.checked)
      .map(option => option.value);
  }

  /** 新增, 更新 前, 檢查欄位 */
  isFieldOk() {
    if(!this.name || this.name.trim() === "") {
      alert("請輸入教室名稱");
      return false;
    }
    // 卡控 開放時段: 兩者皆填才有效, 且 開始需早於結束
    if((this.openStartTime && !this.openEndTime) || (!this.openStartTime && this.openEndTime)) {
      alert("每天開放時段 需同時填寫 開始與結束時間");
      return false;
    }
    if(this.openStartTime && this.openEndTime
        && timeToMinutes(this.openStartTime) >= timeToMinutes(this.openEndTime)) {
      alert("每天開放時段 開始時間必須早於結束時間");
      return false;
    }
    return true;
  }

  /* 組出 教室開放限制欄位 資料 */
  getRoomLimitField() {
    return {
      address: this.address,
      phone: this.phone,
      weeklyCloseDays: this.getWeeklyCloseDays(),
      openStartTime: this.openStartTime,
      openEndTime: this.openEndTime,
    };
  }

  clickAddRoom() {
    if(!this.isFieldOk()) return;

    const name = this.name;
    const ownerId = this.googleAuthService.getCurrentUser().id;
    this.roomDashboardService.addRoom(ownerId, {name, ...this.getRoomLimitField()})
      .subscribe({
        next: res => {
          alert("教室 新增成功 ");
          this.router.navigate(["/manager-room/room"], {});
        },
        error: err => {
          alert("教室 新增失敗 err " + err);
        }
      });
  }
  clickUpdateRoom() {
    if(!this.isFieldOk()) return;

    const name = this.name;
    const id = this.room.id;
    const ownerId = this.googleAuthService.getCurrentUser().id;
    this.roomDashboardService.updateRoom(ownerId, {id, name, ...this.getRoomLimitField()})
      .subscribe({
        next: res => {
          alert("教室 更新成功 ");
          this.router.navigate(["/manager-room/room"], {});
        },
        error: err => {
          alert("教室 更新失敗 err " + err);
        }
      });
  }
}
