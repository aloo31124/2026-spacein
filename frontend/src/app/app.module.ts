import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './common/header/components/header/header.component';
import { ImgBtnComponent } from './common/button/components/img-btn/img-btn.component';
import { HomePageComponent } from './home/components/home-page/home-page.component';
import { LoginPageComponent } from './auth-route/components/login-page/login-page.component';
import { CalendarPickerComponent } from './common/time/component/calendar-picker/calendar-picker.component';
import { ClockPickerComponent } from './common/time/component/clock-picker/clock-picker.component';
import { BookingDatePageComponent } from './booking/components/booking-date-page/booking-date-page.component';
import { BookingClockPageComponent } from './booking/components/booking-clock-page/booking-clock-page.component';
import { BookingSelectTypePageComponent } from './booking/components/booking-select-type-page/booking-select-type-page.component';
import { BookingCheckFormPageComponent } from './booking/components/booking-check-form-page/booking-check-form-page.component';

import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { PaidPlanListComponent } from './payment/components/paid-plan-list/paid-plan-list.component';
import { EcpayFormComponent } from './payment/components/ecpay-form/ecpay-form.component';
import { ReviewRoomTrendComponent } from './review-room/components/review-room-trend/review-room-trend.component';
import { ReviewRoomRemanetRateComponent } from './review-room/components/review-room-remanet-rate/review-room-remanet-rate.component';
import { ReviewBookingCalendarComponent } from './review-booking/components/review-booking-calendar/review-booking-calendar.component';
import { ReviewBookingFormComponent } from './review-booking/components/review-booking-form/review-booking-form.component';
import { DialogComponent } from './common/dialog/components/dialog/dialog.component';
import { WordShrotenPipe } from './common/pipe/word-shroten.pipe';
import { InputComponent } from './common/input/components/input/input.component';
import { DateToDayOfWeekPipe } from './common/pipe/date-to-day-of-week.pipe';
import { LoadingBasicComponent } from './common/loading/components/loading-basic/loading-basic.component';
import { ReviewRoomOverviewComponent } from './review-room/components/review-room-overview/review-room-overview.component';
import { AccountPageComponent } from './auth-route/components/account-page/account-page.component';
import { SysDashboardComponent } from './manager-system/components/sys-dashboard/sys-dashboard.component';

// 空間管理
import { RoomDashboardComponent } from './manager-room/components/room-dashboard/room-dashboard.component';
import { SearchBookingUserComponent } from './manager-room/components/content/search-booking-user/search-booking-user.component';
import { SearchRoomComponent } from './manager-room/components/content/search-room/search-room.component';
import { SearchSiteComponent } from './manager-room/components/content/search-site/search-site.component';
import { SearchBookingComponent } from './manager-room/components/content/search-booking/search-booking.component';
import { RegisterSelectComponent } from './auth-route/components/register-select/register-select.component';
import { RegisterInfoComponent } from './auth-route/components/register-info/register-info.component';
import { RegisterMailVerifyComponent } from './auth-route/components/register-mail-verify/register-mail-verify.component';
import { PasswordChangeComponent } from './auth-route/components/password-change/password-change.component';
import { AllUserComponent } from './manager-system/components/all-user/all-user.component';
import { PayRecordComponent } from './manager-system/components/pay-record/pay-record.component';
import { PaySettingComponent } from './manager-system/components/pay-setting/pay-setting.component';
import { LogRecordComponent } from './manager-system/components/log-record/log-record.component';
import { BackupComponent } from './manager-system/components/backup/backup.component';
import { RoleSelectComponent } from './account/components/role-select/role-select.component';
import { BookerSelectOwnerComponent } from './account/components/booker-select-owner/booker-select-owner.component';
import { CheckPaymentComponent } from './payment/components/check-payment/check-payment.component';
import { ForgetPasswordMailComponent } from './auth-route/components/forget-password-mail/forget-password-mail.component';
import { ForgetPasswordVerityComponent } from './auth-route/components/forget-password-verity/forget-password-verity.component';
import { PaySettingContentComponent } from './manager-system/components/pay-setting-content/pay-setting-content.component';
import { SearchRoomContentComponent } from './manager-room/components/content/search-room-content/search-room-content.component';
import { RoomSiteImportComponent } from './manager-room/components/content/room-site-import/room-site-import.component';
import { SearchSiteContentComponent } from './manager-room/components/content/search-site-content/search-site-content.component';
import { UserRoleListComponent } from './manager-system/components/user-role-list/user-role-list.component';
import { UserPaymentListComponent } from './manager-system/components/user-payment-list/user-payment-list.component';
import { AppVersionComponent } from './common/version/components/app-version/app-version.component';

// 調整會損壞... ="=
const  firebase = {
  projectId: 'spacein-ec8ab',
  appId: '1:328066296243:web:b1897c1201a0f9b55843c6',
  storageBucket: 'spacein-ec8ab.appspot.com',
  apiKey: '***REMOVED***',
  authDomain: 'spacein-ec8ab.firebaseapp.com',
  messagingSenderId: '328066296243',
  measurementId: 'G-54HYGJ7ZDQ',
}
/* 
const firebase = {
  apiKey: "***REMOVED***",
  authDomain: "spaceincopy.firebaseapp.com",
  projectId: "spaceincopy",
  storageBucket: "spaceincopy.firebasestorage.app",
  messagingSenderId: "587558372608",
  appId: "1:587558372608:web:920076cdfee160be449fe5",
  measurementId: "G-5QB00RTHRM"
};
*/


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ImgBtnComponent,
    HomePageComponent,
    LoginPageComponent,
    CalendarPickerComponent,
    ClockPickerComponent,
    BookingDatePageComponent,
    BookingClockPageComponent,
    BookingSelectTypePageComponent,
    BookingCheckFormPageComponent,
    PaidPlanListComponent,
    EcpayFormComponent,
    ReviewRoomTrendComponent,
    ReviewRoomRemanetRateComponent,
    ReviewBookingCalendarComponent,
    ReviewBookingFormComponent,
    DialogComponent,
    WordShrotenPipe,
    InputComponent,
    DateToDayOfWeekPipe,
    LoadingBasicComponent,
    ReviewRoomOverviewComponent,
    AccountPageComponent,
    SysDashboardComponent,
    RoomDashboardComponent,
    SearchBookingUserComponent,
    SearchRoomComponent,
    SearchSiteComponent,
    SearchBookingComponent,
    RegisterSelectComponent,
    RegisterInfoComponent,
    RegisterMailVerifyComponent,
    PasswordChangeComponent,
    AllUserComponent,
    PayRecordComponent,
    PaySettingComponent,
    LogRecordComponent,
    BackupComponent,
    RoleSelectComponent,
    BookerSelectOwnerComponent,
    CheckPaymentComponent,
    ForgetPasswordMailComponent,
    ForgetPasswordVerityComponent,
    PaySettingContentComponent,
    SearchRoomContentComponent,
    RoomSiteImportComponent,
    SearchSiteContentComponent,
    UserRoleListComponent,
    UserPaymentListComponent,
    AppVersionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    provideFirebaseApp(() => initializeApp(firebase)),
    provideFirestore(() => getFirestore()),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
