import { Component, EventEmitter, Output, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Booking } from 'src/app/booking/models/booking.model';
import { RateModel } from 'src/app/review-room/models/rate.model';

/*
 * 行事曆單日格子之顯示資訊。
 * 於 切換月份 / @Input 變更 時一次性預先計算,
 * 避免 template 反覆呼叫函式 (每次變更偵測都重算 dot/剩餘率/有效性) 造成效能浪費。
 */
export interface CalendarDayCell {
  day: number;        // 日 (1~31); 0 表示首週前置空格
  isValid: boolean;   // 是否落在可選區間 (今日 ~ +90天)
  isToday: boolean;   // 是否為今日
  dotCount: number;   // 該日預約筆數 (<=3 顯示小點, >3 顯示 more...)
  rateText: string;   // 剩餘率文字 (如 "30%"); 不顯示時為空字串
}

@Component({
  selector: 'app-calendar-picker',
  templateUrl: './calendar-picker.component.html',
  styleUrls: ['./calendar-picker.component.scss']
})
export class CalendarPickerComponent implements OnInit, OnChanges {

  // 可預約區間: 自今日起算 90 天
  private static readonly VALID_RANGE_DAYS = 90;

  // 行事曆白色內容區左右拖曳換月：超過門檻才切換，避免一般點選日期被誤判。
  private static readonly SWIPE_THRESHOLD_PX = 48;
  private swipeStartX: number | null = null;
  private suppressNextDateClick = false;

  // 該日期元件選擇年月日, 格式 "年-月-日" (月/日不補零, 與 Cypress / 父元件約定一致)
  @Output() selectDatInfo = new EventEmitter<string>();

  // 所有 Booking 紀錄
  @Input() bookingList = new Array<Booking>();
  _bookingList = new Array<Booking>();

  // 該空間 其 剩餘率 紀錄
  @Input() rateList: RateModel[] = [];

  // 輸入 當前選擇日期
  @Input() _selectDate = 0;

  // 剩餘比率 (剩餘率 <= showRate 才顯示)
  @Input() showRate = 60;

  // 是否 emit 初始日期
  @Input() isEmitInitDate = true;

  // 星期列標題 (索引對應 Date.getDay())
  readonly weekdayNames = ['日', '一', '二', '三', '四', '五', '六'];

  // 選擇之年月, 用於 切換月份後 判斷選取樣式
  _selectYear = 0;
  _selectMonth = 0;

  // 顯示中的年月
  currentYear = 0;
  currentMonth = 0;

  // 今日 (0時0分), 供有效區間與今日樣式判斷
  private today = new Date();

  // 預先計算之當月日格 (含前置空格)
  dayCells: CalendarDayCell[] = [];

  // 月份切換方向控制滑入動畫；monthViewKeys 改變會重建月份 DOM 以重播動畫。
  monthTransitionDirection: 'next' | 'previous' | '' = '';
  monthViewKeys: string[] = [];

  // 月份導覽是否可用 (整月皆超出可選區間時停用按鈕)
  canGoBackMonth = false;
  canGoNextMonth = true;

  constructor() { }

  ngOnInit(): void {
    const currentDate = new Date();
    this.today = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
    if (this._selectDate === 0) {
      this._selectDate = currentDate.getDate();
    }

    /*
     * cap build 於 安卓/ios 父元件 會重複 @input 賦值
     * 法1: (暫時解)將 bookingList 進行深度拷貝
     */
    this._bookingList = Array.from(this.bookingList);

    this.currentYear = currentDate.getFullYear();
    this.currentMonth = currentDate.getMonth() + 1; // 月份從0開始算，後續計算需加1
    this._selectYear = this.currentYear;
    this._selectMonth = this.currentMonth;
    this.rebuildDayCells();

    if (this.isEmitInitDate) {
      this.emitDateInfo();
    }
  }

  /*
   * bookingList / rateList / showRate 由父元件非同步載入後變更時,
   * 重新計算日格資訊, 確保 dot 與剩餘率即時反映。
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (this.currentYear === 0) {
      return; // ngOnInit 尚未執行 (首次 @Input 賦值), 由 ngOnInit 統一計算
    }
    if (changes['bookingList']) {
      this._bookingList = Array.from(this.bookingList);
    }
    this.rebuildDayCells();
  }

  /*
   * 重建 當月所有日格之顯示資訊 (前置空格 + 每日有效性/今日/預約點數/剩餘率),
   * 預約筆數與剩餘率先建立查表 Map, 整月僅掃描列表一次。
   */
  private rebuildDayCells(): void {
    const daysInMonth = new Date(this.currentYear, this.currentMonth, 0).getDate();
    const firstDayWeekday = new Date(this.currentYear, this.currentMonth - 1, 1).getDay();

    // 該月每日預約筆數查表: day -> count
    const dotCountMap = new Map<number, number>();
    this._bookingList.forEach(booking => {
      const [year, month, day] = String(booking.startDate).split('-').map(Number);
      if (year === this.currentYear && month === this.currentMonth) {
        dotCountMap.set(day, (dotCountMap.get(day) ?? 0) + 1);
      }
    });

    // 剩餘率查表: day -> rateText (沿用既有規則: 同日取第一筆, 剩餘率 <= showRate 才顯示)
    const rateTextMap = new Map<number, string>();
    (this.rateList ?? []).forEach(rate => {
      const day = new Date(rate.date).getDate();
      if (!rateTextMap.has(day)) {
        rateTextMap.set(day, rate.rate <= this.showRate ? rate.rate + '%' : '');
      }
    });

    const cells: CalendarDayCell[] = [];
    for (let i = 0; i < firstDayWeekday; i++) {
      cells.push({ day: 0, isValid: false, isToday: false, dotCount: 0, rateText: '' });
    }
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(this.currentYear, this.currentMonth - 1, day);
      cells.push({
        day,
        isValid: this.checkDateValid(date),
        isToday: date.getTime() === this.today.getTime(),
        dotCount: dotCountMap.get(day) ?? 0,
        rateText: rateTextMap.get(day) ?? '',
      });
    }
    this.dayCells = cells;

    const monthViewKey = this.currentYear + '-' + this.currentMonth;
    if (this.monthViewKeys[0] !== monthViewKey) {
      this.monthViewKeys = [monthViewKey];
    }

    // 顯示月 已是今日當月 → 不可再往前; 下月首日 已超出可選區間 → 不可再往後
    this.canGoBackMonth =
      this.currentYear > this.today.getFullYear() ||
      (this.currentYear === this.today.getFullYear() && this.currentMonth > this.today.getMonth() + 1);
    this.canGoNextMonth =
      this.checkDateValid(new Date(this.currentYear, this.currentMonth, 1));
  }

  /*
   * ngFor trackBy: 以格子索引追蹤, 切換月份時重用 DOM 節點
   */
  trackByIndex(index: number): number {
    return index;
  }

  /*
   * 在白色日期區水平拖曳：向左為下個月、向右為上個月。
   * 使用 Pointer Events 同時支援滑鼠與觸控，垂直方向仍交由頁面正常捲動。
   */
  onCalendarPointerDown(event: PointerEvent): void {
    if (!event.isPrimary || event.button !== 0) {
      return;
    }
    this.swipeStartX = event.clientX;
    // 不在 pointerdown 立即 setPointerCapture：一般點擊日期時，capture 會把後續 click
    // 重新導向 calendar-content，造成日期格本身收不到 click 而無法選取。
  }

  onCalendarPointerUp(event: PointerEvent): void {
    if (this.swipeStartX === null) {
      return;
    }

    const distanceX = event.clientX - this.swipeStartX;
    this.swipeStartX = null;
    if (Math.abs(distanceX) < CalendarPickerComponent.SWIPE_THRESHOLD_PX) {
      return;
    }

    this.suppressNextDateClick = true;
    // click 會緊接在 pointerup 後同一事件序列送出；下一個 task 自動解除，
    // 避免從空白處拖曳（沒有 click）後，使用者下一次真正點日期反而被略過。
    setTimeout(() => this.suppressNextDateClick = false, 0);
    if (distanceX < 0) {
      this.nextMonth();
    } else {
      this.backMonth();
    }
  }

  onCalendarPointerCancel(): void {
    this.swipeStartX = null;
  }

  /*
   * 上個月 (已在今日當月時停用)
   */
  backMonth(): void {
    if (!this.canGoBackMonth) {
      return;
    }
    this.monthTransitionDirection = 'previous';
    this.currentMonth = this.currentMonth - 1;
    this.checkMonth();
    this.rebuildDayCells();
  }

  /*
   * 下個月 (下月已無可選日期時停用)
   */
  nextMonth(): void {
    if (!this.canGoNextMonth) {
      return;
    }
    this.monthTransitionDirection = 'next';
    this.currentMonth = this.currentMonth + 1;
    this.checkMonth();
    this.rebuildDayCells();
  }

  /*
   * 回到今日: 跳回今日當月 並 選取今日
   */
  goToday(): void {
    this.monthTransitionDirection = 'previous';
    this.currentYear = this.today.getFullYear();
    this.currentMonth = this.today.getMonth() + 1;
    this.rebuildDayCells();
    this.selectDate(this.today.getDate());
  }

  /*
   * 是否正在顯示 今日當月 (是則隱藏「回今日」按鈕)
   */
  isDisplayTodayMonth(): boolean {
    return this.currentYear === this.today.getFullYear() &&
           this.currentMonth === this.today.getMonth() + 1;
  }

  /*
   * 確認月份若非 1 <= month <= 12，則切換年分。
   */
  private checkMonth(): void {
    if (this.currentMonth < 1) {
      this.currentMonth = 12;
      this.currentYear = this.currentYear - 1;
      return;
    }
    if (this.currentMonth > 12) {
      this.currentMonth = 1;
      this.currentYear = this.currentYear + 1;
    }
  }

  /*
   * 確認被選擇日期樣式是否顯示 (需與顯示中年月一致)
   */
  checkSelectDayStyle(day: number): boolean {
    return this._selectYear === this.currentYear &&
           this._selectMonth === this.currentMonth &&
           this._selectDate === day;
  }

  /*
   * 選擇日期: 僅可選 有效區間內日期, 選取後 emit 父元件
   */
  selectDate(day: number): void {
    // 拖曳放開後瀏覽器可能補送 click；略過一次，避免換月同時誤選日期。
    if (this.suppressNextDateClick) {
      this.suppressNextDateClick = false;
      return;
    }
    if (day <= 0 || !this.checkDateValid(new Date(this.currentYear, this.currentMonth - 1, day))) {
      return;
    }
    this._selectYear = this.currentYear;
    this._selectMonth = this.currentMonth;
    this._selectDate = day;
    this.emitDateInfo();
  }

  /*
   * 確認日期是否有效 (今日 ~ +90天)
   */
  private checkDateValid(date: Date): boolean {
    if (date.getTime() < this.today.getTime()) {
      return false;
    }
    return (date.getTime() - this.today.getTime()) / 3600000 <= CalendarPickerComponent.VALID_RANGE_DAYS * 24;
  }

  /*
   * 射出 年月日資訊, 格式 "年-月-日" (不補零)
   */
  private emitDateInfo(): void {
    const day = this._selectDate !== 0 ? this._selectDate : 1;
    this.selectDatInfo.emit(this._selectYear + '-' + this._selectMonth + '-' + day);
  }

}
