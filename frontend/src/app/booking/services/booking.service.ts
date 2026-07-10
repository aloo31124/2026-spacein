import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Booking } from '../models/booking.model';
import { Room } from 'src/app/common/room-site/models/room.model';
import { RoomSiteIsBooking } from 'src/app/common/room-site/models/room-site-isbooking.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private DOMAIN = environment.domain;
  private CONTEXT = "/api/booking";
  private BASE_URL = this.DOMAIN + this.CONTEXT;

    
  // 本次預約流程之 選擇日期
  private selectDateInfo = "";
  // 本次預約流程之 開始時間
  startTime = "09:00";
  // 本次預約流程之 結束時間
  endTime = "09:00";
  // 本次預約流程中 選擇日期 之前 已經存在之預約記錄
  selectDayAllBookingRecordList: Booking[] =[];
  // 預約流程之 教室開放資訊列表 (每周不開放星期/每天開放時段), 供 行事曆/時鐘 頁即時卡控提醒
  openRuleRoomList: Room[] = [];

  constructor(
    private http: HttpClient,
  ) { }

  /* 
   * 取得 本次預約流程之 選擇日期
   */
  getSelectDate() {
    return this.selectDateInfo;
  }

  /* 
   * 設定 本次預約流程之 選擇日期
   */
  setSelectDate(selectDate: string) {
    this.selectDateInfo = selectDate;
  }

  /* 
   * 取得 本次預約流程之 開始時間
   */
  getStartTime() {
    return this.startTime;
  }
  /* 
   * 設定 本次預約流程之 開始時間
   */
  setStartTime(startTime: string) {
    this.startTime = startTime;
  }

  /* 
   * 取得 本次預約流程之 結束時間
   */
  getEndTime() {
    return this.endTime;
  }

  /* 
   * 設定 本次預約流程之 結束時間
   */
  setEndTime(endTime: string) {
    this.endTime = endTime;
  }

  /*
   *  取得 本次預約流程中 選擇日期 之前 已經存在之預約記錄
   */
  getThisDayAllBookingRecord() {
    return this.selectDayAllBookingRecordList;
  }

  /*
   *  設定 本次預約流程中 選擇日期 之前 已經存在之預約記錄
   */
  setThisDayAllBookingRecord(list: Booking[]) {
    this.selectDayAllBookingRecordList = [];
    this.selectDayAllBookingRecordList = list;
  }

  /* 
   * 取得所有 booking 資料
   */
  getAllBooking(): Observable<Booking[]> {
    return this.http.get<any>(`${this.BASE_URL}/all`);
  }

  /* 
   * 取得所有 booking 資料
   */
  getRoomByOwnerId(userId: string): Observable<Room[]> {
    return this.http.get<any>(`${this.BASE_URL}/room/userId/${userId}`);
  }

  /* 
   * 取得所有 booking 資料
   */
  getAllSiteList(): Observable<any> {
    return this.http.get<any>(`${this.BASE_URL}/roomtosite/all`);
  }

  /*
   * 載入 教室開放資訊列表 並快取於 service:
   * - 每次「進入頁面」重新抓一次, 教室設定 (每周不開放/每天開放時段) 被更新後, 提醒仍保持正確。
   * - 之後 每次點選日期/時間 的檢查 皆在前端記憶體計算 (openRuleRoomList), 不再打 API,
   *   確保即時反應與效能; 後端存檔前仍有 checkRoomOpenRule 最終卡控。
   */
  loadOpenRuleRoomList(userId: string): Observable<Room[]> {
    return this.getRoomByOwnerId(userId).pipe(
      map(roomList => (roomList || []).map(room => new Room(room))),
      tap(roomList => this.openRuleRoomList = roomList)
    );
  }

  /*
   * 新增一筆 booking 資料
   */
  post(booking: Booking): Observable<ArrayBuffer> {
    return this.http.post<any>(`${this.BASE_URL}/add`, {booking});
  }


  /*
  * 回傳所有 教室,座位 資訊, 並有 booking 時段判斷, 若已被預約, 則註記 isbooking: true
  */
  getRoomSiteByDate(startDate:string, startTime:string, endTime:string) : Observable<RoomSiteIsBooking[]> {
    return this.http.get<any>(`${this.BASE_URL}/roomtosite/${startDate}/${startTime}/${endTime}`);
  }

}
