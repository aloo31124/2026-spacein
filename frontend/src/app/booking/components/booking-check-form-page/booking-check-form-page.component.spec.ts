import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';

import { BookingCheckFormPageComponent } from './booking-check-form-page.component';
import { BookingService } from '../../services/booking.service';
import { GoogleAuthService } from 'src/app/auth-route/services/google-auth.service';
import { RouteUrlRecordService } from 'src/app/auth-route/services/route-url-record.service';
import { WordShrotenPipe } from 'src/app/common/pipe/word-shroten.pipe';
import { DateToDayOfWeekPipe } from 'src/app/common/pipe/date-to-day-of-week.pipe';

describe('BookingCheckFormPageComponent', () => {
  let component: BookingCheckFormPageComponent;
  let fixture: ComponentFixture<BookingCheckFormPageComponent>;
  let bookingService: jasmine.SpyObj<BookingService>;

  // 教室測試資料 (含 地址/電話, r2 未設定)
  const roomList = [
    {id: 'r1', name: '大教室A', ownerId: 'o1', address: '台北市中正區測試路1號', phone: '02-12345678'},
    {id: 'r2', name: '小教室B', ownerId: 'o1', address: '', phone: ''},
  ];

  beforeEach(() => {
    bookingService = jasmine.createSpyObj<BookingService>('BookingService', [
      'getRoomSiteByDate',
      'getRoomByOwnerId',
      'getAllSiteList',
      'getSelectDate',
      'getStartTime',
      'getEndTime',
      'post',
    ]);
    bookingService.getRoomSiteByDate.and.returnValue(of([
      {id: 's1', roomId: 'r1', name: '座位1', roomName: '大教室A', isBooking: false},
    ] as any));
    bookingService.getRoomByOwnerId.and.returnValue(of(roomList as any));
    bookingService.getAllSiteList.and.returnValue(of([
      {id: 's1', name: '座位1', roomId: 'r1'},
    ]));
    bookingService.getSelectDate.and.returnValue('2026-7-10');
    bookingService.getStartTime.and.returnValue('09:00');
    bookingService.getEndTime.and.returnValue('10:00');

    const googleAuthService = jasmine.createSpyObj<GoogleAuthService>('GoogleAuthService', ['getCurrentUser']);
    googleAuthService.getCurrentUser.and.returnValue(
      {id: 'o1', name: '測試使用者', email: 'test@example.com'} as any
    );
    spyOn(window, 'alert');

    TestBed.configureTestingModule({
      declarations: [BookingCheckFormPageComponent, WordShrotenPipe, DateToDayOfWeekPipe],
      providers: [
        {provide: BookingService, useValue: bookingService},
        {provide: GoogleAuthService, useValue: googleAuthService},
        {provide: RouteUrlRecordService, useValue: jasmine.createSpyObj('RouteUrlRecordService', ['nextPage'])},
        {provide: ActivatedRoute, useValue: {queryParams: of({bookingType: 'site'})}},
      ],
      schemas: [NO_ERRORS_SCHEMA],
    });
    fixture = TestBed.createComponent(BookingCheckFormPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('送出按鈕使用固定於畫面底部的共用動作列', () => {
    const actionBar = fixture.nativeElement.querySelector('.booking-bottom-action');

    expect(actionBar).toBeTruthy();
    expect(actionBar.querySelector('.submit-btn')).toBeTruthy();
  });

  it('選擇教室後 顯示該教室之 地址 與 電話', () => {
    const infoRow = fixture.nativeElement.querySelector('.row-room-info');
    expect(infoRow).toBeTruthy();
    expect(infoRow.textContent).toContain('地址 : 台北市中正區測試路1號');
    expect(infoRow.textContent).toContain('電話 : 02-12345678');
  });

  it('切換教室後 地址電話同步更新, 未設定時顯示 未設定', () => {
    component.selectedRoom('r2');
    fixture.detectChanges();

    const infoRow = fixture.nativeElement.querySelector('.row-room-info');
    expect(infoRow.textContent).toContain('地址 : 未設定');
    expect(infoRow.textContent).toContain('電話 : 未設定');
  });

  it('未選擇教室時 不顯示地址電話區塊', () => {
    component.selectRoom = undefined as any;
    fixture.detectChanges();

    const infoRow = fixture.nativeElement.querySelector('.row-room-info');
    expect(infoRow).toBeNull();
  });
});
