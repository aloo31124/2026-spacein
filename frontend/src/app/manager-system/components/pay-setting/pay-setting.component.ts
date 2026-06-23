import { Component } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { SysDashboardService } from '../../services/sys-dashboard.service';
import { ExportService } from 'src/app/common/export-import/services/export.service';
import { DialogService } from 'src/app/common/dialog/services/dialog.service';

@Component({
  selector: 'app-pay-setting',
  templateUrl: './pay-setting.component.html',
  styleUrls: ['./pay-setting.component.scss']
})
export class PaySettingComponent {

  isFirstSearch = true;
  paymentList:any[] = [];

  planName: string = "";
  planTimeType: string = "";
  planType: string = "";

  constructor(
    private sysDashboardService: SysDashboardService,
    private router: Router,
    private exportService: ExportService,
    private dialogService: DialogService,
  ) {}

  exportAllPayment() {
    this.sysDashboardService
      .exportPaymentAll()
      .subscribe({
        next: res => {
          if(!res.result || res.result.length === 0) {
            alert("無匯出 方案 資料");
            return;
          }
          //alert("方案匯出成功");
          const csvData = this.exportService.convertToCSV(res.result);
          this.exportService.downloadCSV(csvData, '方案資料.csv');
        },
        error: err => {
          alert("匯出 方案 異常, err : " + err);
        }
      });
  }

  clickAddPayment () {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        model: "add"
      }
    };
    this.router.navigate(["manager-sys/pay-setting-content"], navigationExtras);
  }
  async clickDeletePayment (payment:any) {
    if(payment.haveBuy) {
      alert("該方案已被購買,無法刪除。");
      return;
    }
    if(!await this.dialogService.confirm("確定刪除方案嗎?")) {
      return;
    }
    this.sysDashboardService
      .deletePayment(payment.id)
      .subscribe({
        next: res => {
          alert("方案刪除成功");
          this.searchPayment();
        },
        error: err => {
          alert("方案 刪除 失敗" + err);
        }
      });
  }

  clickEditPayment (payment:any) {
    if(payment.haveBuy) {
      alert("該方案已被購買,無法編輯。");
      return;
    }
    const navigationExtras: NavigationExtras = {
      queryParams: {
        model: "edit",
      }
    };
    this.sysDashboardService.setPayment(payment);
    this.router.navigate(["manager-sys/pay-setting-content"], navigationExtras);
  }

  searchPayment() {
    let planName = (this.planName.trim() === "") ? "all" : this.planName;
    let planTimeType = (this.planTimeType.trim() === "") ? "all" : this.planTimeType;
    let planType = (this.planType.trim() === "") ? "all" : this.planType;

    this.sysDashboardService
      .searchPayment(planName, planTimeType, planType)
      .subscribe({
        next: (res) => {
          console.log(" 方案 YOYOYO! ", res);
          this.paymentList = res.result || [];
          this.isFirstSearch = false;
        },
        error: (err)=> {
          alert("搜尋方案出錯 err : " + err);
          console.log("搜尋方案出錯 err : " , err);
        }
      });
  }
}
