import { Component } from '@angular/core';
import { SysDashboardService } from '../../services/sys-dashboard.service';
import { ExportService } from 'src/app/common/export-import/services/export.service';
import { DialogService } from 'src/app/common/dialog/services/dialog.service';

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
      private dialogService: DialogService,
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

  /** 使用者 轉為 系統管理員 */
  async clickAddSystemRole(user: any) {
    if(!await this.dialogService.confirm(`確定將 ${user.name} (${user.email}) 轉為系統管理員?`)) {
      return;
    }
    this.sysDashboardService.addSystemRole(user.id)
      .subscribe({
        next: () => {
          user.isSystem = true;
          alert("已轉為系統管理員");
        },
        error: err => {
          alert(`轉系統管理員失敗 : ${err.error?.message || err.error?.error || err.message}`);
        }
      });
  }

  /** 取消 使用者的 系統管理員 角色 */
  async clickRemoveSystemRole(user: any) {
    if(!await this.dialogService.confirm(`確定取消 ${user.name} (${user.email}) 的系統管理員?`)) {
      return;
    }
    this.sysDashboardService.removeSystemRole(user.id)
      .subscribe({
        next: () => {
          user.isSystem = false;
          alert("已取消系統管理員");
        },
        error: err => {
          alert(`取消系統管理員失敗 : ${err.error?.message || err.error?.error || err.message}`);
        }
      });
  }

}
