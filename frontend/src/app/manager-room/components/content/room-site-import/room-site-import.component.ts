import { Component } from '@angular/core';
import { ExportService } from 'src/app/common/export-import/services/export.service';
import { GoogleAuthService } from 'src/app/auth-route/services/google-auth.service';
import { RoomDashboardService } from 'src/app/manager-room/services/room-dashboard.service';
import roomToSiteSampleJson from '../../../../common/export-import/sample/roomToSiteList.json';

@Component({
  selector: 'app-room-site-import',
  templateUrl: './room-site-import.component.html',
  styleUrls: ['./room-site-import.component.scss']
})
export class RoomSiteImportComponent {

  isLoading = false;
  resultList: any[] = [];

  constructor(
    private exportService: ExportService,
    private googleAuthService: GoogleAuthService,
    private roomDashboardService: RoomDashboardService,
  ) {}

  clickSampleToCsv() {
    const csvData = this.exportService.convertToCSV(roomToSiteSampleJson.roomToSiteList);
    this.exportService.downloadCSV(csvData, '教室座位範本.csv');
  }

  // 使用者選取檔案後, 將 csv轉為json
  handleFiles(event: Event): void {
    this.isLoading = true;
    const ownerId = this.googleAuthService.getCurrentUser().id;
    const input = event.target as HTMLInputElement;
  
    if (!input.files || input.files.length === 0) {
      console.warn('沒有選取任何檔案');
      this.isLoading = false;
      return;
    }
  
    const file = input.files[0];
    const reader = new FileReader();
  
    reader.onload = (e: any) => {
      const csvText = e.target.result as string;
      const lines = csvText.trim().split('\n');
  
      // 假設第一行是標題欄位
      const headers = lines[0].split(',').map(h => h.trim());
  
      const data = lines.slice(1).map(line => {
        const values = line.split(',').map(v =>
          v.trim().replace(/^"|"$/g, '') // ✅ 去除前後雙引號
        );
        const item: Record<string, string> = {};
        headers.forEach((header, index) => {
          item[header] = values[index] || '';
        });
        return item;
      });
  
      const result = {
        roomToSiteList: data
      };
  
      console.log('匯入轉換後的 JSON 結果:', result);
      this.roomDashboardService.importRoomToSite(ownerId, result)
        .subscribe({
          next: res => {
            alert("匯入結束");
            console.log("匯入結束", res);
            this.resultList = res.result;
            this.isLoading = false;
          },
          error: err => {
            console.log(err);
            this.isLoading = false;
          }
        });
    };
  
    reader.onerror = () => {
      console.error('讀取檔案錯誤');
      this.isLoading = false;
    };
  
    reader.readAsText(file, 'utf-8');
  }
  


}
