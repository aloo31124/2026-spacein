import { Component } from '@angular/core';
import { SysDashboardService } from '../../services/sys-dashboard.service';
import { ExportService } from 'src/app/common/export-import/services/export.service';

@Component({
  selector: 'app-user-role-list',
  templateUrl: './user-role-list.component.html',
  styleUrls: ['./user-role-list.component.scss']
})
export class UserRoleListComponent {
    isDefault: boolean = true;
    isLoading: boolean = false;
    searchMail: string = '';
    searchRole: string = '';
    userRoleList: any[] = []; // 存放搜尋結果

    constructor(
      private sysDashboardService: SysDashboardService,
      private exportService: ExportService,
    ) {}

    exportAllUser() {
      this.sysDashboardService.searchUserRole("", "")
        .subscribe({
          next: (res: any) => {
            if (res.result && res.result.length > 0) {
                const csvData = this.exportService.convertToCSV(res.result);
                this.exportService.downloadCSV(csvData, '使用者角色資料.csv');
            } else {
                alert('無可匯出的資料');
            }
          },
          error: (err: any) => {
            alert("匯出失敗 : " + err.error.message);
          }
        });
    }

    searchUser() {
      this.isDefault = false;
      this.isLoading = true;

      this.sysDashboardService.searchUserRole(this.searchMail, this.searchRole)
        .subscribe({
          next: (res: any) => {
            this.userRoleList = res.result;
            this.isLoading = false;
          },
          error: (err: any) => {
            alert(`搜尋失敗 : ${err.error.message}`);
            this.isLoading = false;
          }
        });
    }

}
