import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ChartTimeModel } from 'src/app/review-room/models/chartTimeModel.model';
import { RateModel } from 'src/app/review-room/models/rate.model';
import { Observable } from 'rxjs';
import { TodayRemanent } from 'src/app/review-room/models/today-remanent.model';
import { RoomSiteIsBooking } from 'src/app/common/room-site/models/room-site-isbooking.model';

@Injectable({
  providedIn: 'root'
})
export class CloudFunService {

  cloudFunApiList = {
    // [預約空間] 回傳所有 教室,座位 資訊, 並有 booking 時段判斷, 若已被預約, 則註記 isbooking: true
    ROOM_SITE_BY_BOOKING: "https://getroomsitebydate-querqokzna-uc.a.run.app/",
    // [空間總覽] [借用趨勢] api 
    //REVIEW_ROOM_BOOKING_TREND : "https://getrviewroomchartbytimetype-querqokzna-uc.a.run.app",
    REVIEW_ROOM_BOOKING_TREND : "http://localhost:8081/api/review/room/trend",
    // [空間總覽] 每個月份 [剩餘空間] api 
    //REVIEW_ROOM_RATE: "https://getbookingratelist-querqokzna-uc.a.run.app",
    REVIEW_ROOM_RATE: "http://localhost:8081/api/review/room/rate",
    // [空間總覽] 今日 [剩餘空間] api 
    REVIEW_ROOM_TODAY: "https://gettodayremanent-querqokzna-uc.a.run.app/",
    // [購買方案] [綠界付款] 第三方 選擇付款方式 新視窗畫面
    ECPAY_SELECT_PAY_PAGE : "https://getecpayselectplanpage-querqokzna-uc.a.run.app",
    // [購買方案] [綠界付款] 處理 form 資訊後, 回傳結果
    ECPAY_SELECT_PAY_RESULT : "https://getecpayresult-querqokzna-uc.a.run.app",
  }

  constructor(
    private httpClient: HttpClient,
  ) { }

  /* 
   * [預約空間] 回傳所有 教室,座位 資訊, 並有 booking 時段判斷, 若已被預約, 則註記 isbooking: true
      [
        {"id":"4DGXN...","roomId":"4tz0...r","name":"A001","roomName":"A卓越教室","isBooking":true},
        {"id":"FCq2F...","roomId":"OroZ...","name":"C001","roomName":"C翱翔辦公室","isBooking":true},
      ]
   */
  getRoomSiteByDate(timeType:{startDate:string, startTime:string, endTime:string}): Observable<RoomSiteIsBooking[]> {
    const {startDate, startTime, endTime} = timeType;
    return this.httpClient.get<any>(this.cloudFunApiList.ROOM_SITE_BY_BOOKING + "?startDate=" + startDate + "&startTime=" + startTime + "&endTime=" + endTime);
  }

  /*
   * 取得 [空間總覽] [借用資訊] api 
    roomCount: (6) [0, 0, 0, 0, 3, 3, _chartjs: {…}, push: ƒ, pop: ƒ, shift: ƒ, splice: ƒ, …]
    siteCount: (6) [0, 0, 0, 0, 2, 6, _chartjs: {…}, push: ƒ, pop: ƒ, shift: ƒ, splice: ƒ, …]
    timeTitle: (6) ['11月', '12月', '13月', '14月', '15月', '16月']
   */
  getBookingTrend(timeType:string): Observable<ChartTimeModel> {
    return this.httpClient.get<ChartTimeModel>(this.cloudFunApiList.REVIEW_ROOM_BOOKING_TREND + "?timeType=" + timeType);
  }

  /*
   * 取得 booking 每日剩餘空間 
   * 資料格式:
   * 
    [
      {date:"2024-3-15", rate: 10},
      {date:"2024-3-3", rate: 20},
    ];
   */
  getBookingRate(date: string, roomType: string): Observable<RateModel[]> {
    return this.httpClient.get<RateModel[]>(this.cloudFunApiList.REVIEW_ROOM_RATE + "?date=" + date + "&roomType=" + roomType);
  }

  /*
   * 取得今日 剩餘空間 之 資訊
   {"remanent":3,"totalRoom":3} 
   */
  getTodayRate() {
    return this.httpClient.get<TodayRemanent>(this.cloudFunApiList.REVIEW_ROOM_TODAY);
  }

}
