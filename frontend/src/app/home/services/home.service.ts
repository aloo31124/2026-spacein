import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  private DOMAIN = environment.domain;
  private CONTEXT = "/api/account";
  private BASE_URL = this.DOMAIN + this.CONTEXT;

  constructor(
    private httpClient: HttpClient,
  ) { }

  /*
   * 取得 該 使用者 之 角色
   */
  getUserRole(userId: string) {
    return this.httpClient.get<any>(`${this.BASE_URL}/role/${userId}`);
  }

}
