import { Component } from '@angular/core';
import { Booking } from 'src/app/booking/models/booking.model';
import { RouteUrlRecordService } from 'src/app/auth-route/services/route-url-record.service';
import { DialogItemModel } from 'src/app/common/dialog/models/item.model';
import { BookingService } from 'src/app/booking/services/booking.service';
import { GoogleAuthService } from 'src/app/auth-route/services/google-auth.service';

@Component({
  selector: 'app-review-booking-calendar',
  templateUrl: './review-booking-calendar.component.html',
  styleUrls: ['./review-booking-calendar.component.scss']
})
export class ReviewBookingCalendarComponent {


  // 選擇日期
  selectDateInfo = "";
  // dialog 是否隱藏 該日 之 booking 紀錄
  isHiddenDialogBookingRecord = true;
  // dialog 該日 booking 紀錄陣列
  dialogBookingRecordItemList = new Array<DialogItemModel>();
  // dialog 該日 title
  dialogTitle = "";
  // 所有 booking 紀錄
  bookingList = new Array<Booking>();
  // 畫面 loading 中
  isLoading = true;
  
  
  constructor(
    private routeUrlRecordService: RouteUrlRecordService<Booking>,
    private bookingService: BookingService,
    private googleAuthService: GoogleAuthService,
  ) { }

  ngOnInit(): void {
    this.getAllBookingRecord();
  }

  /* 
   * 從 FireStore 取得所有 booking 日期。
   */
  getAllBookingRecord() {
    const mail = this.googleAuthService.getCurrentUser().email;

    this.bookingService
      .getAllBooking()
      .subscribe(bookingList => {
        this.bookingList = [];
        bookingList
          .forEach(booking => {
            if(booking["mail"] === mail) {
              this.bookingList.push(new Booking(
                //booking["fireStoreId"],
                booking["id"],
                booking["userId"],
                booking["mail"],
                booking["startDate"],
                booking["endDate"],
                booking["startTime"],
                booking["endTime"],
                booking["bookingType"],
                booking["roomId"],
                booking["roomName"],
                booking["siteId"],
                booking["siteName"],
              ));
            }
          });
        this.isLoading = false;
      });
  }



  /*
   * 更新日期元件 之 日期資訊 
   */
  updateSelectDay(selectDayStr: string) {
    this.dialogBookingRecordItemList = [];
    this.selectDateInfo = selectDayStr;
    const [_selectYear, _selectMonth, _selectDay] = this.selectDateInfo.split("-").map(Number);
    const selectDate = new Date(_selectYear, _selectMonth - 1, _selectDay);
    this.bookingList
      .forEach(booking => {
        // 篩選該日期 之前所有 booking 紀錄
        const [_year, _month, _day] = booking.startDate.split("-").map(Number);
        const bookingDate = new Date(_year, _month - 1, _day);
        if(selectDate.getTime() === bookingDate.getTime()) {
          this.dialogBookingRecordItemList.push({
            id: booking.id,
            name: booking.startTime + "~" + booking.endTime +  " \n " + booking.roomName + " " + booking.siteName
          });
        }
      })
    
    if(this.dialogBookingRecordItemList.length > 0){
      this.dialogTitle = _selectMonth + "/" + _selectDay + " 預約時段"
      this.isHiddenDialogBookingRecord = false;
    }
  }

  /*
   * 選擇該日 booking 紀錄, 並導向取消頁面 
   */
  selectBookingToCancle(bookingId: string) {

    this.bookingList
      .forEach(booking => {
        if(booking.id === bookingId) {
          this.routeUrlRecordService.nextPage("review-booking-form", booking);
        }
      });
  }


}
