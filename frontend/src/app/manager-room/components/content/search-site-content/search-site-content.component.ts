import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

import { GoogleAuthService } from 'src/app/auth-route/services/google-auth.service';
import { RoomDashboardService } from 'src/app/manager-room/services/room-dashboard.service';

import { Room } from 'src/app/common/room-site/models/room.model';
import { DialogItemModel } from 'src/app/common/dialog/models/item.model';


@Component({
  selector: 'app-search-site-content',
  templateUrl: './search-site-content.component.html',
  styleUrls: ['./search-site-content.component.scss']
})
export class SearchSiteContentComponent {

  
  // 教室 list
  roomList = new Array<Room>();
  // 選擇教室
  selectRoom!: Room;
  // 教室 dialog 資訊
  dialogRoomList: DialogItemModel[] = [];
  // 教室dialog 是否隱藏 
  isHiddenDialogRoom = true;


  model:string = ""; // 新增 add , 編輯 edit
  roomToSite: any; // 編輯,檢視 教室座位

  //roomId: string = "";
  roomName: string = "";
  name: string = "";

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private googleAuthService: GoogleAuthService,
    private roomDashboardService: RoomDashboardService,
  ) {}

  ngOnInit(): void {
    // 取得所有 教室列表
    const ownerId = this.googleAuthService.getCurrentUser().id;
    this.roomDashboardService.searchRoom(ownerId, {room: {}})
      .subscribe({
        next: res => {
          if(!res.result) return;

          res.result.forEach((room: any) => {
            this.roomList.push(new Room(room));
            this.dialogRoomList.push({id:room['id'], name: room['name'], isDisabled: false});
          })
                
          // 取得 model (新增 add , 編輯 edit), 若編輯, 取得編輯方案
          this.activatedRoute.queryParams.subscribe(params => {
            this.model = params['model'];
            if(this.model === 'edit') {
              this.roomToSite = this.roomDashboardService.getSite();
              this.selectRoom = this.roomList.find(room => room.id === this.roomToSite.roomId) || new Room({});
              this.roomName = this.roomToSite.roomName;
              this.name = this.roomToSite.name; // 座位名稱
            }
          });
        },
        error: err => {
          alert('取得教室資訊錯誤' + err);
          console.log(err);
        }
      });
  }

  /** 新增, 更新 前, 檢查欄位 */
  isFieldOk() {
    if(!this.roomName || this.roomName.trim() === "") {
      alert("請輸入座位");
      return false;
    }
    if(!this.name || this.name.trim() === "") {
      alert("請輸入教室座位名稱");
      return false;
    }
    return true;
  }

  clickAddSite() {
    if(!this.isFieldOk()) return;

    const name = this.name;
    const roomId = this.selectRoom.id;
    const ownerId = this.googleAuthService.getCurrentUser().id;
    this.roomDashboardService.addSite(ownerId, {name, roomId})
      .subscribe({
        next: res => {
          alert("教室座位 新增成功 ");
          this.router.navigate(["/manager-room/site"], {});
        },
        error: err => {
          alert("教室座位 新增失敗 err " + err);
        }
      });
  }
  clickEditSite() {
    if(!this.isFieldOk()) return;

    const id = this.roomToSite.id;
    const name = this.name;
    const roomId = this.selectRoom.id;
    const ownerId = this.googleAuthService.getCurrentUser().id;
    this.roomDashboardService.updateSite(ownerId, {id, name, roomId})
      .subscribe({
        next: res => {
          alert("教室座位 更新成功 ");
          this.router.navigate(["/manager-room/site"], {});
        },
        error: err => {
          alert("教室座位 更新失敗 err " + err);
        }
      });
  }

  /*
   * 教室 dialog 選擇之後觸發 
  */
  selectedRoom(_selectRoomId: string) {
      if(!_selectRoomId) {
        return;
      }
      this.selectRoom = this.roomList.filter(room => {return room.id === _selectRoomId; })[0];
      this.roomName = this.selectRoom.name;
  }

}
