import { Component } from '@angular/core';
import { RouteUrlRecordService } from 'src/app/auth-route/services/route-url-record.service';
import { GoogleAuthService } from 'src/app/auth-route/services/google-auth.service';
import { Booking } from '../../models/booking.model';
import { BookingService } from '../../services/booking.service';
import { Room } from 'src/app/common/room-site/models/room.model';
import {
  WEEKDAY_NAMES,
  isRoomClosedOnDate,
  parseWeekdayFromDateStr,
} from 'src/app/common/owner-default/utils/room-open-rule.util';


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

  // 該選擇日期 不開放的教室列表 (每周不開放星期 命中), 選日期後即時顯示提醒
  closedRoomList: Room[] = [];
  // 選擇日期 之 星期顯示名稱, 如 "星期日"
  selectDateWeekdayName = "";


  constructor(
    private routeUrlRecordService: RouteUrlRecordService<{}>,
    private bookingService: BookingService,
    private googleAuthService: GoogleAuthService,
  ) { }

  ngOnInit(): void {
    // 進頁面即重新載入教室開放資訊 (每次進入重抓, 教室設定被更新後 提醒仍正確),
    // 之後每次點選日期 皆在前端記憶體過濾, 即時反應不打 API
    const userId = this.googleAuthService.getCurrentUser()?.id;
    if (!userId) {
      return;
    }
    this.bookingService.loadOpenRuleRoomList(userId).subscribe({
      next: () => this.updateClosedRoomHint(),
      error: () => {} // 提醒屬輔助資訊, 取得失敗不擋預約流程 (後端存檔前仍會卡控)
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

    alert("確定下一步？選擇日期為: " + this.bookingService.getSelectDate());
    this.routeUrlRecordService.nextPage("booking-clock", {});
  }


  /*
   * 更新日期元件 之 日期資訊
   * 接收 行事曆 component 的 emit
   */
  getEmitterSelectDay(selectDay: string) {
    this.bookingService.setSelectDate(selectDay);
    this.updateClosedRoomHint();
  }

  /*
   *  從 service 取得 選擇日期
   */
  getSelectDate() {
    return this.bookingService.getSelectDate();
  }

  /*
   * 重算 該選擇日期 不開放教室提醒:
   * 純記憶體過濾 (資料已由 loadOpenRuleRoomList 快取), 點選日期即時反應
   */
  updateClosedRoomHint() {
    const selectDate = this.bookingService.getSelectDate();
    if (!selectDate) {
      this.closedRoomList = [];
      this.selectDateWeekdayName = "";
      return;
    }
    this.selectDateWeekdayName = WEEKDAY_NAMES[parseWeekdayFromDateStr(selectDate)] ?? "";
    this.closedRoomList = this.bookingService.openRuleRoomList
      .filter(room => isRoomClosedOnDate(room, selectDate));
  }

}
