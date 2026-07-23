import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { of, throwError } from 'rxjs';

import { ReviewBookingFormComponent } from './review-booking-form.component';
import { ReviewBookingService } from '../../services/review-booking.service';
import { BookingService } from 'src/app/booking/services/booking.service';
import { GoogleAuthService } from 'src/app/auth-route/services/google-auth.service';
import { RouteUrlRecordService } from 'src/app/auth-route/services/route-url-record.service';
import { DialogService } from 'src/app/common/dialog/services/dialog.service';
import { WordShrotenPipe } from 'src/app/common/pipe/word-shroten.pipe';
import { DateToDayOfWeekPipe } from 'src/app/common/pipe/date-to-day-of-week.pipe';
import { ContactActionIconComponent } from 'src/app/common/contact-action/components/contact-action-icon/contact-action-icon.component';

describe('ReviewBookingFormComponent', () => {
  let component: ReviewBookingFormComponent;
  let fixture: ComponentFixture<ReviewBookingFormComponent>;
  let bookingService: jasmine.SpyObj<BookingService>;

  // 預約紀錄 queryParams 測試資料 (含 roomId)
  const queryParams = {
    id: 'b1',
    startDate: '2026-7-10',
    startTime: '09:00',
    endTime: '10:00',
    bookingType: 'site',
    roomName: '大教室A',
    siteName: '座位1',
    roomId: 'r1',
  };

  beforeEach(() => {
    bookingService = jasmine.createSpyObj<BookingService>('BookingService', ['getRoomByOwnerId']);
    bookingService.getRoomByOwnerId.and.returnValue(of([
      {id: 'r1', name: '大教室A', ownerId: 'o1', address: '台北市中正區測試路1號', phone: '02-12345678'},
    ] as any));

    const googleAuthService = jasmine.createSpyObj<GoogleAuthService>('GoogleAuthService', ['getCurrentUser']);
    googleAuthService.getCurrentUser.and.returnValue(
      {id: 'u1', name: '測試使用者', email: 'test@example.com'} as any
    );
    spyOn(window, 'alert');

    TestBed.configureTestingModule({
      declarations: [
        ReviewBookingFormComponent,
        WordShrotenPipe,
        DateToDayOfWeekPipe,
        ContactActionIconComponent,
      ],
      providers: [
        {provide: ReviewBookingService, useValue: jasmine.createSpyObj('ReviewBookingService', ['deleteBookingById'])},
        {provide: BookingService, useValue: bookingService},
        {provide: GoogleAuthService, useValue: googleAuthService},
        {provide: RouteUrlRecordService, useValue: jasmine.createSpyObj('RouteUrlRecordService', ['nextPage'])},
        {provide: DialogService, useValue: jasmine.createSpyObj('DialogService', ['confirm'])},
        {provide: ActivatedRoute, useValue: {queryParams: of(queryParams)}},
      ],
      schemas: [NO_ERRORS_SCHEMA],
    });
    fixture = TestBed.createComponent(ReviewBookingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('依預約紀錄之 roomId 顯示該教室之 地址 與 電話', () => {
    expect(bookingService.getRoomByOwnerId).toHaveBeenCalledWith('u1');

    const infoRow = fixture.nativeElement.querySelector('.row-room-info');
    expect(infoRow).toBeTruthy();
    expect(infoRow.textContent).toContain('地址 : 台北市中正區測試路1號');
    expect(infoRow.textContent).toContain('電話 : 02-12345678');

    const actionLinks: NodeListOf<HTMLAnchorElement> = infoRow.querySelectorAll('.contact-action-icon');
    expect(actionLinks[0].getAttribute('href')).toContain('google.com/maps/search/');
    expect(actionLinks[1].getAttribute('href')).toBe('tel:02-12345678');
  });

  it('教室未設定地址電話時 顯示 未設定', () => {
    bookingService.getRoomByOwnerId.and.returnValue(of([
      {id: 'r1', name: '大教室A', ownerId: 'o1', address: '', phone: ''},
    ] as any));
    component.loadRoomInfo();
    fixture.detectChanges();

    const infoRow = fixture.nativeElement.querySelector('.row-room-info');
    expect(infoRow.textContent).toContain('地址 : 未設定');
    expect(infoRow.textContent).toContain('電話 : 未設定');
    expect(infoRow.querySelectorAll('a').length).toBe(0);
    expect(infoRow.querySelectorAll('.contact-action-icon.disabled').length).toBe(2);
  });

  it('查無對應教室時 不顯示地址電話區塊', () => {
    bookingService.getRoomByOwnerId.and.returnValue(of([
      {id: 'other', name: '別的教室', ownerId: 'o1', address: 'x', phone: 'y'},
    ] as any));
    component.loadRoomInfo();
    fixture.detectChanges();

    const infoRow = fixture.nativeElement.querySelector('.row-room-info');
    expect(infoRow).toBeNull();
  });

  it('教室資訊取得失敗時 靜默不顯示區塊, 不影響頁面', () => {
    component.selectRoomInfo = null;
    bookingService.getRoomByOwnerId.and.returnValue(throwError(() => new Error('取得失敗')));
    component.loadRoomInfo();
    fixture.detectChanges();

    const infoRow = fixture.nativeElement.querySelector('.row-room-info');
    expect(infoRow).toBeNull();
  });
});
