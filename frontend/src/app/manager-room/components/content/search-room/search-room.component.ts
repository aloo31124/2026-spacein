import { Component } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { RoomDashboardService } from '../../../services/room-dashboard.service';
import { GoogleAuthService } from 'src/app/auth-route/services/google-auth.service';
import { ExportService } from 'src/app/common/export-import/services/export.service';

@Component({
  selector: 'app-search-room',
  templateUrl: './search-room.component.html',
  styleUrls: ['./search-room.component.scss']
})
export class SearchRoomComponent {
  isDefault: boolean = true;
  isLoading: boolean = false;
  searchRoomName: string = '';
  searchRoomDate: string = '';
  roomList: any[] = []; // 存放搜尋結果


  constructor(
    private router: Router,
    private roomDashboardService: RoomDashboardService,
    private googleAuthService: GoogleAuthService,
    private exportService: ExportService,
  ) {}

  clickAddRoom () {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        model: "add"
      }
    };
    this.router.navigate(["manager-room/room-content"], navigationExtras);
  }
  clickEditRoom (room: any) {
    if(room.haveSite) {
      alert("此教室有所屬座位,無法編輯");
      return;
    }
    const navigationExtras: NavigationExtras = {
      queryParams: {
        model: "edit"
      }
    };
    this.roomDashboardService.setRoom(room);
    this.router.navigate(["manager-room/room-content"], navigationExtras);
  }
  clickDeleteRoom (room: any) {
    if(room.haveSite) {
      alert("此教室有所屬座位,無法刪除");
      return;
    }
    const ownerId = this.googleAuthService.getCurrentUser().id;
    this.roomDashboardService.deleteRoom(ownerId, room.id).subscribe({
      next: res => {
        alert("刪除成功");
        this.clickSearchRoom();
      },
      error: err => {
        alert("刪除失敗 err " + err);
      }
    });
  }

  clickExportRoom() {
    const ownerId = this.googleAuthService.getCurrentUser().id;
    this.roomDashboardService.exportRoom(ownerId).subscribe({
      next: res => {
        const roomList = res.result || [];
        if(roomList.length === 0) {
          alert("匯出無資料");
          return;
        }
        const csvData = this.exportService.convertToCSV(roomList);
        this.exportService.downloadCSV(csvData, '教室資訊.csv');
      },
      error: err => {
        alert("匯出錯誤 err :" + err);
        console.error('匯出錯誤', err);
      }
    });
  }

  clickSearchRoom() {
    const searchData: any = { room: {} };
    this.isDefault = false;
    this.isLoading = true;

    if (this.searchRoomName.trim()) {
        searchData.room.name = this.searchRoomName;
    }

    const ownerId = this.googleAuthService.getCurrentUser().id;
    this.roomDashboardService.searchRoom(ownerId, searchData).subscribe({
        next: (res) => {
            this.roomList = res.result || [];
            this.isLoading = false;
        },
        error: (err) => {
            alert("搜尋錯誤 err :" + err);
            console.error('搜尋錯誤', err);
            this.isLoading = false;
        }
    });

  }

}
