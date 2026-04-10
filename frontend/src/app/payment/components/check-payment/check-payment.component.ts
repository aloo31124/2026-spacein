import { Component, Input } from '@angular/core';
import { GoogleAuthService } from 'src/app/auth-route/services/google-auth.service';
import { EcpayService } from '../../services/ecpay.service';
import { RouteUrlRecordService } from 'src/app/auth-route/services/route-url-record.service';
import { switchMap, tap, catchError, of } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-check-payment',
  templateUrl: './check-payment.component.html',
  styleUrls: ['./check-payment.component.scss']
})
export class CheckPaymentComponent {

  /**
   * 升級, 退費機制, 先暫緩, 寫死畫面
   * 續約直接新增按鈕
   */
  // 上方說明文字
  paymentDescription = "";
  payment : any = null;
  userToPayment: any = null;
  isExpired = false;
  // 帳號頁判斷不自動導向付款頁
  @Input() isFromAccountPage = false;

  constructor(
    private router: Router,
    private ecpayService: EcpayService,
    private googleAuthService: GoogleAuthService,
    private routeUrlRecordService: RouteUrlRecordService<{}>,
  ) {
    //const userId = this.googleAuthService.getCurrentUser().userFirestoreId; // google User 舊 id
    const userId = this.googleAuthService.getCurrentUser().id;
    this.ecpayService
      .getUserToPayment(userId).pipe(
        tap(res => {
          if (!res.result) {
            this.paymentDescription = "尚未購買，需選擇方案才可升級為擁有者";
            alert(this.paymentDescription);
            if(!this.isFromAccountPage) {
              this.routeUrlRecordService.nextPage("pay-plan-list", {});
            }
            throw new Error("尚未購買");
          }
          this.userToPayment = res.result;
          const { purchaseDate, expiryDate } = res.result;
          const currentDate = new Date();

          if (currentDate >= new Date(expiryDate)) {
            this.paymentDescription = "購買方案已過期，需續約喔";
            alert(this.paymentDescription);
            this.isExpired = true;
          } else {
            this.paymentDescription = "已購買方案，成為擁有者";
            //alert(this.paymentDescription);
          }

          if (!res.result.paymentId) {
            alert("查無該擁有者方案資訊");
            throw new Error("paymentId 不存在");
          }
        }),
      switchMap(res => this.ecpayService.getPayment(res.result.paymentId)),
      catchError(err => {
        console.warn("流程中斷:", err.message);
        return of(null); // 中斷流程，但不進入 subscribe
      })
    ).subscribe(res => {
      if (res && res.result) {
        this.payment = res.result;
      }
    });
  }
  
  traslatePlanTimeType(planTimeType: string) {
    if(planTimeType === "year") return "年";
    if(planTimeType === "month") return "月";
    return "尚未設定"
  }

  /* 
  *  下一步, 送給 伺服器 (google cloud function),由 伺服器 與 綠界金流 取付款介面
  */
  routeToECPayForm() {

      //檢查是否已勾選 購買方案
      if(this.payment.planType === "") {
        alert("請選擇購買方案");
        return;
      }
      //檢查是否已勾選 購買方案
      if(this.payment.planTimeType === "") {
        alert("請選擇購買方案時段");
        return;
      }
  
      //導向綠界付款
      const userId  = this.googleAuthService.getCurrentUser().id;
      this.ecpayService.openECPayWindow(this.payment.id, userId);
      this.router.navigate(["/home"]);
  }

}
