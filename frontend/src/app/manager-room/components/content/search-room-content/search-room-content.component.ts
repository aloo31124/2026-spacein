import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

import { GoogleAuthService } from 'src/app/auth-route/services/google-auth.service';
import { RoomDashboardService } from 'src/app/manager-room/services/room-dashboard.service';

@Component({
  selector: 'app-search-room-content',
  templateUrl: './search-room-content.component.html',
  styleUrls: ['./search-room-content.component.scss']
})
export class SearchRoomContentComponent {

  model:string = ""; // 新增 add , 編輯 edit
  room: any; // 編輯,檢視 教室

  name: string = "";

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private googleAuthService: GoogleAuthService,
    private roomDashboardService: RoomDashboardService,
  ) {}

  ngOnInit(): void {
    // 取得 model (新增 add , 編輯 edit), 若編輯, 取得編輯方案
    this.activatedRoute.queryParams.subscribe(params => {
      this.model = params['model'];
      if(this.model === 'edit') {
        this.room = this.roomDashboardService.getRoom();
        this.name = this.room.name;
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
    this.roomDashboardService.addRoom(ownerId, {name})
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
    this.roomDashboardService.updateRoom(ownerId, {id, name})
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
