import { Component, OnInit } from '@angular/core';
import { RouteUrlRecordService } from 'src/app/auth-route/services/route-url-record.service';
import { HomeService } from '../../services/home.service';
import { GoogleAuthService } from 'src/app/auth-route/services/google-auth.service';
import { EcpayService } from 'src/app/payment/services/ecpay.service';
import { Capacitor } from '@capacitor/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  /**
   * 升級, 退費機制, 先暫緩, 寫死畫面
   * 續約直接新增按鈕
   */

  isLoading = true;
  isHasRole = true;
  isOwner = false;
  isSystem = false;
  isExpired = false;
  isNativeApp = false;  // 是否為原生App

  constructor(
    private routeUrlRecordService: RouteUrlRecordService<{}>,
    private homeService: HomeService,
    private googleAuthService: GoogleAuthService,
    private ecpayService: EcpayService,
  ) { 
    //alert("isExpired: " + this.isExpired);
  }


  ngOnInit(): void {
    //const userId = this.googleAuthService.getCurrentUser().userFirestoreId; // google User 舊 id
    const userId = this.googleAuthService.getCurrentUser().id;
    
    // 檢查 當前 使用者 角色 (待抽離)
    this.homeService
      .getUserRole(userId)
      .subscribe(data => {
        if(data.result.length === 0) {
          alert("尚未擁有角色,請選擇角色");
          this.isHasRole = false;
          this.isLoading = false;
          return;
        }

        // 先判斷是否為 系統管理員system 
        if(data.result.some((userToRole:any) => userToRole.role === "system")) {
          this.isSystem = true;
        }
        
        // 判斷是否為 擁有者owner 
        if(!data.result.some((userToRole:any) => userToRole.role === "owner")) {
          this.isLoading = false;
          return;
        }
        // 判斷 擁有者owner 購買方案是否過期
        this.ecpayService
          .getUserToPayment(userId)
          .subscribe(res => {
            const { purchaseDate, expiryDate } = res.result;
            const currentDate = new Date();
            if (currentDate >= new Date(expiryDate)) {
              this.isExpired = true;
            } 
            // 若沒過期, 則顯示
            else {
              this.isOwner = true;
            }
            this.isLoading = false;
          });
      });
    
    
    // 使用 Capacitor 判斷是否運行在原生平台
    this.isNativeApp = Capacitor.isNativePlatform();
    console.log(" isNativeApp: ", this.isNativeApp);
  }

  /*
   * 進入功能頁面 
   */
  nextPage(nextUrl: string) {
    this.routeUrlRecordService.nextPage(nextUrl, {});
  }

}
