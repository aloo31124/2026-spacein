import { Injectable } from '@angular/core';
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

  constructor(
    private http: HttpClient,
  ) { }

  /*
   * 使用 id ,取消(刪除) 預約booking 紀錄
   */
  deleteBookingById(id: string): Observable<any>  {
    return this.http.delete<any>(`${this.BASE_URL}/delete/${id}`);
  }

}
