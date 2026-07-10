import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

import { GoogleAuthService } from 'src/app/auth-route/services/google-auth.service';
import { RoomDashboardService } from 'src/app/manager-room/services/room-dashboard.service';
import { AccountService } from 'src/app/account/services/account.service';
import { OwnerDefault } from 'src/app/common/owner-default/models/owner-default.model';

@Component({
  selector: 'app-search-room-content',
  templateUrl: './search-room-content.component.html',
  styleUrls: ['./search-room-content.component.scss']
})
export class SearchRoomContentComponent {

  model:string = ""; // 新增 add , 編輯 edit
  room: any; // 編輯,檢視 教室

  name: string = "";

  // 教室開放資訊 (地址/電話/每周不開放星期/每天開放時段), 與 [擁有者預設] 共用欄位
  roomDetail = new OwnerDefault();

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
        this.roomDetail = new OwnerDefault(this.room);
      }
      // 新增時, 預設帶入 [擁有者預設] 資料
      if(this.model === 'add') {
        this.loadOwnerDefault(false);
      }
    });
  }

  /*
   * 帶入 [擁有者預設] 資料 (地址/電話/每周不開放星期/每天開放時段)
   * isManual: 是否為手動按鈕觸發, 手動時提示結果
   */
  loadOwnerDefault(isManual: boolean) {
    const ownerId = this.googleAuthService.getCurrentUser().id;
    this.accountService
      .getOwnerDefault(ownerId)
      .subscribe({
        next: res => {
          if(res.result) {
            this.roomDetail = new OwnerDefault(res.result);
            if(isManual) alert("已重新帶入 擁有者預設資料");
          }
          else if(isManual) {
            alert("尚未設定 擁有者預設資料, 請至 帳號頁面 設定");
          }
        },
        error: err => {
          if(isManual) alert("擁有者預設資料 取得失敗 : " + (err?.error?.error ?? JSON.stringify(err)));
        }
      });
  }

  /** 新增, 更新 前, 檢查欄位 */
  isFieldOk() {
    if(!this.name || this.name.trim() === "") {
      alert("請輸入教室名稱");
      return false;
    }
    return true;
  }

  clickAddRoom() {
    if(!this.isFieldOk()) return;

    const name = this.name;
    const ownerId = this.googleAuthService.getCurrentUser().id;
    this.roomDashboardService.addRoom(ownerId, {name, ...this.roomDetail})
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
    this.roomDashboardService.updateRoom(ownerId, {id, name, ...this.roomDetail})
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
