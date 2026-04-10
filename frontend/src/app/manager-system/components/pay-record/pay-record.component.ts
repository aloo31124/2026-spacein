import { Component } from '@angular/core';
import { SysDashboardService } from '../../services/sys-dashboard.service';
import { ExportService } from 'src/app/common/export-import/services/export.service';

@Component({
  selector: 'app-pay-record',
  templateUrl: './pay-record.component.html',
  styleUrls: ['./pay-record.component.scss']
})
export class PayRecordComponent {
    isDefault: boolean = true;
    isLoading: boolean = false;
    searchMail: string = '';
    searchPlanName: string = '';
    payRecordList: any[] = []; // 存放搜尋結果

    constructor(
      private sysDashboardService: SysDashboardService,
      private exportService: ExportService,
    ) {}

    clickExportPayRecord() {
      this.sysDashboardService.searchPayRecord("", "")
        .subscribe({
          next: res => {
            console.log(res);
            if (res.result && res.result.length > 0) {
                const csvData = this.exportService.convertToCSV(res.result);
                this.exportService.downloadCSV(csvData, '金流紀錄.csv');
            } else {
                alert('無可匯出的資料');
            }
          },
          error: err => {
            alert("匯出失敗 : " + err.error.message);
          }
        });
    }

    clickSearchPayRecord() {
      this.isDefault = false;
      this.isLoading = true;

      this.sysDashboardService.searchPayRecord(this.searchMail, this.searchPlanName)
        .subscribe({
          next: res => {
            console.log(res);
            this.payRecordList = res.result;
            this.isLoading = false;
          },
          error: err => {
            alert(`搜尋失敗 : ${err.error.message}`);
            this.isLoading = false;
          }
        });
    }    

}
