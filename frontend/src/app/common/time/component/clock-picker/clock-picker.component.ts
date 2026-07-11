import { Component, ElementRef, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';

/*
 * 共用 時鐘選擇器 元件:
 * 由 booking-clock-page 抽離之可重用時鐘面, 支援 點選數字 與 拖曳指針 兩種操作。
 *   - @Input  time:            目前時間 (HH:mm, 24小時制), 外部變更時同步時鐘面
 *   - @Input  isMinuteEnabled: 是否可選分鐘 (false 時最小單位 1 小時, 點分鐘顯示頁內提示)
 *   - @Output timeChange:      使用者每次選取後射出 HH:mm (24小時制, 補零)
 * 注意: Cypress E2E 依賴 `.clock i` 點選小時數字, 類名與結構不可改。
 */
@Component({
  selector: 'app-clock-picker',
  templateUrl: './clock-picker.component.html',
  styleUrls: ['./clock-picker.component.scss']
})
export class ClockPickerComponent implements OnChanges {

  // 時鐘面元素參考，用於計算拖曳指針時的中心點與半徑
  @ViewChild('clockFace') clockFaceRef!: ElementRef<HTMLElement>;

  // 目前時間 (HH:mm, 24小時制)
  @Input() time = '09:00';

  // 是否可選分鐘 (預約流程最小單位 1 小時, 傳 false)
  @Input() isMinuteEnabled = true;

  // 選取後射出 HH:mm (24小時制)
  @Output() timeChange = new EventEmitter<string>();

  // 時鐘面數字 (12 在正上方, 順時針排列; 分鐘以 5 分鐘為一刻度)
  readonly hourNumbers = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  readonly minuteNumbers = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];

  // 目前選取 (小時為 12 小時制 1~12)
  _selectHour = 9;
  _selectMin = 0;
  isSelectHour = true;
  isSelectMin = false;
  isAm = true;
  isPm = false;

  // 分鐘不可選之頁內提示文字 (取代 alert, 不中斷操作)
  minuteHint = '';
  private minuteHintTimer?: ReturnType<typeof setTimeout>;

  // 是否正在拖曳指針
  private isDragging = false;

  // 此 WebView 是否支援 Pointer Events。
  // - 支援（多數現代 Android WebView / iOS 13+ WKWebView）：僅用 Pointer Events 同時涵蓋滑鼠與觸控。
  // - 不支援（部分舊版 iOS WKWebView）：改用 Touch Events 後備，確保手指仍能拖曳。
  private readonly supportsPointer =
    typeof window !== 'undefined' && 'PointerEvent' in window;

  /*
   * 外部 [time] 變更時 (如 切換 開始/結束 欄位) 同步時鐘面顯示。
   * 自身 emit 後父元件回寫相同字串不會觸發 (Angular 值未變不觸發 OnChanges)。
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['time']) {
      this.parseTime(this.time);
    }
  }

  /*
   * 解析 HH:mm (24小時制) 為 時鐘面內部狀態 (12小時制 + AM/PM)
   */
  private parseTime(time: string): void {
    const [hour, min] = String(time ?? '').split(':').map(Number);
    if (isNaN(hour)) {
      return;
    }
    this.isPm = hour >= 12;
    this.isAm = !this.isPm;
    this._selectHour = hour % 12 === 0 ? 12 : hour % 12;
    this._selectMin = isNaN(min) ? 0 : min;
  }

  /*
   * 取得 24 小時制 小時字串 (修正舊版 12AM/12PM 換算: 12AM -> 00, 12PM -> 12)
   */
  getHourString(): string {
    let hour = this._selectHour % 12;
    if (this.isPm) {
      hour += 12;
    }
    return hour.toString().padStart(2, '0');
  }

  getMinString(): string {
    return this._selectMin.toString().padStart(2, '0');
  }

  /* 分鐘數字補零顯示 (0 -> "00") */
  formatMinute(min: number): string {
    return min.toString().padStart(2, '0');
  }

  /*
   * 切換為 選小時 模式
   */
  selectHour(): void {
    this.isSelectHour = true;
    this.isSelectMin = false;
  }

  /*
   * 切換為 選分鐘 模式; 分鐘不可選時 顯示頁內提示 (不用 alert 中斷操作)
   */
  selectMin(): void {
    if (!this.isMinuteEnabled) {
      this.showMinuteHint();
      return;
    }
    this.isSelectHour = false;
    this.isSelectMin = true;
  }

  private showMinuteHint(): void {
    this.minuteHint = '預約時段最小單位為 1 小時';
    clearTimeout(this.minuteHintTimer);
    this.minuteHintTimer = setTimeout(() => this.minuteHint = '', 2500);
  }

  selectAm(): void {
    this.isAm = true;
    this.isPm = false;
    this.emitTime();
  }

  selectPm(): void {
    this.isAm = false;
    this.isPm = true;
    this.emitTime();
  }

  /*
   * 選取 時鐘面數字 (依目前模式套用至 小時 或 分鐘) 並 emit
   */
  selectTime(selectTime: number): void {
    if (this.isSelectHour) {
      this._selectHour = selectTime;
    }
    if (this.isSelectMin) {
      this._selectMin = selectTime;
    }
    this.emitTime();
  }

  private emitTime(): void {
    this.timeChange.emit(this.getHourString() + ':' + this.getMinString());
  }

  /*
   * 指針角度: 選小時 每格 30 度; 選分鐘 每分鐘 6 度
   */
  getHandAngle(): number {
    return this.isSelectHour ? (this._selectHour % 12) * 30 : this._selectMin * 6;
  }

  /*
   * 指針拖曳：在時鐘面按下（滑鼠按鍵或手指觸碰）時開始拖曳。
   * 使用 Pointer Events 統一處理 滑鼠 / Android / iOS 觸控。
   */
  onPointerDown(event: PointerEvent): void {
    this.isDragging = true;
    // 鎖定指標於時鐘面（穩定元素）：捕獲後所有 move/up 皆直接派送到此元素，
    // 不依賴冒泡到 document，避免部分 WebView 捕獲後 document 收不到事件。
    this.clockFaceRef?.nativeElement?.setPointerCapture?.(event.pointerId);
    this.updateTimeFromClientPoint(event.clientX, event.clientY);
    // 避免拖曳時選取文字或觸發瀏覽器預設手勢
    event.preventDefault();
  }

  onPointerMove(event: PointerEvent): void {
    if (!this.isDragging) {
      return;
    }
    this.updateTimeFromClientPoint(event.clientX, event.clientY);
    event.preventDefault();
  }

  onPointerUp(): void {
    if (!this.isDragging) {
      return;
    }
    this.isDragging = false;
    this.autoAdvanceAfterPick();
  }

  /*
   * Touch Events 後備：僅在不支援 Pointer Events 的 WebView 啟用，
   * 避免與 Pointer Events 重複觸發。確保舊版 iOS WKWebView 手指也能拖曳。
   * 註：時鐘面 CSS 已設 touch-action:none，touchmove 不會捲動頁面，故無需 preventDefault。
   */
  onTouchStart(event: TouchEvent): void {
    if (this.supportsPointer) {
      return;
    }
    this.isDragging = true;
    const touch = event.touches[0];
    this.updateTimeFromClientPoint(touch.clientX, touch.clientY);
    event.preventDefault();
  }

  onTouchMove(event: TouchEvent): void {
    if (this.supportsPointer || !this.isDragging) {
      return;
    }
    const touch = event.touches[0];
    this.updateTimeFromClientPoint(touch.clientX, touch.clientY);
  }

  onTouchEnd(): void {
    if (this.supportsPointer || !this.isDragging) {
      return;
    }
    this.isDragging = false;
    this.autoAdvanceAfterPick();
  }

  /*
   * 選完小時 自動切換到 選分鐘 (通用時鐘選擇器慣例, 少一次點擊);
   * 分鐘不可選 (最小單位 1 小時) 時 維持選小時模式。
   */
  private autoAdvanceAfterPick(): void {
    if (this.isSelectHour && this.isMinuteEnabled) {
      this.isSelectHour = false;
      this.isSelectMin = true;
    }
  }

  /*
   * 依指標 / 觸點位置計算相對時鐘中心的角度，吸附到最近的刻度後更新選取時間。
   *  - 選小時：每 30 度為一個小時刻度（12 個小時）
   *  - 選分鐘：每 30 度為一個 5 分鐘刻度（12 個刻度）
   */
  private updateTimeFromClientPoint(clientX: number, clientY: number): void {
    const el = this.clockFaceRef?.nativeElement;
    if (!el) {
      return;
    }
    const rect = el.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const dx = clientX - centerX;
    const dy = clientY - centerY;

    // 以 12 點鐘方向為 0 度、順時針為正方向
    let angle = Math.atan2(dx, -dy) * 180 / Math.PI;
    if (angle < 0) {
      angle += 360;
    }

    if (this.isSelectHour) {
      let hour = Math.round(angle / 30) % 12;
      if (hour === 0) {
        hour = 12;
      }
      this.selectTime(hour);
    } else if (this.isSelectMin) {
      const min = (Math.round(angle / 30) * 5) % 60;
      this.selectTime(min);
    }
  }

}
