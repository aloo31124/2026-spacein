import { Component } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { GoogleAuthService } from 'src/app/auth-route/services/google-auth.service';
import { RoomDashboardService } from '../../../services/room-dashboard.service';
import { ExportService } from 'src/app/common/export-import/services/export.service';
import { DialogService } from 'src/app/common/dialog/services/dialog.service';

@Component({
  selector: 'app-search-site',
  templateUrl: './search-site.component.html',
  styleUrls: ['./search-site.component.scss']
})
export class SearchSiteComponent {
  isDefault: boolean = true;
  isLoading: boolean = false;
  searchRoomName = "";
  searchSiteName = "";
  siteList: any[] = [];

  constructor(
    private router: Router,
    private roomDashboardService: RoomDashboardService,
    private googleAuthService: GoogleAuthService,
    private exportService: ExportService,
    private dialogService: DialogService,
  ) {}

  clickExportSite() {
    const ownerId = this.googleAuthService.getCurrentUser().id;
    this.roomDashboardService.exportSite(ownerId).subscribe({
      next: res => {
        const siteList = res.result || [];
        if(siteList.length === 0) {
          alert("匯出無資料");
          return;
        }
        const csvData = this.exportService.convertToCSV(siteList);
        this.exportService.downloadCSV(csvData, '教室座位資訊.csv');
      },
      error: err => {
        alert("匯出錯誤 err :" + err);
        console.error('匯出錯誤', err);
      }
    });
  }
  clickAddSite() {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        model: "add"
      }
    };
    this.router.navigate(["manager-room/site-content"], navigationExtras);
  }
  clickEditSite(roomToSite: any) {
    if(roomToSite.haveBooking) {
      alert("此座位已被預約，無法編輯");
      return;
    }
    const navigationExtras: NavigationExtras = {
      queryParams: {
        model: "edit"
      }
    };
    this.roomDashboardService.setSite(roomToSite);
    this.router.navigate(["manager-room/site-content"], navigationExtras);
  }
  async clickDeleteSite(roomToSite: any) {
    if(roomToSite.haveBooking) {
      alert("此座位已被預約，無法刪除");
      return;
    }
    if(!await this.dialogService.confirm("是否刪除座位?")) {
      return;
    }
    const ownerId = this.googleAuthService.getCurrentUser().id;
    this.roomDashboardService.deleteSite(ownerId, roomToSite.id).subscribe({
      next: res => {
        alert("座位刪除成功");
        this.searchSite();
      },
      error: err => {
        alert("刪除失敗 err " + err);
      }
    });
  }

  searchSite() {
    const searchData: any = { roomToSite: {} };
    this.isDefault = false;
    this.isLoading = true;

    if (this.searchRoomName.trim()) {
      searchData.roomToSite.roomName = this.searchRoomName;
    }
    if (this.searchSiteName.trim()) {
      searchData.roomToSite.siteName = this.searchSiteName;
    }

    const ownerId = this.googleAuthService.getCurrentUser().id;
    this.roomDashboardService.searchSite(ownerId, searchData).subscribe({
        next: (res) => {
            console.log(" site yoyoyo : ", res);
            this.siteList = res.result || [];
            this.isLoading = false;
        },
        error: (err) => {
            console.error('搜尋錯誤', err);
            this.isLoading = false;
        }
    });

  }

}
