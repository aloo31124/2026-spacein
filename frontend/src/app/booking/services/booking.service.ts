import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
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
  // 本次預約流程之 教室清單快取 (含開放限制欄位), 供 日期頁行事曆提醒 與 時鐘頁卡控 共用
  private ownerRoomList: Room[] = [];

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
   * 取得 該使用者綁定擁有者 之 教室清單 (含開放限制欄位), 取得後快取
   * 供 預約流程 日期頁(行事曆不開放提醒) 與 時鐘頁(開放時段提醒/卡控) 共用, 避免重複打 API
   */
  loadOwnerRoomList(userId: string): Observable<Room[]> {
    if(this.ownerRoomList.length > 0) {
      return of(this.ownerRoomList);
    }
    return this.getRoomByOwnerId(userId)
      .pipe(
        map(roomList => roomList.map(room => new Room(room))),
        tap(roomList => this.ownerRoomList = roomList),
      );
  }

  /* 
   * 取得所有 booking 資料
   */
  getAllSiteList(): Observable<any> {
    return this.http.get<any>(`${this.BASE_URL}/roomtosite/all`);
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
