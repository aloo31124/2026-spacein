import { Component } from '@angular/core';
import { RoomDashboardService } from '../../../services/room-dashboard.service';
import { ExportService } from 'src/app/common/export-import/services/export.service';
import { GoogleAuthService } from 'src/app/auth-route/services/google-auth.service';

@Component({
    selector: 'app-search-booking-user',
    templateUrl: './search-booking-user.component.html',
    styleUrls: ['./search-booking-user.component.scss']
})
export class SearchBookingUserComponent {
    isDefault: boolean = true;
    isLoading: boolean = false;
    searchName: string = '';
    searchMail: string = '';
    users: any[] = []; // 存放搜尋結果

    constructor(
        private roomDashboardService: RoomDashboardService,
        private exportService: ExportService,
        private googleAuthService: GoogleAuthService,
    ) {}

    exportUserList() {
        const ownerId = this.googleAuthService.getCurrentUser().id
        this.roomDashboardService.exportUserList(ownerId).subscribe({
            next: (res) => {
                if (res.result && res.result.length > 0) {
                    const csvData = this.exportService.convertToCSV(res.result);
                    this.exportService.downloadCSV(csvData, '預約者資訊.csv');
                } else {
                    alert('無可匯出的資料');
                }
            },
            error: (err) => console.error('匯出錯誤:', err)
        });
    }

    searchUser() {
        const searchData: any = { user: {} };
        this.isDefault = false;
        this.isLoading = true;

        if (this.searchName.trim()) {
            searchData.user.name = this.searchName;
        } 
        if (this.searchMail.trim()) {
            searchData.user.email = this.searchMail;
        }

        /*
        if (!searchData.user.name && !searchData.user.mail) {
            alert('請輸入姓名或信箱');
            return;
        }
        */

        const ownerId = this.googleAuthService.getCurrentUser().id
        this.roomDashboardService.searchUser(ownerId, searchData).subscribe({
            next: (res) => {
                this.users = res.result || [];
                this.isLoading = false;
            },
            error: (err) => {
                console.error('搜尋錯誤', err);
                this.isLoading = false;
            }
        });
    }
}

