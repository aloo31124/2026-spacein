import { Component, EventEmitter, Output, Input } from '@angular/core';
import { Booking } from 'src/app/booking/models/booking.model';
import { RateModel } from 'src/app/review-room/models/rate.model';

@Component({
  selector: 'app-calendar-picker',
  templateUrl: './calendar-picker.component.html',
  styleUrls: ['./calendar-picker.component.scss']
})
export class CalendarPickerComponent {

  // 供 template 使用 Array.from
  readonly Array = Array;


  // 該日期元件選擇年月日
  @Output() selectDatInfo = new EventEmitter<string>();

  // 所有 Booking 紀錄
  @Input() bookingList = new Array<Booking>();
  _bookingList = new Array<Booking>();

  // 該空間 其 剩餘率 紀錄
  @Input() rateList: RateModel[] = [];
  
  // 輸入 當前選擇日期
  @Input() _selectDate = 0;

  // 剩餘比率
  @Input() showRate = 60;

  // 是否 emit初始日期
  @Input() isEmitInitDate = true;

  // 每周不開放時段 (0=周日 ~ 6=周六), 所有教室皆不開放之星期, 該日標示「休」且不可選擇
  @Input() weeklyCloseDays: number[] = [];

  // 選擇月份, 用於 切換月份判斷
  _selectMonth = 0;

  currentYear = 0;
  currentMonth = 0;
  currentDay = 0;
  currentMonthAllDay = 0;
  currentMonthFirstDay?: Date;
  currentMonthFirstDayWeekly = 0;
  displayAllDayGrid = 0

  constructor() { }

  ngOnInit(): void {
    //取得當前日期
    const currentDate = new Date();
    if(this._selectDate === 0){
      this._selectDate = currentDate.getDate();
    }

    /*
     * cap build 於 安卓/ios 父元件 會重複 @input 賦值
     * 法1: (暫時解)將 bookingList 進行深度拷貝,  
     */
    this._bookingList = Array.from(this.bookingList);

    //取得當前年月
    this.currentYear = currentDate.getFullYear();
    this.currentMonth = currentDate.getMonth() + 1; //月份從0開始算，後續計算需加1
    this._selectMonth = this.currentMonth;
    this.currentDay = currentDate.getDate();
    this.setCalendarDateInfo(false);
  }


  /* 
   * 初始、切換月份後重取月份資訊。
   */
  setCalendarDateInfo(isChangeMonth: boolean) {
    //取得當前月份總日數
    this.currentMonthAllDay = new Date(this.currentYear, this.currentMonth , 0).getDate();

    //當前月份首日星期
    this.currentMonthFirstDay = new Date(this.currentYear, this.currentMonth - 1, 1);
    this.currentMonthFirstDayWeekly = this.currentMonthFirstDay.getDay();
    
    //需要呈現之日期格子數
    this.displayAllDayGrid = this.currentMonthAllDay + this.currentMonthFirstDayWeekly;

    // emmit 更改 選擇日期
    if(this._selectMonth !== this.currentMonth || isChangeMonth) {
      return; // 按下 切換月份按鈕, 不 emit 父元件 選擇日期
    }
    if(this.isEmitInitDate) {
      const selectDate = this.currentYear + '-' + this.currentMonth + '-' + this._selectDate;
      this.selectDatInfo.emit(selectDate);
    }
  }




  /*
   * 計算該日期(數字) 包含次數 
   */
  countDot(checkDateNumber: number) {
    if(checkDateNumber <= 0){
      return 0;
    }
    const checkDate = new Date(this.currentYear, this.currentMonth - 1, checkDateNumber);
    const filterBooking = this._bookingList
      .filter(booking => {
        const [year, month, day] = booking.startDate.split("-").map(Number);
        return (new Date(year, month - 1, day).getTime() === checkDate.getTime());
      });
    return filterBooking.length;
  }


  /* 
   * 上個月。
   */
  backMonth() {
    this.currentMonth = this.currentMonth - 1;
    this.checkMonth();
    this.setCalendarDateInfo(true);
  }


  /* 
   * 下個月。
   */
  nextMonth() {
    this.currentMonth = this.currentMonth + 1;
    this.checkMonth();
    this.setCalendarDateInfo(true);
  }

  /*
   * 確認月份若非 1 <= month <= 12，則切換年分。
   */
  checkMonth() {
    if(1 <= this.currentMonth && this.currentMonth <= 12) {
      return;
    }

    if(this.currentMonth < 1) {
      this.currentMonth = 12;
      this.currentYear = this.currentYear - 1;   
      return;   
    }

    if(this.currentMonth > 12) {
      this.currentMonth = 1;
      this.currentYear = this.currentYear + 1;   
      return;   
    }
  }
  

  /*
   * 確認是否當前日期樣式是否顯示
   */
  checkCurrentDayStyle(_selectDate: Date) {
    const _currentDate = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
    return this.checkDateValid(_selectDate) &&
            _selectDate.getTime() === _currentDate.getTime();
  }


  /*
   * 確認被選擇日期樣式是否顯示 
   */
  checkSelectDayStyle(_selectDate: number) {
    return  this.checkDateValid(this.changeDateObj(_selectDate)) &&
            this._selectMonth === this.currentMonth && // 切換月份, 不觸發選擇日期
            this._selectDate === _selectDate;
  }


  /*
   * 確認 該日期(數字) 是否為 每周不開放時段, 用於「休」標示與卡控
   */
  checkWeeklyClose(date: number): boolean {
    if(date <= 0) {
      return false;
    }
    return this.weeklyCloseDays.includes(this.changeDateObj(date).getDay());
  }


  /*
   * 選擇日期
   */
  selectDate(date: number) {
    if(!this.checkDateValid(this.changeDateObj(date))) {
      return
    }
    // 每周不開放時段 卡控, 文字提醒且不可選擇
    if(this.checkWeeklyClose(date)) {
      alert("該日為 [每周不開放時段], 教室皆不開放, 請選擇其他日期。");
      return;
    }
    if( date > 0 ) {
      this._selectMonth = this.currentMonth;
      this._selectDate = date;
    }
    this.emitDateInfo();
  }


  /* 
   * 確認日期是否有效
   */
  checkDateValid(_selectDate: Date):boolean {
    const _currentDate = new Date(new Date().getFullYear(), new Date().getMonth(), this.currentDay);
    if(_selectDate.getTime() < _currentDate.getTime()) {
      return false;
    }
    if((_selectDate.getTime() - _currentDate.getTime())/3600000 > 90*24) {
      return false;
    }
    return true;
  }

  /*
   * 將 數字轉 Date 件 
   */
  changeDateObj(_selectDate: number) {
    return new Date(this.currentYear, this.currentMonth - 1, _selectDate);
  }
  

  /*
   * 射出 年月日資訊 
   * 與 當天 所有 booking 紀錄, 方便卡控
   */
  emitDateInfo() {
    let selectDate = this.currentYear + '-' + this.currentMonth + '-' + "1";
    if(this._selectDate != 0){
      selectDate = this.currentYear + '-' + this.currentMonth + '-' + this._selectDate;
    }
    this.selectDatInfo.emit(selectDate);

    const selectDayAllBookingRecord = this._bookingList
      .filter(booking => {
        return (new Date(booking.startDate).getTime() === new Date(selectDate).getTime());
      });
  }


  /* 
   * 行事曆日期逐個判斷, 顯示剩餘率 %
   */
  isShowRate(date: number): string {
    if(!this.rateList) {
      return "";
    }
    const rateDate = this.rateList.filter(rate => { return new Date(rate.date).getDate() === date })[0];
    if(!rateDate) {
      return "";
    }
    if(this.showRate < rateDate.rate) {
      return "";
    }
    return rateDate.rate + "%";
  }

}
