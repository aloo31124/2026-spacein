import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs/internal/Observable';
import { CloudFunService } from 'src/app/firebase-api/services/cloud-fun.service';
import { ChartTimeModel } from '../models/chartTimeModel.model';
import { RateModel } from '../models/rate.model';
import { TodayRemanent } from '../models/today-remanent.model';

@Injectable({
  providedIn: 'root'
})
export class ReviewRoomService {
  private DOMAIN = environment.domain;
  private CONTEXT = "/api/review/room";
  private BASE_URL = this.DOMAIN + this.CONTEXT;

  constructor(
    private http: HttpClient,
    private cloudFunService: CloudFunService,
  ) { }

  /*
   * 取得 今日剩餘比率資訊
     剩餘 / 空間總數 => 小數點
   */
  getTodayRemanent(): Observable<TodayRemanent> {
    //return this.cloudFunService.getTodayRate();
    return this.http.get<any>(`${this.BASE_URL}/rate/today`);
  }

  /*
   * 取得 booking 變化趨勢 
   */
  getChartByTimeType(timeType:string): Observable<ChartTimeModel> {
    //return this.cloudFunService.getBookingTrend(timeType)
    return this.http.get<any>(`${this.BASE_URL}/chart/${timeType}`);
  }
  
  /*
   * 取得 booking 該月每日剩餘空間 
   */
  getBookingRate(roomType: string, date: string): Observable<RateModel[]> {
    //return this.cloudFunService.getBookingRate(date, roomType);
    return this.http.get<any>(`${this.BASE_URL}/rate/${roomType}/${date}`);
  }

}
