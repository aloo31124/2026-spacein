import { Component } from '@angular/core';
import { PlanTypeModel } from '../../models/plan-type.model';
import { PlanTimeTypeModel } from '../../models/plan-time-type.model';
import { ActivatedRoute, Router } from '@angular/router';
import { EcpayService } from '../../services/ecpay.service';
import { GoogleAuthService } from 'src/app/auth-route/services/google-auth.service';


@Component({
  selector: 'app-paid-plan-list',
  templateUrl: './paid-plan-list.component.html',
  styleUrls: ['./paid-plan-list.component.scss']
})
export class PaidPlanListComponent {

  // 購買方案 清單
  paymentList: any[] = [];

  // 選擇購買方案 id
  selectPaymentId: string = "";

  // 續約時, 原本購買的方案 id (由 check-payment 頁面帶入, 供預選與提示)
  originPaymentId: string = "";

  // 選擇方案 models
  palnTypeModel = new PlanTypeModel();
  // 選擇時段 models
  planTimeTypeModel = new PlanTimeTypeModel();

  iconCheckNo = "/assets/images/icon/icon_check_no.png";
  iconCheckOk = "/assets/images/icon/icon_check_ok.png";

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private ecpayService: EcpayService,
    private googleAuthService: GoogleAuthService,
  ) {
    // 續約流程會帶入原本購買的方案 id, 預選並提示該方案
    const originPaymentId = this.activatedRoute.snapshot.queryParamMap.get("originPaymentId");
    if (originPaymentId) {
      this.originPaymentId = originPaymentId;
      this.selectPaymentId = originPaymentId;
    }

    // 取得所有方案
    this.ecpayService.getPaymentList()
      .subscribe({
        next: (res: any) => {
          this.paymentList = res.result;
        },
        error: (err: any) => {
          alert("取得購買方案失敗 err : " + err);
        }
      })
  }

  checkSelectPaymentId(paymentId: string) {
    this.selectPaymentId = paymentId;
  }

  getPlanTitle(planType: string) {
    switch(planType) {
      case this.palnTypeModel.studio:
        return "小型工作室";
      case this.palnTypeModel.group:
        return "成長中團隊";
      case this.palnTypeModel.enterprise:
        return "大型組織企業";
    }
    return "無對應方案名稱";
  }

  /* 
   *  下一步, 送給 伺服器 (google cloud function),由 伺服器 與 綠界金流 取付款介面
   */
  routeToECPayForm() {
    //檢查是否已勾選 購買方案
    if(this.selectPaymentId.trim() === "") {
      alert("請選擇購買方案");
      return;
    }

    //導向綠界付款
    const userId  = this.googleAuthService.getCurrentUser().id;
    this.ecpayService.openECPayWindow(this.selectPaymentId, userId);
    this.router.navigate(["/home"]);
  }

}


