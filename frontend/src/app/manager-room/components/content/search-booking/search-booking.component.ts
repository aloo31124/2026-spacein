import { Component } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { GoogleAuthService } from 'src/app/auth-route/services/google-auth.service';
import { RoomDashboardService } from '../../../services/room-dashboard.service';
import { ExportService } from 'src/app/common/export-import/services/export.service';

@Component({
  selector: 'app-search-booking',
  templateUrl: './search-booking.component.html',
  styleUrls: ['./search-booking.component.scss']
})
export class SearchBookingComponent {
  isDefault: boolean = true;
  isLoading: boolean = false;
  roomName = "";
  siteName = "";
  startDateMin = "";
  startDateMax = "";
  bookingList: any[] = [];

  constructor(
    private router: Router,
    private roomDashboardService: RoomDashboardService,
    private googleAuthService: GoogleAuthService,
    private exportService: ExportService,
  ) {}


  clickExportBooking() {
    const ownerId = this.googleAuthService.getCurrentUser().id;
    this.roomDashboardService.exportBooking(ownerId).subscribe({
      next: res => {
        const bookingList = res.result || [];
        if(bookingList.length === 0) {
          alert("匯出無資料");
          return;
        }
        const csvData = this.exportService.convertToCSV(bookingList);
        this.exportService.downloadCSV(csvData, '預約紀錄.csv');
      },
      error: err => {
        alert("匯出錯誤 err :" + err);
        console.error('匯出錯誤', err);
      }
    });
  }
  clickSearchBooking() {
    const searchData: any = { booking: {} };
    this.isDefault = false;
    this.isLoading = true;

    if (this.roomName.trim()) {
      searchData.booking.roomName = this.roomName;
    }
    if (this.siteName.trim()) {
      searchData.booking.siteName = this.siteName;
    }
    if (this.startDateMin.trim()) {
      searchData.booking.startDateMin = this.startDateMin;
    }
    if (this.startDateMax.trim()) {
      searchData.booking.startDateMax = this.startDateMax;
    }

    const ownerId = this.googleAuthService.getCurrentUser().id;
    this.roomDashboardService.searchBooking(ownerId, searchData).subscribe({
        next: (res) => {
            this.bookingList = res.result || [];
            this.isLoading = false;
        },
        error: (err) => {
            console.error('搜尋錯誤', err);
            this.isLoading = false;
        }
    });

  }

}
