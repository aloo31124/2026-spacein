import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SysDashboardService {
    private DOMAIN = environment.domain;
    private CONTEXT = "/api/manager";
    private BASE_URL = this.DOMAIN + this.CONTEXT;
    //private BASE_URL = 'http://localhost:8082/api';

    private payment: any; // 更新方案

    constructor(private http: HttpClient) {}

    // 編輯 方案
    setPayment(payment:any) {
        this.payment = payment;
    }
    getPayment() {
        return this.payment;
    }

    /** 使用者管理 */
    searchUser(name: string, email: string): Observable<any> {
        return this.http.post<any>(`${this.BASE_URL}/system/user/search`, {user: {name, email}});
    }

    /** 使用者 轉為 系統管理員 */
    addSystemRole(userId: string): Observable<any> {
        return this.http.post<any>(`${this.BASE_URL}/system/user/role/system/add`, {userId});
    }

    /** 取消 使用者的 系統管理員 角色 */
    removeSystemRole(userId: string): Observable<any> {
        return this.http.delete<any>(`${this.BASE_URL}/system/user/role/system/delete/${userId}`);
    }

    /** 使用者角色 */
    searchUserRole(email: string, role: string): Observable<any> {
        return this.http.post<any>(`${this.BASE_URL}/system/user/role/search`, {email, role});
    }

    /** 使用者方案 */
    searchUserPayment(email: string, paymentName: string): Observable<any> {
        return this.http.post<any>(`${this.BASE_URL}/system/user/payment/search`, {email, paymentName});
    }

    /** [金流紀錄] */
    searchPayRecord(email:string, paymentName:string): Observable<any> {
        return this.http.post<any>(`${this.BASE_URL}/system/payment/record/search`, {email, paymentName});
    }

    /** [方案管理] */
    searchPayment(planName:string, planTimeType:string, planType:string): Observable<any>  {
        return this.http.post<any>(`${this.BASE_URL}/system/payment/search/${planName}/${planTimeType}/${planType}`, {});
    }
    exportPaymentAll(): Observable<any>  {
        return this.http.get<any>(`${this.BASE_URL}/system/payment/export/all`);
    }
    postPayment(payment:any): Observable<any>  {
        return this.http.post<any>(`${this.BASE_URL}/system/payment/add`, {payment});
    }
    updatePayment(payment:any): Observable<any>  {
        return this.http.patch<any>(`${this.BASE_URL}/system/payment/update`, {payment});
    }
    deletePayment(id:string): Observable<any>  {
        return this.http.delete<any>(`${this.BASE_URL}/system/payment/delete/${id}`);
    }

    /** [系統備份] */
    exportAllUserList(): Observable<any>  {
        return this.http.get<any>(`${this.BASE_URL}/backup/export/user`);
    }
    exportAllUserToPaymentList(): Observable<any>  {
        return this.http.get<any>(`${this.BASE_URL}/backup/export/usertopayment`);
    }
    exportAllUserToOwnerList(): Observable<any>  {
        return this.http.get<any>(`${this.BASE_URL}/backup/export/usertoowner`);
    }
    exportAllUserToPermission(): Observable<any>  {
        return this.http.get<any>(`${this.BASE_URL}/backup/export/usertopermission`);
    }
    exportAllRoomList(): Observable<any>  {
        return this.http.get<any>(`${this.BASE_URL}/backup/export/room`);
    }
    exportAllSiteList(): Observable<any>  {
        return this.http.get<any>(`${this.BASE_URL}/backup/export/roomtosite`);
    }
    exportAllBookingList(): Observable<any>  {
        return this.http.get<any>(`${this.BASE_URL}/backup/export/booking`);
    }
    exportAllPaymentList(): Observable<any>  {
        return this.http.get<any>(`${this.BASE_URL}/backup/export/payment`);
    }
    importAllDB(data: any): Observable<any> {
        return this.http.post(`${this.BASE_URL}/backup/import/all/db`, data);
    }

}
