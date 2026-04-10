import { Component } from '@angular/core';
import { SysDashboardService } from '../../services/sys-dashboard.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pay-setting-content',
  templateUrl: './pay-setting-content.component.html',
  styleUrls: ['./pay-setting-content.component.scss']
})
export class PaySettingContentComponent {

  model:string = ""; // 新增 add , 編輯 edit
  payment: any; // 編輯,檢視 方案

  planName:string = "";
  planTimeType:string = "";
  planType:string = "";
  planDesc:string = "";
  cost:number = 0;
  siteTotal:number = 0;

  constructor(
    private activatedRoute: ActivatedRoute,
    private sysDashboardService: SysDashboardService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    // 取得 model (新增 add , 編輯 edit), 若編輯, 取得編輯方案
    this.activatedRoute.queryParams.subscribe(params => {
      this.model = params['model'];
      if(this.model === "edit") {
        this.payment = this.sysDashboardService.getPayment();
        this.planName = this.payment.planName;
        this.planTimeType = this.payment.planTimeType;
        this.planType = this.payment.planType;
        this.planDesc = this.payment.planDesc;
        this.cost = this.payment.cost;
        this.siteTotal = this.payment.siteTotal;
      }
    });
  }

  /** 新增, 更新 前, 檢查欄位 */
  isFieldOk() {
    if(!this.planName || this.planName.trim() === "") {
      alert("請輸入方案名稱");
      return false;
    }
    if(!this.cost || isNaN(this.cost)) {
      alert("費用請輸入數字");
      return false;
    }
    if(!this.siteTotal || isNaN(this.siteTotal)) {
      alert("座位數請輸入數字" + this.siteTotal);
      return false;
    }
    return true;
  }

  clickAddPayment() {
    if(!this.isFieldOk()) return;

    let planName = this.planName;
    let planTimeType = this.planTimeType;
    let planType = this.planType;
    let planDesc = this.planDesc;
    let cost = this.cost;
    let siteTotal = this.siteTotal;
    this.sysDashboardService
      .postPayment({
        planName,
        planTimeType,
        planType,
        planDesc,
        cost,
        siteTotal,
      })
      .subscribe({
        next: res => {
          alert("方案新增成功");
          this.router.navigate(["/manager-sys/pay-setting"], {});
        },
        error: err => {
          alert("方案新增失敗 err " + err);
        }
      });
  }

  clickUpdatePayment() {
    if(!this.isFieldOk()) return;

    let id = this.payment.id;
    let planName = this.planName;
    let planTimeType = this.planTimeType;
    let planType = this.planType;
    let planDesc = this.planDesc;
    let cost = this.cost;
    let siteTotal = this.siteTotal;
    this.sysDashboardService
      .updatePayment({
        id,
        planName,
        planTimeType,
        planType,
        planDesc,
        cost,
        siteTotal,
      })
      .subscribe({
        next: res => {
          alert("方案更新成功");
          this.router.navigate(["/manager-sys/pay-setting"], {});
        },
        error: err => {
          alert("方案更新失敗 err " + err);
        }
      });

  }

}
