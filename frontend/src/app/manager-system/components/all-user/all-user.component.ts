import { Component } from '@angular/core';
import { SysDashboardService } from '../../services/sys-dashboard.service';
import { ExportService } from 'src/app/common/export-import/services/export.service';

@Component({
  selector: 'app-all-user',
  templateUrl: './all-user.component.html',
  styleUrls: ['./all-user.component.scss']
})
export class AllUserComponent {
    isDefault: boolean = true;
    isLoading: boolean = false;
    searchName: string = '';
    searchMail: string = '';
    users: any[] = []; // 存放搜尋結果

    constructor(
      private sysDashboardService: SysDashboardService,
      private exportService: ExportService,
    ) {}

  exportAllUser() {
    this.sysDashboardService.exportAllUserList()
      .subscribe({
        next: res => {
          if (res.exportList && res.exportList.length > 0) {
              const csvData = this.exportService.convertToCSV(res.exportList);
              this.exportService.downloadCSV(csvData, 'user_all_export.csv');
          } else {
              alert('無可匯出的資料');
          }
        },
        error: err => {
          alert("匯出失敗 : " + err.error.message);
        }
      });
  }

  searchUser() {
    this.isDefault = false;
    this.isLoading = true;

    this.sysDashboardService.searchUser(this.searchName, this.searchMail)
      .subscribe({
        next: res => {
          this.users = res.result.userList;
          this.isLoading = false;
        },
        error: err => {
          alert(`搜尋失敗 : ${err.error.message}`);
          this.isLoading = false;
        }
      });
  }

}
