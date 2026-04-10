import { Injectable } from '@angular/core';
import { FireStoreService } from 'src/app/firebase-api/services/fire-store.service';
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
    private fireStoreService: FireStoreService,
    private httpClient: HttpClient,
  ) { }

  /*
   * 檢查是否顯示 [空間總覽] 
   */
  getAllRoom() {
    const roomTable = this.fireStoreService.fireStoreTabelNameList.Room;
    return this.fireStoreService.getAll(roomTable)
  }

  /*
   * 取得 該 使用者 之 角色
   */
  getUserRole(userId: string) {
    /*                         ng to firestore 全面棄用 !
    const userToRoleTable = this.fireStoreService.fireStoreTabelNameList.UserToRole;
    return this.fireStoreService.getDataByField(userToRoleTable, "userId", userId);
    */
    return this.httpClient.get<any>(`${this.BASE_URL}/role/${userId}`);
  }

  /*
   * 取得權限 
   */
  /*
  getAllPermission() {
    const userToPermissionTable = this.fireStoreService.fireStoreTabelNameList.UserToPermission;
    return this.fireStoreService.getAll(userToPermissionTable);
  }
  */

}
