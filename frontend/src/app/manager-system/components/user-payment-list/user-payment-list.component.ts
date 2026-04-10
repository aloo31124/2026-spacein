import { Component } from '@angular/core';
import { SysDashboardService } from '../../services/sys-dashboard.service';
import { ExportService } from 'src/app/common/export-import/services/export.service';

@Component({
  selector: 'app-user-payment-list',
  templateUrl: './user-payment-list.component.html',
  styleUrls: ['./user-payment-list.component.scss']
})
export class UserPaymentListComponent {
    isDefault: boolean = true;
    isLoading: boolean = false;
    searchMail: string = '';
    searchPayment: string = '';
    userPaymentList: any[] = []; // 存放搜尋結果

    constructor(
      private sysDashboardService: SysDashboardService,
      private exportService: ExportService,
    ) {}

    export() {
      this.sysDashboardService.searchUserPayment("", "")
        .subscribe({
          next: res => {
            if (res.result && res.result.length > 0) {
                const csvData = this.exportService.convertToCSV(res.result);
                this.exportService.downloadCSV(csvData, '使用者方案資料.csv');
            } else {
                alert('無可匯出的資料');
            }
          },
          error: err => {
            alert("匯出失敗 : " + err.error.message);
          }
        });
    }

    search() {
      this.isDefault = false;
      this.isLoading = true;

      this.sysDashboardService.searchUserPayment(this.searchMail, this.searchPayment)
        .subscribe({
          next: res => {
            console.log("yoyo res ", res);
            this.userPaymentList = res.result;
            this.isLoading = false;
          },
          error: err => {
            alert(`搜尋失敗 : ${err.error.message}`);
            this.isLoading = false;
          }
        });
    }

}
