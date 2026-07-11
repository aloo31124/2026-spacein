import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';

import { BookingClockPageComponent } from './booking-clock-page.component';
import { BookingService } from '../../services/booking.service';
import { GoogleAuthService } from 'src/app/auth-route/services/google-auth.service';
import { RouteUrlRecordService } from 'src/app/auth-route/services/route-url-record.service';
import { Room } from 'src/app/common/room-site/models/room.model';

describe('BookingClockPageComponent', () => {
  let component: BookingClockPageComponent;
  let fixture: ComponentFixture<BookingClockPageComponent>;
  let bookingService: jasmine.SpyObj<BookingService>;
  let routeUrlRecordService: jasmine.SpyObj<RouteUrlRecordService<{}>>;

  beforeEach(() => {
    bookingService = jasmine.createSpyObj<BookingService>('BookingService', [
      'loadOpenRuleRoomList',
      'getSelectDate',
      'getStartTime',
      'getEndTime',
      'setStartTime',
      'setEndTime',
    ]);
    bookingService.loadOpenRuleRoomList.and.returnValue(of([]));
    bookingService.getSelectDate.and.returnValue('2026-7-10');
    bookingService.getStartTime.and.returnValue('09:00');
    bookingService.getEndTime.and.returnValue('10:00');
    (bookingService as any).openRuleRoomList = [];

    const googleAuthService = jasmine.createSpyObj<GoogleAuthService>('GoogleAuthService', ['getCurrentUser']);
    googleAuthService.getCurrentUser.and.returnValue({ id: 'u1' } as any);

    routeUrlRecordService = jasmine.createSpyObj('RouteUrlRecordService', ['nextPage']);
    spyOn(window, 'alert');

    TestBed.configureTestingModule({
      declarations: [BookingClockPageComponent],
      providers: [
        { provide: BookingService, useValue: bookingService },
        { provide: GoogleAuthService, useValue: googleAuthService },
        { provide: RouteUrlRecordService, useValue: routeUrlRecordService },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    });
    fixture = TestBed.createComponent(BookingClockPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('下一步按鈕使用固定於畫面底部的共用動作列', () => {
    const actionBar = fixture.nativeElement.querySelector('.booking-bottom-action');

    expect(actionBar).toBeTruthy();
    expect(actionBar.querySelector('.next-btn')).toBeTruthy();
  });

  it('預設選取開始時間欄位, 時鐘元件收到時間變更後 寫回開始時間', () => {
    expect(component.isSelectStartTimeInput).toBeTrue();
    expect(component.getActiveTime()).toBe('09:00');

    component.onTimeChange('11:00');

    expect(bookingService.setStartTime).toHaveBeenCalledWith('11:00');
    expect(bookingService.setEndTime).not.toHaveBeenCalled();
  });

  it('點選結束時間欄位後, 時鐘面同步顯示結束時間, 時間變更寫回結束時間', () => {
    component.selectEndInput();

    expect(component.getActiveTime()).toBe('10:00');
    component.onTimeChange('12:00');

    expect(bookingService.setEndTime).toHaveBeenCalledWith('12:00');
    expect(bookingService.setStartTime).not.toHaveBeenCalled();
  });

  it('點選已選取之開始時間欄位 不會誤切到結束時間 (取代舊版 toggle 行為)', () => {
    component.selectStartInput();
    component.selectStartInput();

    expect(component.isSelectStartTimeInput).toBeTrue();
  });

  it('開始時間 >= 結束時間 時, 下一步 alert 提醒且不導頁', () => {
    bookingService.getStartTime.and.returnValue('10:00');
    bookingService.getEndTime.and.returnValue('09:00');

    component.nextStep();

    expect(window.alert).toHaveBeenCalledWith('開始時間必須早於結束時間, 請重新選擇時段。');
    expect(routeUrlRecordService.nextPage).not.toHaveBeenCalled();
  });

  it('時段有效時, 下一步導向 booking-select-type', () => {
    component.nextStep();

    expect(routeUrlRecordService.nextPage).toHaveBeenCalledWith('booking-select-type', {});
  });

  it('所選時段超出教室開放時段時, 顯示卡控提醒', () => {
    // 2026-7-10 為星期五; 教室開放 09:00~09:30, 所選 09:00~10:00 超出
    (bookingService as any).openRuleRoomList = [
      new Room({ name: '教室A', openStartTime: '09:00', openEndTime: '09:30' }),
    ];

    component.updateTimeRuleHint();

    expect(component.timeRuleHintList.length).toBe(1);
    expect(component.timeRuleHintList[0].roomName).toBe('教室A');
    expect(component.timeRuleHintList[0].reason).toContain('開放時段 09:00~09:30');
  });

  it('選擇日期落在教室每周不開放星期時, 優先顯示該日不開放提醒', () => {
    // 2026-7-10 為星期五 (weekday = 5)
    (bookingService as any).openRuleRoomList = [
      new Room({ name: '教室B', closedWeekdays: [5], openStartTime: '09:00', openEndTime: '09:30' }),
    ];

    component.updateTimeRuleHint();

    expect(component.timeRuleHintList.length).toBe(1);
    expect(component.timeRuleHintList[0].reason).toContain('（星期五）不開放');
  });
});
