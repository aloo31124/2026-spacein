import { Component } from '@angular/core';
import { RouteUrlRecordService } from 'src/app/auth-route/services/route-url-record.service';
import { GoogleAuthService } from 'src/app/auth-route/services/google-auth.service';
import { Booking } from '../../models/booking.model';
import { BookingService } from '../../services/booking.service';
import { Room } from 'src/app/common/room-site/models/room.model';
import { getFullCloseWeekdays, getOpenLimitText, isCloseOnWeekday, WEEKDAY_NAMES } from 'src/app/common/room-site/models/room-open-limit';


@Component({
  selector: 'app-booking-date-page',
  templateUrl: './booking-date-page.component.html',
  styleUrls: ['./booking-date-page.component.scss']
})
export class BookingDatePageComponent {


  // 所有 booking 紀錄
  bookingList = new Array<Booking>();
  // 畫面loading
  isLoading = false;

  // 該使用者綁定擁有者 之 教室清單 (含開放限制欄位)
  roomList: Room[] = [];
  // 所有教室皆不開放之星期, 傳入行事曆標示「休」並卡控
  fullCloseWeekdays: number[] = [];
  // 所選日期 不開放之教室名稱清單, 提醒文字用
  selectDateCloseRoomNames: string[] = [];


  constructor(
    private routeUrlRecordService: RouteUrlRecordService<{}>,
    private bookingService: BookingService,
    private googleAuthService: GoogleAuthService,
  ) { }

  ngOnInit(): void {
    // 取得 教室清單 (含開放限制欄位), 供行事曆「休」標示與提醒文字
    const currentUser = this.googleAuthService.getCurrentUser();
    if(!currentUser) {
      return;
    }
    const userId = currentUser.id;
    this.bookingService
      .loadOwnerRoomList(userId)
      .subscribe({
        next: roomList => {
          this.roomList = roomList;
          this.fullCloseWeekdays = getFullCloseWeekdays(roomList);
          this.refreshSelectDateCloseInfo();
        },
        error: err => {
          console.error("教室開放資訊 取得失敗 err ", err);
        }
      });
  }


  /*
   * 下一步
   */
  nextStep() {

    /*
    // 取得該選擇日期 有幾筆 預約記錄
    const selectDayAllBookingRecordList = this.bookingList.filter(booking => {
      return new Date(booking.startDate).getTime() === new Date(this.bookingService.getSelectDate()).getTime();
    });

    // 檢查該日期是否超過上限
    if(selectDayAllBookingRecordList.length >= this.bookingDaylimit) {
      alert("每日預約上限最多 " + this.bookingDaylimit + "次");
      return;
    }

    // 存入該選擇日期紀錄
    this.bookingService.setThisDayAllBookingRecord(selectDayAllBookingRecordList);
    */

    // 卡控: 所選日期 所有教室皆不開放, 不可下一步
    if(this.roomList.length > 0 &&
        this.selectDateCloseRoomNames.length === this.roomList.length) {
      alert("所選日期為 [每周不開放時段], 教室皆不開放, 請重新選擇日期。");
      return;
    }

    alert("確定下一步？選擇日期為: " + this.bookingService.getSelectDate());
    this.routeUrlRecordService.nextPage("booking-clock", {});
  }


  /*
   * 更新日期元件 之 日期資訊
   * 接收 行事曆 component 的 emit
   */
  getEmitterSelectDay(selectDay: string) {
    this.bookingService.setSelectDate(selectDay);
    this.refreshSelectDateCloseInfo();
  }

  /*
   * 重算 所選日期 不開放之教室名稱清單, 提醒文字用
   */
  refreshSelectDateCloseInfo() {
    this.selectDateCloseRoomNames = [];
    const selectDate = this.bookingService.getSelectDate();
    if(!selectDate || this.roomList.length === 0) {
      return;
    }
    const [year, month, day] = selectDate.split("-").map(Number);
    const weekday = new Date(year, month - 1, day).getDay();
    this.selectDateCloseRoomNames = this.roomList
      .filter(room => isCloseOnWeekday(room, weekday))
      .map(room => room.name);
  }

  /*
   * 所選日期 星期顯示文字, 如「週六」
   */
  getSelectDateWeekdayName(): string {
    const selectDate = this.bookingService.getSelectDate();
    if(!selectDate) {
      return "";
    }
    const [year, month, day] = selectDate.split("-").map(Number);
    return WEEKDAY_NAMES[new Date(year, month - 1, day).getDay()];
  }

  /*
   * 該教室 開放限制 說明文字
   */
  getRoomLimitText(room: Room): string {
    return getOpenLimitText(room);
  }

}
