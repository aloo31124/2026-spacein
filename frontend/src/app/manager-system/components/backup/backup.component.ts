import { Component } from '@angular/core';
import { SysDashboardService } from '../../services/sys-dashboard.service';
import { ExportService } from 'src/app/common/export-import/services/export.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-backup',
  templateUrl: './backup.component.html',
  styleUrls: ['./backup.component.scss']
})
export class BackupComponent {

  constructor(
    private sysDashboardService: SysDashboardService,
    private exportService: ExportService,
  ) {}

  exportAllUser() {
    this.sysDashboardService.exportAllUserList()
      .subscribe(
        res => {
          if (res.exportList && res.exportList.length > 0) {
              const csvData = this.exportService.convertToCSV(res.exportList);
              this.exportService.downloadCSV(csvData, 'user_all_export.csv');
          } else {
              alert('無可匯出使用者的資料');
          }
        },
        err => {
          alert("全部使用者 匯出失敗" + err.error.message);
        }
      );
  }

  exportAllRoom() {
    this.sysDashboardService.exportAllRoomList()
      .subscribe(
        res => {
          if (res.exportList && res.exportList.length > 0) {
              const csvData = this.exportService.convertToCSV(res.exportList);
              this.exportService.downloadCSV(csvData, 'room_all_export.csv');
          } else {
              alert('無可匯出 全部教室資料');
          }
        },
        err => {
          alert("全部教室資料 匯出失敗" + err.error.message);
        }
      );
  }

  exportAllSite() {
    this.sysDashboardService.exportAllSiteList()
      .subscribe(
        res => {
          if (res.exportList && res.exportList.length > 0) {
              const csvData = this.exportService.convertToCSV(res.exportList);
              this.exportService.downloadCSV(csvData, 'site_all_export.csv');
          } else {
              alert('無可匯出 全部教室資料');
          }
        },
        err => {
          alert("全部教室資料 匯出失敗" + err.error.message);
        }
      );
  }

  exportAllBooking() {
    this.sysDashboardService.exportAllBookingList()
      .subscribe(
        res => {
          if (res.exportList && res.exportList.length > 0) {
              const csvData = this.exportService.convertToCSV(res.exportList);
              this.exportService.downloadCSV(csvData, 'booking_all_export.csv');
          } else {
              alert('無可匯出 預約資料');
          }
        },
        err => {
          alert("全部預約資料 匯出失敗" + err.error.message);
        }
      );
  }

  /* 匯出所有資料表 */
  exportAllDataTable() {
    forkJoin({
      users: this.sysDashboardService.exportAllUserList(),
      usertopayment: this.sysDashboardService.exportAllUserToPaymentList(),
      usertoowner: this.sysDashboardService.exportAllUserToOwnerList(),
      usertopermission: this.sysDashboardService.exportAllUserToPermission(),
      rooms: this.sysDashboardService.exportAllRoomList(),
      sites: this.sysDashboardService.exportAllSiteList(),
      bookings: this.sysDashboardService.exportAllBookingList(),
      payment: this.sysDashboardService.exportAllPaymentList(),
    }).subscribe({
      next: (res) => {

        // 使用者 資料
        if (res.users.exportList?.length) {
          const csv = this.exportService.convertToCSV(res.users.exportList);
          this.exportService.downloadCSV(csv, 'user_all.csv');
        } else {
          alert('無可匯出使用者的資料');
        }
        // 使用者 方案 資料
        if (res.usertopayment.exportList?.length) {
          const csv = this.exportService.convertToCSV(res.usertopayment.exportList);
          this.exportService.downloadCSV(csv, 'usertopayment_all.csv');
        } else {
          alert('無可匯出 使用者 方案 的資料');
        }
        // 使用者 轉 擁有者 資料
        if (res.usertoowner.exportList?.length) {
          const csv = this.exportService.convertToCSV(res.usertoowner.exportList);
          this.exportService.downloadCSV(csv, 'usertoowner_all.csv');
        } else {
          alert('無可匯出 使用者 轉 擁有者 的資料');
        }
        // 使用者 權限 資料
        if (res.usertopermission.exportList?.length) {
          const csv = this.exportService.convertToCSV(res.usertopermission.exportList);
          this.exportService.downloadCSV(csv, 'usertopermission_all.csv');
        } else {
          alert('無可匯出 使用者 權限 的資料');
        }
  
        // 教室資料
        if (res.rooms.exportList?.length) {
          const csv = this.exportService.convertToCSV(res.rooms.exportList);
          this.exportService.downloadCSV(csv, 'room_all.csv');
        } else {
          alert('無可匯出全部教室資料');
        }
        // 座位資料
        if (res.sites.exportList?.length) {
          const csv = this.exportService.convertToCSV(res.sites.exportList);
          this.exportService.downloadCSV(csv, 'site_all.csv');
        } else {
          alert('無可匯出全部座位資料');
        }
        // 預約資料
        if (res.bookings.exportList?.length) {
          const csv = this.exportService.convertToCSV(res.bookings.exportList);
          this.exportService.downloadCSV(csv, 'booking_all.csv');
        } else {
          alert('無可匯出預約資料');
        }
        
        // 付費方案 資料
        if (res.payment.exportList?.length) {
          const csv = this.exportService.convertToCSV(res.payment.exportList);
          this.exportService.downloadCSV(csv, 'payment_all.csv');
        } else {
          alert('無可匯出 付費方案 的資料');
        }
      },
      error: (err) => {
        console.error('部分或全部匯出失敗：', err);
        alert('匯出過程中發生錯誤，請查看主控台。');
      }
    });
  }

  /* 匯入備份資料表 建置環境 */
  // 使用者選取檔案後
  handleFiles(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files) return;

    const files = Array.from(input.files);
    const fileReadPromises = files.map(file => this.readCsvToJson(file));

    Promise.all(fileReadPromises).then(fileContents => {
      const payload: any = {};
      for (let i = 0; i < files.length; i++) {
        const name = files[i].name.replace('.csv', '');
        payload[name] = fileContents[i];
      }
      this.importAllDataTable(payload);
    });
  }

  // 將 CSV 檔案讀取並轉為 JSON 陣列
  private readCsvToJson(file: File): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const text = reader.result as string;
        const lines = text.trim().split('\n');
        const headers = lines[0].split(',');

        const result = lines.slice(1).map(line => {
          const values = line.split(',');
          const obj: any = {};
          headers.forEach((header, idx) => {
            obj[header.trim()] = values[idx]?.trim() ?? '';
          });
          return obj;
        });

        resolve(result);
      };
      reader.onerror = reject;
      reader.readAsText(file, 'utf-8');
    });
  }

  // 呼叫 API 傳送 JSON 給後端
  importAllDataTable(payload: any): void {
    this.sysDashboardService.importAllDB(payload).subscribe({
      next: res => alert('匯入成功！'),
      error: err => alert('匯入失敗：' + err.message)
    });
  }

}
