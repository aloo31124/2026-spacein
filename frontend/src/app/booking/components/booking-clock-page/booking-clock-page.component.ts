import { Component, OnInit } from '@angular/core';
import { RouteUrlRecordService } from 'src/app/auth-route/services/route-url-record.service';
import { GoogleAuthService } from 'src/app/auth-route/services/google-auth.service';
import { BookingService } from '../../services/booking.service';
import {
  WEEKDAY_NAMES,
  isRoomClosedOnDate,
  isTimeOutsideOpenRange,
  parseWeekdayFromDateStr,
} from 'src/app/common/owner-default/utils/room-open-rule.util';

/*
 * 選擇時段頁:
 * 時鐘面 UI 與拖曳邏輯已抽離至共用元件 app-clock-picker,
 * 本頁僅負責 開始/結束欄位切換、時間寫回 service、教室卡控提醒 與 下一步導頁。
 */
@Component({
  selector: 'app-booking-clock-page',
  templateUrl: './booking-clock-page.component.html',
  styleUrls: ['./booking-clock-page.component.scss']
})
export class BookingClockPageComponent implements OnInit {

  // 目前選取欄位: true = 開始時間, false = 結束時間
  isSelectStartTimeInput = true;

  // 所選時段 卡控教室提醒列表 (教室名 + 卡控原因), 選時間後即時顯示
  timeRuleHintList: { roomName: string, reason: string }[] = [];

  constructor(
    private routeUrlRecordService: RouteUrlRecordService<{}>,
    private bookingService: BookingService,
    private googleAuthService: GoogleAuthService,
  ) {}

  ngOnInit(): void {
    // 進頁面即重新載入教室開放資訊 (每次進入重抓, 教室設定被更新後 提醒仍正確),
    // 之後每次選時間 皆在前端記憶體計算, 即時反應不打 API
    const userId = this.googleAuthService.getCurrentUser()?.id;
    if (!userId) {
      return;
    }
    this.bookingService.loadOpenRuleRoomList(userId).subscribe({
      next: () => this.updateTimeRuleHint(),
      error: () => {} // 提醒屬輔助資訊, 取得失敗不擋預約流程 (後端存檔前仍會卡控)
    });
  }

  /*
   * 點選欄位即明確切換 (取代舊版 toggle: 點已選取欄位會誤切到另一欄位)
   */
  selectStartInput(): void {
    this.isSelectStartTimeInput = true;
  }

  selectEndInput(): void {
    this.isSelectStartTimeInput = false;
  }

  /*
   * 目前選取欄位之時間, 傳入時鐘元件同步時鐘面 (切換欄位時 時鐘跟著顯示該欄位時間)
   */
  getActiveTime(): string {
    return this.isSelectStartTimeInput ? this.getStartTime() : this.getEndTime();
  }

  /*
   * 接收 時鐘元件 emit 之時間 (HH:mm), 寫回 目前選取欄位
   */
  onTimeChange(time: string): void {
    if (this.isSelectStartTimeInput) {
      this.bookingService.setStartTime(time);
    } else {
      this.bookingService.setEndTime(time);
    }
    this.updateTimeRuleHint();
  }

  /*
   * 從 service 取得 開始時間
   */
  getStartTime(): string {
    return this.bookingService.getStartTime();
  }

  /*
   * 從 service 取得 結束時間
   */
  getEndTime(): string {
    return this.bookingService.getEndTime();
  }

  /*
   * 重算 所選時段 教室卡控提醒:
   * 純記憶體計算 (資料已由 loadOpenRuleRoomList 快取), 每次選時間即時反應。
   * 卡控規則與後端 checkRoomOpenRule 一致:
   *  1. 每周不開放星期 (選擇日期 落在教室 closedWeekdays)
   *  2. 每天開放時段 (所選起訖時間 超出教室 openStartTime~openEndTime)
   */
  updateTimeRuleHint(): void {
    const selectDate = this.bookingService.getSelectDate();
    const startTime = this.getStartTime();
    const endTime = this.getEndTime();

    const hintList: { roomName: string, reason: string }[] = [];
    this.bookingService.openRuleRoomList.forEach(room => {
      // 該日整天不開放, 優先提醒 (不再重複提醒時段)
      if (selectDate && isRoomClosedOnDate(room, selectDate)) {
        const weekdayName = WEEKDAY_NAMES[parseWeekdayFromDateStr(selectDate)] ?? "";
        hintList.push({ roomName: room.name, reason: `${selectDate}（${weekdayName}）不開放` });
        return;
      }
      if (isTimeOutsideOpenRange(room, startTime, endTime)) {
        hintList.push({ roomName: room.name, reason: `開放時段 ${room.openStartTime}~${room.openEndTime}` });
      }
    });
    this.timeRuleHintList = hintList;
  }

  /*
   * 按下下一步 icon , 檢查時段, 並路由導向
   */
  nextStep(): void {
    if (!this.checkValidTime()) {
      return;
    }

    alert("選擇時段: " + this.getStartTime() + "~" + this.getEndTime());
    this.routeUrlRecordService.nextPage("booking-select-type", {});
  }

  /*
   * 確認選擇時段卡控是否正確:
   *  1. 開始時間 需小於 結束時間
   */
  checkValidTime(): boolean {
    const [_year, _month, _day] = this.bookingService.getSelectDate().split("-").map(Number);
    const [_startHour, _startMin] = this.getStartTime().split(":").map(Number);
    const [_endHour, _endMin] = this.getEndTime().split(":").map(Number);
    const selectStartTime = new Date(_year, _month - 1, _day, _startHour, _startMin).getTime();
    const selectEndTime = new Date(_year, _month - 1, _day, _endHour, _endMin).getTime();

    if (selectStartTime >= selectEndTime) {
      alert("開始時間必須早於結束時間, 請重新選擇時段。");
      return false;
    }
    return true;
  }

}
