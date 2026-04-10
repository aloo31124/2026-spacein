import { Injectable } from '@angular/core';
import { FireStoreService } from 'src/app/firebase-api/services/fire-store.service';
import { CloudFunService } from 'src/app/firebase-api/services/cloud-fun.service';

@Injectable({
  providedIn: 'root'
})
export class RoomSiteService {

  // 教室表
  private roomTable = this.fireStoreService.fireStoreTabelNameList.Room;
  // 座位表
  private siteTable = this.fireStoreService.fireStoreTabelNameList.RoomToSite;

  constructor(
    private fireStoreService: FireStoreService,
    private cloudFunService: CloudFunService,
  ) { }

  /* 
   * [預約空間] 回傳所有 教室,座位 資訊, 並有 booking 時段判斷
   */
  getRoomSiteByDate(timeType:{startDate:string, startTime:string, endTime:string}) {
    return this.cloudFunService.getRoomSiteByDate(timeType);
  }

  /* 
   * 取得所有 教室之資訊列表
   */
  getAllRoomList() {
    return this.fireStoreService.getAll(this.roomTable);
  }

  /* 
   * 取得所有 座位之資訊列表
   */
  getAllSiteList() {
    return this.fireStoreService.getAll(this.siteTable);
  }

}
