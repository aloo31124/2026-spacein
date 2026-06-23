import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { RouteUrlRecordService } from 'src/app/auth-route/services/route-url-record.service';
import { BookingService } from '../../services/booking.service';

@Component({
  selector: 'app-booking-clock-page',
  templateUrl: './booking-clock-page.component.html',
  styleUrls: ['./booking-clock-page.component.scss']
})
export class BookingClockPageComponent {

  // 時鐘面元素參考，用於計算拖曳指針時的中心點與半徑
  @ViewChild('clockFace') clockFaceRef!: ElementRef<HTMLElement>;

  // 是否正在拖曳指針
  private isDragging = false;

  timeIntervalMinType = {
    _5min : 5,
    _30min : 30,
    _60min : 60
  }
  timeIntervalMin = 60;
  _selectHour = 9;
  isSelectHour = true;
  _selectMin = 0;
  isSelectMin = false;
  isAm = true;
  isPm = false;


  //選擇開始時段
  isSelectStartTimeInput = true;


  constructor(
    private routeUrlRecordService: RouteUrlRecordService<{}>,
    private bookingService: BookingService,
  ) {}

  
  toggleInput() {
    this.isSelectStartTimeInput = !this.isSelectStartTimeInput;
  }

  getHourString(): string {
    const selectHour = this._selectHour + ( this.isPm? 12 : 0 );
    return selectHour.toString().length === 2? selectHour.toString(): "0" + selectHour.toString();
  }

  getMinString(): string {
    return this._selectMin.toString().length === 2? this._selectMin.toString(): "0" + this._selectMin.toString();
  }

  selectHour() {
    this.isSelectHour = true;
    this.isSelectMin = false;    
    this.setSelectTime();
  }

  selectMin() {
    if(this.timeIntervalMin === this.timeIntervalMinType._60min) {
      alert("最小單位1小時");
      return;
    }
    this.isSelectHour = false;
    this.isSelectMin = true; 
    this.setSelectTime();
  }

  selectAm() {
    this.isAm = true;
    this.isPm = false;
    this.setSelectTime();
  }

  selectPm() {
    this.isAm = false;
    this.isPm = true;
    this.setSelectTime();
  }
    

  ngOnInit(): void {}

  
  selectTime(selectTime: number) {
    if( this.isSelectHour ) {
      this._selectHour = selectTime;
    }

    if( this.isSelectMin ) {
      this._selectMin = selectTime;
    }

    this.setSelectTime();
  }

  /*
   * 從 service 取得 開始時間 
   */
  getStartTime() {
    return this.bookingService.getStartTime();
  }

  /*
   * 從 service 取得 結束時間 
   */
  getEndTime() {
    return this.bookingService.getEndTime();
  }

  /*
   * 設定 開始 或 結束 時間 
   */
  setSelectTime() {
    const selectTime = this.getHourString() + ":" + this.getMinString();
    if(this.isSelectStartTimeInput) {
      this.bookingService.setStartTime(selectTime);
    } 
    else {
      this.bookingService.setEndTime(selectTime);
    } 
  }

  getRotationAngle(hour: number): number {
    return (hour - 1) * 30;
  }

  /*
   * 指針拖曳：在時鐘面按下（滑鼠按鍵或手指觸碰）時開始拖曳。
   * 使用 Pointer Events 統一處理 滑鼠 / Android / iOS 觸控。
   */
  onPointerDown(event: PointerEvent) {
    this.isDragging = true;
    // 鎖定指標，讓後續 move 事件即使移出時鐘範圍仍持續派送
    const target = event.target as HTMLElement;
    target.setPointerCapture?.(event.pointerId);
    this.updateTimeFromPointer(event);
    // 避免拖曳時選取文字或觸發瀏覽器預設手勢
    event.preventDefault();
  }

  @HostListener('document:pointermove', ['$event'])
  onPointerMove(event: PointerEvent) {
    if (!this.isDragging) {
      return;
    }
    this.updateTimeFromPointer(event);
    event.preventDefault();
  }

  @HostListener('document:pointerup')
  @HostListener('document:pointercancel')
  onPointerUp() {
    this.isDragging = false;
  }

  /*
   * 依指標位置計算相對時鐘中心的角度，吸附到最近的刻度後更新選取時間。
   *  - 選小時：每 30 度為一個小時刻度（12 個小時）
   *  - 選分鐘：每 30 度為一個 5 分鐘刻度（12 個刻度）
   */
  private updateTimeFromPointer(event: PointerEvent) {
    const el = this.clockFaceRef?.nativeElement;
    if (!el) {
      return;
    }
    const rect = el.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const dx = event.clientX - centerX;
    const dy = event.clientY - centerY;

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

  /*
   * 按下下一步 icon , 檢查時段, 並路由導向 
   */
  nextStep() {
    if(!this.checkValidTime()) {
      return;
    }

    alert("選擇時段: " + this.getStartTime() + "~" + this.getEndTime());
    this.routeUrlRecordService.nextPage("booking-select-type", {});
  }

    /*
   * 確認選擇時端卡控是否正確:
   *  1. 開始時間 需小於 結束時間
   */
    checkValidTime() {
      const [_year, _month, _dat] = this.bookingService.getSelectDate().split("-").map(Number);
      const [_startHour, _startmin] = this.getStartTime().split(":").map(Number);
      const [_endHour, _endTmin] = this.getEndTime().split(":").map(Number);
      const selectStarTime = new Date(_year, _month - 1, _dat, _startHour, _startmin).getTime();
      const selectEndTime = new Date(_year, _month - 1, _dat, _endHour, _endTmin).getTime();
  
      if(selectStarTime >= selectEndTime) {
        alert("開始時間必須早於結束時間, 請重新選擇時段。");
        return false;
      }
      return true;
    }
  
  
}
