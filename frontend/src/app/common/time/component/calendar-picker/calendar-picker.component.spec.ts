import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarPickerComponent } from './calendar-picker.component';
import { Booking } from 'src/app/booking/models/booking.model';
import { RateModel } from 'src/app/review-room/models/rate.model';

describe('CalendarPickerComponent', () => {
  let component: CalendarPickerComponent;
  let fixture: ComponentFixture<CalendarPickerComponent>;

  // 今日 與 其 "年-月-日"(不補零) 字串, 供各測試組合預期值
  const today = new Date();
  const todayYear = today.getFullYear();
  const todayMonth = today.getMonth() + 1;
  const todayDay = today.getDate();
  const todayStr = todayYear + '-' + todayMonth + '-' + todayDay;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CalendarPickerComponent]
    });
    fixture = TestBed.createComponent(CalendarPickerComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('初始載入 emit 今日日期, 格式為 年-月-日 (月/日不補零)', () => {
    const emitted: string[] = [];
    component.selectDatInfo.subscribe((date: string) => emitted.push(date));

    fixture.detectChanges();

    expect(emitted).toEqual([todayStr]);
  });

  it('isEmitInitDate = false 時, 初始載入不 emit', () => {
    const emitted: string[] = [];
    component.isEmitInitDate = false;
    component.selectDatInfo.subscribe((date: string) => emitted.push(date));

    fixture.detectChanges();

    expect(emitted).toEqual([]);
  });

  it('選擇有效日期後 emit 該日期, 且選取樣式移至該日', () => {
    fixture.detectChanges();
    const emitted: string[] = [];
    component.selectDatInfo.subscribe((date: string) => emitted.push(date));

    component.selectDate(todayDay);

    expect(emitted).toEqual([todayStr]);
    expect(component.checkSelectDayStyle(todayDay)).toBeTrue();
  });

  it('在白色日期區一般點擊日期時不攔截 click，日期格可正常 emit', () => {
    fixture.detectChanges();
    const emitted: string[] = [];
    component.selectDatInfo.subscribe((date: string) => emitted.push(date));
    const content = fixture.nativeElement.querySelector('.calendar-content') as HTMLElement;
    const captureSpy = spyOn(content, 'setPointerCapture');

    component.onCalendarPointerDown({
      isPrimary: true,
      button: 0,
      clientX: 120,
      pointerId: 1,
      currentTarget: content,
    } as unknown as PointerEvent);
    component.onCalendarPointerUp({ clientX: 120 } as PointerEvent);
    component.selectDate(todayDay);

    expect(captureSpy).not.toHaveBeenCalled();
    expect(emitted).toEqual([todayStr]);
    expect(component.checkSelectDayStyle(todayDay)).toBeTrue();
  });

  it('點選前置空格(0) 或 過去日期 不 emit 也不變更選取', () => {
    fixture.detectChanges();
    const emitted: string[] = [];
    component.selectDatInfo.subscribe((date: string) => emitted.push(date));

    component.selectDate(0);
    if (todayDay > 1) {
      component.selectDate(todayDay - 1); // 昨日 (同月才存在此格)
    }

    expect(emitted).toEqual([]);
    expect(component._selectDate).toBe(todayDay);
  });

  it('切換下個月: 年月更新、不 emit、原選取日不套用選取樣式', () => {
    fixture.detectChanges();
    const emitted: string[] = [];
    component.selectDatInfo.subscribe((date: string) => emitted.push(date));

    component.nextMonth();

    const expectMonth = todayMonth === 12 ? 1 : todayMonth + 1;
    const expectYear = todayMonth === 12 ? todayYear + 1 : todayYear;
    expect(component.currentMonth).toBe(expectMonth);
    expect(component.currentYear).toBe(expectYear);
    expect(emitted).toEqual([]);
    expect(component.checkSelectDayStyle(todayDay)).toBeFalse();
    expect(component.monthTransitionDirection).toBe('next');
    expect(component.monthViewKeys).toEqual([expectYear + '-' + expectMonth]);
  });

  it('已在今日當月時 上個月按鈕停用, 點擊不變更月份', () => {
    fixture.detectChanges();

    expect(component.canGoBackMonth).toBeFalse();
    component.backMonth();

    expect(component.currentYear).toBe(todayYear);
    expect(component.currentMonth).toBe(todayMonth);
  });

  it('今日格子 預先計算為 isToday 且 isValid, 過去日期格子為 invalid', () => {
    fixture.detectChanges();

    const todayCell = component.dayCells.find(cell => cell.day === todayDay)!;
    expect(todayCell.isToday).toBeTrue();
    expect(todayCell.isValid).toBeTrue();

    // 本月今日以前的日期 (若存在) 皆不可選
    component.dayCells
      .filter(cell => cell.day > 0 && cell.day < todayDay)
      .forEach(cell => expect(cell.isValid).toBeFalse());
  });

  it('bookingList 變更後 重算該日預約 dot 數', () => {
    fixture.detectChanges();

    const booking = { startDate: todayStr } as Booking;
    fixture.componentRef.setInput('bookingList', [booking, booking]);
    fixture.detectChanges();

    const todayCell = component.dayCells.find(cell => cell.day === todayDay)!;
    expect(todayCell.dotCount).toBe(2);
  });

  it('剩餘率 <= showRate 才顯示百分比文字', () => {
    fixture.detectChanges();

    const lowRate = { date: today.toISOString(), rate: 30 } as RateModel;
    fixture.componentRef.setInput('rateList', [lowRate]);
    fixture.componentRef.setInput('showRate', 60);
    fixture.detectChanges();
    expect(component.dayCells.find(cell => cell.day === todayDay)!.rateText).toBe('30%');

    const highRate = { date: today.toISOString(), rate: 80 } as RateModel;
    fixture.componentRef.setInput('rateList', [highRate]);
    fixture.detectChanges();
    expect(component.dayCells.find(cell => cell.day === todayDay)!.rateText).toBe('');
  });

  it('回今日: 由其他月份跳回今日當月 並 emit 今日', () => {
    fixture.detectChanges();
    component.nextMonth();
    const emitted: string[] = [];
    component.selectDatInfo.subscribe((date: string) => emitted.push(date));

    component.goToday();

    expect(component.currentYear).toBe(todayYear);
    expect(component.currentMonth).toBe(todayMonth);
    expect(emitted).toEqual([todayStr]);
    expect(component.monthTransitionDirection).toBe('previous');
  });

  it('切換月份後依方向套用月份滑入動畫 class', () => {
    fixture.detectChanges();

    component.nextMonth();
    fixture.detectChanges();

    const content = fixture.nativeElement.querySelector('.calendar-content') as HTMLElement;
    expect(content.classList.contains('month-next')).toBeTrue();
    expect(content.querySelector('.month-view')).toBeTruthy();
  });

  it('在白色日期區向左拖曳超過門檻時切換至下個月', () => {
    fixture.detectChanges();
    const expectedMonth = todayMonth === 12 ? 1 : todayMonth + 1;
    const expectedYear = todayMonth === 12 ? todayYear + 1 : todayYear;
    const target = fixture.nativeElement.querySelector('.calendar-content') as HTMLElement;

    component.onCalendarPointerDown({
      isPrimary: true,
      button: 0,
      clientX: 180,
      pointerId: 1,
      currentTarget: target,
    } as unknown as PointerEvent);
    component.onCalendarPointerUp({ clientX: 100 } as PointerEvent);

    expect(component.currentYear).toBe(expectedYear);
    expect(component.currentMonth).toBe(expectedMonth);
  });

  it('在白色日期區向右拖曳超過門檻時切換至上個月', () => {
    fixture.detectChanges();
    component.nextMonth();
    const target = fixture.nativeElement.querySelector('.calendar-content') as HTMLElement;

    component.onCalendarPointerDown({
      isPrimary: true,
      button: 0,
      clientX: 100,
      pointerId: 1,
      currentTarget: target,
    } as unknown as PointerEvent);
    component.onCalendarPointerUp({ clientX: 180 } as PointerEvent);

    expect(component.currentYear).toBe(todayYear);
    expect(component.currentMonth).toBe(todayMonth);
    expect(component.monthTransitionDirection).toBe('previous');
  });

  it('水平拖曳未達門檻時不切換月份', () => {
    fixture.detectChanges();

    component.onCalendarPointerDown({
      isPrimary: true,
      button: 0,
      clientX: 180,
      pointerId: 1,
      currentTarget: null,
    } as unknown as PointerEvent);
    component.onCalendarPointerUp({ clientX: 150 } as PointerEvent);

    expect(component.currentYear).toBe(todayYear);
    expect(component.currentMonth).toBe(todayMonth);
  });
});
