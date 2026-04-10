import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private DOMAIN = environment.domain;
  private CONTEXT = "/api/account";
  private BASE_URL = this.DOMAIN + this.CONTEXT;

  constructor(
    private httpClient: HttpClient,
  ) { }

  /*
   * 取得 該 擁有者, 依照 email
   */
  getOwner(email: string) {
    return this.httpClient.get<any>(`${this.BASE_URL}/owner/${email}`);
  }

  /*
   * 新增 預約者 對應 擁有者
   */
  postUserToOwner(userId: string, ownerId: string) {
    return this.httpClient.post<any>(`${this.BASE_URL}/owner/add`,{userToOwner: {userId, ownerId}});
  }

  /*
   * 新增 預約者 對應 角色
   */
  postUserToRole(userId: string) {
    return this.httpClient.post<any>(`${this.BASE_URL}/role/add`,{userToRole: {userId, role: "booker"}});
  }

}
