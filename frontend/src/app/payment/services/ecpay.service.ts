import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EcpayService {
  private DOMAIN = environment.domain;
  private CONTEXT = "/api/account/payment";
  private BASE_URL = this.DOMAIN + this.CONTEXT;

  constructor(
    private httpClient: HttpClient,
  ) { }

  /*
   * 取得所有購買方案
   */
  getPaymentList() {
    return this.httpClient.get<any>(`${this.BASE_URL}/select/list`);
  }

  openECPayWindow(paymentId: string, userId: string) {
    //導向綠界付款
    window.open(`${this.BASE_URL}/select/${paymentId}/${userId}`);
  }

  /*
   * 新增 預約者 對應 角色
   */
  getUserToPayment(userId: string) {
    return this.httpClient.get<any>(`${this.BASE_URL}/userId/${userId}`);
  }

  /*
   * 搜尋 購買方案, 依照 paymentId
   */
  getPayment(paymentId: string) {
    return this.httpClient.get<any>(`${this.BASE_URL}/paymentId/${paymentId}`);
  }

}
