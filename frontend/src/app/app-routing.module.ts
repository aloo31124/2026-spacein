import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuardService } from './auth-route/services/auth-guard.service';

// 登入 / 認證
import { LoginPageComponent } from './auth-route/components/login-page/login-page.component';
import { AccountPageComponent } from './auth-route/components/account-page/account-page.component';

// 忘記密碼
import { ForgetPasswordMailComponent } from './auth-route/components/forget-password-mail/forget-password-mail.component';
import { ForgetPasswordVerityComponent } from './auth-route/components/forget-password-verity/forget-password-verity.component';

// 註冊
import { RegisterSelectComponent } from './auth-route/components/register-select/register-select.component';
import { RegisterInfoComponent } from './auth-route/components/register-info/register-info.component';
import { RegisterMailVerifyComponent } from './auth-route/components/register-mail-verify/register-mail-verify.component';
import { PasswordChangeComponent } from './auth-route/components/password-change/password-change.component';

// 帳號（購買 / 升級）
import { BookerSelectOwnerComponent } from './account/components/booker-select-owner/booker-select-owner.component';

// 首頁
import { HomePageComponent } from './home/components/home-page/home-page.component';

// 預約空間
import { BookingDatePageComponent } from './booking/components/booking-date-page/booking-date-page.component';
import { BookingClockPageComponent } from './booking/components/booking-clock-page/booking-clock-page.component';
import { BookingSelectTypePageComponent } from './booking/components/booking-select-type-page/booking-select-type-page.component';
import { BookingCheckFormPageComponent } from './booking/components/booking-check-form-page/booking-check-form-page.component';

// 預約審視
import { ReviewBookingCalendarComponent } from './review-booking/components/review-booking-calendar/review-booking-calendar.component';
import { ReviewBookingFormComponent } from './review-booking/components/review-booking-form/review-booking-form.component';

// 空間審視
import { ReviewRoomOverviewComponent } from './review-room/components/review-room-overview/review-room-overview.component';

// 空間管理
import { RoomDashboardComponent } from './manager-room/components/room-dashboard/room-dashboard.component';
import { SearchBookingUserComponent } from './manager-room/components/content/search-booking-user/search-booking-user.component';
import { RoomSiteImportComponent } from './manager-room/components/content/room-site-import/room-site-import.component';
import { SearchRoomComponent } from './manager-room/components/content/search-room/search-room.component';
import { SearchRoomContentComponent } from './manager-room/components/content/search-room-content/search-room-content.component';
import { SearchSiteComponent } from './manager-room/components/content/search-site/search-site.component';
import { SearchSiteContentComponent } from './manager-room/components/content/search-site-content/search-site-content.component';
import { SearchBookingComponent } from './manager-room/components/content/search-booking/search-booking.component';

// 系統管理
import { SysDashboardComponent } from './manager-system/components/sys-dashboard/sys-dashboard.component';
import { AllUserComponent } from './manager-system/components/all-user/all-user.component';
import { UserRoleListComponent } from './manager-system/components/user-role-list/user-role-list.component';
import { UserPaymentListComponent } from './manager-system/components/user-payment-list/user-payment-list.component';
import { LogRecordComponent } from './manager-system/components/log-record/log-record.component';
import { PayRecordComponent } from './manager-system/components/pay-record/pay-record.component';
import { PaySettingComponent } from './manager-system/components/pay-setting/pay-setting.component';
import { PaySettingContentComponent } from './manager-system/components/pay-setting-content/pay-setting-content.component';
import { BackupComponent } from './manager-system/components/backup/backup.component';

// 付款
import { PaidPlanListComponent } from './payment/components/paid-plan-list/paid-plan-list.component';
import { EcpayFormComponent } from './payment/components/ecpay-form/ecpay-form.component';
import { CheckPaymentComponent } from './payment/components/check-payment/check-payment.component';


const routes: Routes = [
  // 登入 / 認證
  { path: '', component: LoginPageComponent },
  { path: 'account', component: AccountPageComponent },

  // 忘記密碼
  { path: 'forget-password-mail', component: ForgetPasswordMailComponent },
  { path: 'forget-password-verity', component: ForgetPasswordVerityComponent },

  // 註冊
  { path: 'register-select', component: RegisterSelectComponent },
  { path: 'register-info', component: RegisterInfoComponent },
  { path: 'register-mail-verify', component: RegisterMailVerifyComponent },
  { path: 'password-change', component: PasswordChangeComponent },

  // 帳號（購買 / 升級）
  { path: 'booker-select-owner', component: BookerSelectOwnerComponent },

  // 首頁
  { path: 'home', canActivate: [AuthGuardService], component: HomePageComponent },

  // 預約空間
  { path: 'booking-date', component: BookingDatePageComponent },
  { path: 'booking-clock', component: BookingClockPageComponent },
  { path: 'booking-select-type', component: BookingSelectTypePageComponent },
  { path: 'booking-check-form', component: BookingCheckFormPageComponent },

  // 預約審視
  { path: 'review-booking-calendar', component: ReviewBookingCalendarComponent },
  { path: 'review-booking-form', component: ReviewBookingFormComponent },

  // 空間審視
  { path: 'review-room-overview', component: ReviewRoomOverviewComponent },

  // 空間管理
  {
    path: 'manager-room',
    component: RoomDashboardComponent,
    children: [
      { path: 'room-site-import', component: RoomSiteImportComponent },
      { path: 'booking-user', component: SearchBookingUserComponent },
      { path: 'room', component: SearchRoomComponent },
      { path: 'room-content', component: SearchRoomContentComponent },
      { path: 'site', component: SearchSiteComponent },
      { path: 'site-content', component: SearchSiteContentComponent },
      { path: 'booking', component: SearchBookingComponent },
    ],
  },

  // 系統管理
  {
    path: 'manager-sys',
    component: SysDashboardComponent,
    children: [
      { path: 'all-user', component: AllUserComponent },
      { path: 'user-role-list', component: UserRoleListComponent },
      { path: 'user-payment-list', component: UserPaymentListComponent },
      { path: 'log-record', component: LogRecordComponent },
      { path: 'pay-record', component: PayRecordComponent },
      { path: 'pay-setting', component: PaySettingComponent },
      { path: 'pay-setting-content', component: PaySettingContentComponent },
      { path: 'backup', component: BackupComponent },
    ],
  },

  // 付款
  { path: 'pay-plan-list', component: PaidPlanListComponent },
  { path: 'chekc-payment', component: CheckPaymentComponent },
  { path: 'ecpay-form', component: EcpayFormComponent },

  // 萬用 fallback：未知路徑導回登入頁
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
