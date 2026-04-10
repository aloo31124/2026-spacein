import { Injectable } from '@angular/core';
//import { FireStoreService } from 'src/app/firebase-api/services/fire-store.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReviewBookingService {
  private DOMAIN = environment.domain;
  private CONTEXT = "/api/booking";
  private BASE_URL = this.DOMAIN + this.CONTEXT;

  //bookingTableName = this.fireStoreService.fireStoreTabelNameList.Booking;

  constructor(
    //private fireStoreService: FireStoreService,
    private http: HttpClient,
  ) { }

  /* 
   * 使用 fireStoreId 找該員之紀錄 
   */
  getAllBookingDayByUserId() {
    //return this.fireStoreService.getAll(this.bookingTableName);
  }

  /*
   * 使用 fireStoreId ,取消(刪除) 預約booking 紀錄
   */
  deleteBookingById(id: string): Observable<any>  {
    //this.fireStoreService.deleteById(this.bookingTableName, fireStoreId);
    return this.http.delete<any>(`${this.BASE_URL}/delete/${id}`);
  }

}
