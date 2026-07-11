import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClockPickerComponent } from './clock-picker.component';

describe('ClockPickerComponent', () => {
  let component: ClockPickerComponent;
  let fixture: ComponentFixture<ClockPickerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClockPickerComponent]
    });
    fixture = TestBed.createComponent(ClockPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('外部 [time] 變更時 同步時鐘面 (24小時制 轉 12小時制 + AM/PM)', () => {
    fixture.componentRef.setInput('time', '14:30');
    fixture.detectChanges();

    expect(component._selectHour).toBe(2);
    expect(component._selectMin).toBe(30);
    expect(component.isPm).toBeTrue();
    expect(component.isAm).toBeFalse();
  });

  it('[time] 為 00:xx 時 顯示為 12 AM', () => {
    fixture.componentRef.setInput('time', '00:15');
    fixture.detectChanges();

    expect(component._selectHour).toBe(12);
    expect(component.isAm).toBeTrue();
    expect(component.getHourString()).toBe('00');
  });

  it('點選小時後 emit HH:mm (24小時制 補零)', () => {
    const emitted: string[] = [];
    component.timeChange.subscribe((time: string) => emitted.push(time));

    component.selectTime(10);

    expect(emitted).toEqual(['10:00']);
  });

  it('切換 PM 後 emit 正確 24 小時制時間 (9 PM -> 21:00)', () => {
    const emitted: string[] = [];
    component.timeChange.subscribe((time: string) => emitted.push(time));

    component.selectPm();

    expect(emitted).toEqual(['21:00']);
  });

  it('12AM 換算為 00:00、12PM 換算為 12:00 (修正舊版 24:00 錯誤)', () => {
    const emitted: string[] = [];
    component.timeChange.subscribe((time: string) => emitted.push(time));

    component.selectTime(12);   // 12 AM
    component.selectPm();       // 12 PM

    expect(emitted).toEqual(['00:00', '12:00']);
  });

  it('isMinuteEnabled = false 時 點分鐘不切換模式, 改顯示頁內提示', () => {
    fixture.componentRef.setInput('isMinuteEnabled', false);
    fixture.detectChanges();

    component.selectMin();
    fixture.detectChanges();

    expect(component.isSelectMin).toBeFalse();
    expect(component.isSelectHour).toBeTrue();
    expect(component.minuteHint).toContain('最小單位為 1 小時');
    const hint = fixture.nativeElement.querySelector('.minute-hint');
    expect(hint.textContent).toContain('最小單位為 1 小時');
  });

  it('可選分鐘時 點分鐘切換為選分鐘模式, 選 5 分鐘刻度後 emit', () => {
    const emitted: string[] = [];
    component.timeChange.subscribe((time: string) => emitted.push(time));

    component.selectMin();
    component.selectTime(45);

    expect(component.isSelectMin).toBeTrue();
    expect(emitted).toEqual(['09:45']);
  });

  it('拖曳指針: 依角度吸附最近小時刻度, 放開後自動切換到選分鐘', () => {
    const emitted: string[] = [];
    component.timeChange.subscribe((time: string) => emitted.push(time));

    // 假 pointerId 無對應之作用中指標, 需 spy 攔截避免瀏覽器拋 NotFoundError
    spyOn(component.clockFaceRef.nativeElement, 'setPointerCapture');

    // 以時鐘面中心為原點, 指向 3 點鐘方向 (90度) 拖曳
    const rect = component.clockFaceRef.nativeElement.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const pointerEvent = {
      clientX: centerX + rect.width / 4,
      clientY: centerY,
      pointerId: 1,
      preventDefault: () => {},
    } as unknown as PointerEvent;

    component.onPointerDown(pointerEvent);
    component.onPointerUp();

    expect(component._selectHour).toBe(3);
    expect(emitted).toEqual(['03:00']);
    expect(component.isSelectMin).toBeTrue(); // 選完小時自動進入選分鐘
  });

  it('isMinuteEnabled = false 時 拖曳放開後 仍維持選小時模式', () => {
    fixture.componentRef.setInput('isMinuteEnabled', false);
    fixture.detectChanges();

    spyOn(component.clockFaceRef.nativeElement, 'setPointerCapture');

    const rect = component.clockFaceRef.nativeElement.getBoundingClientRect();
    const pointerEvent = {
      clientX: rect.left + rect.width / 2,
      clientY: rect.top, // 12 點鐘方向
      pointerId: 1,
      preventDefault: () => {},
    } as unknown as PointerEvent;

    component.onPointerDown(pointerEvent);
    component.onPointerUp();

    expect(component._selectHour).toBe(12);
    expect(component.isSelectHour).toBeTrue();
  });
});
