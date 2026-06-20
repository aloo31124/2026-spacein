"use strict";
(self["webpackChunkspace_in"] = self["webpackChunkspace_in"] || []).push([["main"],{

/***/ 5077:
/*!*****************************************************************************************!*\
  !*** ./src/app/account/components/booker-select-owner/booker-select-owner.component.ts ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BookerSelectOwnerComponent: () => (/* binding */ BookerSelectOwnerComponent)
/* harmony export */ });
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ 8764);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ 6647);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ 1318);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs */ 9400);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/router */ 5072);
/* harmony import */ var _services_account_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../services/account.service */ 5025);
/* harmony import */ var src_app_auth_route_services_google_auth_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/auth-route/services/google-auth.service */ 899);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/forms */ 4456);







class BookerSelectOwnerComponent {
  constructor(router, accountService, googleAuthService) {
    this.router = router;
    this.accountService = accountService;
    this.googleAuthService = googleAuthService;
    this.ownerEmail = "";
    this.onwer = null;
  }
  clickSendOwner() {
    //const userId = this.googleAuthService.getCurrentUser().userFirestoreId; // google User 舊 id
    const userId = this.googleAuthService.getCurrentUser().id;
    if (this.ownerEmail.trim() === "") {
      alert("請輸入擁有者信箱");
      return;
    }
    this.accountService.getOwner(this.ownerEmail).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(res => {
      const owner = res.result;
      if (!owner) {
        alert("查無資料");
        throw new Error("查無資料");
      }
      if (owner.error) {
        alert(owner.error);
        throw new Error(owner.error);
      }
      // 儲存 owner 以供下一步使用
      this.onwer = owner;
    }), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(() => {
      return this.accountService.postUserToOwner(userId, this.onwer.id).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(res => {
        if (!res.result) {
          alert("擁有者 綁定失敗");
          throw new Error("擁有者 綁定失敗");
        }
        alert("擁有者 綁定成功");
      }));
    }), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.switchMap)(() => {
      return this.accountService.postUserToRole(userId).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(res => {
        if (!res.result) {
          alert("角色 綁定失敗");
          throw new Error("角色 綁定失敗");
        }
        alert("角色 綁定成功");
      }));
    }), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(err => {
      console.error("流程中斷:", err.message);
      return rxjs__WEBPACK_IMPORTED_MODULE_5__.EMPTY; // 停止流程
    })).subscribe(() => {
      // 全部成功，導向首頁
      this.router.navigate(["/home"]);
    });
  }
  static {
    this.ɵfac = function BookerSelectOwnerComponent_Factory(t) {
      return new (t || BookerSelectOwnerComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_7__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_services_account_service__WEBPACK_IMPORTED_MODULE_0__.AccountService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](src_app_auth_route_services_google_auth_service__WEBPACK_IMPORTED_MODULE_1__.GoogleAuthService));
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineComponent"]({
      type: BookerSelectOwnerComponent,
      selectors: [["app-booker-select-owner"]],
      decls: 10,
      vars: 1,
      consts: [["type", "text", "placeholder", "\u8F38\u5165\u64C1\u6709\u8005\u4FE1\u7BB1", 3, "ngModelChange", "ngModel"], [3, "click"]],
      template: function BookerSelectOwnerComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "h2");
          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](1, "\u7D81\u5B9A\u64C1\u6709\u8005");
          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](2, "ul")(3, "li");
          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](4, "\u9810\u7D04\u8005 \u89D2\u8272\u78BA\u5B9A\u5F8C\u4FBF\u4E0D\u53EF\u4FEE\u6539\u70BA \u64C1\u6709\u8005");
          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](5, "li");
          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](6, "\u9810\u7D04\u8005 \u7D81\u5B9A \u64C1\u6709\u8005 \u5F8C\u4FBF\u4E0D\u53EF\u4FEE\u6539");
          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](7, "input", 0);
          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtwoWayListener"]("ngModelChange", function BookerSelectOwnerComponent_Template_input_ngModelChange_7_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtwoWayBindingSet"](ctx.ownerEmail, $event) || (ctx.ownerEmail = $event);
            return $event;
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](8, "button", 1);
          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function BookerSelectOwnerComponent_Template_button_click_8_listener() {
            return ctx.clickSendOwner();
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](9, "\u9001\u51FA");
          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        }
        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](7);
          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtwoWayProperty"]("ngModel", ctx.ownerEmail);
        }
      },
      dependencies: [_angular_forms__WEBPACK_IMPORTED_MODULE_8__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_8__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_8__.NgModel],
      styles: ["/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJib29rZXItc2VsZWN0LW93bmVyLmNvbXBvbmVudC5zY3NzIn0= */\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvYWNjb3VudC9jb21wb25lbnRzL2Jvb2tlci1zZWxlY3Qtb3duZXIvYm9va2VyLXNlbGVjdC1vd25lci5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQ0Esb0xBQW9MIiwic291cmNlUm9vdCI6IiJ9 */"]
    });
  }
}

/***/ }),

/***/ 861:
/*!*************************************************************************!*\
  !*** ./src/app/account/components/role-select/role-select.component.ts ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   RoleSelectComponent: () => (/* binding */ RoleSelectComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 7580);

class RoleSelectComponent {
  static {
    this.ɵfac = function RoleSelectComponent_Factory(t) {
      return new (t || RoleSelectComponent)();
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
      type: RoleSelectComponent,
      selectors: [["app-role-select"]],
      decls: 2,
      vars: 0,
      template: function RoleSelectComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "p");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "role-select works!");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        }
      },
      styles: ["/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJyb2xlLXNlbGVjdC5jb21wb25lbnQuc2NzcyJ9 */\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvYWNjb3VudC9jb21wb25lbnRzL3JvbGUtc2VsZWN0L3JvbGUtc2VsZWN0LmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFDQSx3S0FBd0siLCJzb3VyY2VSb290IjoiIn0= */"]
    });
  }
}

/***/ }),

/***/ 5025:
/*!*****************************************************!*\
  !*** ./src/app/account/services/account.service.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AccountService: () => (/* binding */ AccountService)
/* harmony export */ });
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/environments/environment */ 5312);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ 6443);



class AccountService {
  constructor(httpClient) {
    this.httpClient = httpClient;
    this.DOMAIN = src_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.domain;
    this.CONTEXT = "/api/account";
    this.BASE_URL = this.DOMAIN + this.CONTEXT;
  }
  /*
   * 取得 該 擁有者, 依照 email
   */
  getOwner(email) {
    return this.httpClient.get(`${this.BASE_URL}/owner/${email}`);
  }
  /*
   * 新增 預約者 對應 擁有者
   */
  postUserToOwner(userId, ownerId) {
    return this.httpClient.post(`${this.BASE_URL}/owner/add`, {
      userToOwner: {
        userId,
        ownerId
      }
    });
  }
  /*
   * 新增 預約者 對應 角色
   */
  postUserToRole(userId) {
    return this.httpClient.post(`${this.BASE_URL}/role/add`, {
      userToRole: {
        userId,
        role: "booker"
      }
    });
  }
  static {
    this.ɵfac = function AccountService_Factory(t) {
      return new (t || AccountService)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpClient));
    };
  }
  static {
    this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({
      token: AccountService,
      factory: AccountService.ɵfac,
      providedIn: 'root'
    });
  }
}

/***/ }),

/***/ 4114:
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AppRoutingModule: () => (/* binding */ AppRoutingModule)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_39__ = __webpack_require__(/*! @angular/router */ 5072);
/* harmony import */ var _home_components_home_page_home_page_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./home/components/home-page/home-page.component */ 2575);
/* harmony import */ var _auth_route_components_login_page_login_page_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./auth-route/components/login-page/login-page.component */ 3864);
/* harmony import */ var _auth_route_components_account_page_account_page_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./auth-route/components/account-page/account-page.component */ 7684);
/* harmony import */ var _auth_route_services_auth_guard_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./auth-route/services/auth-guard.service */ 4871);
/* harmony import */ var _booking_components_booking_date_page_booking_date_page_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./booking/components/booking-date-page/booking-date-page.component */ 5637);
/* harmony import */ var _booking_components_booking_clock_page_booking_clock_page_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./booking/components/booking-clock-page/booking-clock-page.component */ 6211);
/* harmony import */ var _booking_components_booking_select_type_page_booking_select_type_page_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./booking/components/booking-select-type-page/booking-select-type-page.component */ 2857);
/* harmony import */ var _booking_components_booking_check_form_page_booking_check_form_page_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./booking/components/booking-check-form-page/booking-check-form-page.component */ 6445);
/* harmony import */ var _payment_components_paid_plan_list_paid_plan_list_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./payment/components/paid-plan-list/paid-plan-list.component */ 9446);
/* harmony import */ var _payment_components_ecpay_form_ecpay_form_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./payment/components/ecpay-form/ecpay-form.component */ 386);
/* harmony import */ var _payment_components_check_payment_check_payment_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./payment/components/check-payment/check-payment.component */ 3734);
/* harmony import */ var _review_booking_components_review_booking_calendar_review_booking_calendar_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./review-booking/components/review-booking-calendar/review-booking-calendar.component */ 4668);
/* harmony import */ var _review_booking_components_review_booking_form_review_booking_form_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./review-booking/components/review-booking-form/review-booking-form.component */ 2796);
/* harmony import */ var _review_room_components_review_room_overview_review_room_overview_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./review-room/components/review-room-overview/review-room-overview.component */ 9090);
/* harmony import */ var _manager_room_components_room_dashboard_room_dashboard_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./manager-room/components/room-dashboard/room-dashboard.component */ 4119);
/* harmony import */ var _manager_room_components_content_search_booking_user_search_booking_user_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./manager-room/components/content/search-booking-user/search-booking-user.component */ 8179);
/* harmony import */ var _manager_room_components_content_room_site_import_room_site_import_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./manager-room/components/content/room-site-import/room-site-import.component */ 2659);
/* harmony import */ var _manager_room_components_content_search_room_search_room_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./manager-room/components/content/search-room/search-room.component */ 9715);
/* harmony import */ var _manager_room_components_content_search_room_content_search_room_content_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./manager-room/components/content/search-room-content/search-room-content.component */ 1243);
/* harmony import */ var _manager_room_components_content_search_site_search_site_component__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./manager-room/components/content/search-site/search-site.component */ 6183);
/* harmony import */ var _manager_room_components_content_search_site_content_search_site_content_component__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./manager-room/components/content/search-site-content/search-site-content.component */ 8863);
/* harmony import */ var _manager_room_components_content_search_booking_search_booking_component__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./manager-room/components/content/search-booking/search-booking.component */ 5141);
/* harmony import */ var _manager_system_components_sys_dashboard_sys_dashboard_component__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./manager-system/components/sys-dashboard/sys-dashboard.component */ 4627);
/* harmony import */ var _manager_system_components_all_user_all_user_component__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./manager-system/components/all-user/all-user.component */ 7423);
/* harmony import */ var _manager_system_components_user_role_list_user_role_list_component__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./manager-system/components/user-role-list/user-role-list.component */ 8659);
/* harmony import */ var _manager_system_components_user_payment_list_user_payment_list_component__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./manager-system/components/user-payment-list/user-payment-list.component */ 1251);
/* harmony import */ var _manager_system_components_log_record_log_record_component__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./manager-system/components/log-record/log-record.component */ 4201);
/* harmony import */ var _manager_system_components_pay_record_pay_record_component__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./manager-system/components/pay-record/pay-record.component */ 2637);
/* harmony import */ var _manager_system_components_pay_setting_pay_setting_component__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ./manager-system/components/pay-setting/pay-setting.component */ 3155);
/* harmony import */ var _manager_system_components_pay_setting_content_pay_setting_content_component__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ./manager-system/components/pay-setting-content/pay-setting-content.component */ 9923);
/* harmony import */ var _manager_system_components_backup_backup_component__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! ./manager-system/components/backup/backup.component */ 5573);
/* harmony import */ var _auth_route_components_register_info_register_info_component__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! ./auth-route/components/register-info/register-info.component */ 7512);
/* harmony import */ var _auth_route_components_register_mail_verify_register_mail_verify_component__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! ./auth-route/components/register-mail-verify/register-mail-verify.component */ 4708);
/* harmony import */ var _auth_route_components_register_select_register_select_component__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! ./auth-route/components/register-select/register-select.component */ 6392);
/* harmony import */ var _auth_route_components_password_change_password_change_component__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(/*! ./auth-route/components/password-change/password-change.component */ 1044);
/* harmony import */ var _account_components_booker_select_owner_booker_select_owner_component__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(/*! ./account/components/booker-select-owner/booker-select-owner.component */ 5077);
/* harmony import */ var _auth_route_components_forget_password_mail_forget_password_mail_component__WEBPACK_IMPORTED_MODULE_36__ = __webpack_require__(/*! ./auth-route/components/forget-password-mail/forget-password-mail.component */ 6388);
/* harmony import */ var _auth_route_components_forget_password_verity_forget_password_verity_component__WEBPACK_IMPORTED_MODULE_37__ = __webpack_require__(/*! ./auth-route/components/forget-password-verity/forget-password-verity.component */ 1628);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_38__ = __webpack_require__(/*! @angular/core */ 7580);















// 空間管理








// 系統管理









// 註冊




// 註冊 後 帳號 購買,升級

// 忘記密碼




const routes = [{
  path: '',
  component: _auth_route_components_login_page_login_page_component__WEBPACK_IMPORTED_MODULE_1__.LoginPageComponent
}, {
  path: 'forget-password-mail',
  component: _auth_route_components_forget_password_mail_forget_password_mail_component__WEBPACK_IMPORTED_MODULE_36__.ForgetPasswordMailComponent
}, {
  path: 'forget-password-verity',
  component: _auth_route_components_forget_password_verity_forget_password_verity_component__WEBPACK_IMPORTED_MODULE_37__.ForgetPasswordVerityComponent
}, {
  path: 'booker-select-owner',
  component: _account_components_booker_select_owner_booker_select_owner_component__WEBPACK_IMPORTED_MODULE_35__.BookerSelectOwnerComponent
}, {
  path: 'register-select',
  component: _auth_route_components_register_select_register_select_component__WEBPACK_IMPORTED_MODULE_33__.RegisterSelectComponent
}, {
  path: 'register-info',
  component: _auth_route_components_register_info_register_info_component__WEBPACK_IMPORTED_MODULE_31__.RegisterInfoComponent
}, {
  path: 'register-mail-verify',
  component: _auth_route_components_register_mail_verify_register_mail_verify_component__WEBPACK_IMPORTED_MODULE_32__.RegisterMailVerifyComponent
}, {
  path: 'password-change',
  component: _auth_route_components_password_change_password_change_component__WEBPACK_IMPORTED_MODULE_34__.PasswordChangeComponent
}, {
  path: 'account',
  component: _auth_route_components_account_page_account_page_component__WEBPACK_IMPORTED_MODULE_2__.AccountPageComponent
}, {
  path: 'home',
  canActivate: [_auth_route_services_auth_guard_service__WEBPACK_IMPORTED_MODULE_3__.AuthGuardService],
  // 檢查 父路由。
  component: _home_components_home_page_home_page_component__WEBPACK_IMPORTED_MODULE_0__.HomePageComponent
}, {
  path: 'booking-date',
  component: _booking_components_booking_date_page_booking_date_page_component__WEBPACK_IMPORTED_MODULE_4__.BookingDatePageComponent
}, {
  path: 'booking-clock',
  component: _booking_components_booking_clock_page_booking_clock_page_component__WEBPACK_IMPORTED_MODULE_5__.BookingClockPageComponent
}, {
  path: 'booking-select-type',
  component: _booking_components_booking_select_type_page_booking_select_type_page_component__WEBPACK_IMPORTED_MODULE_6__.BookingSelectTypePageComponent
}, {
  path: 'booking-check-form',
  component: _booking_components_booking_check_form_page_booking_check_form_page_component__WEBPACK_IMPORTED_MODULE_7__.BookingCheckFormPageComponent
}, {
  path: 'review-booking-calendar',
  component: _review_booking_components_review_booking_calendar_review_booking_calendar_component__WEBPACK_IMPORTED_MODULE_11__.ReviewBookingCalendarComponent
}, {
  path: 'review-booking-form',
  component: _review_booking_components_review_booking_form_review_booking_form_component__WEBPACK_IMPORTED_MODULE_12__.ReviewBookingFormComponent
}, {
  path: 'review-room-overview',
  component: _review_room_components_review_room_overview_review_room_overview_component__WEBPACK_IMPORTED_MODULE_13__.ReviewRoomOverviewComponent
},
// 空間管理
{
  path: 'manager-room',
  component: _manager_room_components_room_dashboard_room_dashboard_component__WEBPACK_IMPORTED_MODULE_14__.RoomDashboardComponent,
  children: [{
    path: 'room-site-import',
    component: _manager_room_components_content_room_site_import_room_site_import_component__WEBPACK_IMPORTED_MODULE_16__.RoomSiteImportComponent
  }, {
    path: 'booking-user',
    component: _manager_room_components_content_search_booking_user_search_booking_user_component__WEBPACK_IMPORTED_MODULE_15__.SearchBookingUserComponent
  }, {
    path: 'room',
    component: _manager_room_components_content_search_room_search_room_component__WEBPACK_IMPORTED_MODULE_17__.SearchRoomComponent
  }, {
    path: 'room-content',
    component: _manager_room_components_content_search_room_content_search_room_content_component__WEBPACK_IMPORTED_MODULE_18__.SearchRoomContentComponent
  }, {
    path: 'site',
    component: _manager_room_components_content_search_site_search_site_component__WEBPACK_IMPORTED_MODULE_19__.SearchSiteComponent
  }, {
    path: 'site-content',
    component: _manager_room_components_content_search_site_content_search_site_content_component__WEBPACK_IMPORTED_MODULE_20__.SearchSiteContentComponent
  }, {
    path: 'booking',
    component: _manager_room_components_content_search_booking_search_booking_component__WEBPACK_IMPORTED_MODULE_21__.SearchBookingComponent
  }]
}, {
  path: 'manager-sys',
  component: _manager_system_components_sys_dashboard_sys_dashboard_component__WEBPACK_IMPORTED_MODULE_22__.SysDashboardComponent,
  children: [{
    path: 'all-user',
    component: _manager_system_components_all_user_all_user_component__WEBPACK_IMPORTED_MODULE_23__.AllUserComponent
  }, {
    path: 'user-role-list',
    component: _manager_system_components_user_role_list_user_role_list_component__WEBPACK_IMPORTED_MODULE_24__.UserRoleListComponent
  }, {
    path: 'user-payment-list',
    component: _manager_system_components_user_payment_list_user_payment_list_component__WEBPACK_IMPORTED_MODULE_25__.UserPaymentListComponent
  }, {
    path: 'log-record',
    component: _manager_system_components_log_record_log_record_component__WEBPACK_IMPORTED_MODULE_26__.LogRecordComponent
  }, {
    path: 'pay-record',
    component: _manager_system_components_pay_record_pay_record_component__WEBPACK_IMPORTED_MODULE_27__.PayRecordComponent
  }, {
    path: 'pay-setting',
    component: _manager_system_components_pay_setting_pay_setting_component__WEBPACK_IMPORTED_MODULE_28__.PaySettingComponent
  }, {
    path: 'pay-setting-content',
    component: _manager_system_components_pay_setting_content_pay_setting_content_component__WEBPACK_IMPORTED_MODULE_29__.PaySettingContentComponent
  }, {
    path: 'backup',
    component: _manager_system_components_backup_backup_component__WEBPACK_IMPORTED_MODULE_30__.BackupComponent
  }]
},
/*
  {
    path: 'review-room-detail',
    component: ReviewRoomRemanetRateComponent,
  },
   */
{
  path: 'pay-plan-list',
  component: _payment_components_paid_plan_list_paid_plan_list_component__WEBPACK_IMPORTED_MODULE_8__.PaidPlanListComponent
}, {
  path: 'chekc-payment',
  component: _payment_components_check_payment_check_payment_component__WEBPACK_IMPORTED_MODULE_10__.CheckPaymentComponent
}, {
  path: 'ecpay-form',
  component: _payment_components_ecpay_form_ecpay_form_component__WEBPACK_IMPORTED_MODULE_9__.EcpayFormComponent
}];
class AppRoutingModule {
  static {
    this.ɵfac = function AppRoutingModule_Factory(t) {
      return new (t || AppRoutingModule)();
    };
  }
  static {
    this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_38__["ɵɵdefineNgModule"]({
      type: AppRoutingModule
    });
  }
  static {
    this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_38__["ɵɵdefineInjector"]({
      imports: [_angular_router__WEBPACK_IMPORTED_MODULE_39__.RouterModule.forRoot(routes), _angular_router__WEBPACK_IMPORTED_MODULE_39__.RouterModule]
    });
  }
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_38__["ɵɵsetNgModuleScope"](AppRoutingModule, {
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_39__.RouterModule],
    exports: [_angular_router__WEBPACK_IMPORTED_MODULE_39__.RouterModule]
  });
})();

/***/ }),

/***/ 92:
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AppComponent: () => (/* binding */ AppComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 5072);
/* harmony import */ var _common_header_components_header_header_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./common/header/components/header/header.component */ 5173);



class AppComponent {
  constructor() {
    this.title = 'Space In';
  }
  static {
    this.ɵfac = function AppComponent_Factory(t) {
      return new (t || AppComponent)();
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
      type: AppComponent,
      selectors: [["app-root"]],
      decls: 2,
      vars: 0,
      template: function AppComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](0, "app-header")(1, "router-outlet");
        }
      },
      dependencies: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterOutlet, _common_header_components_header_header_component__WEBPACK_IMPORTED_MODULE_0__.HeaderComponent],
      styles: ["/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJhcHAuY29tcG9uZW50LnNjc3MifQ== */\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvYXBwLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFDQSxnS0FBZ0siLCJzb3VyY2VSb290IjoiIn0= */"]
    });
  }
}

/***/ }),

/***/ 635:
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AppModule: () => (/* binding */ AppModule)
/* harmony export */ });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_55__ = __webpack_require__(/*! @angular/platform-browser */ 436);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_57__ = __webpack_require__(/*! @angular/forms */ 4456);
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app-routing.module */ 4114);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_56__ = __webpack_require__(/*! @angular/common/http */ 6443);
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app.component */ 92);
/* harmony import */ var _common_header_components_header_header_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./common/header/components/header/header.component */ 5173);
/* harmony import */ var _common_button_components_img_btn_img_btn_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./common/button/components/img-btn/img-btn.component */ 9790);
/* harmony import */ var _home_components_home_page_home_page_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./home/components/home-page/home-page.component */ 2575);
/* harmony import */ var _auth_route_components_login_page_login_page_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./auth-route/components/login-page/login-page.component */ 3864);
/* harmony import */ var _common_time_component_calendar_picker_calendar_picker_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./common/time/component/calendar-picker/calendar-picker.component */ 6544);
/* harmony import */ var _common_time_component_clock_picker_clock_picker_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./common/time/component/clock-picker/clock-picker.component */ 1456);
/* harmony import */ var _booking_components_booking_date_page_booking_date_page_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./booking/components/booking-date-page/booking-date-page.component */ 5637);
/* harmony import */ var _booking_components_booking_clock_page_booking_clock_page_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./booking/components/booking-clock-page/booking-clock-page.component */ 6211);
/* harmony import */ var _booking_components_booking_select_type_page_booking_select_type_page_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./booking/components/booking-select-type-page/booking-select-type-page.component */ 2857);
/* harmony import */ var _booking_components_booking_check_form_page_booking_check_form_page_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./booking/components/booking-check-form-page/booking-check-form-page.component */ 6445);
/* harmony import */ var _angular_fire_app__WEBPACK_IMPORTED_MODULE_53__ = __webpack_require__(/*! @angular/fire/app */ 2945);
/* harmony import */ var _angular_fire_firestore__WEBPACK_IMPORTED_MODULE_54__ = __webpack_require__(/*! @angular/fire/firestore */ 1159);
/* harmony import */ var _payment_components_paid_plan_list_paid_plan_list_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./payment/components/paid-plan-list/paid-plan-list.component */ 9446);
/* harmony import */ var _payment_components_ecpay_form_ecpay_form_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./payment/components/ecpay-form/ecpay-form.component */ 386);
/* harmony import */ var _review_room_components_review_room_trend_review_room_trend_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./review-room/components/review-room-trend/review-room-trend.component */ 2644);
/* harmony import */ var _review_room_components_review_room_remanet_rate_review_room_remanet_rate_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./review-room/components/review-room-remanet-rate/review-room-remanet-rate.component */ 4766);
/* harmony import */ var _review_booking_components_review_booking_calendar_review_booking_calendar_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./review-booking/components/review-booking-calendar/review-booking-calendar.component */ 4668);
/* harmony import */ var _review_booking_components_review_booking_form_review_booking_form_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./review-booking/components/review-booking-form/review-booking-form.component */ 2796);
/* harmony import */ var _common_dialog_components_dialog_dialog_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./common/dialog/components/dialog/dialog.component */ 9276);
/* harmony import */ var _common_pipe_word_shroten_pipe__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./common/pipe/word-shroten.pipe */ 9551);
/* harmony import */ var _common_input_components_input_input_component__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./common/input/components/input/input.component */ 8740);
/* harmony import */ var _common_pipe_date_to_day_of_week_pipe__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./common/pipe/date-to-day-of-week.pipe */ 4905);
/* harmony import */ var _common_loading_components_loading_basic_loading_basic_component__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./common/loading/components/loading-basic/loading-basic.component */ 3408);
/* harmony import */ var _review_room_components_review_room_overview_review_room_overview_component__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./review-room/components/review-room-overview/review-room-overview.component */ 9090);
/* harmony import */ var _auth_route_components_account_page_account_page_component__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./auth-route/components/account-page/account-page.component */ 7684);
/* harmony import */ var _manager_system_components_sys_dashboard_sys_dashboard_component__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./manager-system/components/sys-dashboard/sys-dashboard.component */ 4627);
/* harmony import */ var _manager_room_components_room_dashboard_room_dashboard_component__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./manager-room/components/room-dashboard/room-dashboard.component */ 4119);
/* harmony import */ var _manager_room_components_content_search_booking_user_search_booking_user_component__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./manager-room/components/content/search-booking-user/search-booking-user.component */ 8179);
/* harmony import */ var _manager_room_components_content_search_room_search_room_component__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ./manager-room/components/content/search-room/search-room.component */ 9715);
/* harmony import */ var _manager_room_components_content_search_site_search_site_component__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ./manager-room/components/content/search-site/search-site.component */ 6183);
/* harmony import */ var _manager_room_components_content_search_booking_search_booking_component__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! ./manager-room/components/content/search-booking/search-booking.component */ 5141);
/* harmony import */ var _auth_route_components_register_select_register_select_component__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! ./auth-route/components/register-select/register-select.component */ 6392);
/* harmony import */ var _auth_route_components_register_info_register_info_component__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! ./auth-route/components/register-info/register-info.component */ 7512);
/* harmony import */ var _auth_route_components_register_mail_verify_register_mail_verify_component__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! ./auth-route/components/register-mail-verify/register-mail-verify.component */ 4708);
/* harmony import */ var _auth_route_components_password_change_password_change_component__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(/*! ./auth-route/components/password-change/password-change.component */ 1044);
/* harmony import */ var _manager_system_components_all_user_all_user_component__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(/*! ./manager-system/components/all-user/all-user.component */ 7423);
/* harmony import */ var _manager_system_components_pay_record_pay_record_component__WEBPACK_IMPORTED_MODULE_36__ = __webpack_require__(/*! ./manager-system/components/pay-record/pay-record.component */ 2637);
/* harmony import */ var _manager_system_components_pay_setting_pay_setting_component__WEBPACK_IMPORTED_MODULE_37__ = __webpack_require__(/*! ./manager-system/components/pay-setting/pay-setting.component */ 3155);
/* harmony import */ var _manager_system_components_log_record_log_record_component__WEBPACK_IMPORTED_MODULE_38__ = __webpack_require__(/*! ./manager-system/components/log-record/log-record.component */ 4201);
/* harmony import */ var _manager_system_components_backup_backup_component__WEBPACK_IMPORTED_MODULE_39__ = __webpack_require__(/*! ./manager-system/components/backup/backup.component */ 5573);
/* harmony import */ var _account_components_role_select_role_select_component__WEBPACK_IMPORTED_MODULE_40__ = __webpack_require__(/*! ./account/components/role-select/role-select.component */ 861);
/* harmony import */ var _account_components_booker_select_owner_booker_select_owner_component__WEBPACK_IMPORTED_MODULE_41__ = __webpack_require__(/*! ./account/components/booker-select-owner/booker-select-owner.component */ 5077);
/* harmony import */ var _payment_components_check_payment_check_payment_component__WEBPACK_IMPORTED_MODULE_42__ = __webpack_require__(/*! ./payment/components/check-payment/check-payment.component */ 3734);
/* harmony import */ var _auth_route_components_forget_password_mail_forget_password_mail_component__WEBPACK_IMPORTED_MODULE_43__ = __webpack_require__(/*! ./auth-route/components/forget-password-mail/forget-password-mail.component */ 6388);
/* harmony import */ var _auth_route_components_forget_password_verity_forget_password_verity_component__WEBPACK_IMPORTED_MODULE_44__ = __webpack_require__(/*! ./auth-route/components/forget-password-verity/forget-password-verity.component */ 1628);
/* harmony import */ var _manager_system_components_pay_setting_content_pay_setting_content_component__WEBPACK_IMPORTED_MODULE_45__ = __webpack_require__(/*! ./manager-system/components/pay-setting-content/pay-setting-content.component */ 9923);
/* harmony import */ var _manager_room_components_content_search_room_content_search_room_content_component__WEBPACK_IMPORTED_MODULE_46__ = __webpack_require__(/*! ./manager-room/components/content/search-room-content/search-room-content.component */ 1243);
/* harmony import */ var _manager_room_components_content_room_site_import_room_site_import_component__WEBPACK_IMPORTED_MODULE_47__ = __webpack_require__(/*! ./manager-room/components/content/room-site-import/room-site-import.component */ 2659);
/* harmony import */ var _manager_room_components_content_search_site_content_search_site_content_component__WEBPACK_IMPORTED_MODULE_48__ = __webpack_require__(/*! ./manager-room/components/content/search-site-content/search-site-content.component */ 8863);
/* harmony import */ var _manager_system_components_user_role_list_user_role_list_component__WEBPACK_IMPORTED_MODULE_49__ = __webpack_require__(/*! ./manager-system/components/user-role-list/user-role-list.component */ 8659);
/* harmony import */ var _manager_system_components_user_payment_list_user_payment_list_component__WEBPACK_IMPORTED_MODULE_50__ = __webpack_require__(/*! ./manager-system/components/user-payment-list/user-payment-list.component */ 1251);
/* harmony import */ var _common_version_components_app_version_app_version_component__WEBPACK_IMPORTED_MODULE_51__ = __webpack_require__(/*! ./common/version/components/app-version/app-version.component */ 6508);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_52__ = __webpack_require__(/*! @angular/core */ 7580);































// 空間管理



























// 調整會損壞... ="=
const firebase = {
  projectId: 'spacein-ec8ab',
  appId: '1:328066296243:web:b1897c1201a0f9b55843c6',
  storageBucket: 'spacein-ec8ab.appspot.com',
  apiKey: '***REMOVED***',
  authDomain: 'spacein-ec8ab.firebaseapp.com',
  messagingSenderId: '328066296243',
  measurementId: 'G-54HYGJ7ZDQ'
};
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
class AppModule {
  static {
    this.ɵfac = function AppModule_Factory(t) {
      return new (t || AppModule)();
    };
  }
  static {
    this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_52__["ɵɵdefineNgModule"]({
      type: AppModule,
      bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_1__.AppComponent]
    });
  }
  static {
    this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_52__["ɵɵdefineInjector"]({
      providers: [(0,_angular_fire_app__WEBPACK_IMPORTED_MODULE_53__.provideFirebaseApp)(() => (0,_angular_fire_app__WEBPACK_IMPORTED_MODULE_53__.initializeApp)(firebase)), (0,_angular_fire_firestore__WEBPACK_IMPORTED_MODULE_54__.provideFirestore)(() => (0,_angular_fire_firestore__WEBPACK_IMPORTED_MODULE_54__.getFirestore)())],
      imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_55__.BrowserModule, _app_routing_module__WEBPACK_IMPORTED_MODULE_0__.AppRoutingModule, _angular_common_http__WEBPACK_IMPORTED_MODULE_56__.HttpClientModule, _angular_forms__WEBPACK_IMPORTED_MODULE_57__.FormsModule]
    });
  }
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_52__["ɵɵsetNgModuleScope"](AppModule, {
    declarations: [_app_component__WEBPACK_IMPORTED_MODULE_1__.AppComponent, _common_header_components_header_header_component__WEBPACK_IMPORTED_MODULE_2__.HeaderComponent, _common_button_components_img_btn_img_btn_component__WEBPACK_IMPORTED_MODULE_3__.ImgBtnComponent, _home_components_home_page_home_page_component__WEBPACK_IMPORTED_MODULE_4__.HomePageComponent, _auth_route_components_login_page_login_page_component__WEBPACK_IMPORTED_MODULE_5__.LoginPageComponent, _common_time_component_calendar_picker_calendar_picker_component__WEBPACK_IMPORTED_MODULE_6__.CalendarPickerComponent, _common_time_component_clock_picker_clock_picker_component__WEBPACK_IMPORTED_MODULE_7__.ClockPickerComponent, _booking_components_booking_date_page_booking_date_page_component__WEBPACK_IMPORTED_MODULE_8__.BookingDatePageComponent, _booking_components_booking_clock_page_booking_clock_page_component__WEBPACK_IMPORTED_MODULE_9__.BookingClockPageComponent, _booking_components_booking_select_type_page_booking_select_type_page_component__WEBPACK_IMPORTED_MODULE_10__.BookingSelectTypePageComponent, _booking_components_booking_check_form_page_booking_check_form_page_component__WEBPACK_IMPORTED_MODULE_11__.BookingCheckFormPageComponent, _payment_components_paid_plan_list_paid_plan_list_component__WEBPACK_IMPORTED_MODULE_12__.PaidPlanListComponent, _payment_components_ecpay_form_ecpay_form_component__WEBPACK_IMPORTED_MODULE_13__.EcpayFormComponent, _review_room_components_review_room_trend_review_room_trend_component__WEBPACK_IMPORTED_MODULE_14__.ReviewRoomTrendComponent, _review_room_components_review_room_remanet_rate_review_room_remanet_rate_component__WEBPACK_IMPORTED_MODULE_15__.ReviewRoomRemanetRateComponent, _review_booking_components_review_booking_calendar_review_booking_calendar_component__WEBPACK_IMPORTED_MODULE_16__.ReviewBookingCalendarComponent, _review_booking_components_review_booking_form_review_booking_form_component__WEBPACK_IMPORTED_MODULE_17__.ReviewBookingFormComponent, _common_dialog_components_dialog_dialog_component__WEBPACK_IMPORTED_MODULE_18__.DialogComponent, _common_pipe_word_shroten_pipe__WEBPACK_IMPORTED_MODULE_19__.WordShrotenPipe, _common_input_components_input_input_component__WEBPACK_IMPORTED_MODULE_20__.InputComponent, _common_pipe_date_to_day_of_week_pipe__WEBPACK_IMPORTED_MODULE_21__.DateToDayOfWeekPipe, _common_loading_components_loading_basic_loading_basic_component__WEBPACK_IMPORTED_MODULE_22__.LoadingBasicComponent, _review_room_components_review_room_overview_review_room_overview_component__WEBPACK_IMPORTED_MODULE_23__.ReviewRoomOverviewComponent, _auth_route_components_account_page_account_page_component__WEBPACK_IMPORTED_MODULE_24__.AccountPageComponent, _manager_system_components_sys_dashboard_sys_dashboard_component__WEBPACK_IMPORTED_MODULE_25__.SysDashboardComponent, _manager_room_components_room_dashboard_room_dashboard_component__WEBPACK_IMPORTED_MODULE_26__.RoomDashboardComponent, _manager_room_components_content_search_booking_user_search_booking_user_component__WEBPACK_IMPORTED_MODULE_27__.SearchBookingUserComponent, _manager_room_components_content_search_room_search_room_component__WEBPACK_IMPORTED_MODULE_28__.SearchRoomComponent, _manager_room_components_content_search_site_search_site_component__WEBPACK_IMPORTED_MODULE_29__.SearchSiteComponent, _manager_room_components_content_search_booking_search_booking_component__WEBPACK_IMPORTED_MODULE_30__.SearchBookingComponent, _auth_route_components_register_select_register_select_component__WEBPACK_IMPORTED_MODULE_31__.RegisterSelectComponent, _auth_route_components_register_info_register_info_component__WEBPACK_IMPORTED_MODULE_32__.RegisterInfoComponent, _auth_route_components_register_mail_verify_register_mail_verify_component__WEBPACK_IMPORTED_MODULE_33__.RegisterMailVerifyComponent, _auth_route_components_password_change_password_change_component__WEBPACK_IMPORTED_MODULE_34__.PasswordChangeComponent, _manager_system_components_all_user_all_user_component__WEBPACK_IMPORTED_MODULE_35__.AllUserComponent, _manager_system_components_pay_record_pay_record_component__WEBPACK_IMPORTED_MODULE_36__.PayRecordComponent, _manager_system_components_pay_setting_pay_setting_component__WEBPACK_IMPORTED_MODULE_37__.PaySettingComponent, _manager_system_components_log_record_log_record_component__WEBPACK_IMPORTED_MODULE_38__.LogRecordComponent, _manager_system_components_backup_backup_component__WEBPACK_IMPORTED_MODULE_39__.BackupComponent, _account_components_role_select_role_select_component__WEBPACK_IMPORTED_MODULE_40__.RoleSelectComponent, _account_components_booker_select_owner_booker_select_owner_component__WEBPACK_IMPORTED_MODULE_41__.BookerSelectOwnerComponent, _payment_components_check_payment_check_payment_component__WEBPACK_IMPORTED_MODULE_42__.CheckPaymentComponent, _auth_route_components_forget_password_mail_forget_password_mail_component__WEBPACK_IMPORTED_MODULE_43__.ForgetPasswordMailComponent, _auth_route_components_forget_password_verity_forget_password_verity_component__WEBPACK_IMPORTED_MODULE_44__.ForgetPasswordVerityComponent, _manager_system_components_pay_setting_content_pay_setting_content_component__WEBPACK_IMPORTED_MODULE_45__.PaySettingContentComponent, _manager_room_components_content_search_room_content_search_room_content_component__WEBPACK_IMPORTED_MODULE_46__.SearchRoomContentComponent, _manager_room_components_content_room_site_import_room_site_import_component__WEBPACK_IMPORTED_MODULE_47__.RoomSiteImportComponent, _manager_room_components_content_search_site_content_search_site_content_component__WEBPACK_IMPORTED_MODULE_48__.SearchSiteContentComponent, _manager_system_components_user_role_list_user_role_list_component__WEBPACK_IMPORTED_MODULE_49__.UserRoleListComponent, _manager_system_components_user_payment_list_user_payment_list_component__WEBPACK_IMPORTED_MODULE_50__.UserPaymentListComponent, _common_version_components_app_version_app_version_component__WEBPACK_IMPORTED_MODULE_51__.AppVersionComponent],
    imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_55__.BrowserModule, _app_routing_module__WEBPACK_IMPORTED_MODULE_0__.AppRoutingModule, _angular_common_http__WEBPACK_IMPORTED_MODULE_56__.HttpClientModule, _angular_forms__WEBPACK_IMPORTED_MODULE_57__.FormsModule]
  });
})();

/***/ }),

/***/ 7684:
/*!******************************************************************************!*\
  !*** ./src/app/auth-route/components/account-page/account-page.component.ts ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AccountPageComponent: () => (/* binding */ AccountPageComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _services_google_auth_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../services/google-auth.service */ 899);
/* harmony import */ var _payment_components_check_payment_check_payment_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../payment/components/check-payment/check-payment.component */ 3734);
/* harmony import */ var _common_version_components_app_version_app_version_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../common/version/components/app-version/app-version.component */ 6508);




class AccountPageComponent {
  constructor(googleAuthService) {
    this.googleAuthService = googleAuthService;
    this.currentUser = this.googleAuthService.getCurrentUser();
  }
  /*
   * 登出
   */
  loginOut() {
    this.googleAuthService.logout();
  }
  /* 刪除帳號 */
  deleteAccount(deleteAccount) {
    if (deleteAccount !== this.currentUser.email) {
      alert("輸入信箱錯誤, 刪除失敗");
      return;
    }
    this.googleAuthService.deleteUserById(this.currentUser.userFirestoreId);
  }
  static {
    this.ɵfac = function AccountPageComponent_Factory(t) {
      return new (t || AccountPageComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_services_google_auth_service__WEBPACK_IMPORTED_MODULE_0__.GoogleAuthService));
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({
      type: AccountPageComponent,
      selectors: [["app-account-page"]],
      decls: 22,
      vars: 3,
      consts: [["deleteAccountInput", ""], [1, "form-container"], [1, "row"], [3, "click"], [3, "isFromAccountPage"], [1, "delete-container"], ["type", "text", "placeholder", "\u8F38\u5165\u4FE1\u7BB1"]],
      template: function AccountPageComponent_Template(rf, ctx) {
        if (rf & 1) {
          const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 1)(1, "div", 2);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](3, "div", 2);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](4);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](5, "button", 3);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function AccountPageComponent_Template_button_click_5_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r1);
            return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx.loginOut());
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](6, "\u767B\u51FA");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](7, "app-check-payment", 4)(8, "app-version");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](9, "div", 5)(10, "h3");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](11, "\u522A\u9664\u5E33\u865F\u78BA\u8A8D");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](12, "p");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](13, " \u78BA\u8A8D\u522A\u9664\u500B\u4EBA\u5E33\u865F? ");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](14, "br");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](15, " \u82E5\u522A\u9664, \u9810\u7D04\u8207\u5176\u4ED6\u7D00\u9304\u5C07\u7121\u6CD5\u5FA9\u539F\u3002 ");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](16, "h3");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](17, "\u78BA\u5B9A\u522A\u9664, \u8ACB\u8F38\u5165\u7576\u524D\u5E33\u865F\u4FE1\u7BB1");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](18, "input", 6, 0);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](20, "button", 3);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function AccountPageComponent_Template_button_click_20_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r1);
            const deleteAccountInput_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵreference"](19);
            return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx.deleteAccount(deleteAccountInput_r2.value));
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](21, "\u78BA\u5B9A\u522A\u9664\u5E33\u865F");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()();
        }
        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" \u59D3\u540D: ", ctx.currentUser.name, " ");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" \u4FE1\u7BB1: ", ctx.currentUser.email, " ");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("isFromAccountPage", true);
        }
      },
      dependencies: [_payment_components_check_payment_check_payment_component__WEBPACK_IMPORTED_MODULE_1__.CheckPaymentComponent, _common_version_components_app_version_app_version_component__WEBPACK_IMPORTED_MODULE_2__.AppVersionComponent],
      styles: [".form-container[_ngcontent-%COMP%] {\n  width: 100%;\n  display: flex;\n  flex-direction: column;\n  justify-content: flex-start;\n  align-items: center;\n}\n.form-container[_ngcontent-%COMP%]   .row[_ngcontent-%COMP%] {\n  width: 80%;\n  max-width: 400px;\n  display: flex;\n  flex-direction: row;\n  justify-content: flex-start;\n  align-items: center;\n  margin: 20px 0;\n  padding: 10px 20px;\n  border-radius: 20px;\n  background: #FBE0FF;\n}\n.form-container[_ngcontent-%COMP%]   .delete-container[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  color: red;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFjY291bnQtcGFnZS5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQTtFQUNJLFdBQUE7RUFDQSxhQUFBO0VBQ0Esc0JBQUE7RUFDQSwyQkFBQTtFQUNBLG1CQUFBO0FBQUo7QUFFSTtFQUNJLFVBQUE7RUFDQSxnQkFBQTtFQUNBLGFBQUE7RUFDQSxtQkFBQTtFQUNBLDJCQUFBO0VBQ0EsbUJBQUE7RUFFQSxjQUFBO0VBQ0Esa0JBQUE7RUFDQSxtQkFBQTtFQUNBLG1CQUFBO0FBRFI7QUFJSTtFQUNJLGFBQUE7RUFDQSxzQkFBQTtFQUNBLFVBQUE7QUFGUiIsImZpbGUiOiJhY2NvdW50LXBhZ2UuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuLmZvcm0tY29udGFpbmVyIHtcclxuICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtc3RhcnQ7XHJcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG5cclxuICAgIC5yb3cge1xyXG4gICAgICAgIHdpZHRoOiA4MCU7XHJcbiAgICAgICAgbWF4LXdpZHRoOiA0MDBweDtcclxuICAgICAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgICAgIGZsZXgtZGlyZWN0aW9uOiByb3c7XHJcbiAgICAgICAganVzdGlmeS1jb250ZW50OiBmbGV4LXN0YXJ0O1xyXG4gICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcblxyXG4gICAgICAgIG1hcmdpbjogMjBweCAwO1xyXG4gICAgICAgIHBhZGRpbmc6IDEwcHggMjBweDtcclxuICAgICAgICBib3JkZXItcmFkaXVzOiAyMHB4O1xyXG4gICAgICAgIGJhY2tncm91bmQ6ICNGQkUwRkY7XHJcbiAgICB9XHJcblxyXG4gICAgLmRlbGV0ZS1jb250YWluZXIge1xyXG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuICAgICAgICBjb2xvcjogcmVkO1xyXG4gICAgfVxyXG59XHJcblxyXG5cclxuIl19 */\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvYXV0aC1yb3V0ZS9jb21wb25lbnRzL2FjY291bnQtcGFnZS9hY2NvdW50LXBhZ2UuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0E7RUFDSSxXQUFBO0VBQ0EsYUFBQTtFQUNBLHNCQUFBO0VBQ0EsMkJBQUE7RUFDQSxtQkFBQTtBQUFKO0FBRUk7RUFDSSxVQUFBO0VBQ0EsZ0JBQUE7RUFDQSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSwyQkFBQTtFQUNBLG1CQUFBO0VBRUEsY0FBQTtFQUNBLGtCQUFBO0VBQ0EsbUJBQUE7RUFDQSxtQkFBQTtBQURSO0FBSUk7RUFDSSxhQUFBO0VBQ0Esc0JBQUE7RUFDQSxVQUFBO0FBRlI7QUFDQSxnMkNBQWcyQyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG4uZm9ybS1jb250YWluZXIge1xyXG4gICAgd2lkdGg6IDEwMCU7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuICAgIGp1c3RpZnktY29udGVudDogZmxleC1zdGFydDtcclxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcblxyXG4gICAgLnJvdyB7XHJcbiAgICAgICAgd2lkdGg6IDgwJTtcclxuICAgICAgICBtYXgtd2lkdGg6IDQwMHB4O1xyXG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICAgICAgZmxleC1kaXJlY3Rpb246IHJvdztcclxuICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtc3RhcnQ7XHJcbiAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuXHJcbiAgICAgICAgbWFyZ2luOiAyMHB4IDA7XHJcbiAgICAgICAgcGFkZGluZzogMTBweCAyMHB4O1xyXG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDIwcHg7XHJcbiAgICAgICAgYmFja2dyb3VuZDogI0ZCRTBGRjtcclxuICAgIH1cclxuXHJcbiAgICAuZGVsZXRlLWNvbnRhaW5lciB7XHJcbiAgICAgICAgZGlzcGxheTogZmxleDtcclxuICAgICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gICAgICAgIGNvbG9yOiByZWQ7XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG4iXSwic291cmNlUm9vdCI6IiJ9 */"]
    });
  }
}

/***/ }),

/***/ 6388:
/*!**********************************************************************************************!*\
  !*** ./src/app/auth-route/components/forget-password-mail/forget-password-mail.component.ts ***!
  \**********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ForgetPasswordMailComponent: () => (/* binding */ ForgetPasswordMailComponent)
/* harmony export */ });
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ 8764);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ 6647);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/operators */ 1318);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs */ 9452);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _services_register_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../services/register.service */ 7152);
/* harmony import */ var src_app_auth_route_services_route_url_record_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/auth-route/services/route-url-record.service */ 7228);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/forms */ 4456);
/* harmony import */ var _common_loading_components_loading_basic_loading_basic_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../common/loading/components/loading-basic/loading-basic.component */ 3408);







class ForgetPasswordMailComponent {
  constructor(registerService, routeUrlRecordService) {
    this.registerService = registerService;
    this.routeUrlRecordService = routeUrlRecordService;
    this.mail = "";
    this.isLoading = false;
  }
  sendMail() {
    if (this.mail.trim() === "") {
      alert("請輸入信件");
      return;
    }
    this.isLoading = true;
    // 整合信箱檢查與註冊流程
    this.registerService.findUser(this.mail).pipe(
    // 1. 先檢查信箱是否已註冊
    (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.tap)(res => {
      if (!res.result?.user) {
        throw new Error('該信箱不存在');
      }
    }),
    // 2. 信箱存在，寄送驗證碼
    (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.switchMap)(() => this.registerService.sendMail(this.mail)),
    // 錯誤處理: 關閉 loading 並顯示錯誤訊息
    (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.catchError)(err => {
      console.error(err);
      this.isLoading = false;
      const errorMessage = err?.error?.message || err.message || '未知錯誤';
      alert(`處理失敗: ${errorMessage}`);
      return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null); // 結束流程
    })).subscribe({
      next: result => {
        if (result !== null) {
          this.isLoading = false;
          this.routeUrlRecordService.nextPage("forget-password-verity", {
            mail: this.mail
          });
        }
      },
      error: err => {
        // 這裡的錯誤已經被 catchError 處理，通常不會執行到這裡
        console.error('未被捕捉的錯誤:', err);
      }
    });
  }
  static {
    this.ɵfac = function ForgetPasswordMailComponent_Factory(t) {
      return new (t || ForgetPasswordMailComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_services_register_service__WEBPACK_IMPORTED_MODULE_0__.RegisterService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](src_app_auth_route_services_route_url_record_service__WEBPACK_IMPORTED_MODULE_1__.RouteUrlRecordService));
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineComponent"]({
      type: ForgetPasswordMailComponent,
      selectors: [["app-forget-password-mail"]],
      decls: 9,
      vars: 2,
      consts: [[1, "container"], ["type", "text", "placeholder", "\u8F38\u5165\u9A57\u8B49\u4FE1\u7BB1", 3, "ngModelChange", "ngModel"], [3, "click"], [1, "loading-container"], [3, "isLoading"]],
      template: function ForgetPasswordMailComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "div", 0)(1, "h3");
          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](2, "\u5FD8\u8A18\u5BC6\u78BC");
          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](3, " \u8ACB\u9001\u51FA\u9A57\u8B49\u4FE1\u7BB1 ");
          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](4, "input", 1);
          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtwoWayListener"]("ngModelChange", function ForgetPasswordMailComponent_Template_input_ngModelChange_4_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtwoWayBindingSet"](ctx.mail, $event) || (ctx.mail = $event);
            return $event;
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](5, "button", 2);
          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("click", function ForgetPasswordMailComponent_Template_button_click_5_listener() {
            return ctx.sendMail();
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](6, "\u9001\u51FA");
          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](7, "div", 3);
          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](8, "app-loading-basic", 4);
          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()();
        }
        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](4);
          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtwoWayProperty"]("ngModel", ctx.mail);
          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](4);
          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("isLoading", ctx.isLoading);
        }
      },
      dependencies: [_angular_forms__WEBPACK_IMPORTED_MODULE_8__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_8__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_8__.NgModel, _common_loading_components_loading_basic_loading_basic_component__WEBPACK_IMPORTED_MODULE_2__.LoadingBasicComponent],
      styles: ["/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJmb3JnZXQtcGFzc3dvcmQtbWFpbC5jb21wb25lbnQuc2NzcyJ9 */\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvYXV0aC1yb3V0ZS9jb21wb25lbnRzL2ZvcmdldC1wYXNzd29yZC1tYWlsL2ZvcmdldC1wYXNzd29yZC1tYWlsLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFDQSxvTEFBb0wiLCJzb3VyY2VSb290IjoiIn0= */"]
    });
  }
}

/***/ }),

/***/ 1628:
/*!**************************************************************************************************!*\
  !*** ./src/app/auth-route/components/forget-password-verity/forget-password-verity.component.ts ***!
  \**************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ForgetPasswordVerityComponent: () => (/* binding */ ForgetPasswordVerityComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _services_register_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../services/register.service */ 7152);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 5072);
/* harmony import */ var src_app_auth_route_services_route_url_record_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/auth-route/services/route-url-record.service */ 7228);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ 4456);





class ForgetPasswordVerityComponent {
  constructor(registerService, activatedRoute, routeUrlRecordService) {
    this.registerService = registerService;
    this.activatedRoute = activatedRoute;
    this.routeUrlRecordService = routeUrlRecordService;
    this.verifyCode = "";
    this.mail = "";
  }
  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.mail = params['mail'];
      alert(this.mail);
    });
  }
  sendCode() {
    if (this.verifyCode.trim() === "") {
      alert("請輸入驗證碼");
    }
    this.registerService.sendCode(this.mail, this.verifyCode).subscribe(res => {
      //alert("驗證成功" + res.verifyResult);
      if (res.verifyResult) {
        alert("驗證成功");
        this.routeUrlRecordService.nextPage("password-change", {
          mail: this.mail
        });
      } else {
        alert("驗證錯誤: " + res.verifyResult);
      }
    }, err => {
      alert("驗證失敗");
    });
  }
  static {
    this.ɵfac = function ForgetPasswordVerityComponent_Factory(t) {
      return new (t || ForgetPasswordVerityComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_services_register_service__WEBPACK_IMPORTED_MODULE_0__.RegisterService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_3__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](src_app_auth_route_services_route_url_record_service__WEBPACK_IMPORTED_MODULE_1__.RouteUrlRecordService));
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({
      type: ForgetPasswordVerityComponent,
      selectors: [["app-forget-password-verity"]],
      decls: 10,
      vars: 2,
      consts: [[1, "container"], ["type", "text", "placeholder", "\u8ACB\u8F38\u5165\u9A57\u8B49\u78BC", 3, "ngModelChange", "ngModel"], [3, "click"]],
      template: function ForgetPasswordVerityComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 0)(1, "h3");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](2, "\u5FD8\u8A18\u5BC6\u78BC");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](3, " \u8ACB\u975C\u5F855\u5206\u9418, \u5F85\u9A57\u8B49\u78BC\u81F3\u60A8\u7684\u4FE1\u7BB1: ");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](4, "br");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](5);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](6, "br");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](7, "input", 1);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayListener"]("ngModelChange", function ForgetPasswordVerityComponent_Template_input_ngModelChange_7_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayBindingSet"](ctx.verifyCode, $event) || (ctx.verifyCode = $event);
            return $event;
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](8, "button", 2);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function ForgetPasswordVerityComponent_Template_button_click_8_listener() {
            return ctx.sendCode();
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](9, "\u9001\u51FA");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
        }
        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](5);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", ctx.mail, " ");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayProperty"]("ngModel", ctx.verifyCode);
        }
      },
      dependencies: [_angular_forms__WEBPACK_IMPORTED_MODULE_4__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.NgModel],
      styles: ["/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJmb3JnZXQtcGFzc3dvcmQtdmVyaXR5LmNvbXBvbmVudC5zY3NzIn0= */\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvYXV0aC1yb3V0ZS9jb21wb25lbnRzL2ZvcmdldC1wYXNzd29yZC12ZXJpdHkvZm9yZ2V0LXBhc3N3b3JkLXZlcml0eS5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQ0Esd0xBQXdMIiwic291cmNlUm9vdCI6IiJ9 */"]
    });
  }
}

/***/ }),

/***/ 3864:
/*!**************************************************************************!*\
  !*** ./src/app/auth-route/components/login-page/login-page.component.ts ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LoginPageComponent: () => (/* binding */ LoginPageComponent)
/* harmony export */ });
/* harmony import */ var C_Users_ASUS_Desktop_2026_spacein_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 9204);
/* harmony import */ var _capacitor_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @capacitor/core */ 4070);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _services_google_auth_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../services/google-auth.service */ 899);
/* harmony import */ var _services_register_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../services/register.service */ 7152);
/* harmony import */ var src_app_auth_route_services_route_url_record_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/auth-route/services/route-url-record.service */ 7228);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/forms */ 4456);
/* harmony import */ var _common_button_components_img_btn_img_btn_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../common/button/components/img-btn/img-btn.component */ 9790);
/* harmony import */ var _common_loading_components_loading_basic_loading_basic_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../common/loading/components/loading-basic/loading-basic.component */ 3408);
/* harmony import */ var _common_version_components_app_version_app_version_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../common/version/components/app-version/app-version.component */ 6508);










class LoginPageComponent {
  constructor(googleAuthService, registerService, routeUrlRecordService) {
    this.googleAuthService = googleAuthService;
    this.registerService = registerService;
    this.routeUrlRecordService = routeUrlRecordService;
    this.email = "";
    this.password = "";
    this.isNativeApp = false; // 是否為原生App
    this.isLoading = false; // 登入等待中, 顯示 loading 畫面
  }
  ngOnInit() {
    alert("請先登入");
    // 使用 Capacitor 判斷是否運行在原生平台
    this.isNativeApp = _capacitor_core__WEBPACK_IMPORTED_MODULE_1__.Capacitor.isNativePlatform();
    // 訂閱 Google 登入流程的 loading 狀態
    this.loadingSub = this.googleAuthService.loading$.subscribe(value => {
      this.isLoading = value;
    });
  }
  ngOnDestroy() {
    this.loadingSub?.unsubscribe();
  }
  clickSignIn() {
    var _this = this;
    return (0,C_Users_ASUS_Desktop_2026_spacein_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (_this.isNativeApp) {
        _this.googleAuthService.loginByGoogleCap(); // 手機 app
      } else {
        _this.googleAuthService.loginByGoogleWebFedCM(); // 網頁 web
      }
    })();
  }
  clickLogin() {
    //this.googleAuthService.loginTestAccount(this.account, this.password);
    const email = this.email;
    const password = this.password;
    if (email.trim() === "") {
      alert("信箱不可空白");
      return;
    }
    if (password.trim() === "") {
      alert("密碼不可空白");
      return;
    }
    // 開始驗證帳密, 顯示 loading
    this.isLoading = true;
    this.registerService.login(email, password).subscribe({
      next: res => {
        console.log(res);
        if (res.isSuccess) {
          // 驗證通過, 設定使用者
          this.registerService.findUser(email).subscribe({
            next: findRes => {
              if (!findRes.result.user) {
                this.isLoading = false;
                alert("信箱取無使用者資訊, 請稍後登入!");
                return;
              }
              const user = findRes.result.user;
              this.googleAuthService.setCurrentUser(user);
              this.googleAuthService.setToken();
              this.googleAuthService.checkLogin(user); // 內部會導頁並關閉 loading
            },
            error: err => {
              this.isLoading = false;
              alert("取得使用者資訊失敗: " + (err?.error?.message || err.message || '未知錯誤'));
            }
          });
        } else {
          // 登入失敗, 顯示後端回傳的錯誤訊息
          this.isLoading = false;
          alert(res.message || "登入失敗");
        }
      },
      error: err => {
        this.isLoading = false;
        alert("登入失敗: " + (err?.error?.message || err.message || '未知錯誤'));
      }
    });
  }
  clickForgetPassword() {
    this.routeUrlRecordService.nextPage("forget-password-mail", {});
  }
  clickRegister() {
    this.routeUrlRecordService.nextPage("register-info", {});
  }
  static {
    this.ɵfac = function LoginPageComponent_Factory(t) {
      return new (t || LoginPageComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_services_google_auth_service__WEBPACK_IMPORTED_MODULE_2__.GoogleAuthService), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_services_register_service__WEBPACK_IMPORTED_MODULE_3__.RegisterService), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](src_app_auth_route_services_route_url_record_service__WEBPACK_IMPORTED_MODULE_4__.RouteUrlRecordService));
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdefineComponent"]({
      type: LoginPageComponent,
      selectors: [["app-login-page"]],
      decls: 18,
      vars: 5,
      consts: [[1, "container"], ["src", "assets/images/logo/logo.png", 1, "logo-img"], [3, "click", "imgUrl", "btnText"], ["type", "text", "placeholder", "\u8F38\u5165\u4FE1\u7BB1", 3, "ngModelChange", "ngModel"], ["type", "password", "placeholder", "\u5BC6\u78BC", 3, "ngModelChange", "ngModel"], [1, "row"], [3, "click"], [1, "loading-container"], [3, "isLoading"]],
      template: function LoginPageComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "div", 0);
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](1, "img", 1);
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](2, "app-img-btn", 2);
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function LoginPageComponent_Template_app_img_btn_click_2_listener() {
            return ctx.clickSignIn();
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](3, " \u6216 ");
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](4, "input", 3);
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtwoWayListener"]("ngModelChange", function LoginPageComponent_Template_input_ngModelChange_4_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtwoWayBindingSet"](ctx.email, $event) || (ctx.email = $event);
            return $event;
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](5, "input", 4);
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtwoWayListener"]("ngModelChange", function LoginPageComponent_Template_input_ngModelChange_5_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtwoWayBindingSet"](ctx.password, $event) || (ctx.password = $event);
            return $event;
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](6, "div", 5)(7, "button", 6);
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function LoginPageComponent_Template_button_click_7_listener() {
            return ctx.clickLogin();
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](8, "\u767B\u5165");
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](9, "button", 6);
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function LoginPageComponent_Template_button_click_9_listener() {
            return ctx.clickForgetPassword();
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](10, "\u5FD8\u8A18\u5BC6\u78BC");
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](11, " \u6216 ");
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](12, "div", 5)(13, "button", 6);
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function LoginPageComponent_Template_button_click_13_listener() {
            return ctx.clickRegister();
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](14, "\u8A3B\u518A");
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](15, "app-version");
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](16, "div", 7);
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](17, "app-loading-basic", 8);
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
        }
        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("imgUrl", "assets/images/button/btn_google-auth.png")("btnText", "");
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtwoWayProperty"]("ngModel", ctx.email);
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtwoWayProperty"]("ngModel", ctx.password);
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](12);
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("isLoading", ctx.isLoading);
        }
      },
      dependencies: [_angular_forms__WEBPACK_IMPORTED_MODULE_9__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.NgModel, _common_button_components_img_btn_img_btn_component__WEBPACK_IMPORTED_MODULE_5__.ImgBtnComponent, _common_loading_components_loading_basic_loading_basic_component__WEBPACK_IMPORTED_MODULE_6__.LoadingBasicComponent, _common_version_components_app_version_app_version_component__WEBPACK_IMPORTED_MODULE_7__.AppVersionComponent],
      styles: [".container[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  justify-content: flex-start;\n  align-items: center;\n  gap: 20px;\n  font-size: 20px;\n}\n.container[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  border: 2px solid #cfcfcf;\n  font-size: 20px;\n  padding: 10px;\n  border-radius: 25px;\n}\n.container[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]::placeholder {\n  color: #cfcfcf;\n}\n.container[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  background: #661983;\n  color: white;\n  font-size: 15px;\n  border-radius: 25px;\n}\n.container[_ngcontent-%COMP%]   .logo-img[_ngcontent-%COMP%] {\n  width: 100px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxvZ2luLXBhZ2UuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0E7RUFDSSxhQUFBO0VBQ0Esc0JBQUE7RUFDQSwyQkFBQTtFQUNBLG1CQUFBO0VBQ0EsU0FBQTtFQUNBLGVBQUE7QUFBSjtBQUVJO0VBQ0kseUJBQUE7RUFDQSxlQUFBO0VBQ0EsYUFBQTtFQUNBLG1CQUFBO0FBQVI7QUFFSTtFQUNJLGNBQUE7QUFBUjtBQUVJO0VBQ0ksbUJBQUE7RUFDQSxZQUFBO0VBQ0EsZUFBQTtFQUNBLG1CQUFBO0FBQVI7QUFHSTtFQUNJLFlBQUE7QUFEUiIsImZpbGUiOiJsb2dpbi1wYWdlLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbi5jb250YWluZXIge1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtc3RhcnQ7XHJcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gICAgZ2FwOiAyMHB4O1xyXG4gICAgZm9udC1zaXplOiAyMHB4O1xyXG5cclxuICAgIGlucHV0IHtcclxuICAgICAgICBib3JkZXI6IDJweCBzb2xpZCAjY2ZjZmNmO1xyXG4gICAgICAgIGZvbnQtc2l6ZTogMjBweDtcclxuICAgICAgICBwYWRkaW5nOiAxMHB4O1xyXG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDI1cHg7XHJcbiAgICB9XHJcbiAgICBpbnB1dDo6cGxhY2Vob2xkZXIge1xyXG4gICAgICAgIGNvbG9yOiAjY2ZjZmNmO1xyXG4gICAgfVxyXG4gICAgYnV0dG9uIHtcclxuICAgICAgICBiYWNrZ3JvdW5kOiAjNjYxOTgzO1xyXG4gICAgICAgIGNvbG9yOiB3aGl0ZTtcclxuICAgICAgICBmb250LXNpemU6IDE1cHg7XHJcbiAgICAgICAgYm9yZGVyLXJhZGl1czogMjVweDtcclxuICAgIH1cclxuXHJcbiAgICAubG9nby1pbWcge1xyXG4gICAgICAgIHdpZHRoOiAxMDBweDtcclxuICAgIH1cclxufVxyXG5cclxuIl19 */\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvYXV0aC1yb3V0ZS9jb21wb25lbnRzL2xvZ2luLXBhZ2UvbG9naW4tcGFnZS5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQTtFQUNJLGFBQUE7RUFDQSxzQkFBQTtFQUNBLDJCQUFBO0VBQ0EsbUJBQUE7RUFDQSxTQUFBO0VBQ0EsZUFBQTtBQUFKO0FBRUk7RUFDSSx5QkFBQTtFQUNBLGVBQUE7RUFDQSxhQUFBO0VBQ0EsbUJBQUE7QUFBUjtBQUVJO0VBQ0ksY0FBQTtBQUFSO0FBRUk7RUFDSSxtQkFBQTtFQUNBLFlBQUE7RUFDQSxlQUFBO0VBQ0EsbUJBQUE7QUFBUjtBQUdJO0VBQ0ksWUFBQTtBQURSO0FBQ0EsNHlDQUE0eUMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuLmNvbnRhaW5lciB7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuICAgIGp1c3RpZnktY29udGVudDogZmxleC1zdGFydDtcclxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgICBnYXA6IDIwcHg7XHJcbiAgICBmb250LXNpemU6IDIwcHg7XHJcblxyXG4gICAgaW5wdXQge1xyXG4gICAgICAgIGJvcmRlcjogMnB4IHNvbGlkICNjZmNmY2Y7XHJcbiAgICAgICAgZm9udC1zaXplOiAyMHB4O1xyXG4gICAgICAgIHBhZGRpbmc6IDEwcHg7XHJcbiAgICAgICAgYm9yZGVyLXJhZGl1czogMjVweDtcclxuICAgIH1cclxuICAgIGlucHV0OjpwbGFjZWhvbGRlciB7XHJcbiAgICAgICAgY29sb3I6ICNjZmNmY2Y7XHJcbiAgICB9XHJcbiAgICBidXR0b24ge1xyXG4gICAgICAgIGJhY2tncm91bmQ6ICM2NjE5ODM7XHJcbiAgICAgICAgY29sb3I6IHdoaXRlO1xyXG4gICAgICAgIGZvbnQtc2l6ZTogMTVweDtcclxuICAgICAgICBib3JkZXItcmFkaXVzOiAyNXB4O1xyXG4gICAgfVxyXG5cclxuICAgIC5sb2dvLWltZyB7XHJcbiAgICAgICAgd2lkdGg6IDEwMHB4O1xyXG4gICAgfVxyXG59XHJcblxyXG4iXSwic291cmNlUm9vdCI6IiJ9 */"]
    });
  }
}

/***/ }),

/***/ 1044:
/*!************************************************************************************!*\
  !*** ./src/app/auth-route/components/password-change/password-change.component.ts ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PasswordChangeComponent: () => (/* binding */ PasswordChangeComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _services_register_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../services/register.service */ 7152);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 5072);
/* harmony import */ var src_app_auth_route_services_route_url_record_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/auth-route/services/route-url-record.service */ 7228);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ 4456);





class PasswordChangeComponent {
  constructor(registerService, activatedRoute, routeUrlRecordService) {
    this.registerService = registerService;
    this.activatedRoute = activatedRoute;
    this.routeUrlRecordService = routeUrlRecordService;
    this.password = "";
    this.passwordConfirm = "";
    this.mail = "";
  }
  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.mail = params['mail'];
      alert(this.mail);
    });
  }
  clickChangePassword() {
    if (this.password.trim() === "") {
      alert("請輸入密碼");
      return;
    }
    this.registerService.changePassword(this.mail, this.password).subscribe(res => {
      alert("密碼修改成功");
      this.routeUrlRecordService.nextPage("/", {});
    }, err => {
      alert("密碼修改失敗");
    });
  }
  static {
    this.ɵfac = function PasswordChangeComponent_Factory(t) {
      return new (t || PasswordChangeComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_services_register_service__WEBPACK_IMPORTED_MODULE_0__.RegisterService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_3__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](src_app_auth_route_services_route_url_record_service__WEBPACK_IMPORTED_MODULE_1__.RouteUrlRecordService));
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({
      type: PasswordChangeComponent,
      selectors: [["app-password-change"]],
      decls: 9,
      vars: 2,
      consts: [["type", "text", "placeholder", "\u8F38\u5165\u65B0\u5BC6\u78BC", 3, "ngModelChange", "ngModel"], ["type", "text", "placeholder", "\u6AA2\u67E5\u65B0\u5BC6\u78BC", 3, "ngModelChange", "ngModel"], [3, "click"]],
      template: function PasswordChangeComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](0, "\n\u5E33\u865F\u5EFA\u7ACB\u6210\u529F, \u8ACB\u66F4\u65B0\u5BC6\u78BC\n");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](1, "br");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](2, "input", 0);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayListener"]("ngModelChange", function PasswordChangeComponent_Template_input_ngModelChange_2_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayBindingSet"](ctx.password, $event) || (ctx.password = $event);
            return $event;
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](3, "br")(4, "br");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](5, "input", 1);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayListener"]("ngModelChange", function PasswordChangeComponent_Template_input_ngModelChange_5_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayBindingSet"](ctx.passwordConfirm, $event) || (ctx.passwordConfirm = $event);
            return $event;
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](6, "br");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](7, "button", 2);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function PasswordChangeComponent_Template_button_click_7_listener() {
            return ctx.clickChangePassword();
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](8, "\u9001\u51FA");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        }
        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayProperty"]("ngModel", ctx.password);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayProperty"]("ngModel", ctx.passwordConfirm);
        }
      },
      dependencies: [_angular_forms__WEBPACK_IMPORTED_MODULE_4__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.NgModel],
      styles: ["/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJwYXNzd29yZC1jaGFuZ2UuY29tcG9uZW50LnNjc3MifQ== */\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvYXV0aC1yb3V0ZS9jb21wb25lbnRzL3Bhc3N3b3JkLWNoYW5nZS9wYXNzd29yZC1jaGFuZ2UuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUNBLGdMQUFnTCIsInNvdXJjZVJvb3QiOiIifQ== */"]
    });
  }
}

/***/ }),

/***/ 7512:
/*!********************************************************************************!*\
  !*** ./src/app/auth-route/components/register-info/register-info.component.ts ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   RegisterInfoComponent: () => (/* binding */ RegisterInfoComponent)
/* harmony export */ });
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ 8764);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ 6647);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/operators */ 1318);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs */ 9452);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _services_register_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../services/register.service */ 7152);
/* harmony import */ var src_app_auth_route_services_route_url_record_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/auth-route/services/route-url-record.service */ 7228);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/forms */ 4456);
/* harmony import */ var _common_loading_components_loading_basic_loading_basic_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../common/loading/components/loading-basic/loading-basic.component */ 3408);







class RegisterInfoComponent {
  constructor(registerService, routeUrlRecordService) {
    this.registerService = registerService;
    this.routeUrlRecordService = routeUrlRecordService;
    this.mail = "";
    this.isLoading = false;
  }
  sendMail() {
    if (this.mail.trim() === "") {
      alert("請輸入信件");
      return;
    }
    this.isLoading = true;
    // 整合信箱檢查與註冊流程
    this.registerService.findUser(this.mail).pipe(
    // 1. 先檢查信箱是否已註冊
    (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.tap)(res => {
      if (res.result?.user) {
        throw new Error('該信箱已註冊，可google驗證或設定忘記密碼。');
      }
    }),
    // 2. 信箱未註冊，寄送驗證碼
    (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.switchMap)(() => this.registerService.sendMail(this.mail)),
    // 3. 寄送驗證碼成功後，新增使用者
    (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.switchMap)(() => this.registerService.addUser(this.mail)),
    // 4. 新增使用者成功後，更新使用者資料
    (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.switchMap)(() => this.registerService.updateUser({
      mail: this.mail
    })),
    // 錯誤處理
    (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.catchError)(err => {
      console.error(err);
      this.isLoading = false;
      const errorMessage = err?.error?.message || err.message || '未知錯誤';
      alert(`處理失敗: ${errorMessage}`);
      return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null); // 結束流程
    })).subscribe({
      next: result => {
        if (result !== null) {
          this.isLoading = false;
          this.routeUrlRecordService.nextPage("register-mail-verify", {
            mail: this.mail
          });
        }
      },
      error: err => {
        // 這裡的錯誤已經被 catchError 處理，通常不會執行到這裡
        console.error('未被捕捉的錯誤:', err);
      }
    });
  }
  static {
    this.ɵfac = function RegisterInfoComponent_Factory(t) {
      return new (t || RegisterInfoComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_services_register_service__WEBPACK_IMPORTED_MODULE_0__.RegisterService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](src_app_auth_route_services_route_url_record_service__WEBPACK_IMPORTED_MODULE_1__.RouteUrlRecordService));
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineComponent"]({
      type: RegisterInfoComponent,
      selectors: [["app-register-info"]],
      decls: 7,
      vars: 2,
      consts: [[1, "container"], ["type", "text", "placeholder", "\u8F38\u5165\u9A57\u8B49\u4FE1\u7BB1", 3, "ngModelChange", "ngModel"], [3, "click"], [1, "loading-container"], [3, "isLoading"]],
      template: function RegisterInfoComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "div", 0);
          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](1, " \u8ACB\u9001\u51FA\u9A57\u8B49\u4FE1\u7BB1 ");
          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](2, "input", 1);
          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtwoWayListener"]("ngModelChange", function RegisterInfoComponent_Template_input_ngModelChange_2_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtwoWayBindingSet"](ctx.mail, $event) || (ctx.mail = $event);
            return $event;
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](3, "button", 2);
          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("click", function RegisterInfoComponent_Template_button_click_3_listener() {
            return ctx.sendMail();
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](4, "\u9001\u51FA");
          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](5, "div", 3);
          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](6, "app-loading-basic", 4);
          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()();
        }
        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtwoWayProperty"]("ngModel", ctx.mail);
          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](4);
          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("isLoading", ctx.isLoading);
        }
      },
      dependencies: [_angular_forms__WEBPACK_IMPORTED_MODULE_8__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_8__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_8__.NgModel, _common_loading_components_loading_basic_loading_basic_component__WEBPACK_IMPORTED_MODULE_2__.LoadingBasicComponent],
      styles: ["/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJyZWdpc3Rlci1pbmZvLmNvbXBvbmVudC5zY3NzIn0= */\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvYXV0aC1yb3V0ZS9jb21wb25lbnRzL3JlZ2lzdGVyLWluZm8vcmVnaXN0ZXItaW5mby5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQ0EsNEtBQTRLIiwic291cmNlUm9vdCI6IiJ9 */"]
    });
  }
}

/***/ }),

/***/ 4708:
/*!**********************************************************************************************!*\
  !*** ./src/app/auth-route/components/register-mail-verify/register-mail-verify.component.ts ***!
  \**********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   RegisterMailVerifyComponent: () => (/* binding */ RegisterMailVerifyComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _services_register_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../services/register.service */ 7152);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 5072);
/* harmony import */ var src_app_auth_route_services_route_url_record_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/auth-route/services/route-url-record.service */ 7228);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ 4456);





class RegisterMailVerifyComponent {
  constructor(registerService, activatedRoute, routeUrlRecordService) {
    this.registerService = registerService;
    this.activatedRoute = activatedRoute;
    this.routeUrlRecordService = routeUrlRecordService;
    this.verifyCode = "";
    this.mail = "";
  }
  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.mail = params['mail'];
      alert(this.mail);
    });
  }
  sendCode() {
    if (this.verifyCode.trim() === "") {
      alert("請輸入驗證碼");
    }
    this.registerService.sendCode(this.mail, this.verifyCode).subscribe(res => {
      //alert("驗證成功" + res.verifyResult);
      if (res.verifyResult) {
        alert("驗證成功");
        this.routeUrlRecordService.nextPage("password-change", {
          mail: this.mail
        });
      } else {
        alert("驗證錯誤: " + res.verifyResult);
      }
    }, err => {
      alert("驗證失敗");
    });
  }
  static {
    this.ɵfac = function RegisterMailVerifyComponent_Factory(t) {
      return new (t || RegisterMailVerifyComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_services_register_service__WEBPACK_IMPORTED_MODULE_0__.RegisterService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_3__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](src_app_auth_route_services_route_url_record_service__WEBPACK_IMPORTED_MODULE_1__.RouteUrlRecordService));
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({
      type: RegisterMailVerifyComponent,
      selectors: [["app-register-mail-verify"]],
      decls: 8,
      vars: 2,
      consts: [[1, "container"], ["type", "text", "placeholder", "\u8ACB\u8F38\u5165\u9A57\u8B49\u78BC", 3, "ngModelChange", "ngModel"], [3, "click"]],
      template: function RegisterMailVerifyComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 0);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, " \u8ACB\u975C\u5F855\u5206\u9418, \u5F85\u9A57\u8B49\u78BC\u81F3\u60A8\u7684\u4FE1\u7BB1: ");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](2, "br");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](3);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](4, "br");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](5, "input", 1);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayListener"]("ngModelChange", function RegisterMailVerifyComponent_Template_input_ngModelChange_5_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayBindingSet"](ctx.verifyCode, $event) || (ctx.verifyCode = $event);
            return $event;
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](6, "button", 2);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function RegisterMailVerifyComponent_Template_button_click_6_listener() {
            return ctx.sendCode();
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](7, "\u9001\u51FA");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
        }
        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", ctx.mail, " ");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayProperty"]("ngModel", ctx.verifyCode);
        }
      },
      dependencies: [_angular_forms__WEBPACK_IMPORTED_MODULE_4__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.NgModel],
      styles: ["/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJyZWdpc3Rlci1tYWlsLXZlcmlmeS5jb21wb25lbnQuc2NzcyJ9 */\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvYXV0aC1yb3V0ZS9jb21wb25lbnRzL3JlZ2lzdGVyLW1haWwtdmVyaWZ5L3JlZ2lzdGVyLW1haWwtdmVyaWZ5LmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFDQSxvTEFBb0wiLCJzb3VyY2VSb290IjoiIn0= */"]
    });
  }
}

/***/ }),

/***/ 6392:
/*!************************************************************************************!*\
  !*** ./src/app/auth-route/components/register-select/register-select.component.ts ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   RegisterSelectComponent: () => (/* binding */ RegisterSelectComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 7580);

class RegisterSelectComponent {
  static {
    this.ɵfac = function RegisterSelectComponent_Factory(t) {
      return new (t || RegisterSelectComponent)();
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
      type: RegisterSelectComponent,
      selectors: [["app-register-select"]],
      decls: 2,
      vars: 0,
      template: function RegisterSelectComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "p");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "register-select works!");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        }
      },
      styles: ["/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJyZWdpc3Rlci1zZWxlY3QuY29tcG9uZW50LnNjc3MifQ== */\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvYXV0aC1yb3V0ZS9jb21wb25lbnRzL3JlZ2lzdGVyLXNlbGVjdC9yZWdpc3Rlci1zZWxlY3QuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUNBLGdMQUFnTCIsInNvdXJjZVJvb3QiOiIifQ== */"]
    });
  }
}

/***/ }),

/***/ 7209:
/*!*************************************************************!*\
  !*** ./src/app/auth-route/models/google-auth-user.model.ts ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GoogleAuthUser: () => (/* binding */ GoogleAuthUser)
/* harmony export */ });
/*
 * google one tap 授權登入 (google auth2), 必要欄位資訊
 */
class GoogleAuthUser {
  constructor(user) {
    // user 基本欄位
    this.userFirestoreId = "";
    this.name = "";
    this.email = "";
    this.paymentList = [];
    this.permissionList = [];
    // google auth2 id
    this.id = "";
    // google 圖片
    this.imageUrl = "";
    // google auth 後資訊
    this.authentication = {};
    this.userFirestoreId = user["userFirestoreId"];
    this.id = user["id"];
    this.name = user["name"];
    this.email = user["email"];
    this.paymentList = user["paymentList"];
    this.permissionList = user["permissionList"];
    this.imageUrl = user["imageUrl"];
    this.authentication = user["authentication"];
  }
}

/***/ }),

/***/ 4871:
/*!***********************************************************!*\
  !*** ./src/app/auth-route/services/auth-guard.service.ts ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AuthGuardService: () => (/* binding */ AuthGuardService)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _google_auth_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./google-auth.service */ 899);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 5072);



class AuthGuardService {
  constructor(googleAuthService, router) {
    this.googleAuthService = googleAuthService;
    this.router = router;
  }
  //父-子路由
  canActivate(route, state) {
    return this.googleAuthService.isAuthenticated();
  }
  //只檢查 子路由
  canActivateChild(route, state) {
    return this.canActivate(route, state);
  }
  static {
    this.ɵfac = function AuthGuardService_Factory(t) {
      return new (t || AuthGuardService)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_google_auth_service__WEBPACK_IMPORTED_MODULE_0__.GoogleAuthService), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_2__.Router));
    };
  }
  static {
    this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({
      token: AuthGuardService,
      factory: AuthGuardService.ɵfac,
      providedIn: 'root'
    });
  }
}

/***/ }),

/***/ 899:
/*!************************************************************!*\
  !*** ./src/app/auth-route/services/google-auth.service.ts ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GoogleAuthService: () => (/* binding */ GoogleAuthService)
/* harmony export */ });
/* harmony import */ var C_Users_ASUS_Desktop_2026_spacein_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 9204);
/* harmony import */ var _codetrix_studio_capacitor_google_auth__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @codetrix-studio/capacitor-google-auth */ 5073);
/* harmony import */ var _models_google_auth_user_model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../models/google-auth-user.model */ 7209);
/* harmony import */ var _capacitor_preferences__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @capacitor/preferences */ 6493);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs */ 5797);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var src_app_auth_route_services_route_url_record_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/auth-route/services/route-url-record.service */ 7228);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/router */ 5072);
/* harmony import */ var _register_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./register.service */ 7152);









class GoogleAuthService {
  setLoading(value) {
    this.loadingSubject.next(value);
  }
  constructor(routeUrlRecordService, router,
  //private userService: UserService, // 2025/04/23 棄用
  registerService) {
    this.routeUrlRecordService = routeUrlRecordService;
    this.router = router;
    this.registerService = registerService;
    this.isLoginIn = false;
    // Google 登入流程的 loading 狀態, 供登入頁訂閱顯示等待畫面
    this.loadingSubject = new rxjs__WEBPACK_IMPORTED_MODULE_6__.BehaviorSubject(false);
    this.loading$ = this.loadingSubject.asObservable();
    // 於此取得初始資料
    _codetrix_studio_capacitor_google_auth__WEBPACK_IMPORTED_MODULE_1__.GoogleAuth.initialize({
      clientId: '587558372608-jnei0k5eh8japakn4hs4kok2mld4m0qj.apps.googleusercontent.com',
      scopes: ['profile', 'email'],
      grantOfflineAccess: true
    });
    this.checkToken();
    this.loadGoogleOneTapSDK();
  }
  /*
   * 載入 Google OneTap SDK
   */
  loadGoogleOneTapSDK() {
    const existingScript = document.getElementById('google-one-tap');
    if (!existingScript) {
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      script.id = 'google-one-tap';
      document.body.appendChild(script);
    }
  }
  isAuthenticated() {
    return this.isLoginIn;
  }
  getCurrentUser() {
    return this.currentUser;
  }
  /*
   * 登出
   */
  logout() {
    _codetrix_studio_capacitor_google_auth__WEBPACK_IMPORTED_MODULE_1__.GoogleAuth.signOut();
    this.currentUser = new _models_google_auth_user_model__WEBPACK_IMPORTED_MODULE_2__.GoogleAuthUser({});
    this.isLoginIn = false;
    this.cleanToken();
    this.router.navigate(["/"]);
  }
  /*
   * google 第三方登入, 使用 Cap
   */
  loginByGoogleCap() {
    var _this = this;
    return (0,C_Users_ASUS_Desktop_2026_spacein_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      try {
        // 登入判斷
        const googleUser = yield _codetrix_studio_capacitor_google_auth__WEBPACK_IMPORTED_MODULE_1__.GoogleAuth.signIn();
        const {
          id: _,
          ...rest
        } = googleUser;
        const user = {
          ...rest,
          googleUserId: googleUser.id
        };
        if (googleUser["email"]) {
          _this.setLoading(true); // 開始後端驗證, 顯示 loading
          _this.registerService.findUser(user["email"]).subscribe({
            next: res => {
              if (!res.result.user) {
                _this.registerUserForFirstLogin(user);
              } else {
                _this.setCurrentUser({
                  ...user,
                  id: res.result.user.id
                }); // 把 google user id 替換
                _this.setToken();
                _this.checkLogin(user);
              }
            },
            error: err => {
              _this.setLoading(false);
              alert("Google 登入失敗: " + (err?.error?.message || err.message || '未知錯誤'));
            }
          });
        }
      } catch (err) {
        // 使用者取消或 Google 授權失敗
        _this.setLoading(false);
        console.error('Google 登入失敗:', err);
      }
    })();
  }
  /*
   * 網頁時, google 第三方登入, 使用 FedCM
   */
  loginByGoogleWebFedCM() {
    var _this2 = this;
    return (0,C_Users_ASUS_Desktop_2026_spacein_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      return new Promise((resolve, reject) => {
        google.accounts.id.initialize({
          client_id: '830518362912-qhmt6tgd8djdv57qrdivu877u6ng5j0j.apps.googleusercontent.com',
          callback: res => {
            console.log(" OAuth FedCM res : ", res);
            // 解析 res JWT 獲取用戶資訊, 並存入 CurrentUser
            const {
              credential
            } = res;
            const payload = _this2.parseJwt(credential);
            if (!payload.name) {
              alert("查無使用者信箱資訊");
              return;
            }
            const user = {
              name: payload.name,
              email: payload.email,
              authentication: {
                idToken: credential,
                accessToken: '' // One Tap 不提供 access token
              }
            };
            _this2.setLoading(true); // 取得憑證後, 開始後端驗證, 顯示 loading
            _this2.registerService.findUser(user["email"]).subscribe({
              next: findRes => {
                if (!findRes.result.user) {
                  _this2.registerUserForFirstLogin(user);
                } else {
                  _this2.setCurrentUser({
                    ...user,
                    id: findRes.result.user.id
                  }); // 把 google user id 替換
                  _this2.setToken();
                  _this2.checkLogin(user);
                }
              },
              error: err => {
                _this2.setLoading(false);
                alert("Google 登入失敗: " + (err?.error?.message || err.message || '未知錯誤'));
              }
            });
          },
          auto_select: false
          //cancel_on_tap_outside: false,
        });
        google.accounts.id.prompt(); // 出現 OneTap 登入 UI
      });
    })();
  }
  parseJwt(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    // padding 補齊 base64 字串長度
    const padded = base64.padEnd(base64.length + (4 - base64.length % 4) % 4, '=');
    const jsonPayload = decodeURIComponent(atob(padded).split('').map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join(''));
    return JSON.parse(jsonPayload);
  }
  /*
   * 且首次登入, 註冊進 firestore user 表, 且 google auth 成功,
   * 依照 email 新增一筆
   */
  registerUserForFirstLogin(user) {
    this.registerService.addUser(user.email).subscribe({
      next: res => {
        if (!res.newUser) {
          this.setLoading(false);
          alert("首次 google 授權, 註冊失敗, 使用者新增失敗");
        } else {
          this.registerService.updateUser(user).subscribe({
            next: res => {
              this.setLoading(false);
              if (!res.newUser) {
                alert("首次 google 授權, 註冊失敗, 使用者更新失敗");
              } else {
                alert("首次 google 授權, 註冊成功, 請再次登入");
              }
            },
            error: err => {
              this.setLoading(false);
              alert("首次 google 授權失敗: " + (err?.error?.message || err.message || '未知錯誤'));
            }
          });
        }
      },
      error: err => {
        this.setLoading(false);
        alert("首次 google 授權失敗: " + (err?.error?.message || err.message || '未知錯誤'));
      }
    });
  }
  /*
   * 取得 userFirestoreId 並設定 current user
   */
  setCurrentUser(user) {
    this.currentUser = new _models_google_auth_user_model__WEBPACK_IMPORTED_MODULE_2__.GoogleAuthUser(user);
  }
  /*
   * 成功登入後, 將 token 資訊 使用 csp存入手機端
   */
  setToken() {
    var _this3 = this;
    return (0,C_Users_ASUS_Desktop_2026_spacein_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      yield _capacitor_preferences__WEBPACK_IMPORTED_MODULE_3__.Preferences.set({
        key: "currentUser",
        value: JSON.stringify(_this3.currentUser)
      });
      yield _capacitor_preferences__WEBPACK_IMPORTED_MODULE_3__.Preferences.set({
        key: "token",
        value: JSON.stringify(new Date().getTime())
      });
    })();
  }
  /*
   *  下次開啟 app, 檢查 token, 若在期限內便自動登入
   */
  checkToken() {
    var _this4 = this;
    return (0,C_Users_ASUS_Desktop_2026_spacein_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const _currentUser = yield _capacitor_preferences__WEBPACK_IMPORTED_MODULE_3__.Preferences.get({
        key: "currentUser"
      });
      const _token = (yield _capacitor_preferences__WEBPACK_IMPORTED_MODULE_3__.Preferences.get({
        key: "token"
      })) || 0;
      if (!_currentUser.value) {
        return;
      }
      if (!_token.value) {
        return;
      }
      const loginDateTimeSpan = Number.parseInt(_token.value ? _token.value : "0");
      const currentTimeSpan = new Date().getTime();
      if ((currentTimeSpan - loginDateTimeSpan) / 3600000 <= 720) {
        _this4.currentUser = new _models_google_auth_user_model__WEBPACK_IMPORTED_MODULE_2__.GoogleAuthUser(JSON.parse(!_currentUser.value ? "" : _currentUser.value));
        _this4.checkLogin(_this4.currentUser);
      } else {
        alert("閒置過久, 請重新登入");
        _this4.logout();
      }
    })();
  }
  /*
   * 清空 token
   */
  cleanToken() {
    return (0,C_Users_ASUS_Desktop_2026_spacein_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      yield _capacitor_preferences__WEBPACK_IMPORTED_MODULE_3__.Preferences.remove({
        key: "currentUser"
      });
      yield _capacitor_preferences__WEBPACK_IMPORTED_MODULE_3__.Preferences.remove({
        key: "token"
      });
    })();
  }
  /*
   * 檢查是否成功登入
   */
  checkLogin(user) {
    this.setLoading(false); // 流程結束, 關閉 loading
    if (this.currentUser) {
      alert(user.email + " 成功登入!");
      this.isLoginIn = true;
      this.routeUrlRecordService.nextPage("home", {});
    } else {
      alert("無法取得使用者資訊");
    }
  }
  /*
   * 測試 帳密登入, 供給 apple 測試人員使用
   */
  loginTestAccount(account, password) {
    if (account === "testuser" && password === "123456") {
      this.getTestUserInfo();
    } else {
      alert("帳密錯誤");
    }
  }
  /*
   * 取得測試登入帳號
   */
  getTestUserInfo() {
    this.currentUser = new _models_google_auth_user_model__WEBPACK_IMPORTED_MODULE_2__.GoogleAuthUser({
      id: "testid",
      name: "testname",
      email: "tesetmail@testmail.com",
      imageUrl: "testurl",
      authentication: {}
    });
    alert("測試帳號: " + this.currentUser.email);
    this.isLoginIn = true;
    this.routeUrlRecordService.nextPage("home", {});
  }
  /*
   * 刪除使用者帳號
   * 配合 ios 上架規範
   */
  deleteUserById(id) {
    if (!confirm("再次確認刪除帳號? 刪除後該帳號所有預約記錄將不會保留!")) {
      return;
    }
    if (!id) {
      alert("測試帳號無法刪除 : " + this.currentUser.email);
      return;
    }
    //this.userService.deleteUserById(id);
    //this.routeUrlRecordService.nextPage("/", {}); //登出, 進入登入頁
  }
  static {
    this.ɵfac = function GoogleAuthService_Factory(t) {
      return new (t || GoogleAuthService)(_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](src_app_auth_route_services_route_url_record_service__WEBPACK_IMPORTED_MODULE_4__.RouteUrlRecordService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_8__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_register_service__WEBPACK_IMPORTED_MODULE_5__.RegisterService));
    };
  }
  static {
    this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineInjectable"]({
      token: GoogleAuthService,
      factory: GoogleAuthService.ɵfac,
      providedIn: 'root'
    });
  }
}

/***/ }),

/***/ 7152:
/*!*********************************************************!*\
  !*** ./src/app/auth-route/services/register.service.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   RegisterService: () => (/* binding */ RegisterService)
/* harmony export */ });
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/environments/environment */ 5312);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ 6443);



class RegisterService {
  constructor(http) {
    this.http = http;
    this.DOMAIN = src_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.domain;
    this.CONTEXT = "/api/auth";
    this.BASE_URL = this.DOMAIN + this.CONTEXT;
  }
  login(email, password) {
    return this.http.post(`${this.BASE_URL}/login`, {
      email,
      password
    });
  }
  sendMail(email) {
    return this.http.post(`${this.BASE_URL}/regist/mail`, {
      email
    });
  }
  addUser(email) {
    return this.http.post(`${this.BASE_URL}/regist/user/add`, {
      email
    });
  }
  updateUser(newUser) {
    return this.http.post(`${this.BASE_URL}/regist/user/update`, {
      newUser
    });
  }
  sendCode(email, code) {
    return this.http.post(`${this.BASE_URL}/regist/verify/code`, {
      newUser: {
        email,
        code
      }
    });
  }
  changePassword(email, password) {
    return this.http.post(`${this.BASE_URL}/regist/user/password`, {
      newUser: {
        email,
        password
      }
    });
  }
  findUser(email) {
    return this.http.get(`${this.BASE_URL}/user/${email}`);
  }
  static {
    this.ɵfac = function RegisterService_Factory(t) {
      return new (t || RegisterService)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpClient));
    };
  }
  static {
    this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({
      token: RegisterService,
      factory: RegisterService.ɵfac,
      providedIn: 'root'
    });
  }
}

/***/ }),

/***/ 7228:
/*!*****************************************************************!*\
  !*** ./src/app/auth-route/services/route-url-record.service.ts ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   RouteUrlRecordService: () => (/* binding */ RouteUrlRecordService)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 5072);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ 2510);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ 819);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 4876);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ 316);





class RouteUrlRecordService {
  constructor(location, router) {
    this.location = location;
    this.router = router;
    this.timeSubscription = new rxjs__WEBPACK_IMPORTED_MODULE_0__.Subscription();
    this.routeUrlChangeSubject = new rxjs__WEBPACK_IMPORTED_MODULE_1__.Subject();
    this.routerUrlChangeEmit = this.routeUrlChangeSubject.asObservable();
    this.routeUrlRecord = [];
    this.previousUrl = "";
    this.currentUrl = "";
    // 每次初始時, 存取新的 路由路徑
    this.router.events.subscribe(event => {
      if (event instanceof _angular_router__WEBPACK_IMPORTED_MODULE_2__.NavigationEnd) {
        this.previousUrl = this.currentUrl;
        this.currentUrl = event.url;
        this.routeUrlRecord.push(event.url);
        // 其他頁面閒置過久, 退回首頁
        this.timeSubscription.unsubscribe();
        if (this.currentUrl !== "/home") {
          this.timeSubscription = (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.timer)(30 * 60 * 1000).subscribe(() => {
            alert("因閒置過久, 回到首頁");
            this.router.navigate(["/home"]);
          });
        }
      }
      ;
    });
  }
  /*
   * 上一個路由路徑
   */
  getPreviousUrl() {
    return this.routeUrlRecord[this.routeUrlRecord.length - 2];
  }
  /*
   * 當前路由路徑
   */
  getCurrentUrl() {
    return this.routeUrlRecord[this.routeUrlRecord.length - 1];
  }
  /*
   * 清除所有路徑
   */
  cleanUrlRecord() {
    this.routeUrlRecord = [];
  }
  /*
   * 下一頁
   */
  nextPage(nextUrl, paramsObj) {
    // 將下一個 url 送給 header
    this.routeUrlChangeSubject.next(nextUrl);
    // 檢查當前頁面
    this.checkRouteUrl(this.getCurrentUrl());
    // 導向下一頁
    if (paramsObj) {
      this.router.navigate([nextUrl], {
        queryParams: {
          ...paramsObj
        }
      });
    } else {
      this.router.navigate([nextUrl]);
    }
  }
  /*
   * 上一頁
   */
  backPage() {
    // 最初始畫面, 離開 app
    if (this.getCurrentUrl() === "/" || !this.getCurrentUrl()) {
      alert("確定離開app?");
      window.close(); // 無效
      return;
    }
    // 管理畫面, 直接退回首頁
    if (this.getCurrentUrl().includes("manager")) {
      this.router.navigate(["/home"]);
      return;
    }
    if (this.getCurrentUrl() === "/home") {
      //alert("確定登出?");
      //this.router.navigate(["/"]);
      return;
    }
    const previousUrl = this.getPreviousUrl();
    // 問號參數的攜帶需處理
    if (previousUrl.includes("?")) {
      this.location.back();
    }
    this.routeUrlRecord.pop();
    this.routeUrlRecord.pop();
    this.router.navigate([previousUrl]);
  }
  /*
   * 檢查該路徑是否有可 [上一頁]
   * post, delete "後", 清除該路徑, 不能回到 post, delete頁面, 避免重複動作
   */
  checkRouteUrl(checkUrl) {
    if (!checkUrl) {
      return;
    }
    if (checkUrl.includes("booking-check-form") || checkUrl.includes("review-booking-form")) {
      this.cleanUrlRecord();
      this.routeUrlRecord.push("/");
      this.routeUrlRecord.push("/home");
    }
  }
  /*
   * 元件銷毀, 取消監聽
   */
  ngOnDestroy() {
    this.timeSubscription.unsubscribe();
  }
  static {
    this.ɵfac = function RouteUrlRecordService_Factory(t) {
      return new (t || RouteUrlRecordService)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_angular_common__WEBPACK_IMPORTED_MODULE_5__.Location), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_2__.Router));
    };
  }
  static {
    this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjectable"]({
      token: RouteUrlRecordService,
      factory: RouteUrlRecordService.ɵfac,
      providedIn: 'root'
    });
  }
}

/***/ }),

/***/ 6445:
/*!*************************************************************************************************!*\
  !*** ./src/app/booking/components/booking-check-form-page/booking-check-form-page.component.ts ***!
  \*************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BookingCheckFormPageComponent: () => (/* binding */ BookingCheckFormPageComponent)
/* harmony export */ });
/* harmony import */ var src_app_common_room_site_models_room_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/common/room-site/models/room.model */ 8655);
/* harmony import */ var src_app_common_room_site_models_site_model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/common/room-site/models/site.model */ 5319);
/* harmony import */ var src_app_common_room_site_models_room_site_isbooking_model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/common/room-site/models/room-site-isbooking.model */ 4079);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var src_app_auth_route_services_route_url_record_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/auth-route/services/route-url-record.service */ 7228);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/router */ 5072);
/* harmony import */ var _services_booking_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../services/booking.service */ 4377);
/* harmony import */ var src_app_auth_route_services_google_auth_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/auth-route/services/google-auth.service */ 899);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/common */ 316);
/* harmony import */ var _common_dialog_components_dialog_dialog_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../common/dialog/components/dialog/dialog.component */ 9276);
/* harmony import */ var _common_loading_components_loading_basic_loading_basic_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../common/loading/components/loading-basic/loading-basic.component */ 3408);
/* harmony import */ var _common_pipe_word_shroten_pipe__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../common/pipe/word-shroten.pipe */ 9551);
/* harmony import */ var _common_pipe_date_to_day_of_week_pipe__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../common/pipe/date-to-day-of-week.pipe */ 4905);













function BookingCheckFormPageComponent_div_23_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "div", 2)(1, "div", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](2, "\u5EA7\u4F4D");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](3, "div", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("click", function BookingCheckFormPageComponent_div_23_Template_div_click_3_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵrestoreView"](_r1);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵresetView"](ctx_r1.clickSiteShowDialog());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate"](ctx_r1.selectSite ? ctx_r1.selectSite.name ? ctx_r1.selectSite.name : "\u8ACB\u9078\u64C7\u5EA7\u4F4D" : "\u8ACB\u9078\u64C7\u5EA7\u4F4D");
  }
}
class BookingCheckFormPageComponent {
  constructor(routeUrlRecordService, activatedRoute, bookingService, googleAuthService) {
    this.routeUrlRecordService = routeUrlRecordService;
    this.activatedRoute = activatedRoute;
    this.bookingService = bookingService;
    this.googleAuthService = googleAuthService;
    // loading畫面, 等待 教室相關資訊取得
    this.isLoading = true;
    // booking 種類, 教室預約/座位預約
    this.bookingType = "";
    // 教室座位, 是否預約列表
    this.roomSiteIsBookingList = [];
    // 教室 list
    this.roomList = new Array();
    // 教室 dialog 資訊
    this.dialogRoomList = [];
    // 教室dialog 是否隱藏 
    this.isHiddenDialogRoom = true;
    // 座位 dialog 資訊
    this.dialogSiteList = [];
    // 座位 dialog是否隱藏 
    this.isHiddenDialogSite = true;
    // 座位 所有資訊 
    this.dialogSiteAllList = [];
    // 使用者 dialog 資訊
    this.dialogUserInfo = [];
    // 使用者 dialog 是否隱藏 
    this.isHiddenDialogUserInfo = true;
  }
  ngOnInit() {
    // 取得使用者資訊
    this.currentUser = this.googleAuthService.getCurrentUser();
    if (!this.currentUser) {
      alert("無法取得使用者資訊，請重新登入。");
      this.routeUrlRecordService.nextPage("/", {});
    }
    this.dialogUserInfo.push({
      id: "0",
      name: "姓名: " + this.currentUser.name
    });
    this.dialogUserInfo.push({
      id: "1",
      name: "信箱: " + this.currentUser.email
    });
    // 取得 教室,座位 資訊
    this.bookingService.getRoomSiteByDate(this.getSelectDate(), this.getStartTime(), this.getEndTime()).subscribe(roomSiteList => {
      roomSiteList.forEach(roomSite => {
        this.roomSiteIsBookingList.push(new src_app_common_room_site_models_room_site_isbooking_model__WEBPACK_IMPORTED_MODULE_2__.RoomSiteIsBooking(roomSite));
      });
      this.checkLoading();
    }, error => {
      alert("教室資訊無法取得,錯誤資訊 2 : " + error);
    });
    // 取得 教室資訊
    const ownerId = this.currentUser.id;
    this.bookingService.getRoomByOwnerId(ownerId).subscribe(res => {
      res.forEach(room => {
        this.roomList.push(new src_app_common_room_site_models_room_model__WEBPACK_IMPORTED_MODULE_0__.Room(room));
        this.dialogRoomList.push({
          id: room['id'],
          name: room['name'],
          isDisabled: false
        });
      });
      this.selectRoom = this.roomList[0];
      this.checkLoading();
    }, error => {
      alert("教室資訊無法取得,錯誤資訊 3 : " + error);
    });
    // 取得 座位資訊
    this.bookingService.getAllSiteList().subscribe(dataList => {
      dataList.forEach(site => {
        this.dialogSiteAllList.push(new src_app_common_room_site_models_site_model__WEBPACK_IMPORTED_MODULE_1__.Site(site));
      });
      this.checkLoading();
    });
    // 取得 booking 種類
    this.activatedRoute.queryParams.subscribe(params => {
      this.bookingType = params['bookingType'];
    });
  }
  /*
   * 檢查 教室座位資訊是否取得完成, 並關閉loading
   */
  checkLoading() {
    if (this.roomSiteIsBookingList.length > 0 && this.dialogRoomList.length > 0 && this.dialogSiteAllList.length > 0) {
      this.isLoading = false;
    }
  }
  /*
   *  從 service 取得 選擇日期
   */
  getSelectDate() {
    return this.bookingService.getSelectDate();
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
   * 教室 dialog 選擇之後觸發
   */
  selectedRoom(_selectRoomId) {
    if (!_selectRoomId) {
      return;
    }
    this.selectRoom = this.roomList.filter(room => {
      return room.id === _selectRoomId;
    })[0];
    // 預設選擇一個 座位空間
    this.selectSite = new src_app_common_room_site_models_site_model__WEBPACK_IMPORTED_MODULE_1__.Site(null);
    //this.selectedSite((this.dialogSiteAllList.filter(site => {return site.roomId === this.selectRoom.id})[0]).id);
  }
  /*
   * 座位 dialog 選擇觸發
   */
  selectedSite(_selectSiteId) {
    if (!_selectSiteId) {
      return;
    }
    this.selectSite = this.dialogSiteAllList.filter(site => {
      return site.id === _selectSiteId;
    })[0];
  }
  /*
   * 按下送出 icon , post booking預約資訊
   */
  submitBooking() {
    if (!this.currentUser) {
      alert("使用者資訊不足，請重新登入");
      return;
    }
    if (this.currentUser.email === "") {
      alert("無法取得使用者 email，請重新登入");
      return;
    }
    if (this.currentUser.id === "") {
      alert("無法取得使用者 id，請重新登入");
      return;
    }
    if (!this.selectRoom) {
      alert("請選擇教室");
      return;
    }
    if (!this.selectSite) {
      alert("請選擇座位");
      return;
    }
    if (!this.selectSite.name) {
      alert("請選擇座位");
      return;
    }
    this.isLoading = true;
    // 重新 檢查 座位是否重複
    this.bookingService.getRoomSiteByDate(this.getSelectDate(), this.getStartTime(), this.getEndTime()).subscribe(roomSiteList => {
      const isBooking = roomSiteList.filter(record => {
        return record.id === this.selectSite.id && record.isBooking;
      });
      if (isBooking.length > 0 && this.bookingType === "site") {
        alert("晚了一步, 該座位剛剛已被其他人預約了喔！");
        this.isLoading = false;
      } else {
        const bookingData = {
          //id: "",
          id: "",
          userId: this.currentUser.id,
          mail: this.currentUser.email,
          startDate: this.getSelectDate(),
          endDate: this.getSelectDate(),
          startTime: this.getStartTime(),
          endTime: this.getEndTime(),
          bookingType: this.bookingType,
          roomId: this.selectRoom.id,
          roomName: this.selectRoom.name,
          siteId: this.selectSite.id,
          siteName: this.selectSite.name
        };
        this.bookingService.post(bookingData).subscribe(() => {
          alert("送出成功, 預約時間: " + this.getSelectDate() + " " + this.getStartTime() + "~" + this.getEndTime() + " ,地點:" + this.selectRoom.name + " " + this.selectSite.name + " 預約成功。");
          this.routeUrlRecordService.nextPage("/home", {});
        }, error => {
          alert("資料送出失敗,請重新輸入, 錯誤訊息 " + JSON.stringify(error));
        });
        alert("資料傳輸中");
      }
    }, error => {
      alert("教室資訊無法取得,錯誤資訊 1 : " + error);
    });
  }
  /*
   * 點選 座位 dialog
   */
  clickSiteShowDialog() {
    this.isHiddenDialogSite = false;
    this.dialogSiteList = [];
    this.roomSiteIsBookingList.forEach(roomSite => {
      if (roomSite.roomId === this.selectRoom.id) {
        this.dialogSiteList.push({
          id: roomSite.id,
          name: roomSite.siteName,
          isDisabled: roomSite.isBooking
        });
      }
    });
  }
  selectMap() {
    //this.router.navigate(["map"]);
  }
  static {
    this.ɵfac = function BookingCheckFormPageComponent_Factory(t) {
      return new (t || BookingCheckFormPageComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](src_app_auth_route_services_route_url_record_service__WEBPACK_IMPORTED_MODULE_3__.RouteUrlRecordService), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_11__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](_services_booking_service__WEBPACK_IMPORTED_MODULE_4__.BookingService), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](src_app_auth_route_services_google_auth_service__WEBPACK_IMPORTED_MODULE_5__.GoogleAuthService));
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdefineComponent"]({
      type: BookingCheckFormPageComponent,
      selectors: [["app-booking-check-form-page"]],
      decls: 33,
      vars: 28,
      consts: [[1, "form-container"], [1, "form"], [1, "row"], [1, "row-txt"], [1, "select-item", 3, "click"], [1, "row-time"], ["class", "row", 4, "ngIf"], ["src", "assets/images/icon/icon_submit.png", 3, "click"], [1, "dialog-container"], [3, "selectedItem", "hideDialog", "dialogTitle", "isHiddenDialog", "itemList"], [3, "hideDialog", "dialogTitle", "isHiddenDialog", "itemList"], [1, "loading-container"], [3, "isLoading"]],
      template: function BookingCheckFormPageComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3);
          _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](4, "\u7533\u8ACB\u4EBA");
          _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](5, "div", 4);
          _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("click", function BookingCheckFormPageComponent_Template_div_click_5_listener() {
            return ctx.isHiddenDialogUserInfo = false;
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](6);
          _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipe"](7, "wordShroten");
          _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](8, "div", 2)(9, "div", 3);
          _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](10, "\u8D77\u8FC4\u65E5");
          _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](11, "div", 5)(12, "div");
          _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](13);
          _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipe"](14, "dateToDayOfWeek");
          _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](15, "div");
          _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](16);
          _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipe"](17, "dateToDayOfWeek");
          _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](18, "div", 2)(19, "div", 3);
          _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](20, "\u6559\u5BA4");
          _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](21, "div", 4);
          _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("click", function BookingCheckFormPageComponent_Template_div_click_21_listener() {
            return ctx.isHiddenDialogRoom = false;
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](22);
          _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](23, BookingCheckFormPageComponent_div_23_Template, 5, 1, "div", 6);
          _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](24, "img", 7);
          _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("click", function BookingCheckFormPageComponent_Template_img_click_24_listener() {
            return ctx.submitBooking();
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](25, "div", 8)(26, "app-dialog", 9);
          _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("selectedItem", function BookingCheckFormPageComponent_Template_app_dialog_selectedItem_26_listener($event) {
            return ctx.selectedRoom($event);
          })("hideDialog", function BookingCheckFormPageComponent_Template_app_dialog_hideDialog_26_listener() {
            return ctx.isHiddenDialogRoom = true;
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](27, "div", 8)(28, "app-dialog", 9);
          _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("selectedItem", function BookingCheckFormPageComponent_Template_app_dialog_selectedItem_28_listener($event) {
            return ctx.selectedSite($event);
          })("hideDialog", function BookingCheckFormPageComponent_Template_app_dialog_hideDialog_28_listener() {
            return ctx.isHiddenDialogSite = true;
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](29, "div", 8)(30, "app-dialog", 10);
          _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("hideDialog", function BookingCheckFormPageComponent_Template_app_dialog_hideDialog_30_listener() {
            return ctx.isHiddenDialogUserInfo = true;
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](31, "div", 11);
          _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](32, "app-loading-basic", 12);
          _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()();
        }
        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](6);
          _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipeBind2"](7, 19, ctx.currentUser.email, 8), " ");
          _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](7);
          _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate3"](" ", ctx.getSelectDate(), " ", _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipeBind2"](14, 22, ctx.getSelectDate(), "tw"), " ", ctx.getStartTime(), " ");
          _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](3);
          _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate3"](" ", ctx.getSelectDate(), " ", _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipeBind2"](17, 25, ctx.getSelectDate(), "tw"), " ", ctx.getEndTime(), " ");
          _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](6);
          _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate"](ctx.selectRoom ? ctx.selectRoom.name ? ctx.selectRoom.name : "\u8ACB\u9078\u64C7\u6559\u5BA4" : "\u8ACB\u9078\u64C7\u6559\u5BA4");
          _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngIf", ctx.bookingType === "site");
          _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](3);
          _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("dialogTitle", "\u9078\u64C7\u6559\u5BA4")("isHiddenDialog", ctx.isHiddenDialogRoom)("itemList", ctx.dialogRoomList);
          _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("dialogTitle", "\u9078\u64C7\u5EA7\u4F4D")("isHiddenDialog", ctx.isHiddenDialogSite)("itemList", ctx.dialogSiteList);
          _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("dialogTitle", "\u4F7F\u7528\u8005\u8CC7\u8A0A")("isHiddenDialog", ctx.isHiddenDialogUserInfo)("itemList", ctx.dialogUserInfo);
          _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("isLoading", ctx.isLoading);
        }
      },
      dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_12__.NgIf, _common_dialog_components_dialog_dialog_component__WEBPACK_IMPORTED_MODULE_6__.DialogComponent, _common_loading_components_loading_basic_loading_basic_component__WEBPACK_IMPORTED_MODULE_7__.LoadingBasicComponent, _common_pipe_word_shroten_pipe__WEBPACK_IMPORTED_MODULE_8__.WordShrotenPipe, _common_pipe_date_to_day_of_week_pipe__WEBPACK_IMPORTED_MODULE_9__.DateToDayOfWeekPipe],
      styles: [".form-container[_ngcontent-%COMP%] {\n  width: 100%;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n}\n\n.dialog-container[_ngcontent-%COMP%] {\n  z-index: 91;\n}\n\n.form[_ngcontent-%COMP%] {\n  width: 300px;\n  display: flex;\n  flex-direction: column;\n  justify-content: flex-start;\n  align-items: flex-start;\n  padding: 25px;\n}\n.form[_ngcontent-%COMP%]   .row[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: row;\n  justify-content: flex-start;\n  align-items: center;\n  padding: 10px;\n}\n.form[_ngcontent-%COMP%]   .row[_ngcontent-%COMP%]   .row-txt[_ngcontent-%COMP%] {\n  color: #661983;\n  margin-right: 30px;\n  font-size: 25px;\n}\n.form[_ngcontent-%COMP%]   .row[_ngcontent-%COMP%]   .select-item[_ngcontent-%COMP%] {\n  color: #661983;\n  font-size: 20px;\n  background: #FBE0FF;\n  padding: 10px 30px;\n  border-radius: 100px;\n  margin-right: 15px;\n}\n.form[_ngcontent-%COMP%]   .row-time[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  justify-content: flex-start;\n  align-items: flex-start;\n  margin-left: 25px;\n  width: 80%;\n  padding: 10px;\n  color: #661983;\n  font-size: 20px;\n}\n\nimg[_ngcontent-%COMP%] {\n  height: 40px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJvb2tpbmctY2hlY2stZm9ybS1wYWdlLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBO0VBQ0ksV0FBQTtFQUNBLGFBQUE7RUFDQSxzQkFBQTtFQUNBLHVCQUFBO0VBQ0EsbUJBQUE7QUFESjs7QUFJQTtFQUNJLFdBQUE7QUFESjs7QUFJQTtFQUNJLFlBQUE7RUFDQSxhQUFBO0VBQ0Esc0JBQUE7RUFDQSwyQkFBQTtFQUNBLHVCQUFBO0VBQ0EsYUFBQTtBQURKO0FBR0k7RUFDSSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSwyQkFBQTtFQUNBLG1CQUFBO0VBQ0EsYUFBQTtBQURSO0FBR1E7RUFDSSxjQUFBO0VBQ0Esa0JBQUE7RUFDQSxlQUFBO0FBRFo7QUFJUTtFQUNJLGNBQUE7RUFDQSxlQUFBO0VBQ0EsbUJBQUE7RUFDQSxrQkFBQTtFQUNBLG9CQUFBO0VBQ0Esa0JBQUE7QUFGWjtBQU1JO0VBQ0ksYUFBQTtFQUNBLHNCQUFBO0VBQ0EsMkJBQUE7RUFDQSx1QkFBQTtFQUNBLGlCQUFBO0VBQ0EsVUFBQTtFQUNBLGFBQUE7RUFDQSxjQUFBO0VBQ0EsZUFBQTtBQUpSOztBQVFBO0VBQ0ksWUFBQTtBQUxKIiwiZmlsZSI6ImJvb2tpbmctY2hlY2stZm9ybS1wYWdlLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcblxyXG4uZm9ybS1jb250YWluZXIge1xyXG4gICAgd2lkdGg6IDEwMCU7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxufVxyXG5cclxuLmRpYWxvZy1jb250YWluZXIge1xyXG4gICAgei1pbmRleDogOTE7XHJcbn1cclxuXHJcbi5mb3JtIHtcclxuICAgIHdpZHRoOiAzMDBweDtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gICAganVzdGlmeS1jb250ZW50OiBmbGV4LXN0YXJ0O1xyXG4gICAgYWxpZ24taXRlbXM6IGZsZXgtc3RhcnQ7XHJcbiAgICBwYWRkaW5nOiAyNXB4O1xyXG5cclxuICAgIC5yb3cge1xyXG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICAgICAgZmxleC1kaXJlY3Rpb246IHJvdztcclxuICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtc3RhcnQ7XHJcbiAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAgICAgICBwYWRkaW5nOiAxMHB4O1xyXG5cclxuICAgICAgICAucm93LXR4dCB7XHJcbiAgICAgICAgICAgIGNvbG9yOiAjNjYxOTgzO1xyXG4gICAgICAgICAgICBtYXJnaW4tcmlnaHQ6IDMwcHg7XHJcbiAgICAgICAgICAgIGZvbnQtc2l6ZTogMjVweDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC5zZWxlY3QtaXRlbSB7XHJcbiAgICAgICAgICAgIGNvbG9yOiAjNjYxOTgzO1xyXG4gICAgICAgICAgICBmb250LXNpemU6IDIwcHg7ICAgICAgICAgXHJcbiAgICAgICAgICAgIGJhY2tncm91bmQ6ICNGQkUwRkY7XHJcbiAgICAgICAgICAgIHBhZGRpbmc6IDEwcHggMzBweDtcclxuICAgICAgICAgICAgYm9yZGVyLXJhZGl1czogMTAwcHg7XHJcbiAgICAgICAgICAgIG1hcmdpbi1yaWdodDogMTVweDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLnJvdy10aW1lIHtcclxuICAgICAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAgICAgICAganVzdGlmeS1jb250ZW50OiBmbGV4LXN0YXJ0O1xyXG4gICAgICAgIGFsaWduLWl0ZW1zOiBmbGV4LXN0YXJ0O1xyXG4gICAgICAgIG1hcmdpbi1sZWZ0OiAyNXB4O1xyXG4gICAgICAgIHdpZHRoOiA4MCU7XHJcbiAgICAgICAgcGFkZGluZzogMTBweDtcclxuICAgICAgICBjb2xvcjogIzY2MTk4MztcclxuICAgICAgICBmb250LXNpemU6IDIwcHg7ICAgIFxyXG4gICAgfVxyXG59XHJcblxyXG5pbWcge1xyXG4gICAgaGVpZ2h0OiA0MHB4O1xyXG59XHJcbiJdfQ== */\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvYm9va2luZy9jb21wb25lbnRzL2Jvb2tpbmctY2hlY2stZm9ybS1wYWdlL2Jvb2tpbmctY2hlY2stZm9ybS1wYWdlLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBO0VBQ0ksV0FBQTtFQUNBLGFBQUE7RUFDQSxzQkFBQTtFQUNBLHVCQUFBO0VBQ0EsbUJBQUE7QUFESjs7QUFJQTtFQUNJLFdBQUE7QUFESjs7QUFJQTtFQUNJLFlBQUE7RUFDQSxhQUFBO0VBQ0Esc0JBQUE7RUFDQSwyQkFBQTtFQUNBLHVCQUFBO0VBQ0EsYUFBQTtBQURKO0FBR0k7RUFDSSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSwyQkFBQTtFQUNBLG1CQUFBO0VBQ0EsYUFBQTtBQURSO0FBR1E7RUFDSSxjQUFBO0VBQ0Esa0JBQUE7RUFDQSxlQUFBO0FBRFo7QUFJUTtFQUNJLGNBQUE7RUFDQSxlQUFBO0VBQ0EsbUJBQUE7RUFDQSxrQkFBQTtFQUNBLG9CQUFBO0VBQ0Esa0JBQUE7QUFGWjtBQU1JO0VBQ0ksYUFBQTtFQUNBLHNCQUFBO0VBQ0EsMkJBQUE7RUFDQSx1QkFBQTtFQUNBLGlCQUFBO0VBQ0EsVUFBQTtFQUNBLGFBQUE7RUFDQSxjQUFBO0VBQ0EsZUFBQTtBQUpSOztBQVFBO0VBQ0ksWUFBQTtBQUxKO0FBQ0EsNGxGQUE0bEYiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuXHJcbi5mb3JtLWNvbnRhaW5lciB7XHJcbiAgICB3aWR0aDogMTAwJTtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG59XHJcblxyXG4uZGlhbG9nLWNvbnRhaW5lciB7XHJcbiAgICB6LWluZGV4OiA5MTtcclxufVxyXG5cclxuLmZvcm0ge1xyXG4gICAgd2lkdGg6IDMwMHB4O1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtc3RhcnQ7XHJcbiAgICBhbGlnbi1pdGVtczogZmxleC1zdGFydDtcclxuICAgIHBhZGRpbmc6IDI1cHg7XHJcblxyXG4gICAgLnJvdyB7XHJcbiAgICAgICAgZGlzcGxheTogZmxleDtcclxuICAgICAgICBmbGV4LWRpcmVjdGlvbjogcm93O1xyXG4gICAgICAgIGp1c3RpZnktY29udGVudDogZmxleC1zdGFydDtcclxuICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gICAgICAgIHBhZGRpbmc6IDEwcHg7XHJcblxyXG4gICAgICAgIC5yb3ctdHh0IHtcclxuICAgICAgICAgICAgY29sb3I6ICM2NjE5ODM7XHJcbiAgICAgICAgICAgIG1hcmdpbi1yaWdodDogMzBweDtcclxuICAgICAgICAgICAgZm9udC1zaXplOiAyNXB4O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLnNlbGVjdC1pdGVtIHtcclxuICAgICAgICAgICAgY29sb3I6ICM2NjE5ODM7XHJcbiAgICAgICAgICAgIGZvbnQtc2l6ZTogMjBweDsgICAgICAgICBcclxuICAgICAgICAgICAgYmFja2dyb3VuZDogI0ZCRTBGRjtcclxuICAgICAgICAgICAgcGFkZGluZzogMTBweCAzMHB4O1xyXG4gICAgICAgICAgICBib3JkZXItcmFkaXVzOiAxMDBweDtcclxuICAgICAgICAgICAgbWFyZ2luLXJpZ2h0OiAxNXB4O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAucm93LXRpbWUge1xyXG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtc3RhcnQ7XHJcbiAgICAgICAgYWxpZ24taXRlbXM6IGZsZXgtc3RhcnQ7XHJcbiAgICAgICAgbWFyZ2luLWxlZnQ6IDI1cHg7XHJcbiAgICAgICAgd2lkdGg6IDgwJTtcclxuICAgICAgICBwYWRkaW5nOiAxMHB4O1xyXG4gICAgICAgIGNvbG9yOiAjNjYxOTgzO1xyXG4gICAgICAgIGZvbnQtc2l6ZTogMjBweDsgICAgXHJcbiAgICB9XHJcbn1cclxuXHJcbmltZyB7XHJcbiAgICBoZWlnaHQ6IDQwcHg7XHJcbn1cclxuIl0sInNvdXJjZVJvb3QiOiIifQ== */"]
    });
  }
}

/***/ }),

/***/ 6211:
/*!***************************************************************************************!*\
  !*** ./src/app/booking/components/booking-clock-page/booking-clock-page.component.ts ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BookingClockPageComponent: () => (/* binding */ BookingClockPageComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var src_app_auth_route_services_route_url_record_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/auth-route/services/route-url-record.service */ 7228);
/* harmony import */ var _services_booking_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../services/booking.service */ 4377);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 316);
/* harmony import */ var _common_input_components_input_input_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../common/input/components/input/input.component */ 8740);





const _c0 = a0 => ({
  "selected": a0
});
function BookingClockPageComponent_ul_18_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "ul")(1, "li")(2, "i", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function BookingClockPageComponent_ul_18_Template_i_click_2_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r1);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r1.selectTime(12));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](3, "12");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](4, "li")(5, "i", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function BookingClockPageComponent_ul_18_Template_i_click_5_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r1);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r1.selectTime(1));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](6, "1");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](7, "li")(8, "i", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function BookingClockPageComponent_ul_18_Template_i_click_8_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r1);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r1.selectTime(2));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](9, "2");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](10, "li")(11, "i", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function BookingClockPageComponent_ul_18_Template_i_click_11_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r1);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r1.selectTime(3));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](12, "3");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](13, "li")(14, "i", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function BookingClockPageComponent_ul_18_Template_i_click_14_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r1);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r1.selectTime(4));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](15, "4");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](16, "li")(17, "i", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function BookingClockPageComponent_ul_18_Template_i_click_17_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r1);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r1.selectTime(5));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](18, "5");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](19, "li")(20, "i", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function BookingClockPageComponent_ul_18_Template_i_click_20_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r1);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r1.selectTime(6));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](21, "6");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](22, "li")(23, "i", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function BookingClockPageComponent_ul_18_Template_i_click_23_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r1);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r1.selectTime(7));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](24, "7");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](25, "li")(26, "i", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function BookingClockPageComponent_ul_18_Template_i_click_26_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r1);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r1.selectTime(8));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](27, "8");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](28, "li")(29, "i", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function BookingClockPageComponent_ul_18_Template_i_click_29_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r1);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r1.selectTime(9));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](30, "9");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](31, "li")(32, "i", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function BookingClockPageComponent_ul_18_Template_i_click_32_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r1);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r1.selectTime(10));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](33, "10");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](34, "li")(35, "i", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function BookingClockPageComponent_ul_18_Template_i_click_35_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r1);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r1.selectTime(11));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](36, "11");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpureFunction1"](12, _c0, ctx_r1._selectHour === 12));
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpureFunction1"](14, _c0, ctx_r1._selectHour === 1));
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpureFunction1"](16, _c0, ctx_r1._selectHour === 2));
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpureFunction1"](18, _c0, ctx_r1._selectHour === 3));
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpureFunction1"](20, _c0, ctx_r1._selectHour === 4));
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpureFunction1"](22, _c0, ctx_r1._selectHour === 5));
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpureFunction1"](24, _c0, ctx_r1._selectHour === 6));
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpureFunction1"](26, _c0, ctx_r1._selectHour === 7));
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpureFunction1"](28, _c0, ctx_r1._selectHour === 8));
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpureFunction1"](30, _c0, ctx_r1._selectHour === 9));
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpureFunction1"](32, _c0, ctx_r1._selectHour === 10));
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpureFunction1"](34, _c0, ctx_r1._selectHour === 11));
  }
}
function BookingClockPageComponent_ul_19_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "ul")(1, "li")(2, "i", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function BookingClockPageComponent_ul_19_Template_i_click_2_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r3);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r1.selectTime(0));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](3, "00");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](4, "li")(5, "i", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function BookingClockPageComponent_ul_19_Template_i_click_5_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r3);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r1.selectTime(5));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](6, "05");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](7, "li")(8, "i", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function BookingClockPageComponent_ul_19_Template_i_click_8_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r3);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r1.selectTime(10));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](9, "10");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](10, "li")(11, "i", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function BookingClockPageComponent_ul_19_Template_i_click_11_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r3);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r1.selectTime(15));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](12, "15");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](13, "li")(14, "i", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function BookingClockPageComponent_ul_19_Template_i_click_14_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r3);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r1.selectTime(20));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](15, "20");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](16, "li")(17, "i", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function BookingClockPageComponent_ul_19_Template_i_click_17_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r3);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r1.selectTime(25));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](18, "25");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](19, "li")(20, "i", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function BookingClockPageComponent_ul_19_Template_i_click_20_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r3);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r1.selectTime(30));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](21, "30");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](22, "li")(23, "i", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function BookingClockPageComponent_ul_19_Template_i_click_23_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r3);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r1.selectTime(35));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](24, "35");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](25, "li")(26, "i", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function BookingClockPageComponent_ul_19_Template_i_click_26_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r3);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r1.selectTime(40));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](27, "40");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](28, "li")(29, "i", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function BookingClockPageComponent_ul_19_Template_i_click_29_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r3);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r1.selectTime(45));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](30, "45");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](31, "li")(32, "i", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function BookingClockPageComponent_ul_19_Template_i_click_32_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r3);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r1.selectTime(50));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](33, "50");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](34, "li")(35, "i", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function BookingClockPageComponent_ul_19_Template_i_click_35_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r3);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r1.selectTime(55));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](36, "55");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpureFunction1"](12, _c0, ctx_r1._selectMin === 0));
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpureFunction1"](14, _c0, ctx_r1._selectMin === 5));
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpureFunction1"](16, _c0, ctx_r1._selectMin === 10));
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpureFunction1"](18, _c0, ctx_r1._selectMin === 15));
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpureFunction1"](20, _c0, ctx_r1._selectMin === 20));
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpureFunction1"](22, _c0, ctx_r1._selectMin === 25));
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpureFunction1"](24, _c0, ctx_r1._selectMin === 30));
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpureFunction1"](26, _c0, ctx_r1._selectMin === 35));
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpureFunction1"](28, _c0, ctx_r1._selectMin === 40));
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpureFunction1"](30, _c0, ctx_r1._selectMin === 45));
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpureFunction1"](32, _c0, ctx_r1._selectMin === 50));
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpureFunction1"](34, _c0, ctx_r1._selectMin === 55));
  }
}
function BookingClockPageComponent_span_21_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](0, "span", 16);
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵstyleProp"]("transform", "rotate(" + ctx_r1.getRotationAngle(ctx_r1._selectHour + 1) + "deg)");
  }
}
function BookingClockPageComponent_span_22_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](0, "span", 16);
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵstyleProp"]("transform", "rotate(" + ctx_r1.getRotationAngle(ctx_r1._selectMin / 5 + 1) + "deg)");
  }
}
class BookingClockPageComponent {
  constructor(routeUrlRecordService, bookingService) {
    this.routeUrlRecordService = routeUrlRecordService;
    this.bookingService = bookingService;
    this.timeIntervalMinType = {
      _5min: 5,
      _30min: 30,
      _60min: 60
    };
    this.timeIntervalMin = 60;
    this._selectHour = 9;
    this.isSelectHour = true;
    this._selectMin = 0;
    this.isSelectMin = false;
    this.isAm = true;
    this.isPm = false;
    //選擇開始時段
    this.isSelectStartTimeInput = true;
  }
  toggleInput() {
    this.isSelectStartTimeInput = !this.isSelectStartTimeInput;
  }
  getHourString() {
    const selectHour = this._selectHour + (this.isPm ? 12 : 0);
    return selectHour.toString().length === 2 ? selectHour.toString() : "0" + selectHour.toString();
  }
  getMinString() {
    return this._selectMin.toString().length === 2 ? this._selectMin.toString() : "0" + this._selectMin.toString();
  }
  selectHour() {
    this.isSelectHour = true;
    this.isSelectMin = false;
    this.setSelectTime();
  }
  selectMin() {
    if (this.timeIntervalMin === this.timeIntervalMinType._60min) {
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
  ngOnInit() {}
  selectTime(selectTime) {
    if (this.isSelectHour) {
      this._selectHour = selectTime;
    }
    if (this.isSelectMin) {
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
    if (this.isSelectStartTimeInput) {
      this.bookingService.setStartTime(selectTime);
    } else {
      this.bookingService.setEndTime(selectTime);
    }
  }
  getRotationAngle(hour) {
    return (hour - 1) * 30;
  }
  /*
   * 按下下一步 icon , 檢查時段, 並路由導向
   */
  nextStep() {
    if (!this.checkValidTime()) {
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
    if (selectStarTime >= selectEndTime) {
      alert("開始時間必須早於結束時間, 請重新選擇時段。");
      return false;
    }
    return true;
  }
  static {
    this.ɵfac = function BookingClockPageComponent_Factory(t) {
      return new (t || BookingClockPageComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](src_app_auth_route_services_route_url_record_service__WEBPACK_IMPORTED_MODULE_0__.RouteUrlRecordService), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_services_booking_service__WEBPACK_IMPORTED_MODULE_1__.BookingService));
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({
      type: BookingClockPageComponent,
      selectors: [["app-booking-clock-page"]],
      decls: 25,
      vars: 24,
      consts: [[1, "clock-page-container"], [1, "input-bar"], [3, "inputClick", "inputContent", "isSelect", "inputTitle"], [1, "clock-paicker"], [1, "clock-header"], [3, "click", "ngClass"], [1, "am-pm-selector"], [1, "am", 3, "click", "ngClass"], [1, "pm", 3, "click", "ngClass"], [1, "clock-container"], [1, "clock"], [4, "ngIf"], [1, "indicator"], ["class", "hand", 3, "transform", 4, "ngIf"], [1, "btn-bar"], ["src", "assets/images/icon/icon_next.png", 3, "click"], [1, "hand"]],
      template: function BookingClockPageComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 0)(1, "div", 1)(2, "app-input", 2);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("inputClick", function BookingClockPageComponent_Template_app_input_inputClick_2_listener() {
            return ctx.toggleInput();
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](3, "app-input", 2);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("inputClick", function BookingClockPageComponent_Template_app_input_inputClick_3_listener() {
            return ctx.toggleInput();
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](4, "div", 3)(5, "div", 4)(6, "div", 5);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function BookingClockPageComponent_Template_div_click_6_listener() {
            return ctx.selectHour();
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](7);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](8, " : ");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](9, "div", 5);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function BookingClockPageComponent_Template_div_click_9_listener() {
            return ctx.selectMin();
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](10);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](11, "div", 6)(12, "div", 7);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function BookingClockPageComponent_Template_div_click_12_listener() {
            return ctx.selectAm();
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](13, "AM");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](14, "div", 8);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function BookingClockPageComponent_Template_div_click_14_listener() {
            return ctx.selectPm();
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](15, "PM");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](16, "div", 9)(17, "section", 10);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](18, BookingClockPageComponent_ul_18_Template, 37, 36, "ul", 11)(19, BookingClockPageComponent_ul_19_Template, 37, 36, "ul", 11);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](20, "div", 12);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](21, BookingClockPageComponent_span_21_Template, 1, 2, "span", 13)(22, BookingClockPageComponent_span_22_Template, 1, 2, "span", 13);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](23, "div", 14)(24, "img", 15);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function BookingClockPageComponent_Template_img_click_24_listener() {
            return ctx.nextStep();
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()();
        }
        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("inputContent", ctx.getStartTime())("isSelect", ctx.isSelectStartTimeInput)("inputTitle", "\u958B\u59CB\u6642\u9593:");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("inputContent", ctx.getEndTime())("isSelect", !ctx.isSelectStartTimeInput)("inputTitle", "\u7D50\u675F\u6642\u9593:");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpureFunction1"](16, _c0, ctx.isSelectHour));
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](ctx.getHourString());
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpureFunction1"](18, _c0, ctx.isSelectMin));
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", ctx.getMinString(), "");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpureFunction1"](20, _c0, ctx.isAm));
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpureFunction1"](22, _c0, ctx.isPm));
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](4);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.isSelectHour);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.isSelectMin);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.isSelectHour);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.isSelectMin);
        }
      },
      dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_4__.NgClass, _angular_common__WEBPACK_IMPORTED_MODULE_4__.NgIf, _common_input_components_input_input_component__WEBPACK_IMPORTED_MODULE_2__.InputComponent],
      styles: ["@charset \"UTF-8\";\n\n\n\n\n.clock-page-container[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  justify-content: space-between;\n  align-items: center;\n  height: 350px;\n  padding: 20px 0;\n}\n.clock-page-container[_ngcontent-%COMP%]   .input-bar[_ngcontent-%COMP%] {\n  margin-bottom: 10px;\n}\n.clock-page-container[_ngcontent-%COMP%]   .btn-bar[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  width: 100%;\n  padding: 20px 0;\n}\n\nimg[_ngcontent-%COMP%] {\n  width: 40px;\n}\n\n.clock-paicker[_ngcontent-%COMP%] {\n  width: 350px;\n  border: 1px solid #cfcfcf;\n  border-radius: 1px;\n}\n.clock-paicker[_ngcontent-%COMP%]   .clock-header[_ngcontent-%COMP%] {\n  background: #661983;\n  color: #cfcfcf;\n  font-size: 50px;\n  padding: 15px;\n  display: flex;\n  flex-direction: row;\n  justify-content: center;\n  align-items: center;\n}\n.clock-paicker[_ngcontent-%COMP%]   .clock-header[_ngcontent-%COMP%]   .am-pm-selector[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  justify-content: space-between;\n  align-items: center;\n  font-size: 20px;\n  padding: 0 15px;\n}\n.clock-paicker[_ngcontent-%COMP%]   .clock-header[_ngcontent-%COMP%]   .selected[_ngcontent-%COMP%] {\n  color: white;\n}\n\n.clock-container[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  position: relative;\n  padding: 20px;\n}\n\n.clock[_ngcontent-%COMP%] {\n  background: #F0EDF1;\n  border-radius: 50%;\n  width: 300px;\n  height: 300px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.clock[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%] {\n  height: 38%;\n  width: 0;\n  position: absolute;\n  bottom: 45%;\n  left: 50%;\n  list-style-type: none;\n}\n.clock[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  height: 100%;\n  position: absolute;\n  top: 0;\n  left: 0;\n  transform-origin: 50% 100%;\n}\n.clock[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   .selected[_ngcontent-%COMP%] {\n  background: #661983;\n  color: white;\n  border-radius: 50%;\n}\n.clock[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  font-style: normal;\n  font-weight: bold;\n  font-size: 20px;\n  position: absolute;\n  top: 0;\n  left: 45%;\n  width: 30px;\n  height: 30px;\n  text-align: center; \n\n}\n.clock[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:nth-child(1) {\n  transform: rotate(0);\n}\n.clock[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:nth-child(1)   i[_ngcontent-%COMP%] {\n  transform: translateX(-50%) rotate(0);\n}\n.clock[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:nth-child(2) {\n  transform: rotate(30deg);\n}\n.clock[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:nth-child(2)   i[_ngcontent-%COMP%] {\n  transform: translateX(-50%) rotate(-30deg);\n}\n.clock[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:nth-child(3) {\n  transform: rotate(60deg);\n}\n.clock[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:nth-child(3)   i[_ngcontent-%COMP%] {\n  transform: translateX(-50%) rotate(-60deg);\n}\n.clock[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:nth-child(4) {\n  transform: rotate(90deg);\n}\n.clock[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:nth-child(4)   i[_ngcontent-%COMP%] {\n  transform: translateX(-50%) rotate(-90deg);\n}\n.clock[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:nth-child(5) {\n  transform: rotate(120deg);\n}\n.clock[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:nth-child(5)   i[_ngcontent-%COMP%] {\n  transform: translateX(-50%) rotate(-120deg);\n}\n.clock[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:nth-child(6) {\n  transform: rotate(150deg);\n}\n.clock[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:nth-child(6)   i[_ngcontent-%COMP%] {\n  transform: translateX(-50%) rotate(-150deg);\n}\n.clock[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:nth-child(7) {\n  transform: rotate(180deg);\n}\n.clock[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:nth-child(7)   i[_ngcontent-%COMP%] {\n  transform: translateX(-50%) rotate(-180deg);\n}\n.clock[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:nth-child(8) {\n  transform: rotate(210deg);\n}\n.clock[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:nth-child(8)   i[_ngcontent-%COMP%] {\n  transform: translateX(-50%) rotate(-210deg);\n}\n.clock[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:nth-child(9) {\n  transform: rotate(240deg);\n}\n.clock[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:nth-child(9)   i[_ngcontent-%COMP%] {\n  transform: translateX(-50%) rotate(-240deg);\n}\n.clock[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:nth-child(10) {\n  transform: rotate(270deg);\n}\n.clock[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:nth-child(10)   i[_ngcontent-%COMP%] {\n  transform: translateX(-50%) rotate(-270deg);\n}\n.clock[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:nth-child(11) {\n  transform: rotate(300deg);\n}\n.clock[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:nth-child(11)   i[_ngcontent-%COMP%] {\n  transform: translateX(-50%) rotate(-300deg);\n}\n.clock[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:last-child {\n  transform: rotate(330deg);\n}\n.clock[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:last-child   i[_ngcontent-%COMP%] {\n  transform: translateX(-50%) rotate(-330deg);\n}\n\n.clock-container[_ngcontent-%COMP%]   .indicator[_ngcontent-%COMP%] {\n  position: absolute;\n  height: 15px;\n  width: 15px;\n  display: flex;\n  justify-content: center;\n}\n\n.indicator[_ngcontent-%COMP%]::before {\n  content: \"\";\n  position: absolute;\n  height: 100%;\n  width: 100%;\n  border-radius: 50%;\n  background: #661983;\n}\n\n.indicator[_ngcontent-%COMP%]   .hand[_ngcontent-%COMP%] {\n  padding: 0;\n  position: absolute;\n  height: 102px;\n  width: 2px;\n  bottom: 8px;\n  transform-origin: bottom;\n  background: #661983;\n  transform: rotate(0deg);\n}\n\n.booking-record[_ngcontent-%COMP%] {\n  padding: 10px;\n  color: #661983;\n  margin-right: 30px;\n  font-size: 25px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJvb2tpbmctY2xvY2stcGFnZS5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxnQkFBZ0I7QUFBaEIsNkRBQUE7QUFDQSxvREFBQTtBQUdBO0VBQ0ksYUFBQTtFQUNBLHNCQUFBO0VBQ0EsOEJBQUE7RUFDQSxtQkFBQTtFQUNBLGFBQUE7RUFDQSxlQUFBO0FBQUo7QUFFSTtFQUNFLG1CQUFBO0FBQU47QUFHSTtFQUNFLGFBQUE7RUFDQSxzQkFBQTtFQUNBLHVCQUFBO0VBQ0EsbUJBQUE7RUFDQSxXQUFBO0VBQ0EsZUFBQTtBQUROOztBQUtBO0VBQ0ksV0FBQTtBQUZKOztBQUtBO0VBQ0ksWUFBQTtFQUNBLHlCQUFBO0VBQ0Esa0JBQUE7QUFGSjtBQUlJO0VBQ0ksbUJBQUE7RUFDQSxjQUFBO0VBQ0EsZUFBQTtFQUNBLGFBQUE7RUFDQSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSx1QkFBQTtFQUNBLG1CQUFBO0FBRlI7QUFJUTtFQUNJLGFBQUE7RUFDQSxzQkFBQTtFQUNBLDhCQUFBO0VBQ0EsbUJBQUE7RUFDQSxlQUFBO0VBQ0EsZUFBQTtBQUZaO0FBS1E7RUFDRSxZQUFBO0FBSFY7O0FBU0U7RUFDRSxhQUFBO0VBQ0Esc0JBQUE7RUFDQSx1QkFBQTtFQUNBLG1CQUFBO0VBQ0Esa0JBQUE7RUFDQSxhQUFBO0FBTko7O0FBVUU7RUFDRSxtQkFBQTtFQUNBLGtCQUFBO0VBQ0EsWUFBQTtFQUNBLGFBQUE7RUFDQSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSx1QkFBQTtBQVBKO0FBU0k7RUFDRSxXQUFBO0VBQ0EsUUFBQTtFQUNBLGtCQUFBO0VBQ0EsV0FBQTtFQUNBLFNBQUE7RUFDQSxxQkFBQTtBQVBOO0FBVU07RUFDRSxZQUFBO0VBQ0Esa0JBQUE7RUFDQSxNQUFBO0VBQ0EsT0FBQTtFQUNBLDBCQUFBO0FBUlI7QUFVUTtFQUNFLG1CQUFBO0VBQ0EsWUFBQTtFQUNBLGtCQUFBO0FBUlY7QUFXUTtFQUNFLGtCQUFBO0VBQ0EsaUJBQUE7RUFDQSxlQUFBO0VBRUEsa0JBQUE7RUFDQSxNQUFBO0VBQ0EsU0FBQTtFQUVBLFdBQUE7RUFDQSxZQUFBO0VBQ0Esa0JBQUEsRUFBQSxXQUFBO0FBWFY7QUFjUTtFQUNFLG9CQUFBO0FBWlY7QUFhVTtFQUFHLHFDQUFBO0FBVmI7QUFZUTtFQUNFLHdCQUFBO0FBVlY7QUFXVTtFQUFHLDBDQUFBO0FBUmI7QUFVUTtFQUNFLHdCQUFBO0FBUlY7QUFTVTtFQUFHLDBDQUFBO0FBTmI7QUFRUTtFQUNFLHdCQUFBO0FBTlY7QUFPVTtFQUFHLDBDQUFBO0FBSmI7QUFNUTtFQUNFLHlCQUFBO0FBSlY7QUFLVTtFQUFHLDJDQUFBO0FBRmI7QUFJUTtFQUNFLHlCQUFBO0FBRlY7QUFHVTtFQUFHLDJDQUFBO0FBQWI7QUFFUTtFQUNFLHlCQUFBO0FBQVY7QUFDVTtFQUFHLDJDQUFBO0FBRWI7QUFBUTtFQUNFLHlCQUFBO0FBRVY7QUFEVTtFQUFHLDJDQUFBO0FBSWI7QUFGUTtFQUNFLHlCQUFBO0FBSVY7QUFIVTtFQUFHLDJDQUFBO0FBTWI7QUFKUTtFQUNFLHlCQUFBO0FBTVY7QUFMVTtFQUFHLDJDQUFBO0FBUWI7QUFOUTtFQUNFLHlCQUFBO0FBUVY7QUFQVTtFQUFHLDJDQUFBO0FBVWI7QUFSUTtFQUNFLHlCQUFBO0FBVVY7QUFUVTtFQUFHLDJDQUFBO0FBWWI7O0FBTEU7RUFDRSxrQkFBQTtFQUNBLFlBQUE7RUFDQSxXQUFBO0VBQ0EsYUFBQTtFQUNBLHVCQUFBO0FBUUo7O0FBSkU7RUFDRSxXQUFBO0VBQ0Esa0JBQUE7RUFDQSxZQUFBO0VBQ0EsV0FBQTtFQUNBLGtCQUFBO0VBQ0EsbUJBQUE7QUFPSjs7QUFKRTtFQUNFLFVBQUE7RUFDQSxrQkFBQTtFQUNBLGFBQUE7RUFDQSxVQUFBO0VBQ0EsV0FBQTtFQUNBLHdCQUFBO0VBQ0EsbUJBQUE7RUFFQSx1QkFBQTtBQU1KOztBQUZBO0VBQ0UsYUFBQTtFQUNBLGNBQUE7RUFDQSxrQkFBQTtFQUNBLGVBQUE7QUFLRiIsImZpbGUiOiJib29raW5nLWNsb2NrLXBhZ2UuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBodHRwczovL2NvZGVwZW4uaW8vSmVmZnJleVRheWxvci9wZW4velpnS3Z3P2VkaXRvcnM9MTEwMCAqL1xyXG4vKiBodHRwczovL2NvZGVwZW4uaW8vTUFMTFUtQ09ERVItU1VHVS9wZW4vUVd6QmFCdyAqL1xyXG5cclxuXHJcbi5jbG9jay1wYWdlLWNvbnRhaW5lciB7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcclxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgICBoZWlnaHQ6IDM1MHB4O1xyXG4gICAgcGFkZGluZzogMjBweCAwO1xyXG5cclxuICAgIC5pbnB1dC1iYXIge1xyXG4gICAgICBtYXJnaW4tYm90dG9tOiAxMHB4O1xyXG4gICAgfVxyXG5cclxuICAgIC5idG4tYmFyIHtcclxuICAgICAgZGlzcGxheTogZmxleDtcclxuICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbiAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgICBwYWRkaW5nOiAyMHB4IDA7XHJcbiAgICB9XHJcbn1cclxuXHJcbmltZyB7XHJcbiAgICB3aWR0aDogNDBweDtcclxufVxyXG5cclxuLmNsb2NrLXBhaWNrZXIge1xyXG4gICAgd2lkdGg6IDM1MHB4O1xyXG4gICAgYm9yZGVyOiAxcHggc29saWQgI2NmY2ZjZjtcclxuICAgIGJvcmRlci1yYWRpdXM6IDFweDtcclxuICAgIFxyXG4gICAgLmNsb2NrLWhlYWRlciB7XHJcbiAgICAgICAgYmFja2dyb3VuZDogIzY2MTk4MztcclxuICAgICAgICBjb2xvcjogI2NmY2ZjZjtcclxuICAgICAgICBmb250LXNpemU6IDUwcHg7XHJcbiAgICAgICAgcGFkZGluZzogMTVweDtcclxuICAgICAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgICAgIGZsZXgtZGlyZWN0aW9uOiByb3c7XHJcbiAgICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbiAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuXHJcbiAgICAgICAgLmFtLXBtLXNlbGVjdG9yIHtcclxuICAgICAgICAgICAgZGlzcGxheTogZmxleDtcclxuICAgICAgICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuICAgICAgICAgICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xyXG4gICAgICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gICAgICAgICAgICBmb250LXNpemU6IDIwcHg7XHJcbiAgICAgICAgICAgIHBhZGRpbmc6IDAgMTVweDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC5zZWxlY3RlZCB7XHJcbiAgICAgICAgICBjb2xvcjogd2hpdGU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5cclxuICAuY2xvY2stY29udGFpbmVyIHtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gICAgcGFkZGluZzogMjBweDtcclxuICB9XHJcblxyXG4gIFxyXG4gIC5jbG9jayB7ICAgIFxyXG4gICAgYmFja2dyb3VuZDogI0YwRURGMTtcclxuICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcclxuICAgIHdpZHRoOiAzMDBweDtcclxuICAgIGhlaWdodDogMzAwcHg7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG4gICAgXHJcbiAgICB1bCB7XHJcbiAgICAgIGhlaWdodDogMzglO1xyXG4gICAgICB3aWR0aDogMDtcclxuICAgICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgICBib3R0b206IDQ1JTtcclxuICAgICAgbGVmdDogNTAlO1xyXG4gICAgICBsaXN0LXN0eWxlLXR5cGU6IG5vbmU7XHJcblxyXG4gICAgICBcclxuICAgICAgbGkge1xyXG4gICAgICAgIGhlaWdodDogMTAwJTtcclxuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICAgICAgdG9wOiAwO1xyXG4gICAgICAgIGxlZnQ6IDA7XHJcbiAgICAgICAgdHJhbnNmb3JtLW9yaWdpbjogNTAlIDEwMCU7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLnNlbGVjdGVkIHtcclxuICAgICAgICAgIGJhY2tncm91bmQ6ICM2NjE5ODM7XHJcbiAgICAgICAgICBjb2xvcjogd2hpdGU7XHJcbiAgICAgICAgICBib3JkZXItcmFkaXVzOiA1MCU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIGkge1xyXG4gICAgICAgICAgZm9udC1zdHlsZTogbm9ybWFsO1xyXG4gICAgICAgICAgZm9udC13ZWlnaHQ6IGJvbGQ7XHJcbiAgICAgICAgICBmb250LXNpemU6IDIwcHg7XHJcblxyXG4gICAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgICAgICAgdG9wOiAwO1xyXG4gICAgICAgICAgbGVmdDogNDUlO1xyXG5cclxuICAgICAgICAgIHdpZHRoOiAzMHB4O1xyXG4gICAgICAgICAgaGVpZ2h0OiAzMHB4O1xyXG4gICAgICAgICAgdGV4dC1hbGlnbjogY2VudGVyOyAvKiDmlofmnKzmsLTlubPlsYXkuK0gKi9cclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgJjpudGgtY2hpbGQoMSkge1xyXG4gICAgICAgICAgdHJhbnNmb3JtOiByb3RhdGUoMCk7XHJcbiAgICAgICAgICBpIHt0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoLTUwJSkgcm90YXRlKDApfVxyXG4gICAgICAgIH0gICAgICAgIFxyXG4gICAgICAgICY6bnRoLWNoaWxkKDIpIHtcclxuICAgICAgICAgIHRyYW5zZm9ybTogcm90YXRlKDMwZGVnKTtcclxuICAgICAgICAgIGkge3RyYW5zZm9ybTogdHJhbnNsYXRlWCgtNTAlKSByb3RhdGUoLTMwZGVnKX1cclxuICAgICAgICB9XHJcbiAgICAgICAgJjpudGgtY2hpbGQoMykge1xyXG4gICAgICAgICAgdHJhbnNmb3JtOiByb3RhdGUoNjBkZWcpO1xyXG4gICAgICAgICAgaSB7dHJhbnNmb3JtOiB0cmFuc2xhdGVYKC01MCUpIHJvdGF0ZSgtNjBkZWcpfVxyXG4gICAgICAgIH1cclxuICAgICAgICAmOm50aC1jaGlsZCg0KSB7XHJcbiAgICAgICAgICB0cmFuc2Zvcm06IHJvdGF0ZSg5MGRlZyk7XHJcbiAgICAgICAgICBpIHt0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoLTUwJSkgcm90YXRlKC05MGRlZyl9XHJcbiAgICAgICAgfVxyXG4gICAgICAgICY6bnRoLWNoaWxkKDUpIHtcclxuICAgICAgICAgIHRyYW5zZm9ybTogcm90YXRlKDEyMGRlZyk7XHJcbiAgICAgICAgICBpIHt0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoLTUwJSkgcm90YXRlKC0xMjBkZWcpfVxyXG4gICAgICAgIH1cclxuICAgICAgICAmOm50aC1jaGlsZCg2KSB7XHJcbiAgICAgICAgICB0cmFuc2Zvcm06IHJvdGF0ZSgxNTBkZWcpO1xyXG4gICAgICAgICAgaSB7dHJhbnNmb3JtOiB0cmFuc2xhdGVYKC01MCUpIHJvdGF0ZSgtMTUwZGVnKX1cclxuICAgICAgICB9XHJcbiAgICAgICAgJjpudGgtY2hpbGQoNykge1xyXG4gICAgICAgICAgdHJhbnNmb3JtOiByb3RhdGUoMTgwZGVnKTtcclxuICAgICAgICAgIGkge3RyYW5zZm9ybTogdHJhbnNsYXRlWCgtNTAlKSByb3RhdGUoLTE4MGRlZyl9XHJcbiAgICAgICAgfVxyXG4gICAgICAgICY6bnRoLWNoaWxkKDgpIHtcclxuICAgICAgICAgIHRyYW5zZm9ybTogcm90YXRlKDIxMGRlZyk7XHJcbiAgICAgICAgICBpIHt0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoLTUwJSkgcm90YXRlKC0yMTBkZWcpfVxyXG4gICAgICAgIH1cclxuICAgICAgICAmOm50aC1jaGlsZCg5KSB7XHJcbiAgICAgICAgICB0cmFuc2Zvcm06IHJvdGF0ZSgyNDBkZWcpO1xyXG4gICAgICAgICAgaSB7dHJhbnNmb3JtOiB0cmFuc2xhdGVYKC01MCUpIHJvdGF0ZSgtMjQwZGVnKX1cclxuICAgICAgICB9XHJcbiAgICAgICAgJjpudGgtY2hpbGQoMTApIHtcclxuICAgICAgICAgIHRyYW5zZm9ybTogcm90YXRlKDI3MGRlZyk7XHJcbiAgICAgICAgICBpIHt0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoLTUwJSkgcm90YXRlKC0yNzBkZWcpfVxyXG4gICAgICAgIH1cclxuICAgICAgICAmOm50aC1jaGlsZCgxMSkge1xyXG4gICAgICAgICAgdHJhbnNmb3JtOiByb3RhdGUoMzAwZGVnKTtcclxuICAgICAgICAgIGkge3RyYW5zZm9ybTogdHJhbnNsYXRlWCgtNTAlKSByb3RhdGUoLTMwMGRlZyl9XHJcbiAgICAgICAgfVxyXG4gICAgICAgICY6bGFzdC1jaGlsZCAge1xyXG4gICAgICAgICAgdHJhbnNmb3JtOiByb3RhdGUoMzMwZGVnKTtcclxuICAgICAgICAgIGkge3RyYW5zZm9ybTogdHJhbnNsYXRlWCgtNTAlKSByb3RhdGUoLTMzMGRlZyl9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvLyDmjIfph50gIFxyXG4gIC5jbG9jay1jb250YWluZXIgLmluZGljYXRvciB7XHJcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICBoZWlnaHQ6IDE1cHg7XHJcbiAgICB3aWR0aDogMTVweDtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuICB9XHJcblxyXG4gICAgXHJcbiAgLmluZGljYXRvcjo6YmVmb3JlIHtcclxuICAgIGNvbnRlbnQ6IFwiXCI7XHJcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICBoZWlnaHQ6IDEwMCU7XHJcbiAgICB3aWR0aDogMTAwJTtcclxuICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcclxuICAgIGJhY2tncm91bmQ6ICM2NjE5ODM7XHJcbiAgfVxyXG5cclxuICAuaW5kaWNhdG9yIC5oYW5kIHtcclxuICAgIHBhZGRpbmc6IDA7XHJcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICBoZWlnaHQ6IDEwMnB4O1xyXG4gICAgd2lkdGg6IDJweDtcclxuICAgIGJvdHRvbTogOHB4OyAvL+aMh+mHneWQkeS4iuWBj+enuyA9XCI9XHJcbiAgICB0cmFuc2Zvcm0tb3JpZ2luOiBib3R0b207XHJcbiAgICBiYWNrZ3JvdW5kOiAjNjYxOTgzO1xyXG4gICAgXHJcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZSgwZGVnKTtcclxuICB9XHJcblxyXG5cclxuLmJvb2tpbmctcmVjb3JkIHtcclxuICBwYWRkaW5nOiAxMHB4O1xyXG4gIGNvbG9yOiAjNjYxOTgzO1xyXG4gIG1hcmdpbi1yaWdodDogMzBweDtcclxuICBmb250LXNpemU6IDI1cHg7XHJcbn0gIFxyXG4iXX0= */\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvYm9va2luZy9jb21wb25lbnRzL2Jvb2tpbmctY2xvY2stcGFnZS9ib29raW5nLWNsb2NrLXBhZ2UuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsZ0JBQWdCO0FBQWhCLDZEQUFBO0FBQ0Esb0RBQUE7QUFHQTtFQUNJLGFBQUE7RUFDQSxzQkFBQTtFQUNBLDhCQUFBO0VBQ0EsbUJBQUE7RUFDQSxhQUFBO0VBQ0EsZUFBQTtBQUFKO0FBRUk7RUFDRSxtQkFBQTtBQUFOO0FBR0k7RUFDRSxhQUFBO0VBQ0Esc0JBQUE7RUFDQSx1QkFBQTtFQUNBLG1CQUFBO0VBQ0EsV0FBQTtFQUNBLGVBQUE7QUFETjs7QUFLQTtFQUNJLFdBQUE7QUFGSjs7QUFLQTtFQUNJLFlBQUE7RUFDQSx5QkFBQTtFQUNBLGtCQUFBO0FBRko7QUFJSTtFQUNJLG1CQUFBO0VBQ0EsY0FBQTtFQUNBLGVBQUE7RUFDQSxhQUFBO0VBQ0EsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsdUJBQUE7RUFDQSxtQkFBQTtBQUZSO0FBSVE7RUFDSSxhQUFBO0VBQ0Esc0JBQUE7RUFDQSw4QkFBQTtFQUNBLG1CQUFBO0VBQ0EsZUFBQTtFQUNBLGVBQUE7QUFGWjtBQUtRO0VBQ0UsWUFBQTtBQUhWOztBQVNFO0VBQ0UsYUFBQTtFQUNBLHNCQUFBO0VBQ0EsdUJBQUE7RUFDQSxtQkFBQTtFQUNBLGtCQUFBO0VBQ0EsYUFBQTtBQU5KOztBQVVFO0VBQ0UsbUJBQUE7RUFDQSxrQkFBQTtFQUNBLFlBQUE7RUFDQSxhQUFBO0VBQ0EsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsdUJBQUE7QUFQSjtBQVNJO0VBQ0UsV0FBQTtFQUNBLFFBQUE7RUFDQSxrQkFBQTtFQUNBLFdBQUE7RUFDQSxTQUFBO0VBQ0EscUJBQUE7QUFQTjtBQVVNO0VBQ0UsWUFBQTtFQUNBLGtCQUFBO0VBQ0EsTUFBQTtFQUNBLE9BQUE7RUFDQSwwQkFBQTtBQVJSO0FBVVE7RUFDRSxtQkFBQTtFQUNBLFlBQUE7RUFDQSxrQkFBQTtBQVJWO0FBV1E7RUFDRSxrQkFBQTtFQUNBLGlCQUFBO0VBQ0EsZUFBQTtFQUVBLGtCQUFBO0VBQ0EsTUFBQTtFQUNBLFNBQUE7RUFFQSxXQUFBO0VBQ0EsWUFBQTtFQUNBLGtCQUFBLEVBQUEsV0FBQTtBQVhWO0FBY1E7RUFDRSxvQkFBQTtBQVpWO0FBYVU7RUFBRyxxQ0FBQTtBQVZiO0FBWVE7RUFDRSx3QkFBQTtBQVZWO0FBV1U7RUFBRywwQ0FBQTtBQVJiO0FBVVE7RUFDRSx3QkFBQTtBQVJWO0FBU1U7RUFBRywwQ0FBQTtBQU5iO0FBUVE7RUFDRSx3QkFBQTtBQU5WO0FBT1U7RUFBRywwQ0FBQTtBQUpiO0FBTVE7RUFDRSx5QkFBQTtBQUpWO0FBS1U7RUFBRywyQ0FBQTtBQUZiO0FBSVE7RUFDRSx5QkFBQTtBQUZWO0FBR1U7RUFBRywyQ0FBQTtBQUFiO0FBRVE7RUFDRSx5QkFBQTtBQUFWO0FBQ1U7RUFBRywyQ0FBQTtBQUViO0FBQVE7RUFDRSx5QkFBQTtBQUVWO0FBRFU7RUFBRywyQ0FBQTtBQUliO0FBRlE7RUFDRSx5QkFBQTtBQUlWO0FBSFU7RUFBRywyQ0FBQTtBQU1iO0FBSlE7RUFDRSx5QkFBQTtBQU1WO0FBTFU7RUFBRywyQ0FBQTtBQVFiO0FBTlE7RUFDRSx5QkFBQTtBQVFWO0FBUFU7RUFBRywyQ0FBQTtBQVViO0FBUlE7RUFDRSx5QkFBQTtBQVVWO0FBVFU7RUFBRywyQ0FBQTtBQVliOztBQUxFO0VBQ0Usa0JBQUE7RUFDQSxZQUFBO0VBQ0EsV0FBQTtFQUNBLGFBQUE7RUFDQSx1QkFBQTtBQVFKOztBQUpFO0VBQ0UsV0FBQTtFQUNBLGtCQUFBO0VBQ0EsWUFBQTtFQUNBLFdBQUE7RUFDQSxrQkFBQTtFQUNBLG1CQUFBO0FBT0o7O0FBSkU7RUFDRSxVQUFBO0VBQ0Esa0JBQUE7RUFDQSxhQUFBO0VBQ0EsVUFBQTtFQUNBLFdBQUE7RUFDQSx3QkFBQTtFQUNBLG1CQUFBO0VBRUEsdUJBQUE7QUFNSjs7QUFGQTtFQUNFLGFBQUE7RUFDQSxjQUFBO0VBQ0Esa0JBQUE7RUFDQSxlQUFBO0FBS0Y7QUFDQSx3aVNBQXdpUyIsInNvdXJjZXNDb250ZW50IjpbIi8qIGh0dHBzOi8vY29kZXBlbi5pby9KZWZmcmV5VGF5bG9yL3Blbi96WmdLdnc/ZWRpdG9ycz0xMTAwICovXHJcbi8qIGh0dHBzOi8vY29kZXBlbi5pby9NQUxMVS1DT0RFUi1TVUdVL3Blbi9RV3pCYUJ3ICovXHJcblxyXG5cclxuLmNsb2NrLXBhZ2UtY29udGFpbmVyIHtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xyXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAgIGhlaWdodDogMzUwcHg7XHJcbiAgICBwYWRkaW5nOiAyMHB4IDA7XHJcblxyXG4gICAgLmlucHV0LWJhciB7XHJcbiAgICAgIG1hcmdpbi1ib3R0b206IDEwcHg7XHJcbiAgICB9XHJcblxyXG4gICAgLmJ0bi1iYXIge1xyXG4gICAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAgICAgd2lkdGg6IDEwMCU7XHJcbiAgICAgIHBhZGRpbmc6IDIwcHggMDtcclxuICAgIH1cclxufVxyXG5cclxuaW1nIHtcclxuICAgIHdpZHRoOiA0MHB4O1xyXG59XHJcblxyXG4uY2xvY2stcGFpY2tlciB7XHJcbiAgICB3aWR0aDogMzUwcHg7XHJcbiAgICBib3JkZXI6IDFweCBzb2xpZCAjY2ZjZmNmO1xyXG4gICAgYm9yZGVyLXJhZGl1czogMXB4O1xyXG4gICAgXHJcbiAgICAuY2xvY2staGVhZGVyIHtcclxuICAgICAgICBiYWNrZ3JvdW5kOiAjNjYxOTgzO1xyXG4gICAgICAgIGNvbG9yOiAjY2ZjZmNmO1xyXG4gICAgICAgIGZvbnQtc2l6ZTogNTBweDtcclxuICAgICAgICBwYWRkaW5nOiAxNXB4O1xyXG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICAgICAgZmxleC1kaXJlY3Rpb246IHJvdztcclxuICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG5cclxuICAgICAgICAuYW0tcG0tc2VsZWN0b3Ige1xyXG4gICAgICAgICAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgICAgICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gICAgICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XHJcbiAgICAgICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgICAgICAgICAgIGZvbnQtc2l6ZTogMjBweDtcclxuICAgICAgICAgICAgcGFkZGluZzogMCAxNXB4O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLnNlbGVjdGVkIHtcclxuICAgICAgICAgIGNvbG9yOiB3aGl0ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG4gIC5jbG9jay1jb250YWluZXIge1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgICBwYWRkaW5nOiAyMHB4O1xyXG4gIH1cclxuXHJcbiAgXHJcbiAgLmNsb2NrIHsgICAgXHJcbiAgICBiYWNrZ3JvdW5kOiAjRjBFREYxO1xyXG4gICAgYm9yZGVyLXJhZGl1czogNTAlO1xyXG4gICAgd2lkdGg6IDMwMHB4O1xyXG4gICAgaGVpZ2h0OiAzMDBweDtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbiAgICBcclxuICAgIHVsIHtcclxuICAgICAgaGVpZ2h0OiAzOCU7XHJcbiAgICAgIHdpZHRoOiAwO1xyXG4gICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICAgIGJvdHRvbTogNDUlO1xyXG4gICAgICBsZWZ0OiA1MCU7XHJcbiAgICAgIGxpc3Qtc3R5bGUtdHlwZTogbm9uZTtcclxuXHJcbiAgICAgIFxyXG4gICAgICBsaSB7XHJcbiAgICAgICAgaGVpZ2h0OiAxMDAlO1xyXG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgICAgICB0b3A6IDA7XHJcbiAgICAgICAgbGVmdDogMDtcclxuICAgICAgICB0cmFuc2Zvcm0tb3JpZ2luOiA1MCUgMTAwJTtcclxuICAgICAgICBcclxuICAgICAgICAuc2VsZWN0ZWQge1xyXG4gICAgICAgICAgYmFja2dyb3VuZDogIzY2MTk4MztcclxuICAgICAgICAgIGNvbG9yOiB3aGl0ZTtcclxuICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgaSB7XHJcbiAgICAgICAgICBmb250LXN0eWxlOiBub3JtYWw7XHJcbiAgICAgICAgICBmb250LXdlaWdodDogYm9sZDtcclxuICAgICAgICAgIGZvbnQtc2l6ZTogMjBweDtcclxuXHJcbiAgICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICAgICAgICB0b3A6IDA7XHJcbiAgICAgICAgICBsZWZ0OiA0NSU7XHJcblxyXG4gICAgICAgICAgd2lkdGg6IDMwcHg7XHJcbiAgICAgICAgICBoZWlnaHQ6IDMwcHg7XHJcbiAgICAgICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7IC8qIMOmwpbCh8OmwpzCrMOmwrDCtMOlwrnCs8OlwrHChcOkwrjCrSAqL1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICAmOm50aC1jaGlsZCgxKSB7XHJcbiAgICAgICAgICB0cmFuc2Zvcm06IHJvdGF0ZSgwKTtcclxuICAgICAgICAgIGkge3RyYW5zZm9ybTogdHJhbnNsYXRlWCgtNTAlKSByb3RhdGUoMCl9XHJcbiAgICAgICAgfSAgICAgICAgXHJcbiAgICAgICAgJjpudGgtY2hpbGQoMikge1xyXG4gICAgICAgICAgdHJhbnNmb3JtOiByb3RhdGUoMzBkZWcpO1xyXG4gICAgICAgICAgaSB7dHJhbnNmb3JtOiB0cmFuc2xhdGVYKC01MCUpIHJvdGF0ZSgtMzBkZWcpfVxyXG4gICAgICAgIH1cclxuICAgICAgICAmOm50aC1jaGlsZCgzKSB7XHJcbiAgICAgICAgICB0cmFuc2Zvcm06IHJvdGF0ZSg2MGRlZyk7XHJcbiAgICAgICAgICBpIHt0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoLTUwJSkgcm90YXRlKC02MGRlZyl9XHJcbiAgICAgICAgfVxyXG4gICAgICAgICY6bnRoLWNoaWxkKDQpIHtcclxuICAgICAgICAgIHRyYW5zZm9ybTogcm90YXRlKDkwZGVnKTtcclxuICAgICAgICAgIGkge3RyYW5zZm9ybTogdHJhbnNsYXRlWCgtNTAlKSByb3RhdGUoLTkwZGVnKX1cclxuICAgICAgICB9XHJcbiAgICAgICAgJjpudGgtY2hpbGQoNSkge1xyXG4gICAgICAgICAgdHJhbnNmb3JtOiByb3RhdGUoMTIwZGVnKTtcclxuICAgICAgICAgIGkge3RyYW5zZm9ybTogdHJhbnNsYXRlWCgtNTAlKSByb3RhdGUoLTEyMGRlZyl9XHJcbiAgICAgICAgfVxyXG4gICAgICAgICY6bnRoLWNoaWxkKDYpIHtcclxuICAgICAgICAgIHRyYW5zZm9ybTogcm90YXRlKDE1MGRlZyk7XHJcbiAgICAgICAgICBpIHt0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoLTUwJSkgcm90YXRlKC0xNTBkZWcpfVxyXG4gICAgICAgIH1cclxuICAgICAgICAmOm50aC1jaGlsZCg3KSB7XHJcbiAgICAgICAgICB0cmFuc2Zvcm06IHJvdGF0ZSgxODBkZWcpO1xyXG4gICAgICAgICAgaSB7dHJhbnNmb3JtOiB0cmFuc2xhdGVYKC01MCUpIHJvdGF0ZSgtMTgwZGVnKX1cclxuICAgICAgICB9XHJcbiAgICAgICAgJjpudGgtY2hpbGQoOCkge1xyXG4gICAgICAgICAgdHJhbnNmb3JtOiByb3RhdGUoMjEwZGVnKTtcclxuICAgICAgICAgIGkge3RyYW5zZm9ybTogdHJhbnNsYXRlWCgtNTAlKSByb3RhdGUoLTIxMGRlZyl9XHJcbiAgICAgICAgfVxyXG4gICAgICAgICY6bnRoLWNoaWxkKDkpIHtcclxuICAgICAgICAgIHRyYW5zZm9ybTogcm90YXRlKDI0MGRlZyk7XHJcbiAgICAgICAgICBpIHt0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoLTUwJSkgcm90YXRlKC0yNDBkZWcpfVxyXG4gICAgICAgIH1cclxuICAgICAgICAmOm50aC1jaGlsZCgxMCkge1xyXG4gICAgICAgICAgdHJhbnNmb3JtOiByb3RhdGUoMjcwZGVnKTtcclxuICAgICAgICAgIGkge3RyYW5zZm9ybTogdHJhbnNsYXRlWCgtNTAlKSByb3RhdGUoLTI3MGRlZyl9XHJcbiAgICAgICAgfVxyXG4gICAgICAgICY6bnRoLWNoaWxkKDExKSB7XHJcbiAgICAgICAgICB0cmFuc2Zvcm06IHJvdGF0ZSgzMDBkZWcpO1xyXG4gICAgICAgICAgaSB7dHJhbnNmb3JtOiB0cmFuc2xhdGVYKC01MCUpIHJvdGF0ZSgtMzAwZGVnKX1cclxuICAgICAgICB9XHJcbiAgICAgICAgJjpsYXN0LWNoaWxkICB7XHJcbiAgICAgICAgICB0cmFuc2Zvcm06IHJvdGF0ZSgzMzBkZWcpO1xyXG4gICAgICAgICAgaSB7dHJhbnNmb3JtOiB0cmFuc2xhdGVYKC01MCUpIHJvdGF0ZSgtMzMwZGVnKX1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8vIMOmwozCh8OpwofCnSAgXHJcbiAgLmNsb2NrLWNvbnRhaW5lciAuaW5kaWNhdG9yIHtcclxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgIGhlaWdodDogMTVweDtcclxuICAgIHdpZHRoOiAxNXB4O1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG4gIH1cclxuXHJcbiAgICBcclxuICAuaW5kaWNhdG9yOjpiZWZvcmUge1xyXG4gICAgY29udGVudDogXCJcIjtcclxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgIGhlaWdodDogMTAwJTtcclxuICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgYm9yZGVyLXJhZGl1czogNTAlO1xyXG4gICAgYmFja2dyb3VuZDogIzY2MTk4MztcclxuICB9XHJcblxyXG4gIC5pbmRpY2F0b3IgLmhhbmQge1xyXG4gICAgcGFkZGluZzogMDtcclxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgIGhlaWdodDogMTAycHg7XHJcbiAgICB3aWR0aDogMnB4O1xyXG4gICAgYm90dG9tOiA4cHg7IC8vw6bCjMKHw6nCh8Kdw6XCkMKRw6TCuMKKw6XCgcKPw6fCp8K7ID1cIj1cclxuICAgIHRyYW5zZm9ybS1vcmlnaW46IGJvdHRvbTtcclxuICAgIGJhY2tncm91bmQ6ICM2NjE5ODM7XHJcbiAgICBcclxuICAgIHRyYW5zZm9ybTogcm90YXRlKDBkZWcpO1xyXG4gIH1cclxuXHJcblxyXG4uYm9va2luZy1yZWNvcmQge1xyXG4gIHBhZGRpbmc6IDEwcHg7XHJcbiAgY29sb3I6ICM2NjE5ODM7XHJcbiAgbWFyZ2luLXJpZ2h0OiAzMHB4O1xyXG4gIGZvbnQtc2l6ZTogMjVweDtcclxufSAgXHJcbiJdLCJzb3VyY2VSb290IjoiIn0= */"]
    });
  }
}

/***/ }),

/***/ 5637:
/*!*************************************************************************************!*\
  !*** ./src/app/booking/components/booking-date-page/booking-date-page.component.ts ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BookingDatePageComponent: () => (/* binding */ BookingDatePageComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var src_app_auth_route_services_route_url_record_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/auth-route/services/route-url-record.service */ 7228);
/* harmony import */ var _services_booking_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../services/booking.service */ 4377);
/* harmony import */ var _common_time_component_calendar_picker_calendar_picker_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../common/time/component/calendar-picker/calendar-picker.component */ 6544);
/* harmony import */ var _common_loading_components_loading_basic_loading_basic_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../common/loading/components/loading-basic/loading-basic.component */ 3408);





class BookingDatePageComponent {
  constructor(routeUrlRecordService, bookingService) {
    this.routeUrlRecordService = routeUrlRecordService;
    this.bookingService = bookingService;
    // 所有 booking 紀錄
    this.bookingList = new Array();
    // 畫面loading
    this.isLoading = false;
  }
  ngOnInit() {}
  /*
   * 下一步
   */
  nextStep() {
    /*
    // 取得該選擇日期 有幾筆 預約記錄
    const selectDayAllBookingRecordList = this.bookingList.filter(booking => {
      return new Date(booking.startDate).getTime() === new Date(this.bookingService.getSelectDate()).getTime();
    });
         // 檢查該日期是否超過上限
    if(selectDayAllBookingRecordList.length >= this.bookingDaylimit) {
      alert("每日預約上限最多 " + this.bookingDaylimit + "次");
      return;
    }
         // 存入該選擇日期紀錄
    this.bookingService.setThisDayAllBookingRecord(selectDayAllBookingRecordList);
    */
    alert("確定下一步？選擇日期為: " + this.bookingService.getSelectDate());
    this.routeUrlRecordService.nextPage("booking-clock", {});
  }
  /*
   * 更新日期元件 之 日期資訊
   * 接收 行事曆 component 的 emit
   */
  getEmitterSelectDay(selectDay) {
    this.bookingService.setSelectDate(selectDay);
  }
  static {
    this.ɵfac = function BookingDatePageComponent_Factory(t) {
      return new (t || BookingDatePageComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](src_app_auth_route_services_route_url_record_service__WEBPACK_IMPORTED_MODULE_0__.RouteUrlRecordService), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_services_booking_service__WEBPACK_IMPORTED_MODULE_1__.BookingService));
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineComponent"]({
      type: BookingDatePageComponent,
      selectors: [["app-booking-date-page"]],
      decls: 6,
      vars: 1,
      consts: [[1, "container"], [3, "selectDatInfo"], [1, "btn-bar"], ["src", "assets/images/icon/icon_next.png", 3, "click"], [1, "loading-container"], [3, "isLoading"]],
      template: function BookingDatePageComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 0)(1, "app-calendar-picker", 1);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("selectDatInfo", function BookingDatePageComponent_Template_app_calendar_picker_selectDatInfo_1_listener($event) {
            return ctx.getEmitterSelectDay($event);
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](2, "div", 2)(3, "img", 3);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function BookingDatePageComponent_Template_img_click_3_listener() {
            return ctx.nextStep();
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](4, "div", 4);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](5, "app-loading-basic", 5);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
        }
        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](5);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("isLoading", ctx.isLoading);
        }
      },
      dependencies: [_common_time_component_calendar_picker_calendar_picker_component__WEBPACK_IMPORTED_MODULE_2__.CalendarPickerComponent, _common_loading_components_loading_basic_loading_basic_component__WEBPACK_IMPORTED_MODULE_3__.LoadingBasicComponent],
      styles: [".container[_ngcontent-%COMP%] {\n  display: flex;\n  height: 450px;\n  flex-direction: column;\n  justify-content: space-between;\n  align-items: center;\n  padding: 20px 0;\n}\n.container[_ngcontent-%COMP%]   .btn-bar[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  width: 100%;\n  padding: 20px 0;\n}\n\nimg[_ngcontent-%COMP%] {\n  width: 40px;\n}\n\n.loading-container[_ngcontent-%COMP%] {\n  z-index: 91;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJvb2tpbmctZGF0ZS1wYWdlLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBO0VBQ0ksYUFBQTtFQUNBLGFBQUE7RUFDQSxzQkFBQTtFQUNBLDhCQUFBO0VBQ0EsbUJBQUE7RUFDQSxlQUFBO0FBQUo7QUFFSTtFQUNJLGFBQUE7RUFDQSxzQkFBQTtFQUNBLHVCQUFBO0VBQ0EsbUJBQUE7RUFDQSxXQUFBO0VBQ0EsZUFBQTtBQUFSOztBQUlBO0VBQ0ksV0FBQTtBQURKOztBQUlBO0VBQ0ksV0FBQTtBQURKIiwiZmlsZSI6ImJvb2tpbmctZGF0ZS1wYWdlLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbi5jb250YWluZXIge1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGhlaWdodDogNDUwcHg7XHJcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xyXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAgIHBhZGRpbmc6IDIwcHggMDtcclxuXHJcbiAgICAuYnRuLWJhciB7XHJcbiAgICAgICAgZGlzcGxheTogZmxleDtcclxuICAgICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gICAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG4gICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgICAgICAgd2lkdGg6IDEwMCU7XHJcbiAgICAgICAgcGFkZGluZzogMjBweCAwO1xyXG4gICAgfVxyXG59XHJcblxyXG5pbWcge1xyXG4gICAgd2lkdGg6IDQwcHg7XHJcbn1cclxuXHJcbi5sb2FkaW5nLWNvbnRhaW5lciB7XHJcbiAgICB6LWluZGV4OiA5MTtcclxufVxyXG4iXX0= */\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvYm9va2luZy9jb21wb25lbnRzL2Jvb2tpbmctZGF0ZS1wYWdlL2Jvb2tpbmctZGF0ZS1wYWdlLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBO0VBQ0ksYUFBQTtFQUNBLGFBQUE7RUFDQSxzQkFBQTtFQUNBLDhCQUFBO0VBQ0EsbUJBQUE7RUFDQSxlQUFBO0FBQUo7QUFFSTtFQUNJLGFBQUE7RUFDQSxzQkFBQTtFQUNBLHVCQUFBO0VBQ0EsbUJBQUE7RUFDQSxXQUFBO0VBQ0EsZUFBQTtBQUFSOztBQUlBO0VBQ0ksV0FBQTtBQURKOztBQUlBO0VBQ0ksV0FBQTtBQURKO0FBQ0Esd29DQUF3b0MiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuLmNvbnRhaW5lciB7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgaGVpZ2h0OiA0NTBweDtcclxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XHJcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gICAgcGFkZGluZzogMjBweCAwO1xyXG5cclxuICAgIC5idG4tYmFyIHtcclxuICAgICAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAgICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbiAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAgICAgICB3aWR0aDogMTAwJTtcclxuICAgICAgICBwYWRkaW5nOiAyMHB4IDA7XHJcbiAgICB9XHJcbn1cclxuXHJcbmltZyB7XHJcbiAgICB3aWR0aDogNDBweDtcclxufVxyXG5cclxuLmxvYWRpbmctY29udGFpbmVyIHtcclxuICAgIHotaW5kZXg6IDkxO1xyXG59XHJcbiJdLCJzb3VyY2VSb290IjoiIn0= */"]
    });
  }
}

/***/ }),

/***/ 2857:
/*!***************************************************************************************************!*\
  !*** ./src/app/booking/components/booking-select-type-page/booking-select-type-page.component.ts ***!
  \***************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BookingSelectTypePageComponent: () => (/* binding */ BookingSelectTypePageComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 5072);
/* harmony import */ var _common_button_components_img_btn_img_btn_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../common/button/components/img-btn/img-btn.component */ 9790);



class BookingSelectTypePageComponent {
  constructor(router) {
    this.router = router;
  }
  ngOnInit() {}
  selectForm(bookingType) {
    const navigationExtras = {
      queryParams: {
        bookingType: bookingType
      }
    };
    this.router.navigate(["booking-check-form"], navigationExtras);
  }
  static {
    this.ɵfac = function BookingSelectTypePageComponent_Factory(t) {
      return new (t || BookingSelectTypePageComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_2__.Router));
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
      type: BookingSelectTypePageComponent,
      selectors: [["app-booking-select-type-page"]],
      decls: 2,
      vars: 2,
      consts: [[1, "home-list-container"], [3, "click", "imgUrl", "btnText"]],
      template: function BookingSelectTypePageComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 0)(1, "app-img-btn", 1);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function BookingSelectTypePageComponent_Template_app_img_btn_click_1_listener() {
            return ctx.selectForm("site");
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
        }
        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("imgUrl", "assets/images/button/button_main.png")("btnText", "\u5EA7\u4F4D\u9810\u7D04");
        }
      },
      dependencies: [_common_button_components_img_btn_img_btn_component__WEBPACK_IMPORTED_MODULE_0__.ImgBtnComponent],
      styles: [".home-list-container[_ngcontent-%COMP%] {\n  width: 100%;\n  display: flex;\n  flex-direction: column;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 40px;\n  gap: 40px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJvb2tpbmctc2VsZWN0LXR5cGUtcGFnZS5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQTtFQUNJLFdBQUE7RUFDQSxhQUFBO0VBQ0Esc0JBQUE7RUFDQSw4QkFBQTtFQUNBLG1CQUFBO0VBQ0EsbUJBQUE7RUFDQSxTQUFBO0FBQUoiLCJmaWxlIjoiYm9va2luZy1zZWxlY3QtdHlwZS1wYWdlLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbi5ob21lLWxpc3QtY29udGFpbmVyIHtcclxuICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XHJcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gICAgbWFyZ2luLWJvdHRvbTogNDBweDtcclxuICAgIGdhcDogNDBweDtcclxufSJdfQ== */\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvYm9va2luZy9jb21wb25lbnRzL2Jvb2tpbmctc2VsZWN0LXR5cGUtcGFnZS9ib29raW5nLXNlbGVjdC10eXBlLXBhZ2UuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0E7RUFDSSxXQUFBO0VBQ0EsYUFBQTtFQUNBLHNCQUFBO0VBQ0EsOEJBQUE7RUFDQSxtQkFBQTtFQUNBLG1CQUFBO0VBQ0EsU0FBQTtBQUFKO0FBQ0EsZ3FCQUFncUIiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuLmhvbWUtbGlzdC1jb250YWluZXIge1xyXG4gICAgd2lkdGg6IDEwMCU7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcclxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgICBtYXJnaW4tYm90dG9tOiA0MHB4O1xyXG4gICAgZ2FwOiA0MHB4O1xyXG59Il0sInNvdXJjZVJvb3QiOiIifQ== */"]
    });
  }
}

/***/ }),

/***/ 9305:
/*!*************************************************!*\
  !*** ./src/app/booking/models/booking.model.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Booking: () => (/* binding */ Booking)
/* harmony export */ });
class Booking {
  constructor(id, userId, mail, startDate, endDate, startTime, endTime, bookingType, roomId, roomName, siteId, siteName) {
    this.id = "";
    this.userId = "";
    this.mail = "";
    this.startDate = "";
    this.endDate = "";
    this.startTime = "";
    this.endTime = "";
    this.bookingType = "";
    this.roomId = "";
    this.roomName = "";
    this.siteId = "";
    this.siteName = "";
    this.id = id;
    this.userId = userId;
    this.mail = mail;
    this.startDate = startDate;
    this.endDate = endDate;
    this.startTime = startTime;
    this.endTime = endTime;
    this.bookingType = bookingType;
    this.roomId = roomId;
    this.roomName = roomName;
    this.siteId = siteId;
    this.siteName = siteName;
  }
}

/***/ }),

/***/ 4377:
/*!*****************************************************!*\
  !*** ./src/app/booking/services/booking.service.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BookingService: () => (/* binding */ BookingService)
/* harmony export */ });
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/environments/environment */ 5312);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ 6443);



class BookingService {
  constructor(http) {
    this.http = http;
    this.DOMAIN = src_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.domain;
    this.CONTEXT = "/api/booking";
    this.BASE_URL = this.DOMAIN + this.CONTEXT;
    // 本次預約流程之 選擇日期
    this.selectDateInfo = "";
    // 本次預約流程之 開始時間
    this.startTime = "09:00";
    // 本次預約流程之 結束時間
    this.endTime = "09:00";
    // 本次預約流程中 選擇日期 之前 已經存在之預約記錄
    this.selectDayAllBookingRecordList = [];
  }
  /*
   * 取得 本次預約流程之 選擇日期
   */
  getSelectDate() {
    return this.selectDateInfo;
  }
  /*
   * 設定 本次預約流程之 選擇日期
   */
  setSelectDate(selectDate) {
    this.selectDateInfo = selectDate;
  }
  /*
   * 取得 本次預約流程之 開始時間
   */
  getStartTime() {
    return this.startTime;
  }
  /*
   * 設定 本次預約流程之 開始時間
   */
  setStartTime(startTime) {
    this.startTime = startTime;
  }
  /*
   * 取得 本次預約流程之 結束時間
   */
  getEndTime() {
    return this.endTime;
  }
  /*
   * 設定 本次預約流程之 結束時間
   */
  setEndTime(endTime) {
    this.endTime = endTime;
  }
  /*
   *  取得 本次預約流程中 選擇日期 之前 已經存在之預約記錄
   */
  getThisDayAllBookingRecord() {
    return this.selectDayAllBookingRecordList;
  }
  /*
   *  設定 本次預約流程中 選擇日期 之前 已經存在之預約記錄
   */
  setThisDayAllBookingRecord(list) {
    this.selectDayAllBookingRecordList = [];
    this.selectDayAllBookingRecordList = list;
  }
  /*
   * 取得所有 booking 資料
   */
  getAllBooking() {
    //return this.fireStoreService.getAll(this.bookingTable);
    return this.http.get(`${this.BASE_URL}/all`);
  }
  /*
   * 取得所有 booking 資料
   */
  getRoomByOwnerId(userId) {
    return this.http.get(`${this.BASE_URL}/room/userId/${userId}`);
  }
  /*
   * 取得所有 booking 資料
   */
  getAllSiteList() {
    return this.http.get(`${this.BASE_URL}/roomtosite/all`);
  }
  /*
   * 新增一筆 booking 資料
   */
  post(booking) {
    //return this.fireStoreService.post(this.bookingTable, booking);
    return this.http.post(`${this.BASE_URL}/add`, {
      booking
    });
  }
  /*
  * 回傳所有 教室,座位 資訊, 並有 booking 時段判斷, 若已被預約, 則註記 isbooking: true
  *  firestore 操作 待抽離至 RoomToSite model
  */
  getRoomSiteByDate(startDate, startTime, endTime) {
    return this.http.get(`${this.BASE_URL}/roomtosite/${startDate}/${startTime}/${endTime}`);
  }
  static {
    this.ɵfac = function BookingService_Factory(t) {
      return new (t || BookingService)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpClient));
    };
  }
  static {
    this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({
      token: BookingService,
      factory: BookingService.ɵfac,
      providedIn: 'root'
    });
  }
}

/***/ }),

/***/ 9790:
/*!***********************************************************************!*\
  !*** ./src/app/common/button/components/img-btn/img-btn.component.ts ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ImgBtnComponent: () => (/* binding */ ImgBtnComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 7580);

class ImgBtnComponent {
  constructor() {
    this.imgUrl = "";
    this.btnText = "開發中功能";
    this.btnRouterLink = "";
  }
  static {
    this.ɵfac = function ImgBtnComponent_Factory(t) {
      return new (t || ImgBtnComponent)();
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
      type: ImgBtnComponent,
      selectors: [["app-img-btn"]],
      inputs: {
        imgUrl: "imgUrl",
        btnText: "btnText",
        btnRouterLink: "btnRouterLink"
      },
      decls: 4,
      vars: 2,
      consts: [[1, "img-btn"], [1, "background-img", 3, "src"], [1, "img-btn-text"]],
      template: function ImgBtnComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "img", 1);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "label", 2);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
        }
        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("src", ctx.imgUrl, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsanitizeUrl"]);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.btnText);
        }
      },
      styles: ["@charset \"UTF-8\";\n.img-btn[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  cursor: pointer;\n}\n\n.img-btn[_ngcontent-%COMP%]:hover {\n  animation: _ngcontent-%COMP%_bounce 0.4s ease-in-out;\n}\n\n\n\n@keyframes _ngcontent-%COMP%_bounce {\n  0% {\n    transform: translateY(0);\n  }\n  50% {\n    transform: translateY(-5px);\n  } \n\n  100% {\n    transform: translateY(0);\n  } \n\n}\n.background-img[_ngcontent-%COMP%] {\n  cursor: pointer;\n}\n\n.img-btn-text[_ngcontent-%COMP%] {\n  position: absolute;\n  color: white;\n  font-size: 25px;\n  cursor: pointer;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImltZy1idG4uY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsZ0JBQWdCO0FBQ2hCO0VBQ0ksYUFBQTtFQUNBLHVCQUFBO0VBQ0EsbUJBQUE7RUFDQSxlQUFBO0FBQ0o7O0FBQ0E7RUFDSSxrQ0FBQTtBQUVKOztBQUFBLGFBQUE7QUFDQTtFQUNJO0lBQU8sd0JBQUE7RUFJVDtFQUhFO0lBQU8sMkJBQUE7RUFNVCxFQU53QyxTQUFBO0VBQ3RDO0lBQU8sd0JBQUE7RUFRVCxFQVJxQyxTQUFBO0FBU3ZDO0FBTkE7RUFDSSxlQUFBO0FBUUo7O0FBTEE7RUFDSSxrQkFBQTtFQUNBLFlBQUE7RUFDQSxlQUFBO0VBQ0EsZUFBQTtBQVFKIiwiZmlsZSI6ImltZy1idG4uY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuLmltZy1idG4ge1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAgIGN1cnNvcjogcG9pbnRlcjtcclxufVxyXG4uaW1nLWJ0bjpob3ZlciB7XHJcbiAgICBhbmltYXRpb246IGJvdW5jZSAwLjRzIGVhc2UtaW4tb3V0O1xyXG59XHJcbi8qIOi8leW+ruS4iuS4i+W9iOi3s+WLleeVqyAqL1xyXG5Aa2V5ZnJhbWVzIGJvdW5jZSB7XHJcbiAgICAwJSAgIHsgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDApOyB9XHJcbiAgICA1MCUgIHsgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC01cHgpOyB9IC8qIOWQkeS4iuW9iOi3syAqL1xyXG4gICAgMTAwJSB7IHRyYW5zZm9ybTogdHJhbnNsYXRlWSgwKTsgfSAvKiDlm57liLDljp/kvY0gKi9cclxufVxyXG5cclxuLmJhY2tncm91bmQtaW1nIHtcclxuICAgIGN1cnNvcjogcG9pbnRlcjtcclxufVxyXG5cclxuLmltZy1idG4tdGV4dCB7XHJcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICBjb2xvcjp3aGl0ZTtcclxuICAgIGZvbnQtc2l6ZTogMjVweDtcclxuICAgIGN1cnNvcjogcG9pbnRlcjtcclxufSJdfQ== */\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvY29tbW9uL2J1dHRvbi9jb21wb25lbnRzL2ltZy1idG4vaW1nLWJ0bi5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxnQkFBZ0I7QUFDaEI7RUFDSSxhQUFBO0VBQ0EsdUJBQUE7RUFDQSxtQkFBQTtFQUNBLGVBQUE7QUFDSjs7QUFDQTtFQUNJLGtDQUFBO0FBRUo7O0FBQUEsYUFBQTtBQUNBO0VBQ0k7SUFBTyx3QkFBQTtFQUlUO0VBSEU7SUFBTywyQkFBQTtFQU1ULEVBTndDLFNBQUE7RUFDdEM7SUFBTyx3QkFBQTtFQVFULEVBUnFDLFNBQUE7QUFTdkM7QUFOQTtFQUNJLGVBQUE7QUFRSjs7QUFMQTtFQUNJLGtCQUFBO0VBQ0EsWUFBQTtFQUNBLGVBQUE7RUFDQSxlQUFBO0FBUUo7QUFDQSxvMkNBQW8yQyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG4uaW1nLWJ0biB7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gICAgY3Vyc29yOiBwb2ludGVyO1xyXG59XHJcbi5pbWctYnRuOmhvdmVyIHtcclxuICAgIGFuaW1hdGlvbjogYm91bmNlIDAuNHMgZWFzZS1pbi1vdXQ7XHJcbn1cclxuLyogw6jCvMKVw6XCvsKuw6TCuMKKw6TCuMKLw6XCvcKIw6jCt8Kzw6XCi8KVw6fClcKrICovXHJcbkBrZXlmcmFtZXMgYm91bmNlIHtcclxuICAgIDAlICAgeyB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMCk7IH1cclxuICAgIDUwJSAgeyB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTVweCk7IH0gLyogw6XCkMKRw6TCuMKKw6XCvcKIw6jCt8KzICovXHJcbiAgICAxMDAlIHsgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDApOyB9IC8qIMOlwpvCnsOlwojCsMOlwo7Cn8Okwr3CjSAqL1xyXG59XHJcblxyXG4uYmFja2dyb3VuZC1pbWcge1xyXG4gICAgY3Vyc29yOiBwb2ludGVyO1xyXG59XHJcblxyXG4uaW1nLWJ0bi10ZXh0IHtcclxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgIGNvbG9yOndoaXRlO1xyXG4gICAgZm9udC1zaXplOiAyNXB4O1xyXG4gICAgY3Vyc29yOiBwb2ludGVyO1xyXG59Il0sInNvdXJjZVJvb3QiOiIifQ== */"]
    });
  }
}

/***/ }),

/***/ 9276:
/*!*********************************************************************!*\
  !*** ./src/app/common/dialog/components/dialog/dialog.component.ts ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DialogComponent: () => (/* binding */ DialogComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ 316);



const _c0 = a0 => ({
  display: a0
});
const _c1 = a0 => ({
  "row-click": a0
});
const _c2 = a0 => ({
  opacity: a0
});
function DialogComponent_div_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function DialogComponent_div_7_Template_div_click_0_listener() {
      const item_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r1).$implicit;
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r2.clickItem(item_r2.id, item_r2.isDisabled ? item_r2.isDisabled : false));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const item_r2 = ctx.$implicit;
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction1"](3, _c1, ctx_r2.selectItemId === item_r2.id))("ngStyle", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction1"](5, _c2, item_r2.isDisabled ? "0.5" : "1"));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", item_r2.name, " ");
  }
}
class DialogComponent {
  constructor() {
    // dialog 標題
    this.dialogTitle = "";
    //隱藏 彈跳視窗
    this.isHiddenDialog = false;
    //顯示選擇項目
    this.itemList = [];
    //被選擇項目
    this.selectItemId = "";
    //被選擇項目, 送出給使用者
    this.selectedItem = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
    //視窗再次關閉
    this.hideDialog = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
  }
  /*
   *  視窗再次關閉
   */
  hiddenDialog() {
    this.isHiddenDialog = true;
    this.hideDialog.emit(this.isHiddenDialog);
  }
  /*
   *  選擇選項, 變換該選項顏色給使用者識別
   */
  clickItem(selectId, isDisabled) {
    if (isDisabled) {
      return;
    }
    this.selectItemId = selectId;
  }
  /*
   *  送出選擇項目, 並隱藏 dialog
   */
  emitSelectItem() {
    this.selectedItem.emit(this.selectItemId);
    this.selectItemId = "";
    this.hiddenDialog();
  }
  static {
    this.ɵfac = function DialogComponent_Factory(t) {
      return new (t || DialogComponent)();
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
      type: DialogComponent,
      selectors: [["app-dialog"]],
      inputs: {
        dialogTitle: "dialogTitle",
        isHiddenDialog: "isHiddenDialog",
        itemList: "itemList"
      },
      outputs: {
        selectedItem: "selectedItem",
        hideDialog: "hideDialog"
      },
      decls: 10,
      vars: 5,
      consts: [[1, "dialog-container", 3, "ngStyle"], [1, "dialog-mask", 3, "click"], [1, "dialog"], [1, "dialog-header"], [1, "title"], [1, "dialog-content"], ["class", "row", 3, "ngClass", "ngStyle", "click", 4, "ngFor", "ngForOf"], [1, "dialog-footer"], ["src", "assets/images/icon/icon_check_ok.png", 1, "img-next", 3, "click"], [1, "row", 3, "click", "ngClass", "ngStyle"]],
      template: function DialogComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0)(1, "div", 1);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function DialogComponent_Template_div_click_1_listener() {
            return ctx.hiddenDialog();
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 2)(3, "div", 3)(4, "div", 4);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "div", 5);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](7, DialogComponent_div_7_Template, 2, 7, "div", 6);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "div", 7)(9, "img", 8);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function DialogComponent_Template_img_click_9_listener() {
            return ctx.emitSelectItem();
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()()();
        }
        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngStyle", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction1"](3, _c0, ctx.isHiddenDialog ? "none" : "flex"));
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", ctx.dialogTitle, " ");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.itemList);
        }
      },
      dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_1__.NgClass, _angular_common__WEBPACK_IMPORTED_MODULE_1__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_1__.NgStyle],
      styles: ["@charset \"UTF-8\";\n.dialog-container[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  display: flex;\n  justify-content: center;\n  z-index: 91;\n}\n.dialog-container[_ngcontent-%COMP%]   *[_ngcontent-%COMP%]::-webkit-scrollbar {\n  height: 5px;\n  width: 10px;\n}\n.dialog-container[_ngcontent-%COMP%]   *[_ngcontent-%COMP%]::-webkit-scrollbar-track {\n  background-color: transparent;\n}\n.dialog-container[_ngcontent-%COMP%]   *[_ngcontent-%COMP%]::-webkit-scrollbar-thumb {\n  background-color: #661983;\n  border-radius: 10px; \n\n}\n\n.dialog-mask[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  position: fixed;\n  top: 0;\n  left: 0;\n  background: gray;\n  opacity: 0.5;\n}\n\n.dialog[_ngcontent-%COMP%] {\n  background: white;\n  width: 300px;\n  height: 400px;\n  position: fixed;\n  top: 10%;\n  opacity: 1;\n  border-radius: 10px;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  padding: 15px;\n  color: #661983;\n}\n.dialog[_ngcontent-%COMP%]   .dialog-header[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n}\n.dialog[_ngcontent-%COMP%]   .dialog-header[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%] {\n  padding: 10px;\n  font-size: 25px;\n}\n.dialog[_ngcontent-%COMP%]   .dialog-content[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  justify-content: flex-start;\n  align-items: center;\n  overflow: scroll;\n  height: 100%;\n  width: 85%;\n  padding: 0 15px;\n}\n.dialog[_ngcontent-%COMP%]   .dialog-content[_ngcontent-%COMP%]   .row[_ngcontent-%COMP%] {\n  width: 70%;\n  background: #FBE0FF;\n  padding: 10px 30px;\n  border-radius: 100px;\n  margin-bottom: 10px;\n  font-size: 20px;\n  word-break: break-all;\n}\n.dialog[_ngcontent-%COMP%]   .dialog-content[_ngcontent-%COMP%]   .row-click[_ngcontent-%COMP%] {\n  color: #FBE0FF;\n  background: #661983;\n}\n.dialog[_ngcontent-%COMP%]   .dialog-footer[_ngcontent-%COMP%] {\n  padding: 10px;\n}\n.dialog[_ngcontent-%COMP%]   .dialog-footer[_ngcontent-%COMP%]   .img-next[_ngcontent-%COMP%] {\n  width: 40px;\n  height: 40px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRpYWxvZy5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxnQkFBZ0I7QUFHaEI7RUFDSSxXQUFBO0VBQ0EsWUFBQTtFQUNBLGFBQUE7RUFDQSx1QkFBQTtFQUNBLFdBQUE7QUFESjtBQUlJO0VBQ0ksV0FBQTtFQUNBLFdBQUE7QUFGUjtBQUlJO0VBQ0ksNkJBQUE7QUFGUjtBQUlJO0VBQ0kseUJBQUE7RUFDQSxtQkFBQSxFQUFBLFNBQUE7QUFGUjs7QUFNQTtFQUNJLFdBQUE7RUFDQSxZQUFBO0VBQ0EsZUFBQTtFQUNBLE1BQUE7RUFDQSxPQUFBO0VBQ0EsZ0JBQUE7RUFDQSxZQUFBO0FBSEo7O0FBTUE7RUFDSSxpQkFBQTtFQUNBLFlBQUE7RUFDQSxhQUFBO0VBQ0EsZUFBQTtFQUNBLFFBQUE7RUFFQSxVQUFBO0VBQ0EsbUJBQUE7RUFDQSxhQUFBO0VBQ0Esc0JBQUE7RUFDQSx1QkFBQTtFQUNBLG1CQUFBO0VBQ0EsYUFBQTtFQUNBLGNBQUE7QUFKSjtBQU1JO0VBQ0ksYUFBQTtFQUNBLHNCQUFBO0VBQ0EsdUJBQUE7RUFDQSxtQkFBQTtBQUpSO0FBS1E7RUFDSSxhQUFBO0VBQ0EsZUFBQTtBQUhaO0FBT0k7RUFDSSxhQUFBO0VBQ0Esc0JBQUE7RUFDQSwyQkFBQTtFQUNBLG1CQUFBO0VBQ0EsZ0JBQUE7RUFDQSxZQUFBO0VBQ0EsVUFBQTtFQUNBLGVBQUE7QUFMUjtBQU1RO0VBQ0ksVUFBQTtFQUNBLG1CQUFBO0VBQ0Esa0JBQUE7RUFDQSxvQkFBQTtFQUNBLG1CQUFBO0VBQ0EsZUFBQTtFQUNBLHFCQUFBO0FBSlo7QUFNUTtFQUNJLGNBQUE7RUFDQSxtQkFBQTtBQUpaO0FBUUk7RUFDSSxhQUFBO0FBTlI7QUFPUTtFQUNJLFdBQUE7RUFDQSxZQUFBO0FBTFoiLCJmaWxlIjoiZGlhbG9nLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcblxyXG5cclxuLmRpYWxvZy1jb250YWluZXIge1xyXG4gICAgd2lkdGg6IDEwMCU7XHJcbiAgICBoZWlnaHQ6IDEwMCU7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7ICAgIFxyXG4gICAgei1pbmRleDogOTE7XHJcblxyXG5cclxuICAgICo6Oi13ZWJraXQtc2Nyb2xsYmFye1xyXG4gICAgICAgIGhlaWdodDogNXB4O1xyXG4gICAgICAgIHdpZHRoOiAxMHB4O1xyXG4gICAgfVxyXG4gICAgKjo6LXdlYmtpdC1zY3JvbGxiYXItdHJhY2t7XHJcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XHJcbiAgICB9XHJcbiAgICAqOjotd2Via2l0LXNjcm9sbGJhci10aHVtYiB7XHJcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogIzY2MTk4MztcclxuICAgICAgICBib3JkZXItcmFkaXVzOiAxMHB4OyAvKiDoqK3lrprlnJPop5IgKi9cclxuICAgIH1cclxufVxyXG5cclxuLmRpYWxvZy1tYXNrIHtcclxuICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgaGVpZ2h0OiAxMDAlO1xyXG4gICAgcG9zaXRpb246IGZpeGVkO1xyXG4gICAgdG9wOiAwO1xyXG4gICAgbGVmdDogMDtcclxuICAgIGJhY2tncm91bmQ6IGdyYXk7XHJcbiAgICBvcGFjaXR5OjAuNTtcclxufVxyXG5cclxuLmRpYWxvZyB7XHJcbiAgICBiYWNrZ3JvdW5kOiB3aGl0ZTtcclxuICAgIHdpZHRoOiAzMDBweDtcclxuICAgIGhlaWdodDogNDAwcHg7XHJcbiAgICBwb3NpdGlvbjogZml4ZWQ7XHJcbiAgICB0b3A6IDEwJTtcclxuXHJcbiAgICBvcGFjaXR5OjEuMDtcclxuICAgIGJvcmRlci1yYWRpdXM6IDEwcHg7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAgIHBhZGRpbmc6IDE1cHg7XHJcbiAgICBjb2xvcjogIzY2MTk4MztcclxuXHJcbiAgICAuZGlhbG9nLWhlYWRlciB7XHJcbiAgICAgICAgZGlzcGxheTogZmxleDtcclxuICAgICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gICAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG4gICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgICAgICAgLnRpdGxlIHtcclxuICAgICAgICAgICAgcGFkZGluZzogMTBweDtcclxuICAgICAgICAgICAgZm9udC1zaXplOiAyNXB4O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAuZGlhbG9nLWNvbnRlbnQge1xyXG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtc3RhcnQ7XHJcbiAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAgICAgICBvdmVyZmxvdzogc2Nyb2xsO1xyXG4gICAgICAgIGhlaWdodDogMTAwJTtcclxuICAgICAgICB3aWR0aDogODUlO1xyXG4gICAgICAgIHBhZGRpbmc6IDAgMTVweDtcclxuICAgICAgICAucm93IHtcclxuICAgICAgICAgICAgd2lkdGg6IDcwJTtcclxuICAgICAgICAgICAgYmFja2dyb3VuZDogI0ZCRTBGRjtcclxuICAgICAgICAgICAgcGFkZGluZzogMTBweCAzMHB4O1xyXG4gICAgICAgICAgICBib3JkZXItcmFkaXVzOiAxMDBweDtcclxuICAgICAgICAgICAgbWFyZ2luLWJvdHRvbTogMTBweDtcclxuICAgICAgICAgICAgZm9udC1zaXplOiAyMHB4O1xyXG4gICAgICAgICAgICB3b3JkLWJyZWFrOiBicmVhay1hbGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC5yb3ctY2xpY2sge1xyXG4gICAgICAgICAgICBjb2xvcjogI0ZCRTBGRjtcclxuICAgICAgICAgICAgYmFja2dyb3VuZDogIzY2MTk4MztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLmRpYWxvZy1mb290ZXIge1xyXG4gICAgICAgIHBhZGRpbmc6IDEwcHg7XHJcbiAgICAgICAgLmltZy1uZXh0IHtcclxuICAgICAgICAgICAgd2lkdGg6IDQwcHg7XHJcbiAgICAgICAgICAgIGhlaWdodDogNDBweDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIl19 */\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvY29tbW9uL2RpYWxvZy9jb21wb25lbnRzL2RpYWxvZy9kaWFsb2cuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsZ0JBQWdCO0FBR2hCO0VBQ0ksV0FBQTtFQUNBLFlBQUE7RUFDQSxhQUFBO0VBQ0EsdUJBQUE7RUFDQSxXQUFBO0FBREo7QUFJSTtFQUNJLFdBQUE7RUFDQSxXQUFBO0FBRlI7QUFJSTtFQUNJLDZCQUFBO0FBRlI7QUFJSTtFQUNJLHlCQUFBO0VBQ0EsbUJBQUEsRUFBQSxTQUFBO0FBRlI7O0FBTUE7RUFDSSxXQUFBO0VBQ0EsWUFBQTtFQUNBLGVBQUE7RUFDQSxNQUFBO0VBQ0EsT0FBQTtFQUNBLGdCQUFBO0VBQ0EsWUFBQTtBQUhKOztBQU1BO0VBQ0ksaUJBQUE7RUFDQSxZQUFBO0VBQ0EsYUFBQTtFQUNBLGVBQUE7RUFDQSxRQUFBO0VBRUEsVUFBQTtFQUNBLG1CQUFBO0VBQ0EsYUFBQTtFQUNBLHNCQUFBO0VBQ0EsdUJBQUE7RUFDQSxtQkFBQTtFQUNBLGFBQUE7RUFDQSxjQUFBO0FBSko7QUFNSTtFQUNJLGFBQUE7RUFDQSxzQkFBQTtFQUNBLHVCQUFBO0VBQ0EsbUJBQUE7QUFKUjtBQUtRO0VBQ0ksYUFBQTtFQUNBLGVBQUE7QUFIWjtBQU9JO0VBQ0ksYUFBQTtFQUNBLHNCQUFBO0VBQ0EsMkJBQUE7RUFDQSxtQkFBQTtFQUNBLGdCQUFBO0VBQ0EsWUFBQTtFQUNBLFVBQUE7RUFDQSxlQUFBO0FBTFI7QUFNUTtFQUNJLFVBQUE7RUFDQSxtQkFBQTtFQUNBLGtCQUFBO0VBQ0Esb0JBQUE7RUFDQSxtQkFBQTtFQUNBLGVBQUE7RUFDQSxxQkFBQTtBQUpaO0FBTVE7RUFDSSxjQUFBO0VBQ0EsbUJBQUE7QUFKWjtBQVFJO0VBQ0ksYUFBQTtBQU5SO0FBT1E7RUFDSSxXQUFBO0VBQ0EsWUFBQTtBQUxaO0FBQ0EsbzJIQUFvMkgiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuXHJcblxyXG4uZGlhbG9nLWNvbnRhaW5lciB7XHJcbiAgICB3aWR0aDogMTAwJTtcclxuICAgIGhlaWdodDogMTAwJTtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjsgICAgXHJcbiAgICB6LWluZGV4OiA5MTtcclxuXHJcblxyXG4gICAgKjo6LXdlYmtpdC1zY3JvbGxiYXJ7XHJcbiAgICAgICAgaGVpZ2h0OiA1cHg7XHJcbiAgICAgICAgd2lkdGg6IDEwcHg7XHJcbiAgICB9XHJcbiAgICAqOjotd2Via2l0LXNjcm9sbGJhci10cmFja3tcclxuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcclxuICAgIH1cclxuICAgICo6Oi13ZWJraXQtc2Nyb2xsYmFyLXRodW1iIHtcclxuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjNjYxOTgzO1xyXG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDEwcHg7IC8qIMOowqjCrcOlwq7CmsOlwpzCk8OowqfCkiAqL1xyXG4gICAgfVxyXG59XHJcblxyXG4uZGlhbG9nLW1hc2sge1xyXG4gICAgd2lkdGg6IDEwMCU7XHJcbiAgICBoZWlnaHQ6IDEwMCU7XHJcbiAgICBwb3NpdGlvbjogZml4ZWQ7XHJcbiAgICB0b3A6IDA7XHJcbiAgICBsZWZ0OiAwO1xyXG4gICAgYmFja2dyb3VuZDogZ3JheTtcclxuICAgIG9wYWNpdHk6MC41O1xyXG59XHJcblxyXG4uZGlhbG9nIHtcclxuICAgIGJhY2tncm91bmQ6IHdoaXRlO1xyXG4gICAgd2lkdGg6IDMwMHB4O1xyXG4gICAgaGVpZ2h0OiA0MDBweDtcclxuICAgIHBvc2l0aW9uOiBmaXhlZDtcclxuICAgIHRvcDogMTAlO1xyXG5cclxuICAgIG9wYWNpdHk6MS4wO1xyXG4gICAgYm9yZGVyLXJhZGl1czogMTBweDtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gICAgcGFkZGluZzogMTVweDtcclxuICAgIGNvbG9yOiAjNjYxOTgzO1xyXG5cclxuICAgIC5kaWFsb2ctaGVhZGVyIHtcclxuICAgICAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAgICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbiAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAgICAgICAudGl0bGUge1xyXG4gICAgICAgICAgICBwYWRkaW5nOiAxMHB4O1xyXG4gICAgICAgICAgICBmb250LXNpemU6IDI1cHg7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC5kaWFsb2ctY29udGVudCB7XHJcbiAgICAgICAgZGlzcGxheTogZmxleDtcclxuICAgICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gICAgICAgIGp1c3RpZnktY29udGVudDogZmxleC1zdGFydDtcclxuICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gICAgICAgIG92ZXJmbG93OiBzY3JvbGw7XHJcbiAgICAgICAgaGVpZ2h0OiAxMDAlO1xyXG4gICAgICAgIHdpZHRoOiA4NSU7XHJcbiAgICAgICAgcGFkZGluZzogMCAxNXB4O1xyXG4gICAgICAgIC5yb3cge1xyXG4gICAgICAgICAgICB3aWR0aDogNzAlO1xyXG4gICAgICAgICAgICBiYWNrZ3JvdW5kOiAjRkJFMEZGO1xyXG4gICAgICAgICAgICBwYWRkaW5nOiAxMHB4IDMwcHg7XHJcbiAgICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDEwMHB4O1xyXG4gICAgICAgICAgICBtYXJnaW4tYm90dG9tOiAxMHB4O1xyXG4gICAgICAgICAgICBmb250LXNpemU6IDIwcHg7XHJcbiAgICAgICAgICAgIHdvcmQtYnJlYWs6IGJyZWFrLWFsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgLnJvdy1jbGljayB7XHJcbiAgICAgICAgICAgIGNvbG9yOiAjRkJFMEZGO1xyXG4gICAgICAgICAgICBiYWNrZ3JvdW5kOiAjNjYxOTgzO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAuZGlhbG9nLWZvb3RlciB7XHJcbiAgICAgICAgcGFkZGluZzogMTBweDtcclxuICAgICAgICAuaW1nLW5leHQge1xyXG4gICAgICAgICAgICB3aWR0aDogNDBweDtcclxuICAgICAgICAgICAgaGVpZ2h0OiA0MHB4O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iXSwic291cmNlUm9vdCI6IiJ9 */"]
    });
  }
}

/***/ }),

/***/ 5391:
/*!*****************************************************************!*\
  !*** ./src/app/common/export-import/services/export.service.ts ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ExportService: () => (/* binding */ ExportService)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 7580);

class ExportService {
  constructor() {}
  // 轉換 JSON 為 CSV 字串（跳過巢狀欄位）
  convertToCSV(jsonArray) {
    if (!jsonArray || jsonArray.length === 0) return '';
    const headers = Object.keys(jsonArray[0]).filter(key => typeof jsonArray[0][key] !== 'object');
    const csvRows = jsonArray.map(row => headers.map(field => `"${String(row[field] || '').replace(/"/g, '""')}"`).join(','));
    return [headers.join(','), ...csvRows].join('\n');
  }
  // 下載 CSV 檔案（UTF-8）
  downloadCSV(data, filename = 'export.csv') {
    const BOM = '\uFEFF'; // UTF-8 BOM 避免中文亂碼
    const blob = new Blob([BOM + data], {
      type: 'text/csv;charset=utf-8;'
    });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  static {
    this.ɵfac = function ExportService_Factory(t) {
      return new (t || ExportService)();
    };
  }
  static {
    this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({
      token: ExportService,
      factory: ExportService.ɵfac,
      providedIn: 'root'
    });
  }
}

/***/ }),

/***/ 5173:
/*!*********************************************************************!*\
  !*** ./src/app/common/header/components/header/header.component.ts ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   HeaderComponent: () => (/* binding */ HeaderComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _auth_route_services_route_url_record_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../auth-route/services/route-url-record.service */ 7228);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ 316);



const _c0 = ["header"];
const _c1 = a0 => ({
  height: a0
});
function HeaderComponent_img_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](0, "img", 6);
  }
}
function HeaderComponent_ng_template_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](0, "img", 7);
  }
}
function HeaderComponent_div_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 8)(1, "img", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function HeaderComponent_div_7_Template_img_click_1_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r1);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r1.backPage());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "img", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function HeaderComponent_div_7_Template_img_click_2_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r1);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r1.nextPage("/account"));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
  }
}
class HeaderComponent {
  constructor(routeUrlRecordService) {
    this.routeUrlRecordService = routeUrlRecordService;
    // header 標題
    this.headerTitle = "";
    // 是否為主畫面 header底圖
    this.isMainHeader = true;
    // 上一頁 是否指定其他路徑
    this.otherBackUrl = "";
    // 是否隱藏上一頁 icon
    this.isShowIcon = false;
    // header填充pedding 高度
    this.headerPeddingHeigh = '200px';
    this.routeUrlRecordService.routerUrlChangeEmit.subscribe(nextUrl => {
      // [下一頁] 導向路由時觸發
      this.setHeaderImg(nextUrl);
      this.setHeaderTitle(nextUrl);
      this.isShowIcon = nextUrl.replace("/", "") !== "";
    });
  }
  ngOnInit() {
    this.setHeaderImg(this.routeUrlRecordService.getCurrentUrl());
  }
  /*
   * 設定判斷 該 header 底圖
   */
  setHeaderImg(checkUrl) {
    this.isShowIcon = checkUrl.replace("/", "") !== "";
    //[下一頁] 依照當前路徑切換參數
    if (checkUrl === "/home" || checkUrl === "/" || !checkUrl) {
      this.isMainHeader = true;
    } else {
      this.isMainHeader = false;
    }
    //判斷 header 填充物 高度
    if (window.innerWidth > 1100) {
      this.headerPeddingHeigh = this.isMainHeader ? '200px' : '100px';
    } else if (500 <= window.innerWidth && window.innerWidth <= 1100) {
      this.headerPeddingHeigh = this.isMainHeader ? '200px' : '100px';
    } else {
      this.headerPeddingHeigh = this.isMainHeader ? '160px' : '100px';
    }
  }
  /*
   * 藉由 下一頁 路由 url 判斷該 header 標題
   */
  setHeaderTitle(nextUrl) {
    if (!nextUrl) {
      this.headerTitle = "";
    } else if (nextUrl.includes("review-booking")) {
      this.headerTitle = "已預約";
    } else if (nextUrl.includes("booking-")) {
      this.headerTitle = "預約空間";
    } else if (nextUrl.includes("review-room")) {
      this.headerTitle = "空間總覽";
    } else if (nextUrl.includes("pay-")) {
      this.headerTitle = "購買方案";
    } else if (nextUrl.includes("manager-room")) {
      this.headerTitle = "空間管理";
    } else if (nextUrl.includes("manager-sys")) {
      this.headerTitle = "系統管理";
    } else {
      this.headerTitle = "";
    }
  }
  /*
   * 上一頁
   */
  backPage() {
    this.setHeaderImg(this.routeUrlRecordService.getPreviousUrl());
    this.setHeaderTitle(this.routeUrlRecordService.getPreviousUrl());
    this.routeUrlRecordService.backPage();
  }
  /*
   * 進入功能頁面
   */
  nextPage(nextUrl) {
    this.routeUrlRecordService.nextPage(nextUrl, {});
  }
  static {
    this.ɵfac = function HeaderComponent_Factory(t) {
      return new (t || HeaderComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_auth_route_services_route_url_record_service__WEBPACK_IMPORTED_MODULE_0__.RouteUrlRecordService));
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
      type: HeaderComponent,
      selectors: [["app-header"]],
      viewQuery: function HeaderComponent_Query(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵviewQuery"](_c0, 5);
        }
        if (rf & 2) {
          let _t;
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵloadQuery"]()) && (ctx.headerElementRef = _t.first);
        }
      },
      decls: 9,
      vars: 7,
      consts: [["header", ""], ["notMainHeader", ""], ["class", "img-header-main", 4, "ngIf", "ngIfElse"], [1, "header-title"], ["class", "icon-bar", 4, "ngIf"], [3, "ngStyle"], [1, "img-header-main"], [1, "img-header"], [1, "icon-bar"], ["src", "assets/images/icon/icon_back.png", 1, "iconBtn", 3, "click"], ["src", "assets/images/icon/icon_user.png", 1, "iconBtn", 3, "click"]],
      template: function HeaderComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "header", null, 0);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](2, HeaderComponent_img_2_Template, 1, 0, "img", 2)(3, HeaderComponent_ng_template_3_Template, 1, 0, "ng-template", null, 1, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplateRefExtractor"]);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "div", 3);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](6);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](7, HeaderComponent_div_7_Template, 3, 0, "div", 4);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](8, "div", 5);
        }
        if (rf & 2) {
          const notMainHeader_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵreference"](4);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.isMainHeader)("ngIfElse", notMainHeader_r3);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx.headerTitle);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.isShowIcon);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngStyle", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction1"](5, _c1, ctx.headerPeddingHeigh));
        }
      },
      dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_2__.NgIf, _angular_common__WEBPACK_IMPORTED_MODULE_2__.NgStyle],
      styles: ["header[_ngcontent-%COMP%] {\n  width: 110%;\n  position: fixed;\n  top: -4px;\n  left: -1px;\n  z-index: 10;\n}\nheader[_ngcontent-%COMP%]   .img-header[_ngcontent-%COMP%] {\n  width: 105%;\n}\nheader[_ngcontent-%COMP%]   .icon-bar[_ngcontent-%COMP%] {\n  position: fixed;\n  display: flex;\n  flex-direction: row;\n  justify-content: start;\n  align-items: center;\n  top: 30px;\n  left: 10px;\n}\nheader[_ngcontent-%COMP%]   .icon-bar[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: 40px;\n  margin: 10px;\n}\nheader[_ngcontent-%COMP%]   .header-title[_ngcontent-%COMP%] {\n  font-size: 25px;\n  width: 100%;\n  color: #FBE0FF;\n  position: fixed;\n  top: 20px;\n  left: 10px;\n  text-align: center;\n}\n\n.padding-box[_ngcontent-%COMP%] {\n  background: white;\n}\n\n@media (min-width: 1100px) {\n  .img-header-main[_ngcontent-%COMP%] {\n    content: url('2000px.png');\n  }\n}\n@media (min-width: 500px) and (max-width: 1100px) {\n  .img-header-main[_ngcontent-%COMP%] {\n    content: url('1000px.png');\n  }\n}\n@media (max-width: 500px) {\n  .img-header-main[_ngcontent-%COMP%] {\n    content: url('400px.png');\n  }\n}\n@media (min-width: 1100px) {\n  .img-header[_ngcontent-%COMP%] {\n    content: url('_-_-_-_-_-assets-images-header-secondary-2000px.png');\n  }\n}\n@media (min-width: 500px) and (max-width: 1100px) {\n  .img-header[_ngcontent-%COMP%] {\n    content: url('_-_-_-_-_-assets-images-header-secondary-1000px.png');\n  }\n}\n@media (max-width: 500px) {\n  .img-header[_ngcontent-%COMP%] {\n    content: url('_-_-_-_-_-assets-images-header-secondary-400px.png');\n  }\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImhlYWRlci5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLFdBQUE7RUFDQSxlQUFBO0VBQ0EsU0FBQTtFQUNBLFVBQUE7RUFDQSxXQUFBO0FBQ0o7QUFDSTtFQUNJLFdBQUE7QUFDUjtBQUVJO0VBQ0ksZUFBQTtFQUNBLGFBQUE7RUFDQSxtQkFBQTtFQUNBLHNCQUFBO0VBQ0EsbUJBQUE7RUFDQSxTQUFBO0VBQ0EsVUFBQTtBQUFSO0FBQ1E7RUFDSSxXQUFBO0VBQ0EsWUFBQTtBQUNaO0FBR0k7RUFDSSxlQUFBO0VBQ0EsV0FBQTtFQUNBLGNBQUE7RUFDQSxlQUFBO0VBQ0EsU0FBQTtFQUNBLFVBQUE7RUFDQSxrQkFBQTtBQURSOztBQU1BO0VBQ0ksaUJBQUE7QUFISjs7QUFRQTtFQUNJO0lBQ0ksMEJBQUE7RUFMTjtBQUNGO0FBT0E7RUFDSTtJQUNJLDBCQUFBO0VBTE47QUFDRjtBQU9BO0VBQ0k7SUFDSSx5QkFBQTtFQUxOO0FBQ0Y7QUFRQTtFQUNJO0lBQ0ksbUVBQUE7RUFOTjtBQUNGO0FBUUE7RUFDSTtJQUNJLG1FQUFBO0VBTk47QUFDRjtBQVFBO0VBQ0k7SUFDSSxrRUFBQTtFQU5OO0FBQ0YiLCJmaWxlIjoiaGVhZGVyLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiaGVhZGVyIHtcclxuICAgIHdpZHRoOiAxMTAlOyAvL+iDjOaZr+Whq+a7v1xyXG4gICAgcG9zaXRpb246IGZpeGVkO1xyXG4gICAgdG9wOiAtNHB4O1xyXG4gICAgbGVmdDogLTFweDtcclxuICAgIHotaW5kZXg6IDEwO1xyXG5cclxuICAgIC5pbWctaGVhZGVyIHtcclxuICAgICAgICB3aWR0aDogMTA1JTsgLy/og4zmma/loavmu78gXHJcbiAgICB9XHJcbiAgICBcclxuICAgIC5pY29uLWJhciB7XHJcbiAgICAgICAgcG9zaXRpb246IGZpeGVkO1xyXG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICAgICAgZmxleC1kaXJlY3Rpb246IHJvdztcclxuICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IHN0YXJ0O1xyXG4gICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgICAgICAgdG9wOiAzMHB4O1xyXG4gICAgICAgIGxlZnQ6IDEwcHg7XHJcbiAgICAgICAgaW1nIHtcclxuICAgICAgICAgICAgd2lkdGg6IDQwcHg7XHJcbiAgICAgICAgICAgIG1hcmdpbjogMTBweDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLmhlYWRlci10aXRsZSB7XHJcbiAgICAgICAgZm9udC1zaXplOiAyNXB4O1xyXG4gICAgICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgICAgIGNvbG9yOiAjRkJFMEZGO1xyXG4gICAgICAgIHBvc2l0aW9uOiBmaXhlZDtcclxuICAgICAgICB0b3A6IDIwcHg7XHJcbiAgICAgICAgbGVmdDogMTBweDtcclxuICAgICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG4ucGFkZGluZy1ib3gge1xyXG4gICAgYmFja2dyb3VuZDogd2hpdGU7XHJcbn1cclxuXHJcblxyXG5cclxuQG1lZGlhIChtaW4td2lkdGg6IDExMDBweCkge1xyXG4gICAgLmltZy1oZWFkZXItbWFpbiB7XHJcbiAgICAgICAgY29udGVudDogdXJsKFwifnNyYy9hc3NldHMvaW1hZ2VzL2hlYWRlci9tYWluLzIwMDBweC5wbmdcIik7XHJcbiAgICB9XHJcbn1cclxuQG1lZGlhIChtaW4td2lkdGg6IDUwMHB4KSBhbmQgKG1heC13aWR0aDogMTEwMHB4KSB7XHJcbiAgICAuaW1nLWhlYWRlci1tYWluIHtcclxuICAgICAgICBjb250ZW50OiB1cmwoJ35zcmMvYXNzZXRzL2ltYWdlcy9oZWFkZXIvbWFpbi8xMDAwcHgucG5nJyk7XHJcbiAgICB9XHJcbn1cclxuQG1lZGlhIChtYXgtd2lkdGg6IDUwMHB4KSB7XHJcbiAgICAuaW1nLWhlYWRlci1tYWluIHtcclxuICAgICAgICBjb250ZW50OiB1cmwoXCJ+c3JjL2Fzc2V0cy9pbWFnZXMvaGVhZGVyL21haW4vNDAwcHgucG5nXCIpO1xyXG4gICAgfVxyXG59XHJcblxyXG5AbWVkaWEgKG1pbi13aWR0aDogMTEwMHB4KSB7XHJcbiAgICAuaW1nLWhlYWRlciB7XHJcbiAgICAgICAgY29udGVudDogdXJsKFwifnNyYy9hc3NldHMvaW1hZ2VzL2hlYWRlci9zZWNvbmRhcnkvMjAwMHB4LnBuZ1wiKTtcclxuICAgIH1cclxufVxyXG5AbWVkaWEgKG1pbi13aWR0aDogNTAwcHgpIGFuZCAobWF4LXdpZHRoOiAxMTAwcHgpIHtcclxuICAgIC5pbWctaGVhZGVyIHtcclxuICAgICAgICBjb250ZW50OiB1cmwoXCJ+c3JjL2Fzc2V0cy9pbWFnZXMvaGVhZGVyL3NlY29uZGFyeS8xMDAwcHgucG5nXCIpO1xyXG4gICAgfVxyXG59XHJcbkBtZWRpYSAobWF4LXdpZHRoOiA1MDBweCkge1xyXG4gICAgLmltZy1oZWFkZXIge1xyXG4gICAgICAgIGNvbnRlbnQ6IHVybCgnfnNyYy9hc3NldHMvaW1hZ2VzL2hlYWRlci9zZWNvbmRhcnkvNDAwcHgucG5nJyk7XHJcbiAgICB9XHJcbn1cclxuIl19 */\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvY29tbW9uL2hlYWRlci9jb21wb25lbnRzL2hlYWRlci9oZWFkZXIuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSxXQUFBO0VBQ0EsZUFBQTtFQUNBLFNBQUE7RUFDQSxVQUFBO0VBQ0EsV0FBQTtBQUNKO0FBQ0k7RUFDSSxXQUFBO0FBQ1I7QUFFSTtFQUNJLGVBQUE7RUFDQSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSxzQkFBQTtFQUNBLG1CQUFBO0VBQ0EsU0FBQTtFQUNBLFVBQUE7QUFBUjtBQUNRO0VBQ0ksV0FBQTtFQUNBLFlBQUE7QUFDWjtBQUdJO0VBQ0ksZUFBQTtFQUNBLFdBQUE7RUFDQSxjQUFBO0VBQ0EsZUFBQTtFQUNBLFNBQUE7RUFDQSxVQUFBO0VBQ0Esa0JBQUE7QUFEUjs7QUFNQTtFQUNJLGlCQUFBO0FBSEo7O0FBUUE7RUFDSTtJQUNJLDBCQUFBO0VBTE47QUFDRjtBQU9BO0VBQ0k7SUFDSSwwQkFBQTtFQUxOO0FBQ0Y7QUFPQTtFQUNJO0lBQ0kseUJBQUE7RUFMTjtBQUNGO0FBUUE7RUFDSTtJQUNJLG1FQUFBO0VBTk47QUFDRjtBQVFBO0VBQ0k7SUFDSSxtRUFBQTtFQU5OO0FBQ0Y7QUFRQTtFQUNJO0lBQ0ksa0VBQUE7RUFOTjtBQUNGO0FBQ0Esd2xHQUF3bEciLCJzb3VyY2VzQ29udGVudCI6WyJoZWFkZXIge1xyXG4gICAgd2lkdGg6IDExMCU7IC8vw6jCg8KMw6bCmcKvw6XCocKrw6bCu8K/XHJcbiAgICBwb3NpdGlvbjogZml4ZWQ7XHJcbiAgICB0b3A6IC00cHg7XHJcbiAgICBsZWZ0OiAtMXB4O1xyXG4gICAgei1pbmRleDogMTA7XHJcblxyXG4gICAgLmltZy1oZWFkZXIge1xyXG4gICAgICAgIHdpZHRoOiAxMDUlOyAvL8OowoPCjMOmwpnCr8OlwqHCq8OmwrvCvyBcclxuICAgIH1cclxuICAgIFxyXG4gICAgLmljb24tYmFyIHtcclxuICAgICAgICBwb3NpdGlvbjogZml4ZWQ7XHJcbiAgICAgICAgZGlzcGxheTogZmxleDtcclxuICAgICAgICBmbGV4LWRpcmVjdGlvbjogcm93O1xyXG4gICAgICAgIGp1c3RpZnktY29udGVudDogc3RhcnQ7XHJcbiAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAgICAgICB0b3A6IDMwcHg7XHJcbiAgICAgICAgbGVmdDogMTBweDtcclxuICAgICAgICBpbWcge1xyXG4gICAgICAgICAgICB3aWR0aDogNDBweDtcclxuICAgICAgICAgICAgbWFyZ2luOiAxMHB4O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAuaGVhZGVyLXRpdGxlIHtcclxuICAgICAgICBmb250LXNpemU6IDI1cHg7XHJcbiAgICAgICAgd2lkdGg6IDEwMCU7XHJcbiAgICAgICAgY29sb3I6ICNGQkUwRkY7XHJcbiAgICAgICAgcG9zaXRpb246IGZpeGVkO1xyXG4gICAgICAgIHRvcDogMjBweDtcclxuICAgICAgICBsZWZ0OiAxMHB4O1xyXG4gICAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICAgIH1cclxufVxyXG5cclxuXHJcbi5wYWRkaW5nLWJveCB7XHJcbiAgICBiYWNrZ3JvdW5kOiB3aGl0ZTtcclxufVxyXG5cclxuXHJcblxyXG5AbWVkaWEgKG1pbi13aWR0aDogMTEwMHB4KSB7XHJcbiAgICAuaW1nLWhlYWRlci1tYWluIHtcclxuICAgICAgICBjb250ZW50OiB1cmwoXCJ+c3JjL2Fzc2V0cy9pbWFnZXMvaGVhZGVyL21haW4vMjAwMHB4LnBuZ1wiKTtcclxuICAgIH1cclxufVxyXG5AbWVkaWEgKG1pbi13aWR0aDogNTAwcHgpIGFuZCAobWF4LXdpZHRoOiAxMTAwcHgpIHtcclxuICAgIC5pbWctaGVhZGVyLW1haW4ge1xyXG4gICAgICAgIGNvbnRlbnQ6IHVybCgnfnNyYy9hc3NldHMvaW1hZ2VzL2hlYWRlci9tYWluLzEwMDBweC5wbmcnKTtcclxuICAgIH1cclxufVxyXG5AbWVkaWEgKG1heC13aWR0aDogNTAwcHgpIHtcclxuICAgIC5pbWctaGVhZGVyLW1haW4ge1xyXG4gICAgICAgIGNvbnRlbnQ6IHVybChcIn5zcmMvYXNzZXRzL2ltYWdlcy9oZWFkZXIvbWFpbi80MDBweC5wbmdcIik7XHJcbiAgICB9XHJcbn1cclxuXHJcbkBtZWRpYSAobWluLXdpZHRoOiAxMTAwcHgpIHtcclxuICAgIC5pbWctaGVhZGVyIHtcclxuICAgICAgICBjb250ZW50OiB1cmwoXCJ+c3JjL2Fzc2V0cy9pbWFnZXMvaGVhZGVyL3NlY29uZGFyeS8yMDAwcHgucG5nXCIpO1xyXG4gICAgfVxyXG59XHJcbkBtZWRpYSAobWluLXdpZHRoOiA1MDBweCkgYW5kIChtYXgtd2lkdGg6IDExMDBweCkge1xyXG4gICAgLmltZy1oZWFkZXIge1xyXG4gICAgICAgIGNvbnRlbnQ6IHVybChcIn5zcmMvYXNzZXRzL2ltYWdlcy9oZWFkZXIvc2Vjb25kYXJ5LzEwMDBweC5wbmdcIik7XHJcbiAgICB9XHJcbn1cclxuQG1lZGlhIChtYXgtd2lkdGg6IDUwMHB4KSB7XHJcbiAgICAuaW1nLWhlYWRlciB7XHJcbiAgICAgICAgY29udGVudDogdXJsKCd+c3JjL2Fzc2V0cy9pbWFnZXMvaGVhZGVyL3NlY29uZGFyeS80MDBweC5wbmcnKTtcclxuICAgIH1cclxufVxyXG4iXSwic291cmNlUm9vdCI6IiJ9 */"]
    });
  }
}

/***/ }),

/***/ 8740:
/*!******************************************************************!*\
  !*** ./src/app/common/input/components/input/input.component.ts ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   InputComponent: () => (/* binding */ InputComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ 316);
/* harmony import */ var _pipe_word_shroten_pipe__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../pipe/word-shroten.pipe */ 9551);




class InputComponent {
  constructor() {
    this.inputTitle = "";
    this.inputTitleLimit = 10;
    this.inputContent = "";
    this.inputContentLimit = 10;
    this.isSelect = false;
    // 該 input 欄位被點選
    this.inputClick = new _angular_core__WEBPACK_IMPORTED_MODULE_1__.EventEmitter();
  }
  clickInput() {
    this.isSelect = !this.isSelect;
    this.inputClick.emit(this.inputTitle);
  }
  static {
    this.ɵfac = function InputComponent_Factory(t) {
      return new (t || InputComponent)();
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
      type: InputComponent,
      selectors: [["app-input"]],
      inputs: {
        inputTitle: "inputTitle",
        inputTitleLimit: "inputTitleLimit",
        inputContent: "inputContent",
        inputContentLimit: "inputContentLimit",
        isSelect: "isSelect"
      },
      outputs: {
        inputClick: "inputClick"
      },
      decls: 7,
      vars: 9,
      consts: [[1, "row", 3, "click"], [1, "row-txt"], [1, "select-item", 3, "ngClass"]],
      template: function InputComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 0);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function InputComponent_Template_div_click_0_listener() {
            return ctx.clickInput();
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "div", 1);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](3, "wordShroten");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "div", 2);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](5);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](6, "wordShroten");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
        }
        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind2"](3, 3, ctx.inputTitle, ctx.inputTitleLimit));
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngClass", ctx.isSelect ? "_selected" : "_not_selected");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind2"](6, 6, ctx.inputContent, ctx.inputContentLimit), " ");
        }
      },
      dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_2__.NgClass, _pipe_word_shroten_pipe__WEBPACK_IMPORTED_MODULE_0__.WordShrotenPipe],
      styles: [".row[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: row;\n  justify-content: flex-start;\n  align-items: center;\n  padding: 10px;\n}\n.row[_ngcontent-%COMP%]   .row-txt[_ngcontent-%COMP%] {\n  color: #661983;\n  margin-right: 30px;\n  font-size: 25px;\n}\n.row[_ngcontent-%COMP%]   .select-item[_ngcontent-%COMP%] {\n  color: #661983;\n  background: #FBE0FF;\n  font-size: 20px;\n  padding: 10px 30px;\n  border-radius: 100px;\n  margin-right: 15px;\n}\n.row[_ngcontent-%COMP%]   ._selected[_ngcontent-%COMP%] {\n  color: #FBE0FF;\n  background: #661983;\n}\n.row[_ngcontent-%COMP%]   ._not_selected[_ngcontent-%COMP%] {\n  color: #661983;\n  background: #FBE0FF;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlucHV0LmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBO0VBQ0ksYUFBQTtFQUNBLG1CQUFBO0VBQ0EsMkJBQUE7RUFDQSxtQkFBQTtFQUNBLGFBQUE7QUFBSjtBQUVJO0VBQ0ksY0FBQTtFQUNBLGtCQUFBO0VBQ0EsZUFBQTtBQUFSO0FBR0k7RUFDSSxjQUFBO0VBQ0EsbUJBQUE7RUFDQSxlQUFBO0VBQ0Esa0JBQUE7RUFDQSxvQkFBQTtFQUNBLGtCQUFBO0FBRFI7QUFJSTtFQUNJLGNBQUE7RUFDQSxtQkFBQTtBQUZSO0FBS0k7RUFDSSxjQUFBO0VBQ0EsbUJBQUE7QUFIUiIsImZpbGUiOiJpbnB1dC5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG4ucm93IHtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBmbGV4LWRpcmVjdGlvbjogcm93O1xyXG4gICAganVzdGlmeS1jb250ZW50OiBmbGV4LXN0YXJ0O1xyXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAgIHBhZGRpbmc6IDEwcHg7XHJcblxyXG4gICAgLnJvdy10eHQge1xyXG4gICAgICAgIGNvbG9yOiAjNjYxOTgzO1xyXG4gICAgICAgIG1hcmdpbi1yaWdodDogMzBweDtcclxuICAgICAgICBmb250LXNpemU6IDI1cHg7XHJcbiAgICB9XHJcblxyXG4gICAgLnNlbGVjdC1pdGVtIHtcclxuICAgICAgICBjb2xvcjogIzY2MTk4MzsgICAgICAgICBcclxuICAgICAgICBiYWNrZ3JvdW5kOiAjRkJFMEZGO1xyXG4gICAgICAgIGZvbnQtc2l6ZTogMjBweDtcclxuICAgICAgICBwYWRkaW5nOiAxMHB4IDMwcHg7XHJcbiAgICAgICAgYm9yZGVyLXJhZGl1czogMTAwcHg7XHJcbiAgICAgICAgbWFyZ2luLXJpZ2h0OiAxNXB4O1xyXG4gICAgfVxyXG5cclxuICAgIC5fc2VsZWN0ZWQge1xyXG4gICAgICAgIGNvbG9yOiAjRkJFMEZGOyAgICAgICAgIFxyXG4gICAgICAgIGJhY2tncm91bmQ6ICM2NjE5ODM7XHJcbiAgICB9XHJcblxyXG4gICAgLl9ub3Rfc2VsZWN0ZWQge1xyXG4gICAgICAgIGNvbG9yOiAjNjYxOTgzOyAgICAgICAgIFxyXG4gICAgICAgIGJhY2tncm91bmQ6ICNGQkUwRkY7XHJcbiAgICB9XHJcbn0iXX0= */\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvY29tbW9uL2lucHV0L2NvbXBvbmVudHMvaW5wdXQvaW5wdXQuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0E7RUFDSSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSwyQkFBQTtFQUNBLG1CQUFBO0VBQ0EsYUFBQTtBQUFKO0FBRUk7RUFDSSxjQUFBO0VBQ0Esa0JBQUE7RUFDQSxlQUFBO0FBQVI7QUFHSTtFQUNJLGNBQUE7RUFDQSxtQkFBQTtFQUNBLGVBQUE7RUFDQSxrQkFBQTtFQUNBLG9CQUFBO0VBQ0Esa0JBQUE7QUFEUjtBQUlJO0VBQ0ksY0FBQTtFQUNBLG1CQUFBO0FBRlI7QUFLSTtFQUNJLGNBQUE7RUFDQSxtQkFBQTtBQUhSO0FBQ0EsZzhDQUFnOEMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuLnJvdyB7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgZmxleC1kaXJlY3Rpb246IHJvdztcclxuICAgIGp1c3RpZnktY29udGVudDogZmxleC1zdGFydDtcclxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgICBwYWRkaW5nOiAxMHB4O1xyXG5cclxuICAgIC5yb3ctdHh0IHtcclxuICAgICAgICBjb2xvcjogIzY2MTk4MztcclxuICAgICAgICBtYXJnaW4tcmlnaHQ6IDMwcHg7XHJcbiAgICAgICAgZm9udC1zaXplOiAyNXB4O1xyXG4gICAgfVxyXG5cclxuICAgIC5zZWxlY3QtaXRlbSB7XHJcbiAgICAgICAgY29sb3I6ICM2NjE5ODM7ICAgICAgICAgXHJcbiAgICAgICAgYmFja2dyb3VuZDogI0ZCRTBGRjtcclxuICAgICAgICBmb250LXNpemU6IDIwcHg7XHJcbiAgICAgICAgcGFkZGluZzogMTBweCAzMHB4O1xyXG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDEwMHB4O1xyXG4gICAgICAgIG1hcmdpbi1yaWdodDogMTVweDtcclxuICAgIH1cclxuXHJcbiAgICAuX3NlbGVjdGVkIHtcclxuICAgICAgICBjb2xvcjogI0ZCRTBGRjsgICAgICAgICBcclxuICAgICAgICBiYWNrZ3JvdW5kOiAjNjYxOTgzO1xyXG4gICAgfVxyXG5cclxuICAgIC5fbm90X3NlbGVjdGVkIHtcclxuICAgICAgICBjb2xvcjogIzY2MTk4MzsgICAgICAgICBcclxuICAgICAgICBiYWNrZ3JvdW5kOiAjRkJFMEZGO1xyXG4gICAgfVxyXG59Il0sInNvdXJjZVJvb3QiOiIifQ== */"]
    });
  }
}

/***/ }),

/***/ 3408:
/*!************************************************************************************!*\
  !*** ./src/app/common/loading/components/loading-basic/loading-basic.component.ts ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LoadingBasicComponent: () => (/* binding */ LoadingBasicComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ 316);


function LoadingBasicComponent_div_0_div_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "div", 4);
  }
}
function LoadingBasicComponent_div_0_div_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "img", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
}
function LoadingBasicComponent_div_0_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, LoadingBasicComponent_div_0_div_1_Template, 1, 0, "div", 2)(2, LoadingBasicComponent_div_0_div_2_Template, 2, 0, "div", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r0.isLoading);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r0.isLoading);
  }
}
class LoadingBasicComponent {
  constructor() {
    this.isLoading = true;
  }
  static {
    this.ɵfac = function LoadingBasicComponent_Factory(t) {
      return new (t || LoadingBasicComponent)();
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
      type: LoadingBasicComponent,
      selectors: [["app-loading-basic"]],
      inputs: {
        isLoading: "isLoading"
      },
      decls: 1,
      vars: 1,
      consts: [["class", "loading-container", 4, "ngIf"], [1, "loading-container"], ["class", "loading-mask", 4, "ngIf"], ["class", "loading-gif", 4, "ngIf"], [1, "loading-mask"], [1, "loading-gif"], ["src", "assets/images/icon/icon_loading.gif", 2, "width", "50px"]],
      template: function LoadingBasicComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](0, LoadingBasicComponent_div_0_Template, 3, 2, "div", 0);
        }
        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.isLoading);
        }
      },
      dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_1__.NgIf],
      styles: [".loading-container[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  display: flex;\n  justify-content: center;\n  z-index: 91;\n}\n\n.loading-mask[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  position: fixed;\n  top: 0;\n  background: gray;\n  opacity: 0.5;\n}\n\n.loading-gif[_ngcontent-%COMP%] {\n  z-index: 91;\n  opacity: 0.5;\n  position: fixed;\n  top: 10%;\n  height: 100%;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxvYWRpbmctYmFzaWMuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0E7RUFDSSxXQUFBO0VBQ0EsWUFBQTtFQUNBLGFBQUE7RUFDQSx1QkFBQTtFQUNBLFdBQUE7QUFBSjs7QUFJQTtFQUNJLFdBQUE7RUFDQSxZQUFBO0VBQ0EsZUFBQTtFQUNBLE1BQUE7RUFDQSxnQkFBQTtFQUNBLFlBQUE7QUFESjs7QUFJQTtFQUNJLFdBQUE7RUFDQSxZQUFBO0VBQ0EsZUFBQTtFQUNBLFFBQUE7RUFDQSxZQUFBO0VBRUEsYUFBQTtFQUNBLHNCQUFBO0VBQ0EsdUJBQUE7RUFDQSxtQkFBQTtBQUZKIiwiZmlsZSI6ImxvYWRpbmctYmFzaWMuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuLmxvYWRpbmctY29udGFpbmVyIHtcclxuICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgaGVpZ2h0OiAxMDAlO1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyOyAgICBcclxuICAgIHotaW5kZXg6IDkxO1xyXG4gICAgLy9hbGlnbi1pdGVtczogY2VudGVyO1xyXG59XHJcblxyXG4ubG9hZGluZy1tYXNrIHtcclxuICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgaGVpZ2h0OiAxMDAlO1xyXG4gICAgcG9zaXRpb246IGZpeGVkO1xyXG4gICAgdG9wOiAwO1xyXG4gICAgYmFja2dyb3VuZDogZ3JheTtcclxuICAgIG9wYWNpdHk6MC41O1xyXG59XHJcblxyXG4ubG9hZGluZy1naWYge1xyXG4gICAgei1pbmRleDogOTE7XHJcbiAgICBvcGFjaXR5OjAuNTtcclxuICAgIHBvc2l0aW9uOiBmaXhlZDtcclxuICAgIHRvcDogMTAlO1xyXG4gICAgaGVpZ2h0OiAxMDAlO1xyXG5cclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG59XHJcblxyXG5cclxuIl19 */\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvY29tbW9uL2xvYWRpbmcvY29tcG9uZW50cy9sb2FkaW5nLWJhc2ljL2xvYWRpbmctYmFzaWMuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0E7RUFDSSxXQUFBO0VBQ0EsWUFBQTtFQUNBLGFBQUE7RUFDQSx1QkFBQTtFQUNBLFdBQUE7QUFBSjs7QUFJQTtFQUNJLFdBQUE7RUFDQSxZQUFBO0VBQ0EsZUFBQTtFQUNBLE1BQUE7RUFDQSxnQkFBQTtFQUNBLFlBQUE7QUFESjs7QUFJQTtFQUNJLFdBQUE7RUFDQSxZQUFBO0VBQ0EsZUFBQTtFQUNBLFFBQUE7RUFDQSxZQUFBO0VBRUEsYUFBQTtFQUNBLHNCQUFBO0VBQ0EsdUJBQUE7RUFDQSxtQkFBQTtBQUZKO0FBQ0EsNHpDQUE0ekMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuLmxvYWRpbmctY29udGFpbmVyIHtcclxuICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgaGVpZ2h0OiAxMDAlO1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyOyAgICBcclxuICAgIHotaW5kZXg6IDkxO1xyXG4gICAgLy9hbGlnbi1pdGVtczogY2VudGVyO1xyXG59XHJcblxyXG4ubG9hZGluZy1tYXNrIHtcclxuICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgaGVpZ2h0OiAxMDAlO1xyXG4gICAgcG9zaXRpb246IGZpeGVkO1xyXG4gICAgdG9wOiAwO1xyXG4gICAgYmFja2dyb3VuZDogZ3JheTtcclxuICAgIG9wYWNpdHk6MC41O1xyXG59XHJcblxyXG4ubG9hZGluZy1naWYge1xyXG4gICAgei1pbmRleDogOTE7XHJcbiAgICBvcGFjaXR5OjAuNTtcclxuICAgIHBvc2l0aW9uOiBmaXhlZDtcclxuICAgIHRvcDogMTAlO1xyXG4gICAgaGVpZ2h0OiAxMDAlO1xyXG5cclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG59XHJcblxyXG5cclxuIl0sInNvdXJjZVJvb3QiOiIifQ== */"]
    });
  }
}

/***/ }),

/***/ 4905:
/*!*********************************************************!*\
  !*** ./src/app/common/pipe/date-to-day-of-week.pipe.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DateToDayOfWeekPipe: () => (/* binding */ DateToDayOfWeekPipe)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 7580);

// 日期換算星期
class DateToDayOfWeekPipe {
  transform(date, len) {
    const dayOfWeek = new Date(date).getDay();
    //判斷星期
    switch (dayOfWeek) {
      case 0:
        // 星期日
        return "(日)";
      case 1:
        // 星期一
        return "(一)";
      case 2:
        // 星期二
        return "(二)";
      case 3:
        // 星期三
        return "(三)";
      case 4:
        // 星期四
        return "(四)";
      case 5:
        // 星期五
        return "(五)";
      case 6:
        // 星期六
        return "(六)";
    }
    return "";
  }
  static {
    this.ɵfac = function DateToDayOfWeekPipe_Factory(t) {
      return new (t || DateToDayOfWeekPipe)();
    };
  }
  static {
    this.ɵpipe = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefinePipe"]({
      name: "dateToDayOfWeek",
      type: DateToDayOfWeekPipe,
      pure: true
    });
  }
}

/***/ }),

/***/ 9551:
/*!**************************************************!*\
  !*** ./src/app/common/pipe/word-shroten.pipe.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   WordShrotenPipe: () => (/* binding */ WordShrotenPipe)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 7580);

class WordShrotenPipe {
  transform(value, limit) {
    if (value.length >= limit) {
      return value.substring(0, limit) + "...";
    }
    return value;
  }
  static {
    this.ɵfac = function WordShrotenPipe_Factory(t) {
      return new (t || WordShrotenPipe)();
    };
  }
  static {
    this.ɵpipe = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefinePipe"]({
      name: "wordShroten",
      type: WordShrotenPipe,
      pure: true
    });
  }
}

/***/ }),

/***/ 4079:
/*!**********************************************************************!*\
  !*** ./src/app/common/room-site/models/room-site-isbooking.model.ts ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   RoomSiteIsBooking: () => (/* binding */ RoomSiteIsBooking)
/* harmony export */ });
class RoomSiteIsBooking {
  constructor(roomSiteIsBooking) {
    this.id = "";
    this.roomId = "";
    this.siteName = "";
    this.roomName = "";
    this.isBooking = false;
    this.id = roomSiteIsBooking["id"];
    this.roomId = roomSiteIsBooking["roomId"];
    this.siteName = roomSiteIsBooking["name"];
    this.roomName = roomSiteIsBooking["roomName"];
    this.isBooking = roomSiteIsBooking["isBooking"];
  }
}

/***/ }),

/***/ 8655:
/*!*******************************************************!*\
  !*** ./src/app/common/room-site/models/room.model.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Room: () => (/* binding */ Room)
/* harmony export */ });
class Room {
  constructor(room) {
    this.id = "";
    this.name = "";
    this.ownerId = "";
    this.ownerMail = "";
    this.bookingCount = 0;
    this.id = room["id"];
    this.name = room["name"];
    this.ownerId = room["ownerId"];
    this.ownerMail = room["ownerMail"];
  }
}

/***/ }),

/***/ 5319:
/*!*******************************************************!*\
  !*** ./src/app/common/room-site/models/site.model.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Site: () => (/* binding */ Site)
/* harmony export */ });
class Site {
  constructor(site) {
    // 座位id
    this.id = "";
    // 座位名稱
    this.name = "";
    // 座位 所屬之 教室id
    this.roomId = "";
    if (!site) {
      return;
    }
    this.id = site["id"];
    this.name = site["name"];
    this.roomId = site["roomId"];
  }
}

/***/ }),

/***/ 6544:
/*!************************************************************************************!*\
  !*** ./src/app/common/time/component/calendar-picker/calendar-picker.component.ts ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CalendarPickerComponent: () => (/* binding */ CalendarPickerComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ 316);



const _c0 = () => [];
const _c1 = a0 => ({
  opacity: a0
});
const _c2 = (a0, a1) => ({
  "current-date": a0,
  "selected": a1
});
const _c3 = a0 => ({
  background: a0
});
function CalendarPickerComponent_div_22_div_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const i_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().index;
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction2"](2, _c2, ctx_r2.checkCurrentDayStyle(ctx_r2.changeDateObj(i_r2 + 1 - ctx_r2.currentMonthFirstDayWeekly)), ctx_r2.checkSelectDayStyle(i_r2 + 1 - ctx_r2.currentMonthFirstDayWeekly)));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", i_r2 + 1 - ctx_r2.currentMonthFirstDayWeekly, " ");
  }
}
function CalendarPickerComponent_div_22_div_2_div_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "div", 16);
  }
  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngStyle", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction1"](1, _c3, ctx_r2.checkDotColor()));
  }
}
function CalendarPickerComponent_div_22_div_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, CalendarPickerComponent_div_22_div_2_div_1_Template, 1, 3, "div", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const i_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().index;
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](1, _c0).constructor(ctx_r2.countDot(i_r2 + 1 - ctx_r2.currentMonthFirstDayWeekly)));
  }
}
function CalendarPickerComponent_div_22_ng_template_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, " more... ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
}
function CalendarPickerComponent_div_22_div_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const i_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().index;
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", ctx_r2.isShowRate(i_r2 + 1 - ctx_r2.currentMonthFirstDayWeekly), " ");
  }
}
function CalendarPickerComponent_div_22_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function CalendarPickerComponent_div_22_Template_div_click_0_listener() {
      const i_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r1).index;
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r2.selectDate(i_r2 + 1 - ctx_r2.currentMonthFirstDayWeekly));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, CalendarPickerComponent_div_22_div_1_Template, 2, 5, "div", 10)(2, CalendarPickerComponent_div_22_div_2_Template, 2, 2, "div", 11)(3, CalendarPickerComponent_div_22_ng_template_3_Template, 2, 0, "ng-template", null, 0, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplateRefExtractor"])(5, CalendarPickerComponent_div_22_div_5_Template, 2, 1, "div", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const i_r2 = ctx.index;
    const moreTemplate_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](4);
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngStyle", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction1"](5, _c1, ctx_r2.checkDateValid(ctx_r2.changeDateObj(i_r2 + 1 - ctx_r2.currentMonthFirstDayWeekly)) ? "1" : "0.4"));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", i_r2 + 1 > ctx_r2.currentMonthFirstDayWeekly);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r2.countDot(i_r2 + 1 - ctx_r2.currentMonthFirstDayWeekly) <= 3)("ngIfElse", moreTemplate_r4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r2.rateList.length > 0);
  }
}
class CalendarPickerComponent {
  constructor() {
    // 該日期元件選擇年月日
    this.selectDatInfo = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
    // 所有 Booking 紀錄
    this.bookingList = new Array();
    this._bookingList = new Array();
    // 該空間 其 剩餘率 紀錄
    this.rateList = [];
    // 輸入 當前選擇日期
    this._selectDate = 0;
    // 剩餘比率
    this.showRate = 60;
    // 是否 emit初始日期
    this.isEmitInitDate = true;
    // 選擇月份, 用於 切換月份判斷
    this._selectMonth = 0;
    this.currentYear = 0;
    this.currentMonth = 0;
    this.currentDay = 0;
    this.currentMonthAllDay = 0;
    this.currentMonthFirstDayWeekly = 0;
    this.displayAllDayGrid = 0;
    //該天 booking 幾次
    this.thisDayBookingList = new Array();
  }
  ngOnInit() {
    //取得當前日期
    const currentDate = new Date();
    if (this._selectDate === 0) {
      this._selectDate = currentDate.getDate();
    }
    /*
     * cap build 於 安卓/ios 父元件 會重複 @input 賦值
     * 法1: (暫時解)將 bookingList 進行深度拷貝,
     */
    this._bookingList = Array.from(this.bookingList);
    //取得當前年月
    this.currentYear = currentDate.getFullYear();
    this.currentMonth = currentDate.getMonth() + 1; //月份從0開始算，後續計算需加1
    this._selectMonth = this.currentMonth;
    this.currentDay = currentDate.getDate();
    this.setCalendarDateInfo(false);
  }
  /*
   * 初始、切換月份後重取月份資訊。
   */
  setCalendarDateInfo(isChangeMonth) {
    //取得當前月份總日數
    this.currentMonthAllDay = new Date(this.currentYear, this.currentMonth, 0).getDate();
    //當前月份首日星期
    this.currentMonthFirstDay = new Date(this.currentYear, this.currentMonth - 1, 1);
    this.currentMonthFirstDayWeekly = this.currentMonthFirstDay.getDay();
    //需要呈現之日期格子數
    this.displayAllDayGrid = this.currentMonthAllDay + this.currentMonthFirstDayWeekly;
    // emmit 更改 選擇日期
    if (this._selectMonth !== this.currentMonth || isChangeMonth) {
      return; // 按下 切換月份按鈕, 不 emit 父元件 選擇日期
    }
    if (this.isEmitInitDate) {
      const selectDate = this.currentYear + '-' + this.currentMonth + '-' + this._selectDate;
      this.selectDatInfo.emit(selectDate);
    }
  }
  /*
   * 計算該日期(數字) 包含次數
   */
  countDot(checkDateNumber) {
    if (checkDateNumber <= 0) {
      return 0;
    }
    const checkDate = new Date(this.currentYear, this.currentMonth - 1, checkDateNumber);
    const filterBooking = this._bookingList.filter(booking => {
      const [year, month, day] = booking.startDate.split("-").map(Number);
      return new Date(year, month - 1, day).getTime() === checkDate.getTime();
    });
    this.thisDayBookingList = filterBooking;
    return filterBooking.length;
  }
  /*
   * 確認當天 借用 dot 的顏色 (教室/座位預約)
   */
  checkDotColor() {
    const booking = this.thisDayBookingList.pop();
    if (booking?.bookingType === "room") {
      return "#661983";
    } else if (booking?.bookingType === "site") {
      return "#FBE0FF";
    }
    return "yellow";
  }
  /*
   * 上個月。
   */
  backMonth() {
    this.currentMonth = this.currentMonth - 1;
    this.checkMonth();
    this.setCalendarDateInfo(true);
  }
  /*
   * 下個月。
   */
  nextMonth() {
    this.currentMonth = this.currentMonth + 1;
    this.checkMonth();
    this.setCalendarDateInfo(true);
  }
  /*
   * 確認月份若非 1 <= month <= 12，則切換年分。
   */
  checkMonth() {
    if (1 <= this.currentMonth && this.currentMonth <= 12) {
      return;
    }
    if (this.currentMonth < 1) {
      this.currentMonth = 12;
      this.currentYear = this.currentYear - 1;
      return;
    }
    if (this.currentMonth > 12) {
      this.currentMonth = 1;
      this.currentYear = this.currentYear + 1;
      return;
    }
  }
  /*
   * 確認是否當前日期樣式是否顯示
   */
  checkCurrentDayStyle(_selectDate) {
    const _currentDate = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
    return this.checkDateValid(_selectDate) && _selectDate.getTime() === _currentDate.getTime();
  }
  /*
   * 確認被選擇日期樣式是否顯示
   */
  checkSelectDayStyle(_selectDate) {
    return this.checkDateValid(this.changeDateObj(_selectDate)) && this._selectMonth === this.currentMonth &&
    // 切換月份, 不觸發選擇日期
    this._selectDate === _selectDate;
  }
  /*
   * 選擇日期
   */
  selectDate(date) {
    if (!this.checkDateValid(this.changeDateObj(date))) {
      return;
    }
    if (date > 0) {
      this._selectMonth = this.currentMonth;
      this._selectDate = date;
    }
    this.emitDateInfo();
  }
  /*
   * 確認日期是否有效
   */
  checkDateValid(_selectDate) {
    const _currentDate = new Date(new Date().getFullYear(), new Date().getMonth(), this.currentDay);
    if (_selectDate.getTime() < _currentDate.getTime()) {
      return false;
    }
    if ((_selectDate.getTime() - _currentDate.getTime()) / 3600000 > 90 * 24) {
      return false;
    }
    return true;
  }
  /*
   * 將 數字轉 Date 件
   */
  changeDateObj(_selectDate) {
    return new Date(this.currentYear, this.currentMonth - 1, _selectDate);
  }
  /*
   * 射出 年月日資訊
   * 與 當天 所有 booking 紀錄, 方便卡控
   */
  emitDateInfo() {
    let selectDate = this.currentYear + '-' + this.currentMonth + '-' + "1";
    if (this._selectDate != 0) {
      selectDate = this.currentYear + '-' + this.currentMonth + '-' + this._selectDate;
    }
    this.selectDatInfo.emit(selectDate);
    const selectDayAllBookingRecord = this._bookingList.filter(booking => {
      return new Date(booking.startDate).getTime() === new Date(selectDate).getTime();
    });
  }
  /*
   * 行事曆日期逐個判斷, 顯示剩餘率 %
   */
  isShowRate(date) {
    if (!this.rateList) {
      return "";
    }
    const rateDate = this.rateList.filter(rate => {
      return new Date(rate.date).getDate() === date;
    })[0];
    if (!rateDate) {
      return "";
    }
    if (this.showRate < rateDate.rate) {
      return "";
    }
    return rateDate.rate + "%";
  }
  static {
    this.ɵfac = function CalendarPickerComponent_Factory(t) {
      return new (t || CalendarPickerComponent)();
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
      type: CalendarPickerComponent,
      selectors: [["app-calendar-picker"]],
      inputs: {
        bookingList: "bookingList",
        rateList: "rateList",
        _selectDate: "_selectDate",
        showRate: "showRate",
        isEmitInitDate: "isEmitInitDate"
      },
      outputs: {
        selectDatInfo: "selectDatInfo"
      },
      decls: 23,
      vars: 4,
      consts: [["moreTemplate", ""], [1, "calendar-picker"], [1, "calendar-header"], ["src", "assets/images/icon/icon_back.png", 3, "click"], ["src", "assets/images/icon/icon_next.png", 3, "click"], [1, "calendar-content"], [1, "grid-row"], [1, "grid"], ["class", "grid", 3, "ngStyle", "click", 4, "ngFor", "ngForOf"], [1, "grid", 3, "click", "ngStyle"], ["class", "no-selected", 3, "ngClass", 4, "ngIf"], ["class", "dot-bar", 4, "ngIf", "ngIfElse"], ["class", "rate", 4, "ngIf"], [1, "no-selected", 3, "ngClass"], [1, "dot-bar"], ["class", "dot", 3, "ngStyle", 4, "ngFor", "ngForOf"], [1, "dot", 3, "ngStyle"], [1, "more-word"], [1, "rate"]],
      template: function CalendarPickerComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 1)(1, "div", 2)(2, "img", 3);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function CalendarPickerComponent_Template_img_click_2_listener() {
            return ctx.backMonth();
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "img", 4);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function CalendarPickerComponent_Template_img_click_4_listener() {
            return ctx.nextMonth();
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "div", 5)(6, "div", 6)(7, "div", 7);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](8, "\u65E5");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "div", 7);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](10, "\u4E00");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "div", 7);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](12, "\u4E8C");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "div", 7);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](14, "\u4E09");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](15, "div", 7);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](16, "\u56DB");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](17, "div", 7);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](18, "\u4E94");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](19, "div", 7);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](20, "\u516D");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](21, "div", 6);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](22, CalendarPickerComponent_div_22_Template, 6, 7, "div", 8);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
        }
        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate2"](" ", ctx.currentYear, " \u5E74 ", ctx.currentMonth, " \u6708 ");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](19);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](3, _c0).constructor(ctx.displayAllDayGrid));
        }
      },
      dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_1__.NgClass, _angular_common__WEBPACK_IMPORTED_MODULE_1__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_1__.NgIf, _angular_common__WEBPACK_IMPORTED_MODULE_1__.NgStyle],
      styles: ["@charset \"UTF-8\";\n.calendar-picker[_ngcontent-%COMP%] {\n  width: 350px;\n  border: 1px solid #cfcfcf;\n  border-radius: 1px;\n}\n.calendar-picker[_ngcontent-%COMP%]   .calendar-header[_ngcontent-%COMP%] {\n  background: #661983;\n  color: white;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 15px;\n  font-size: 20px;\n}\n.calendar-picker[_ngcontent-%COMP%]   .calendar-content[_ngcontent-%COMP%]   .grid-row[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-start;\n  flex-wrap: wrap;\n}\n.calendar-picker[_ngcontent-%COMP%]   .calendar-content[_ngcontent-%COMP%]   .grid-row[_ngcontent-%COMP%]   .grid[_ngcontent-%COMP%] {\n  width: 14%;\n  text-align: center; \n\n  padding: 12px 0;\n  display: flex;\n  flex-direction: column;\n  justify-content: space-between;\n  align-items: center;\n}\n.calendar-picker[_ngcontent-%COMP%]   .calendar-content[_ngcontent-%COMP%]   .grid-row[_ngcontent-%COMP%]   .grid[_ngcontent-%COMP%]   .no-selected[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  width: 35px;\n  height: 35px;\n}\n.calendar-picker[_ngcontent-%COMP%]   .calendar-content[_ngcontent-%COMP%]   .grid-row[_ngcontent-%COMP%]   .grid[_ngcontent-%COMP%]   .current-date[_ngcontent-%COMP%] {\n  background: #FBE0FF;\n  color: #661983;\n  border-radius: 100%;\n}\n.calendar-picker[_ngcontent-%COMP%]   .calendar-content[_ngcontent-%COMP%]   .grid-row[_ngcontent-%COMP%]   .grid[_ngcontent-%COMP%]   .selected[_ngcontent-%COMP%] {\n  background: #661983;\n  color: white;\n  border-radius: 100%;\n}\n.calendar-picker[_ngcontent-%COMP%]   .calendar-content[_ngcontent-%COMP%]   .grid-row[_ngcontent-%COMP%]   .grid[_ngcontent-%COMP%]   .dot-bar[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: row;\n  justify-content: center;\n  align-items: center;\n  gap: 1px;\n}\n.calendar-picker[_ngcontent-%COMP%]   .calendar-content[_ngcontent-%COMP%]   .grid-row[_ngcontent-%COMP%]   .grid[_ngcontent-%COMP%]   .dot-bar[_ngcontent-%COMP%]   .dot[_ngcontent-%COMP%] {\n  width: 4px;\n  height: 4px;\n  background: #661983;\n  border-radius: 100%;\n}\n.calendar-picker[_ngcontent-%COMP%]   .calendar-content[_ngcontent-%COMP%]   .grid-row[_ngcontent-%COMP%]   .grid[_ngcontent-%COMP%]   .more-word[_ngcontent-%COMP%] {\n  font-size: 14px;\n  color: #FBE0FF;\n}\n.calendar-picker[_ngcontent-%COMP%]   .calendar-content[_ngcontent-%COMP%]   .grid-row[_ngcontent-%COMP%]   .grid[_ngcontent-%COMP%]   .rate[_ngcontent-%COMP%] {\n  color: #661983;\n  font-size: 15px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhbGVuZGFyLXBpY2tlci5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxnQkFBZ0I7QUFDaEI7RUFDSSxZQUFBO0VBQ0EseUJBQUE7RUFDQSxrQkFBQTtBQUNKO0FBQ0k7RUFDSSxtQkFBQTtFQUNBLFlBQUE7RUFDQSxhQUFBO0VBQ0EsOEJBQUE7RUFDQSxtQkFBQTtFQUNBLGFBQUE7RUFDQSxlQUFBO0FBQ1I7QUFHUTtFQUNJLGFBQUE7RUFDQSwyQkFBQTtFQUNBLGVBQUE7QUFEWjtBQUdZO0VBQ0ksVUFBQTtFQUVBLGtCQUFBLEVBQUEsV0FBQTtFQUNBLGVBQUE7RUFDQSxhQUFBO0VBQ0Esc0JBQUE7RUFDQSw4QkFBQTtFQUNBLG1CQUFBO0FBRmhCO0FBSWdCO0VBQ0ksYUFBQTtFQUNBLHVCQUFBO0VBQ0EsbUJBQUE7RUFFQSxXQUFBO0VBQ0EsWUFBQTtBQUhwQjtBQU1nQjtFQUNJLG1CQUFBO0VBQ0EsY0FBQTtFQUNBLG1CQUFBO0FBSnBCO0FBT2dCO0VBQ0ksbUJBQUE7RUFDQSxZQUFBO0VBQ0EsbUJBQUE7QUFMcEI7QUFRZ0I7RUFDSSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSx1QkFBQTtFQUNBLG1CQUFBO0VBQ0EsUUFBQTtBQU5wQjtBQU9vQjtFQUNJLFVBQUE7RUFDQSxXQUFBO0VBQ0EsbUJBQUE7RUFDQSxtQkFBQTtBQUx4QjtBQVNnQjtFQUNJLGVBQUE7RUFDQSxjQUFBO0FBUHBCO0FBVWdCO0VBQ0ksY0FBQTtFQUNBLGVBQUE7QUFScEIiLCJmaWxlIjoiY2FsZW5kYXItcGlja2VyLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbi5jYWxlbmRhci1waWNrZXIge1xyXG4gICAgd2lkdGg6IDM1MHB4O1xyXG4gICAgYm9yZGVyOiAxcHggc29saWQgI2NmY2ZjZjtcclxuICAgIGJvcmRlci1yYWRpdXM6IDFweDtcclxuICAgIFxyXG4gICAgLmNhbGVuZGFyLWhlYWRlciB7ICAgICAgICAgICAgICAgIFxyXG4gICAgICAgIGJhY2tncm91bmQ6ICM2NjE5ODM7XHJcbiAgICAgICAgY29sb3I6IHdoaXRlO1xyXG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICAgICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xyXG4gICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgICAgICAgcGFkZGluZzogMTVweDtcclxuICAgICAgICBmb250LXNpemU6IDIwcHg7XHJcbiAgICB9XHJcblxyXG4gICAgLmNhbGVuZGFyLWNvbnRlbnQge1xyXG4gICAgICAgIC5ncmlkLXJvdyB7XHJcbiAgICAgICAgICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICAgICAgICAgIGp1c3RpZnktY29udGVudDogZmxleC1zdGFydDtcclxuICAgICAgICAgICAgZmxleC13cmFwOiB3cmFwO1xyXG5cclxuICAgICAgICAgICAgLmdyaWQgeyAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIHdpZHRoOiAxNCU7XHJcbiAgICAgICAgICAgICAgICAvL2hlaWdodDogNDBweDtcclxuICAgICAgICAgICAgICAgIHRleHQtYWxpZ246IGNlbnRlcjsgLyog5paH5pys5rC05bmz5bGF5LitICovXHJcbiAgICAgICAgICAgICAgICBwYWRkaW5nOiAxMnB4IDA7XHJcbiAgICAgICAgICAgICAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgICAgICAgICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuICAgICAgICAgICAgICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcclxuICAgICAgICAgICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcblxyXG4gICAgICAgICAgICAgICAgLm5vLXNlbGVjdGVkIHtcclxuICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgICAgICAgICAgICAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG4gICAgICAgICAgICAgICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAzNXB4O1xyXG4gICAgICAgICAgICAgICAgICAgIGhlaWdodDogMzVweDtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAuY3VycmVudC1kYXRlIHtcclxuICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiAjRkJFMEZGO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbG9yOiAjNjYxOTgzO1xyXG4gICAgICAgICAgICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDEwMCU7XHJcbiAgICAgICAgICAgICAgICB9IFxyXG5cclxuICAgICAgICAgICAgICAgIC5zZWxlY3RlZCB7XHJcbiAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZDogIzY2MTk4MztcclxuICAgICAgICAgICAgICAgICAgICBjb2xvcjogd2hpdGU7XHJcbiAgICAgICAgICAgICAgICAgICAgYm9yZGVyLXJhZGl1czogMTAwJTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAuZG90LWJhciB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogZmxleDtcclxuICAgICAgICAgICAgICAgICAgICBmbGV4LWRpcmVjdGlvbjogcm93O1xyXG4gICAgICAgICAgICAgICAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG4gICAgICAgICAgICAgICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgICAgICAgICAgICAgICAgICAgZ2FwOiAxcHg7XHJcbiAgICAgICAgICAgICAgICAgICAgLmRvdCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiA0cHg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlaWdodDogNHB4O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiAjNjYxOTgzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBib3JkZXItcmFkaXVzOiAxMDAlOyAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC5tb3JlLXdvcmQge1xyXG4gICAgICAgICAgICAgICAgICAgIGZvbnQtc2l6ZTogMTRweDtcclxuICAgICAgICAgICAgICAgICAgICBjb2xvcjogI0ZCRTBGRjtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAucmF0ZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29sb3I6ICM2NjE5ODM7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9udC1zaXplOiAxNXB4O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59Il19 */\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvY29tbW9uL3RpbWUvY29tcG9uZW50L2NhbGVuZGFyLXBpY2tlci9jYWxlbmRhci1waWNrZXIuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsZ0JBQWdCO0FBQ2hCO0VBQ0ksWUFBQTtFQUNBLHlCQUFBO0VBQ0Esa0JBQUE7QUFDSjtBQUNJO0VBQ0ksbUJBQUE7RUFDQSxZQUFBO0VBQ0EsYUFBQTtFQUNBLDhCQUFBO0VBQ0EsbUJBQUE7RUFDQSxhQUFBO0VBQ0EsZUFBQTtBQUNSO0FBR1E7RUFDSSxhQUFBO0VBQ0EsMkJBQUE7RUFDQSxlQUFBO0FBRFo7QUFHWTtFQUNJLFVBQUE7RUFFQSxrQkFBQSxFQUFBLFdBQUE7RUFDQSxlQUFBO0VBQ0EsYUFBQTtFQUNBLHNCQUFBO0VBQ0EsOEJBQUE7RUFDQSxtQkFBQTtBQUZoQjtBQUlnQjtFQUNJLGFBQUE7RUFDQSx1QkFBQTtFQUNBLG1CQUFBO0VBRUEsV0FBQTtFQUNBLFlBQUE7QUFIcEI7QUFNZ0I7RUFDSSxtQkFBQTtFQUNBLGNBQUE7RUFDQSxtQkFBQTtBQUpwQjtBQU9nQjtFQUNJLG1CQUFBO0VBQ0EsWUFBQTtFQUNBLG1CQUFBO0FBTHBCO0FBUWdCO0VBQ0ksYUFBQTtFQUNBLG1CQUFBO0VBQ0EsdUJBQUE7RUFDQSxtQkFBQTtFQUNBLFFBQUE7QUFOcEI7QUFPb0I7RUFDSSxVQUFBO0VBQ0EsV0FBQTtFQUNBLG1CQUFBO0VBQ0EsbUJBQUE7QUFMeEI7QUFTZ0I7RUFDSSxlQUFBO0VBQ0EsY0FBQTtBQVBwQjtBQVVnQjtFQUNJLGNBQUE7RUFDQSxlQUFBO0FBUnBCO0FBQ0Esd25JQUF3bkkiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuLmNhbGVuZGFyLXBpY2tlciB7XHJcbiAgICB3aWR0aDogMzUwcHg7XHJcbiAgICBib3JkZXI6IDFweCBzb2xpZCAjY2ZjZmNmO1xyXG4gICAgYm9yZGVyLXJhZGl1czogMXB4O1xyXG4gICAgXHJcbiAgICAuY2FsZW5kYXItaGVhZGVyIHsgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgYmFja2dyb3VuZDogIzY2MTk4MztcclxuICAgICAgICBjb2xvcjogd2hpdGU7XHJcbiAgICAgICAgZGlzcGxheTogZmxleDtcclxuICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XHJcbiAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAgICAgICBwYWRkaW5nOiAxNXB4O1xyXG4gICAgICAgIGZvbnQtc2l6ZTogMjBweDtcclxuICAgIH1cclxuXHJcbiAgICAuY2FsZW5kYXItY29udGVudCB7XHJcbiAgICAgICAgLmdyaWQtcm93IHtcclxuICAgICAgICAgICAgZGlzcGxheTogZmxleDtcclxuICAgICAgICAgICAganVzdGlmeS1jb250ZW50OiBmbGV4LXN0YXJ0O1xyXG4gICAgICAgICAgICBmbGV4LXdyYXA6IHdyYXA7XHJcblxyXG4gICAgICAgICAgICAuZ3JpZCB7ICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDE0JTtcclxuICAgICAgICAgICAgICAgIC8vaGVpZ2h0OiA0MHB4O1xyXG4gICAgICAgICAgICAgICAgdGV4dC1hbGlnbjogY2VudGVyOyAvKiDDpsKWwofDpsKcwqzDpsKwwrTDpcK5wrPDpcKxwoXDpMK4wq0gKi9cclxuICAgICAgICAgICAgICAgIHBhZGRpbmc6IDEycHggMDtcclxuICAgICAgICAgICAgICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICAgICAgICAgICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gICAgICAgICAgICAgICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xyXG4gICAgICAgICAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuXHJcbiAgICAgICAgICAgICAgICAubm8tc2VsZWN0ZWQge1xyXG4gICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICAgICAgICAgICAgICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbiAgICAgICAgICAgICAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDM1cHg7XHJcbiAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiAzNXB4O1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC5jdXJyZW50LWRhdGUge1xyXG4gICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6ICNGQkUwRkY7XHJcbiAgICAgICAgICAgICAgICAgICAgY29sb3I6ICM2NjE5ODM7XHJcbiAgICAgICAgICAgICAgICAgICAgYm9yZGVyLXJhZGl1czogMTAwJTtcclxuICAgICAgICAgICAgICAgIH0gXHJcblxyXG4gICAgICAgICAgICAgICAgLnNlbGVjdGVkIHtcclxuICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiAjNjYxOTgzO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbG9yOiB3aGl0ZTtcclxuICAgICAgICAgICAgICAgICAgICBib3JkZXItcmFkaXVzOiAxMDAlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC5kb3QtYmFyIHtcclxuICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgICAgICAgICAgICAgICAgIGZsZXgtZGlyZWN0aW9uOiByb3c7XHJcbiAgICAgICAgICAgICAgICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbiAgICAgICAgICAgICAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAgICAgICAgICAgICAgICAgICBnYXA6IDFweDtcclxuICAgICAgICAgICAgICAgICAgICAuZG90IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDRweDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiA0cHg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6ICM2NjE5ODM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDEwMCU7ICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLm1vcmUtd29yZCB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9udC1zaXplOiAxNHB4O1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbG9yOiAjRkJFMEZGO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC5yYXRlIHtcclxuICAgICAgICAgICAgICAgICAgICBjb2xvcjogIzY2MTk4MztcclxuICAgICAgICAgICAgICAgICAgICBmb250LXNpemU6IDE1cHg7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iXSwic291cmNlUm9vdCI6IiJ9 */"]
    });
  }
}

/***/ }),

/***/ 1456:
/*!******************************************************************************!*\
  !*** ./src/app/common/time/component/clock-picker/clock-picker.component.ts ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ClockPickerComponent: () => (/* binding */ ClockPickerComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 7580);

class ClockPickerComponent {
  static {
    this.ɵfac = function ClockPickerComponent_Factory(t) {
      return new (t || ClockPickerComponent)();
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
      type: ClockPickerComponent,
      selectors: [["app-clock-picker"]],
      decls: 2,
      vars: 0,
      template: function ClockPickerComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "p");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "clock-picker works!");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        }
      },
      styles: ["/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJjbG9jay1waWNrZXIuY29tcG9uZW50LnNjc3MifQ== */\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvY29tbW9uL3RpbWUvY29tcG9uZW50L2Nsb2NrLXBpY2tlci9jbG9jay1waWNrZXIuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUNBLDRLQUE0SyIsInNvdXJjZVJvb3QiOiIifQ== */"]
    });
  }
}

/***/ }),

/***/ 6508:
/*!********************************************************************************!*\
  !*** ./src/app/common/version/components/app-version/app-version.component.ts ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AppVersionComponent: () => (/* binding */ AppVersionComponent)
/* harmony export */ });
/* harmony import */ var _constants_version_constant__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../constants/version.constant */ 3389);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 7580);


/**
 * 共用版本號元件
 * 顯示 Git 版本資訊（維護版 / 優化版）與當前日期。
 * 版本字串統一由 version.constant.ts 管理，發版只需更新常數。
 */
class AppVersionComponent {
  constructor() {
    this.fixLabel = _constants_version_constant__WEBPACK_IMPORTED_MODULE_0__.APP_VERSION.fixLabel;
    this.fixHash = _constants_version_constant__WEBPACK_IMPORTED_MODULE_0__.APP_VERSION.fixHash;
    this.featLabel = _constants_version_constant__WEBPACK_IMPORTED_MODULE_0__.APP_VERSION.featLabel;
    this.featHash = _constants_version_constant__WEBPACK_IMPORTED_MODULE_0__.APP_VERSION.featHash;
    this.buildDate = _constants_version_constant__WEBPACK_IMPORTED_MODULE_0__.APP_VERSION.buildDate;
    /** 執行期間取得的當前日期，格式：YYYY/M/D */
    this.todayDate = '';
  }
  ngOnInit() {
    const now = new Date();
    const yyyy = now.getFullYear();
    const m = now.getMonth() + 1;
    const d = now.getDate();
    const hh = String(now.getHours()).padStart(2, '0');
    const mm = String(now.getMinutes()).padStart(2, '0');
    this.todayDate = `${m}/${d} ${hh}:${mm}`;
  }
  static {
    this.ɵfac = function AppVersionComponent_Factory(t) {
      return new (t || AppVersionComponent)();
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
      type: AppVersionComponent,
      selectors: [["app-version"]],
      decls: 5,
      vars: 1,
      consts: [[1, "version-info"]],
      template: function AppVersionComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 0);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1, " \u7DAD\u8B77\u7248\u672C\u865F: 3c6b851 ");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](2, "br");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](4, "br");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        }
        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" build \u4E0A\u67B6 ", ctx.buildDate, " ");
        }
      },
      styles: [".version-info[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: #888;\n  line-height: 1.8;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC12ZXJzaW9uLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksZUFBQTtFQUNBLFdBQUE7RUFDQSxnQkFBQTtBQUNKIiwiZmlsZSI6ImFwcC12ZXJzaW9uLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLnZlcnNpb24taW5mbyB7XG4gICAgZm9udC1zaXplOiAxMnB4O1xuICAgIGNvbG9yOiAjODg4O1xuICAgIGxpbmUtaGVpZ2h0OiAxLjg7XG59XG4iXX0= */\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvY29tbW9uL3ZlcnNpb24vY29tcG9uZW50cy9hcHAtdmVyc2lvbi9hcHAtdmVyc2lvbi5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLGVBQUE7RUFDQSxXQUFBO0VBQ0EsZ0JBQUE7QUFDSjtBQUNBLGdaQUFnWiIsInNvdXJjZXNDb250ZW50IjpbIi52ZXJzaW9uLWluZm8ge1xuICAgIGZvbnQtc2l6ZTogMTJweDtcbiAgICBjb2xvcjogIzg4ODtcbiAgICBsaW5lLWhlaWdodDogMS44O1xufVxuIl0sInNvdXJjZVJvb3QiOiIifQ== */"]
    });
  }
}

/***/ }),

/***/ 3389:
/*!**************************************************************!*\
  !*** ./src/app/common/version/constants/version.constant.ts ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   APP_VERSION: () => (/* binding */ APP_VERSION)
/* harmony export */ });
/**
 * 應用程式版本資訊
 * 每次發版時更新此檔案即可，無需修改各頁面元件。
 */
const APP_VERSION = {
  /** 維護版本 (fix branch) */
  fixLabel: 'fix2',
  fixHash: '#6ff5378',
  /** 優化版本 (feat branch) */
  featLabel: 'feat2',
  featHash: '#aae893f',
  /** build 上架日期時間 */
  buildDate: '2026/04/13'
};

/***/ }),

/***/ 7028:
/*!************************************************************!*\
  !*** ./src/app/firebase-api/services/cloud-fun.service.ts ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CloudFunService: () => (/* binding */ CloudFunService)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ 6443);


class CloudFunService {
  constructor(httpClient) {
    this.httpClient = httpClient;
    this.cloudFunApiList = {
      // [預約空間] 回傳所有 教室,座位 資訊, 並有 booking 時段判斷, 若已被預約, 則註記 isbooking: true
      ROOM_SITE_BY_BOOKING: "https://getroomsitebydate-querqokzna-uc.a.run.app/",
      // [空間總覽] [借用趨勢] api 
      //REVIEW_ROOM_BOOKING_TREND : "https://getrviewroomchartbytimetype-querqokzna-uc.a.run.app",
      REVIEW_ROOM_BOOKING_TREND: "http://localhost:8081/api/review/room/trend",
      // [空間總覽] 每個月份 [剩餘空間] api 
      //REVIEW_ROOM_RATE: "https://getbookingratelist-querqokzna-uc.a.run.app",
      REVIEW_ROOM_RATE: "http://localhost:8081/api/review/room/rate",
      // [空間總覽] 今日 [剩餘空間] api 
      REVIEW_ROOM_TODAY: "https://gettodayremanent-querqokzna-uc.a.run.app/",
      // [購買方案] [綠界付款] 第三方 選擇付款方式 新視窗畫面
      ECPAY_SELECT_PAY_PAGE: "https://getecpayselectplanpage-querqokzna-uc.a.run.app",
      // [購買方案] [綠界付款] 處理 form 資訊後, 回傳結果
      ECPAY_SELECT_PAY_RESULT: "https://getecpayresult-querqokzna-uc.a.run.app"
    };
  }
  /*
   * [預約空間] 回傳所有 教室,座位 資訊, 並有 booking 時段判斷, 若已被預約, 則註記 isbooking: true
      [
        {"id":"4DGXN...","roomId":"4tz0...r","name":"A001","roomName":"A卓越教室","isBooking":true},
        {"id":"FCq2F...","roomId":"OroZ...","name":"C001","roomName":"C翱翔辦公室","isBooking":true},
      ]
   */
  getRoomSiteByDate(timeType) {
    const {
      startDate,
      startTime,
      endTime
    } = timeType;
    return this.httpClient.get(this.cloudFunApiList.ROOM_SITE_BY_BOOKING + "?startDate=" + startDate + "&startTime=" + startTime + "&endTime=" + endTime);
  }
  /*
   * 取得 [空間總覽] [借用資訊] api
    roomCount: (6) [0, 0, 0, 0, 3, 3, _chartjs: {…}, push: ƒ, pop: ƒ, shift: ƒ, splice: ƒ, …]
    siteCount: (6) [0, 0, 0, 0, 2, 6, _chartjs: {…}, push: ƒ, pop: ƒ, shift: ƒ, splice: ƒ, …]
    timeTitle: (6) ['11月', '12月', '13月', '14月', '15月', '16月']
   */
  getBookingTrend(timeType) {
    return this.httpClient.get(this.cloudFunApiList.REVIEW_ROOM_BOOKING_TREND + "?timeType=" + timeType);
  }
  /*
   * 取得 booking 每日剩餘空間
   * 資料格式:
   *
    [
      {date:"2024-3-15", rate: 10},
      {date:"2024-3-3", rate: 20},
    ];
   */
  getBookingRate(date, roomType) {
    return this.httpClient.get(this.cloudFunApiList.REVIEW_ROOM_RATE + "?date=" + date + "&roomType=" + roomType);
  }
  /*
   * 取得今日 剩餘空間 之 資訊
   {"remanent":3,"totalRoom":3}
   */
  getTodayRate() {
    return this.httpClient.get(this.cloudFunApiList.REVIEW_ROOM_TODAY);
  }
  static {
    this.ɵfac = function CloudFunService_Factory(t) {
      return new (t || CloudFunService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_1__.HttpClient));
    };
  }
  static {
    this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({
      token: CloudFunService,
      factory: CloudFunService.ɵfac,
      providedIn: 'root'
    });
  }
}

/***/ }),

/***/ 871:
/*!*************************************************************!*\
  !*** ./src/app/firebase-api/services/fire-store.service.ts ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FireStoreService: () => (/* binding */ FireStoreService)
/* harmony export */ });
/* harmony import */ var _angular_fire_firestore__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/fire/firestore */ 1159);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 7580);



class FireStoreService {
  constructor(firestore) {
    this.firestore = firestore;
    // 資料庫表名稱
    this.fireStoreTabelNameList = {
      // 使用者資訊
      User: "User",
      // 該使用者 購買 之 方案
      UserToPayment: "UserToPayment",
      // 該使用者 之 角色
      UserToRole: "UserToRole",
      // 該使用者擁有權限
      //UserToPermission: "UserToPermission", // 2025/4/16 棄用
      // 預約資訊表
      Booking: "Booking",
      // 教室表
      Room: "Room",
      // 座位表
      RoomToSite: "RoomToSite",
      // 購買方案表
      Payment: "Payment"
    };
  }
  /*
   * 取得該資料表所有資料
   */
  getAll(tableName) {
    const collectionInstance = (0,_angular_fire_firestore__WEBPACK_IMPORTED_MODULE_0__.collection)(this.firestore, tableName);
    return (0,_angular_fire_firestore__WEBPACK_IMPORTED_MODULE_0__.collectionData)(collectionInstance, {
      idField: 'fireStoreId'
    } // 取得該 fireStoreId , 方便後續刪除 或 查詢
    );
  }
  /*
   * 藉由 欄位名稱取得資料 -- > 棄用
   */
  getDataByField(tableName, fieldName, fieldValue) {
    const q = (0,_angular_fire_firestore__WEBPACK_IMPORTED_MODULE_0__.query)((0,_angular_fire_firestore__WEBPACK_IMPORTED_MODULE_0__.collection)(this.firestore, tableName), (0,_angular_fire_firestore__WEBPACK_IMPORTED_MODULE_0__.where)(fieldName, "==", fieldValue));
    return (0,_angular_fire_firestore__WEBPACK_IMPORTED_MODULE_0__.getDocs)(q);
  }
  /*
   * 新增一筆 資料
   */
  post(tableName, newData) {
    const collectionInstance = (0,_angular_fire_firestore__WEBPACK_IMPORTED_MODULE_0__.collection)(this.firestore, tableName);
    return (0,_angular_fire_firestore__WEBPACK_IMPORTED_MODULE_0__.addDoc)(collectionInstance, newData);
  }
  /*
   * 依照 id 刪除資料
   */
  deleteById(tableName, id) {
    const docInstance = (0,_angular_fire_firestore__WEBPACK_IMPORTED_MODULE_0__.doc)(this.firestore, tableName, id);
    (0,_angular_fire_firestore__WEBPACK_IMPORTED_MODULE_0__.deleteDoc)(docInstance);
  }
  static {
    this.ɵfac = function FireStoreService_Factory(t) {
      return new (t || FireStoreService)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_fire_firestore__WEBPACK_IMPORTED_MODULE_0__.Firestore));
    };
  }
  static {
    this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({
      token: FireStoreService,
      factory: FireStoreService.ɵfac,
      providedIn: 'root'
    });
  }
}

/***/ }),

/***/ 2575:
/*!******************************************************************!*\
  !*** ./src/app/home/components/home-page/home-page.component.ts ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   HomePageComponent: () => (/* binding */ HomePageComponent)
/* harmony export */ });
/* harmony import */ var _capacitor_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @capacitor/core */ 4070);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var src_app_auth_route_services_route_url_record_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/auth-route/services/route-url-record.service */ 7228);
/* harmony import */ var _services_home_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../services/home.service */ 7031);
/* harmony import */ var src_app_auth_route_services_google_auth_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/auth-route/services/google-auth.service */ 899);
/* harmony import */ var src_app_payment_services_ecpay_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/payment/services/ecpay.service */ 395);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/common */ 316);
/* harmony import */ var _common_button_components_img_btn_img_btn_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../common/button/components/img-btn/img-btn.component */ 9790);
/* harmony import */ var _payment_components_check_payment_check_payment_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../payment/components/check-payment/check-payment.component */ 3734);









function HomePageComponent_app_check_payment_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](0, "app-check-payment");
  }
}
function HomePageComponent_div_2_app_img_btn_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "app-img-btn", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("click", function HomePageComponent_div_2_app_img_btn_3_Template_app_img_btn_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r3);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵresetView"](ctx_r1.nextPage("/review-room-overview"));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("imgUrl", "assets/images/button/button_main.png")("btnText", "\u7A7A\u9593\u7E3D\u89BD");
  }
}
function HomePageComponent_div_2_app_img_btn_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "app-img-btn", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("click", function HomePageComponent_div_2_app_img_btn_4_Template_app_img_btn_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r4);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵresetView"](ctx_r1.nextPage("/chekc-payment"));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("imgUrl", "assets/images/button/button_main.png")("btnText", "\u8CFC\u8CB7\u65B9\u6848");
  }
}
function HomePageComponent_div_2_app_img_btn_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "app-img-btn", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("click", function HomePageComponent_div_2_app_img_btn_5_Template_app_img_btn_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r5);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵresetView"](ctx_r1.nextPage("/manager-room/room-site-import"));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("imgUrl", "assets/images/button/button_main.png")("btnText", "\u7A7A\u9593\u7BA1\u7406");
  }
}
function HomePageComponent_div_2_app_img_btn_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "app-img-btn", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("click", function HomePageComponent_div_2_app_img_btn_6_Template_app_img_btn_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r6);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵresetView"](ctx_r1.nextPage("/manager-sys/all-user"));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("imgUrl", "assets/images/button/button_main.png")("btnText", "\u7CFB\u7D71\u7BA1\u7406");
  }
}
function HomePageComponent_div_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "div", 4)(1, "app-img-btn", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("click", function HomePageComponent_div_2_Template_app_img_btn_click_1_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r1);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵresetView"](ctx_r1.nextPage("/booking-date"));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](2, "app-img-btn", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("click", function HomePageComponent_div_2_Template_app_img_btn_click_2_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r1);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵresetView"](ctx_r1.nextPage("/review-booking-calendar"));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](3, HomePageComponent_div_2_app_img_btn_3_Template, 1, 2, "app-img-btn", 6)(4, HomePageComponent_div_2_app_img_btn_4_Template, 1, 2, "app-img-btn", 6)(5, HomePageComponent_div_2_app_img_btn_5_Template, 1, 2, "app-img-btn", 6)(6, HomePageComponent_div_2_app_img_btn_6_Template, 1, 2, "app-img-btn", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("imgUrl", "assets/images/button/button_main.png")("btnText", "\u9810\u7D04\u7A7A\u9593");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("imgUrl", "assets/images/button/button_main.png")("btnText", "\u5DF2\u9810\u7D04");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngIf", ctx_r1.isOwner || ctx_r1.isSystem);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngIf", ctx_r1.isOwner || ctx_r1.isSystem);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngIf", ctx_r1.isOwner || ctx_r1.isSystem);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngIf", ctx_r1.isSystem);
  }
}
function HomePageComponent_div_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "div", 4)(1, "app-img-btn", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("click", function HomePageComponent_div_3_Template_app_img_btn_click_1_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r7);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵresetView"](ctx_r1.nextPage("/booker-select-owner"));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](2, "app-img-btn", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("click", function HomePageComponent_div_3_Template_app_img_btn_click_2_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r7);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵresetView"](ctx_r1.nextPage("/chekc-payment"));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("imgUrl", "assets/images/button/button_main.png")("btnText", "\u9810\u7D04\u8005");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("imgUrl", "assets/images/button/button_main.png")("btnText", "\u64C1\u6709\u8005");
  }
}
function HomePageComponent_div_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "div", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](1, "img", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
  }
}
class HomePageComponent {
  constructor(routeUrlRecordService, homeService, googleAuthService, ecpayService) {
    this.routeUrlRecordService = routeUrlRecordService;
    this.homeService = homeService;
    this.googleAuthService = googleAuthService;
    this.ecpayService = ecpayService;
    /**
     * 升級, 退費機制, 先暫緩, 寫死畫面
     * 續約直接新增按鈕
     */
    this.isLoading = true;
    this.isHasRole = true;
    this.isOwner = false;
    this.isSystem = false;
    this.isExpired = false;
    this.isNativeApp = false; // 是否為原生App
    //alert("isExpired: " + this.isExpired);
  }
  ngOnInit() {
    //const userId = this.googleAuthService.getCurrentUser().userFirestoreId; // google User 舊 id
    const userId = this.googleAuthService.getCurrentUser().id;
    // 檢查 當前 使用者 角色 (待抽離)
    this.homeService.getUserRole(userId).subscribe(data => {
      if (data.result.length === 0) {
        alert("尚未擁有角色,請選擇角色");
        this.isHasRole = false;
        this.isLoading = false;
        return;
      }
      // 先判斷是否為 系統管理員system 
      if (data.result.some(userToRole => userToRole.role === "system")) {
        this.isSystem = true;
      }
      // 判斷是否為 擁有者owner 
      if (!data.result.some(userToRole => userToRole.role === "owner")) {
        this.isLoading = false;
        return;
      }
      // 判斷 擁有者owner 購買方案是否過期
      this.ecpayService.getUserToPayment(userId).subscribe(res => {
        const {
          purchaseDate,
          expiryDate
        } = res.result;
        const currentDate = new Date();
        if (currentDate >= new Date(expiryDate)) {
          this.isExpired = true;
        }
        // 若沒過期, 則顯示
        else {
          this.isOwner = true;
        }
        this.isLoading = false;
      });
    });
    // 使用 Capacitor 判斷是否運行在原生平台
    this.isNativeApp = _capacitor_core__WEBPACK_IMPORTED_MODULE_0__.Capacitor.isNativePlatform();
    console.log(" isNativeApp: ", this.isNativeApp);
  }
  /*
   * 進入功能頁面
   */
  nextPage(nextUrl) {
    this.routeUrlRecordService.nextPage(nextUrl, {});
  }
  static {
    this.ɵfac = function HomePageComponent_Factory(t) {
      return new (t || HomePageComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](src_app_auth_route_services_route_url_record_service__WEBPACK_IMPORTED_MODULE_1__.RouteUrlRecordService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_services_home_service__WEBPACK_IMPORTED_MODULE_2__.HomeService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](src_app_auth_route_services_google_auth_service__WEBPACK_IMPORTED_MODULE_3__.GoogleAuthService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](src_app_payment_services_ecpay_service__WEBPACK_IMPORTED_MODULE_4__.EcpayService));
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineComponent"]({
      type: HomePageComponent,
      selectors: [["app-home-page"]],
      decls: 5,
      vars: 4,
      consts: [[1, "container"], [4, "ngIf"], ["class", "home-list-container", 4, "ngIf"], ["class", "loading-gif", 4, "ngIf"], [1, "home-list-container"], [3, "click", "imgUrl", "btnText"], [3, "imgUrl", "btnText", "click", 4, "ngIf"], [1, "loading-gif"], ["src", "assets/images/icon/icon_loading.gif", 2, "width", "50px"]],
      template: function HomePageComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "div", 0);
          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](1, HomePageComponent_app_check_payment_1_Template, 1, 0, "app-check-payment", 1)(2, HomePageComponent_div_2_Template, 7, 8, "div", 2)(3, HomePageComponent_div_3_Template, 3, 4, "div", 2)(4, HomePageComponent_div_4_Template, 2, 0, "div", 3);
          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        }
        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngIf", ctx.isExpired);
          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngIf", ctx.isHasRole);
          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngIf", !ctx.isHasRole);
          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngIf", ctx.isLoading);
        }
      },
      dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_8__.NgIf, _common_button_components_img_btn_img_btn_component__WEBPACK_IMPORTED_MODULE_5__.ImgBtnComponent, _payment_components_check_payment_check_payment_component__WEBPACK_IMPORTED_MODULE_6__.CheckPaymentComponent],
      styles: ["@charset \"UTF-8\";\n.home-list-container[_ngcontent-%COMP%] {\n  width: 90%;\n  max-width: 800px;\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: center; \n\n  gap: 40px;\n  padding: 40px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImhvbWUtcGFnZS5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxnQkFBZ0I7QUFDaEI7RUFDSSxVQUFBO0VBQ0EsZ0JBQUE7RUFDQSxhQUFBO0VBQ0EsZUFBQTtFQUNBLHVCQUFBLEVBQUEsV0FBQTtFQUNBLFNBQUE7RUFDQSxhQUFBO0FBQ0oiLCJmaWxlIjoiaG9tZS1wYWdlLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbi5ob21lLWxpc3QtY29udGFpbmVyIHtcclxuICAgIHdpZHRoOiA5MCU7XHJcbiAgICBtYXgtd2lkdGg6IDgwMHB4O1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGZsZXgtd3JhcDogd3JhcDtcclxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyOyAvKiDnorrkv53mjInpiJXnva7kuK0gKi9cclxuICAgIGdhcDogNDBweDtcclxuICAgIHBhZGRpbmc6IDQwcHg7XHJcbn1cclxuIl19 */\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvaG9tZS9jb21wb25lbnRzL2hvbWUtcGFnZS9ob21lLXBhZ2UuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsZ0JBQWdCO0FBQ2hCO0VBQ0ksVUFBQTtFQUNBLGdCQUFBO0VBQ0EsYUFBQTtFQUNBLGVBQUE7RUFDQSx1QkFBQSxFQUFBLFdBQUE7RUFDQSxTQUFBO0VBQ0EsYUFBQTtBQUNKO0FBQ0Esd3BCQUF3cEIiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuLmhvbWUtbGlzdC1jb250YWluZXIge1xyXG4gICAgd2lkdGg6IDkwJTtcclxuICAgIG1heC13aWR0aDogODAwcHg7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgZmxleC13cmFwOiB3cmFwO1xyXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7IC8qIMOnwqLCusOkwr/CncOmwozCicOpwojClcOnwr3CrsOkwrjCrSAqL1xyXG4gICAgZ2FwOiA0MHB4O1xyXG4gICAgcGFkZGluZzogNDBweDtcclxufVxyXG4iXSwic291cmNlUm9vdCI6IiJ9 */"]
    });
  }
}

/***/ }),

/***/ 7031:
/*!***********************************************!*\
  !*** ./src/app/home/services/home.service.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   HomeService: () => (/* binding */ HomeService)
/* harmony export */ });
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/environments/environment */ 5312);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var src_app_firebase_api_services_fire_store_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/firebase-api/services/fire-store.service */ 871);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ 6443);




class HomeService {
  constructor(fireStoreService, httpClient) {
    this.fireStoreService = fireStoreService;
    this.httpClient = httpClient;
    this.DOMAIN = src_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.domain;
    this.CONTEXT = "/api/account";
    this.BASE_URL = this.DOMAIN + this.CONTEXT;
  }
  /*
   * 檢查是否顯示 [空間總覽]
   */
  getAllRoom() {
    const roomTable = this.fireStoreService.fireStoreTabelNameList.Room;
    return this.fireStoreService.getAll(roomTable);
  }
  /*
   * 取得 該 使用者 之 角色
   */
  getUserRole(userId) {
    /*                         ng to firestore 全面棄用 !
    const userToRoleTable = this.fireStoreService.fireStoreTabelNameList.UserToRole;
    return this.fireStoreService.getDataByField(userToRoleTable, "userId", userId);
    */
    return this.httpClient.get(`${this.BASE_URL}/role/${userId}`);
  }
  static {
    this.ɵfac = function HomeService_Factory(t) {
      return new (t || HomeService)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](src_app_firebase_api_services_fire_store_service__WEBPACK_IMPORTED_MODULE_1__.FireStoreService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_3__.HttpClient));
    };
  }
  static {
    this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({
      token: HomeService,
      factory: HomeService.ɵfac,
      providedIn: 'root'
    });
  }
}

/***/ }),

/***/ 2659:
/*!************************************************************************************************!*\
  !*** ./src/app/manager-room/components/content/room-site-import/room-site-import.component.ts ***!
  \************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   RoomSiteImportComponent: () => (/* binding */ RoomSiteImportComponent)
/* harmony export */ });
/* harmony import */ var _common_export_import_sample_roomToSiteList_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../common/export-import/sample/roomToSiteList.json */ 942);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var src_app_common_export_import_services_export_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/common/export-import/services/export.service */ 5391);
/* harmony import */ var src_app_auth_route_services_google_auth_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/auth-route/services/google-auth.service */ 899);
/* harmony import */ var src_app_manager_room_services_room_dashboard_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/manager-room/services/room-dashboard.service */ 3984);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ 316);






function RoomSiteImportComponent_div_18_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1, "\u5C1A\u7121\u8CC7\u6599");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
}
function RoomSiteImportComponent_ul_19_li_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "li");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const result_r3 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"](" ", result_r3.message, " ");
  }
}
function RoomSiteImportComponent_ul_19_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "ul");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](1, RoomSiteImportComponent_ul_19_li_1_Template, 2, 1, "li", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngForOf", ctx_r3.resultList);
  }
}
function RoomSiteImportComponent_div_20_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](1, "img", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
}
class RoomSiteImportComponent {
  constructor(exportService, googleAuthService, roomDashboardService) {
    this.exportService = exportService;
    this.googleAuthService = googleAuthService;
    this.roomDashboardService = roomDashboardService;
    this.isLoading = false;
    this.resultList = [];
  }
  clickSampleToCsv() {
    const csvData = this.exportService.convertToCSV(_common_export_import_sample_roomToSiteList_json__WEBPACK_IMPORTED_MODULE_0__.roomToSiteList);
    this.exportService.downloadCSV(csvData, '教室座位範本.csv');
  }
  // 使用者選取檔案後, 將 csv轉為json
  handleFiles(event) {
    this.isLoading = true;
    const ownerId = this.googleAuthService.getCurrentUser().id;
    const input = event.target;
    if (!input.files || input.files.length === 0) {
      console.warn('沒有選取任何檔案');
      this.isLoading = false;
      return;
    }
    const file = input.files[0];
    const reader = new FileReader();
    reader.onload = e => {
      const csvText = e.target.result;
      const lines = csvText.trim().split('\n');
      // 假設第一行是標題欄位
      const headers = lines[0].split(',').map(h => h.trim());
      const data = lines.slice(1).map(line => {
        const values = line.split(',').map(v => v.trim().replace(/^"|"$/g, '') // ✅ 去除前後雙引號
        );
        const item = {};
        headers.forEach((header, index) => {
          item[header] = values[index] || '';
        });
        return item;
      });
      const result = {
        roomToSiteList: data
      };
      console.log('匯入轉換後的 JSON 結果:', result);
      this.roomDashboardService.importRoomToSite(ownerId, result).subscribe({
        next: res => {
          alert("匯入結束");
          console.log("匯入結束", res);
          this.resultList = res.result;
          this.isLoading = false;
        },
        error: err => {
          console.log(err);
          this.isLoading = false;
        }
      });
    };
    reader.onerror = () => {
      console.error('讀取檔案錯誤');
      this.isLoading = false;
    };
    reader.readAsText(file, 'utf-8');
  }
  static {
    this.ɵfac = function RoomSiteImportComponent_Factory(t) {
      return new (t || RoomSiteImportComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](src_app_common_export_import_services_export_service__WEBPACK_IMPORTED_MODULE_1__.ExportService), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](src_app_auth_route_services_google_auth_service__WEBPACK_IMPORTED_MODULE_2__.GoogleAuthService), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](src_app_manager_room_services_room_dashboard_service__WEBPACK_IMPORTED_MODULE_3__.RoomDashboardService));
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineComponent"]({
      type: RoomSiteImportComponent,
      selectors: [["app-room-site-import"]],
      decls: 21,
      vars: 3,
      consts: [["csvFileInput", ""], [3, "click"], ["type", "file", "multiple", "", "accept", ".csv", 2, "display", "none", 3, "change"], [4, "ngIf"], ["class", "loading-gif", 4, "ngIf"], [4, "ngFor", "ngForOf"], [1, "loading-gif"], ["src", "assets/images/icon/icon_loading.gif", 2, "width", "50px"]],
      template: function RoomSiteImportComponent_Template(rf, ctx) {
        if (rf & 1) {
          const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵgetCurrentView"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "h2");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1, "\u532F\u5165\u6559\u5BA4\u5EA7\u4F4D");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](2, "p");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](3, "1. \u6240\u6709\u6B04\u4F4D\u70BA \u5FC5\u586B\u6B04\u4F4D\u3002(\u53C3\u8003 [\u532F\u51FA\u7BC4\u672C] )");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](4, "p");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](5, "2. \u6559\u5BA4\u540D\u7A31 \u8207 \u5EA7\u4F4D\u540D\u7A31 \u82E5\u90FD\u5B58\u5728\u65BC\u7CFB\u7D71, \u5247\u8A72\u7B46\u8CC7\u6599\u4E0D\u532F\u5165\u3002 ");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](6, "p");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](7, "3. \u6559\u5BA4\u540D\u7A31 \u82E5\u4E0D\u5B58\u5728\u65BC\u7CFB\u7D71, \u5C07\u81EA\u52D5\u65B0\u589E\u8A72 \u6559\u5BA4 \u8207 \u5EA7\u4F4D\u3002 ");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](8, "p");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](9, "4. \u6559\u5BA4\u540D\u7A31 \u82E5\u5DF2\u5B58\u5728\u7CFB\u7D71, \u8A72 \u5EA7\u4F4D \u76F4\u63A5\u65B0\u589E\u65BC\u8A72 \u6559\u5BA4 \u4E0B\u3002 ");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](10, "button", 1);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function RoomSiteImportComponent_Template_button_click_10_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r1);
            return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](ctx.clickSampleToCsv());
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](11, "\u532F\u51FA\u7BC4\u672C");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](12, "input", 2, 0);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("change", function RoomSiteImportComponent_Template_input_change_12_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r1);
            return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](ctx.handleFiles($event));
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](14, "button", 1);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function RoomSiteImportComponent_Template_button_click_14_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r1);
            const csvFileInput_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵreference"](13);
            return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](csvFileInput_r2.click());
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](15, "\u532F\u5165\u6559\u5BA4\u5EA7\u4F4D");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](16, "h2");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](17, "\u532F\u5165\u7D50\u679C");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](18, RoomSiteImportComponent_div_18_Template, 2, 0, "div", 3)(19, RoomSiteImportComponent_ul_19_Template, 2, 1, "ul", 3)(20, RoomSiteImportComponent_div_20_Template, 2, 0, "div", 4);
        }
        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](18);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx.resultList.length === 0 && !ctx.isLoading);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx.resultList.length !== 0 && !ctx.isLoading);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx.isLoading);
        }
      },
      dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_5__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_5__.NgIf],
      styles: ["/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJyb29tLXNpdGUtaW1wb3J0LmNvbXBvbmVudC5zY3NzIn0= */\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvbWFuYWdlci1yb29tL2NvbXBvbmVudHMvY29udGVudC9yb29tLXNpdGUtaW1wb3J0L3Jvb20tc2l0ZS1pbXBvcnQuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUNBLGdMQUFnTCIsInNvdXJjZVJvb3QiOiIifQ== */"]
    });
  }
}

/***/ }),

/***/ 8179:
/*!******************************************************************************************************!*\
  !*** ./src/app/manager-room/components/content/search-booking-user/search-booking-user.component.ts ***!
  \******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SearchBookingUserComponent: () => (/* binding */ SearchBookingUserComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _services_room_dashboard_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../services/room-dashboard.service */ 3984);
/* harmony import */ var src_app_common_export_import_services_export_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/common/export-import/services/export.service */ 5391);
/* harmony import */ var src_app_auth_route_services_google_auth_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/auth-route/services/google-auth.service */ 899);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 316);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ 4456);






function SearchBookingUserComponent_div_12_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, "\u958B\u59CB\u641C\u5C0B");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
}
function SearchBookingUserComponent_div_13_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, "\u6C92\u6709\u627E\u5230\u7D50\u679C");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
}
function SearchBookingUserComponent_ul_14_li_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "li")(1, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](2, "\u64C1\u6709\u8005id:");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](4, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](5, "\u64C1\u6709\u8005\u59D3\u540D:");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](7, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](8, "\u64C1\u6709\u8005\u4FE1\u7BB1:");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](10, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](11, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](12, "\u9810\u7D04\u8005id:");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](13);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](14, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](15, "\u59D3\u540D:");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](16);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](17, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](18, "\u4FE1\u7BB1:");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](19);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const user_r1 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", user_r1.ownerId, " | ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", user_r1.ownerName, " | ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", user_r1.ownerEmail, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", user_r1.id, " | ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", user_r1.name, " | ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", user_r1.email, " ");
  }
}
function SearchBookingUserComponent_ul_14_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "ul");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](1, SearchBookingUserComponent_ul_14_li_1_Template, 20, 6, "li", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngForOf", ctx_r1.users);
  }
}
function SearchBookingUserComponent_div_15_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](1, "img", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
}
class SearchBookingUserComponent {
  constructor(roomDashboardService, exportService, googleAuthService) {
    this.roomDashboardService = roomDashboardService;
    this.exportService = exportService;
    this.googleAuthService = googleAuthService;
    this.isDefault = true;
    this.isLoading = false;
    this.searchName = '';
    this.searchMail = '';
    this.users = []; // 存放搜尋結果
  }
  exportUserList() {
    const ownerId = this.googleAuthService.getCurrentUser().id;
    this.roomDashboardService.exportUserList(ownerId).subscribe({
      next: res => {
        if (res.result && res.result.length > 0) {
          const csvData = this.exportService.convertToCSV(res.result);
          this.exportService.downloadCSV(csvData, '預約者資訊.csv');
        } else {
          alert('無可匯出的資料');
        }
      },
      error: err => console.error('匯出錯誤:', err)
    });
  }
  searchUser() {
    const searchData = {
      user: {}
    };
    this.isDefault = false;
    this.isLoading = true;
    if (this.searchName.trim()) {
      searchData.user.name = this.searchName;
    }
    if (this.searchMail.trim()) {
      searchData.user.email = this.searchMail;
    }
    /*
    if (!searchData.user.name && !searchData.user.mail) {
        alert('請輸入姓名或信箱');
        return;
    }
    */
    const ownerId = this.googleAuthService.getCurrentUser().id;
    this.roomDashboardService.searchUser(ownerId, searchData).subscribe({
      next: res => {
        this.users = res.result || [];
        this.isLoading = false;
      },
      error: err => {
        console.error('搜尋錯誤', err);
        this.isLoading = false;
      }
    });
  }
  static {
    this.ɵfac = function SearchBookingUserComponent_Factory(t) {
      return new (t || SearchBookingUserComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_services_room_dashboard_service__WEBPACK_IMPORTED_MODULE_0__.RoomDashboardService), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](src_app_common_export_import_services_export_service__WEBPACK_IMPORTED_MODULE_1__.ExportService), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](src_app_auth_route_services_google_auth_service__WEBPACK_IMPORTED_MODULE_2__.GoogleAuthService));
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({
      type: SearchBookingUserComponent,
      selectors: [["app-search-booking-user"]],
      decls: 16,
      vars: 6,
      consts: [[1, "search-bar"], [3, "click"], ["type", "text", "placeholder", "\u9810\u7D04\u8005\u5E33\u865F\u4E0D\u9650", 3, "ngModelChange", "ngModel"], ["type", "text", "placeholder", "\u9810\u7D04\u8005\u4FE1\u7BB1\u4E0D\u9650", 3, "ngModelChange", "ngModel"], [1, "search-result"], [4, "ngIf"], ["class", "loading-gif", 4, "ngIf"], [4, "ngFor", "ngForOf"], [1, "loading-gif"], ["src", "assets/images/icon/icon_loading.gif", 2, "width", "50px"]],
      template: function SearchBookingUserComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 0)(1, "button", 1);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function SearchBookingUserComponent_Template_button_click_1_listener() {
            return ctx.exportUserList();
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](2, "\u532F\u51FA\u9810\u7D04\u8005");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](3, "br");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](4, "input", 2);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtwoWayListener"]("ngModelChange", function SearchBookingUserComponent_Template_input_ngModelChange_4_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtwoWayBindingSet"](ctx.searchName, $event) || (ctx.searchName = $event);
            return $event;
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](5, "span");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](6, "\u4E26\u4E14");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](7, "input", 3);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtwoWayListener"]("ngModelChange", function SearchBookingUserComponent_Template_input_ngModelChange_7_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtwoWayBindingSet"](ctx.searchMail, $event) || (ctx.searchMail = $event);
            return $event;
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](8, "br");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](9, "button", 1);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function SearchBookingUserComponent_Template_button_click_9_listener() {
            return ctx.searchUser();
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](10, "\u641C\u5C0B");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](11, "div", 4);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](12, SearchBookingUserComponent_div_12_Template, 2, 0, "div", 5)(13, SearchBookingUserComponent_div_13_Template, 2, 0, "div", 5)(14, SearchBookingUserComponent_ul_14_Template, 2, 1, "ul", 5)(15, SearchBookingUserComponent_div_15_Template, 2, 0, "div", 6);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        }
        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](4);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtwoWayProperty"]("ngModel", ctx.searchName);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtwoWayProperty"]("ngModel", ctx.searchMail);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](5);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.isDefault);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.users.length === 0 && !ctx.isDefault && !ctx.isLoading);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.users.length > 0);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.isLoading);
        }
      },
      dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_4__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_4__.NgIf, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.NgModel],
      styles: ["/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzZWFyY2gtYm9va2luZy11c2VyLmNvbXBvbmVudC5zY3NzIn0= */\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvbWFuYWdlci1yb29tL2NvbXBvbmVudHMvY29udGVudC9zZWFyY2gtYm9va2luZy11c2VyL3NlYXJjaC1ib29raW5nLXVzZXIuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUNBLG9MQUFvTCIsInNvdXJjZVJvb3QiOiIifQ== */"]
    });
  }
}

/***/ }),

/***/ 5141:
/*!********************************************************************************************!*\
  !*** ./src/app/manager-room/components/content/search-booking/search-booking.component.ts ***!
  \********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SearchBookingComponent: () => (/* binding */ SearchBookingComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ 5072);
/* harmony import */ var _services_room_dashboard_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../services/room-dashboard.service */ 3984);
/* harmony import */ var src_app_auth_route_services_google_auth_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/auth-route/services/google-auth.service */ 899);
/* harmony import */ var src_app_common_export_import_services_export_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/common/export-import/services/export.service */ 5391);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ 316);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/forms */ 4456);







function SearchBookingComponent_div_19_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, "\u958B\u59CB\u641C\u5C0B");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
}
function SearchBookingComponent_div_20_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, "\u6C92\u6709\u627E\u5230\u7D50\u679C");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
}
function SearchBookingComponent_ul_21_li_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "li")(1, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](2, "\u9810\u7D04\u8005\u4FE1\u7BB1:");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](4, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](5, "\u6559\u5BA4\u540D\u7A31:");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](7, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](8, "\u5EA7\u4F4D\u540D\u7A31:");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](10, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](11, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](12, "\u9810\u7D04\u65E5\u671F:");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](13);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](14, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](15, "\u9810\u7D04\u6642\u9593:");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](16);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const booking_r1 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", booking_r1.mail, " | ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", booking_r1.roomName, " | ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", booking_r1.siteName, " | ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", booking_r1.startDate, " | ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate2"](" ", booking_r1.startTime, " ~ ", booking_r1.endTime, " | ");
  }
}
function SearchBookingComponent_ul_21_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "ul");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](1, SearchBookingComponent_ul_21_li_1_Template, 17, 6, "li", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngForOf", ctx_r1.bookingList);
  }
}
function SearchBookingComponent_div_22_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](1, "img", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
}
class SearchBookingComponent {
  constructor(router, roomDashboardService, googleAuthService, exportService) {
    this.router = router;
    this.roomDashboardService = roomDashboardService;
    this.googleAuthService = googleAuthService;
    this.exportService = exportService;
    this.isDefault = true;
    this.isLoading = false;
    this.roomName = "";
    this.siteName = "";
    this.startDateMin = "";
    this.startDateMax = "";
    this.bookingList = [];
  }
  clickExportBooking() {
    const ownerId = this.googleAuthService.getCurrentUser().id;
    this.roomDashboardService.exportBooking(ownerId).subscribe({
      next: res => {
        const bookingList = res.result || [];
        if (bookingList.length === 0) {
          alert("匯出無資料");
          return;
        }
        const csvData = this.exportService.convertToCSV(bookingList);
        this.exportService.downloadCSV(csvData, '預約紀錄.csv');
      },
      error: err => {
        alert("匯出錯誤 err :" + err);
        console.error('匯出錯誤', err);
      }
    });
  }
  clickSearchBooking() {
    const searchData = {
      booking: {}
    };
    this.isDefault = false;
    this.isLoading = true;
    if (this.roomName.trim()) {
      searchData.booking.roomName = this.roomName;
    }
    if (this.siteName.trim()) {
      searchData.booking.siteName = this.siteName;
    }
    if (this.startDateMin.trim()) {
      searchData.booking.startDateMin = this.startDateMin;
    }
    if (this.startDateMax.trim()) {
      searchData.booking.startDateMax = this.startDateMax;
    }
    const ownerId = this.googleAuthService.getCurrentUser().id;
    this.roomDashboardService.searchBooking(ownerId, searchData).subscribe({
      next: res => {
        this.bookingList = res.result || [];
        this.isLoading = false;
      },
      error: err => {
        console.error('搜尋錯誤', err);
        this.isLoading = false;
      }
    });
  }
  static {
    this.ɵfac = function SearchBookingComponent_Factory(t) {
      return new (t || SearchBookingComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_4__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_services_room_dashboard_service__WEBPACK_IMPORTED_MODULE_0__.RoomDashboardService), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](src_app_auth_route_services_google_auth_service__WEBPACK_IMPORTED_MODULE_1__.GoogleAuthService), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](src_app_common_export_import_services_export_service__WEBPACK_IMPORTED_MODULE_2__.ExportService));
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({
      type: SearchBookingComponent,
      selectors: [["app-search-booking"]],
      decls: 23,
      vars: 8,
      consts: [[3, "click"], [1, "search-bar"], ["type", "text", "placeholder", "\u9810\u7D04\u6559\u5BA4\u540D\u7A31\u4E0D\u9650", 3, "ngModelChange", "ngModel"], ["type", "text", "placeholder", "\u9810\u7D04\u5EA7\u4F4D\u540D\u7A31\u4E0D\u9650", 3, "ngModelChange", "ngModel"], ["type", "text", "placeholder", "\u7BC4\u570D\u958B\u59CB\u65E5\u4E0D\u9650", 3, "ngModelChange", "ngModel"], ["type", "text", "placeholder", "\u7BC4\u570D\u7D50\u675F\u65E5\u4E0D\u9650", 3, "ngModelChange", "ngModel"], [1, "search-result"], [4, "ngIf"], ["class", "loading-gif", 4, "ngIf"], [4, "ngFor", "ngForOf"], [1, "loading-gif"], ["src", "assets/images/icon/icon_loading.gif", 2, "width", "50px"]],
      template: function SearchBookingComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "button", 0);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function SearchBookingComponent_Template_button_click_0_listener() {
            return ctx.clickExportBooking();
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, "\u532F\u51FA\u9810\u7D04\u7D00\u9304");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](2, "div", 1)(3, "input", 2);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtwoWayListener"]("ngModelChange", function SearchBookingComponent_Template_input_ngModelChange_3_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtwoWayBindingSet"](ctx.roomName, $event) || (ctx.roomName = $event);
            return $event;
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](4, "span");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](5, "\u4E26\u4E14");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](6, "input", 3);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtwoWayListener"]("ngModelChange", function SearchBookingComponent_Template_input_ngModelChange_6_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtwoWayBindingSet"](ctx.siteName, $event) || (ctx.siteName = $event);
            return $event;
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](7, "br")(8, "br");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](9, "span");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](10, "\u4E26\u4E14 \u9810\u7D04\u65E5\u671F \u7BC4\u570D:");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](11, "input", 4);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtwoWayListener"]("ngModelChange", function SearchBookingComponent_Template_input_ngModelChange_11_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtwoWayBindingSet"](ctx.startDateMin, $event) || (ctx.startDateMin = $event);
            return $event;
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](12, "span");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](13, "~");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](14, "input", 5);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtwoWayListener"]("ngModelChange", function SearchBookingComponent_Template_input_ngModelChange_14_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtwoWayBindingSet"](ctx.startDateMax, $event) || (ctx.startDateMax = $event);
            return $event;
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](15, "br");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](16, "button", 0);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function SearchBookingComponent_Template_button_click_16_listener() {
            return ctx.clickSearchBooking();
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](17, "\u641C\u5C0B");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](18, "div", 6);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](19, SearchBookingComponent_div_19_Template, 2, 0, "div", 7)(20, SearchBookingComponent_div_20_Template, 2, 0, "div", 7)(21, SearchBookingComponent_ul_21_Template, 2, 1, "ul", 7)(22, SearchBookingComponent_div_22_Template, 2, 0, "div", 8);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        }
        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtwoWayProperty"]("ngModel", ctx.roomName);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtwoWayProperty"]("ngModel", ctx.siteName);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](5);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtwoWayProperty"]("ngModel", ctx.startDateMin);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtwoWayProperty"]("ngModel", ctx.startDateMax);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](5);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.isDefault);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.bookingList.length === 0 && !ctx.isDefault && !ctx.isLoading);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.bookingList.length > 0);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.isLoading);
        }
      },
      dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_5__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_5__.NgIf, _angular_forms__WEBPACK_IMPORTED_MODULE_6__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_6__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_6__.NgModel],
      styles: ["/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzZWFyY2gtYm9va2luZy5jb21wb25lbnQuc2NzcyJ9 */\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvbWFuYWdlci1yb29tL2NvbXBvbmVudHMvY29udGVudC9zZWFyY2gtYm9va2luZy9zZWFyY2gtYm9va2luZy5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQ0EsNEtBQTRLIiwic291cmNlUm9vdCI6IiJ9 */"]
    });
  }
}

/***/ }),

/***/ 1243:
/*!******************************************************************************************************!*\
  !*** ./src/app/manager-room/components/content/search-room-content/search-room-content.component.ts ***!
  \******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SearchRoomContentComponent: () => (/* binding */ SearchRoomContentComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 5072);
/* harmony import */ var src_app_auth_route_services_google_auth_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/auth-route/services/google-auth.service */ 899);
/* harmony import */ var src_app_manager_room_services_room_dashboard_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/manager-room/services/room-dashboard.service */ 3984);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 316);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ 4456);






function SearchRoomContentComponent_button_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "button", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function SearchRoomContentComponent_button_3_Template_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r1);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx_r1.clickAddRoom());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, "\u65B0\u589E");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
}
function SearchRoomContentComponent_button_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "button", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function SearchRoomContentComponent_button_4_Template_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r3);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx_r1.clickUpdateRoom());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, "\u66F4\u65B0");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
}
class SearchRoomContentComponent {
  constructor(router, activatedRoute, googleAuthService, roomDashboardService) {
    this.router = router;
    this.activatedRoute = activatedRoute;
    this.googleAuthService = googleAuthService;
    this.roomDashboardService = roomDashboardService;
    this.model = ""; // 新增 add , 編輯 edit
    this.name = "";
  }
  ngOnInit() {
    // 取得 model (新增 add , 編輯 edit), 若編輯, 取得編輯方案
    this.activatedRoute.queryParams.subscribe(params => {
      this.model = params['model'];
      if (this.model === 'edit') {
        this.room = this.roomDashboardService.getRoom();
        this.name = this.room.name;
      }
    });
  }
  /** 新增, 更新 前, 檢查欄位 */
  isFieldOk() {
    if (!this.name || this.name.trim() === "") {
      alert("請輸入教室名稱");
      return false;
    }
    return true;
  }
  clickAddRoom() {
    if (!this.isFieldOk()) return;
    const name = this.name;
    const ownerId = this.googleAuthService.getCurrentUser().id;
    this.roomDashboardService.addRoom(ownerId, {
      name
    }).subscribe({
      next: res => {
        alert("教室 新增成功 ");
        this.router.navigate(["/manager-room/room"], {});
      },
      error: err => {
        alert("教室 新增失敗 err " + err);
      }
    });
  }
  clickUpdateRoom() {
    if (!this.isFieldOk()) return;
    const name = this.name;
    const id = this.room.id;
    const ownerId = this.googleAuthService.getCurrentUser().id;
    this.roomDashboardService.updateRoom(ownerId, {
      id,
      name
    }).subscribe({
      next: res => {
        alert("教室 更新成功 ");
        this.router.navigate(["/manager-room/room"], {});
      },
      error: err => {
        alert("教室 更新失敗 err " + err);
      }
    });
  }
  static {
    this.ɵfac = function SearchRoomContentComponent_Factory(t) {
      return new (t || SearchRoomContentComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_3__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_3__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](src_app_auth_route_services_google_auth_service__WEBPACK_IMPORTED_MODULE_0__.GoogleAuthService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](src_app_manager_room_services_room_dashboard_service__WEBPACK_IMPORTED_MODULE_1__.RoomDashboardService));
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({
      type: SearchRoomContentComponent,
      selectors: [["app-search-room-content"]],
      decls: 5,
      vars: 4,
      consts: [["type", "text", "placeholder", "\u6559\u5BA4\u540D\u7A31", 3, "ngModelChange", "ngModel"], [3, "click", 4, "ngIf"], [3, "click"]],
      template: function SearchRoomContentComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "h2");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](2, "input", 0);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayListener"]("ngModelChange", function SearchRoomContentComponent_Template_input_ngModelChange_2_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayBindingSet"](ctx.name, $event) || (ctx.name = $event);
            return $event;
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](3, SearchRoomContentComponent_button_3_Template, 2, 0, "button", 1)(4, SearchRoomContentComponent_button_4_Template, 2, 0, "button", 1);
        }
        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"]("", ctx.model === "add" ? "\u65B0\u589E" : "\u7DE8\u8F2F", "\u6559\u5BA4");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayProperty"]("ngModel", ctx.name);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.model === "add");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.model === "edit");
        }
      },
      dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_4__.NgIf, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.NgModel],
      styles: ["/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzZWFyY2gtcm9vbS1jb250ZW50LmNvbXBvbmVudC5zY3NzIn0= */\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvbWFuYWdlci1yb29tL2NvbXBvbmVudHMvY29udGVudC9zZWFyY2gtcm9vbS1jb250ZW50L3NlYXJjaC1yb29tLWNvbnRlbnQuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUNBLG9MQUFvTCIsInNvdXJjZVJvb3QiOiIifQ== */"]
    });
  }
}

/***/ }),

/***/ 9715:
/*!**************************************************************************************!*\
  !*** ./src/app/manager-room/components/content/search-room/search-room.component.ts ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SearchRoomComponent: () => (/* binding */ SearchRoomComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ 5072);
/* harmony import */ var _services_room_dashboard_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../services/room-dashboard.service */ 3984);
/* harmony import */ var src_app_auth_route_services_google_auth_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/auth-route/services/google-auth.service */ 899);
/* harmony import */ var src_app_common_export_import_services_export_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/common/export-import/services/export.service */ 5391);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ 316);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/forms */ 4456);







function SearchRoomComponent_div_10_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, "\u958B\u59CB\u641C\u5C0B");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
}
function SearchRoomComponent_div_11_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, "\u6C92\u6709\u627E\u5230\u7D50\u679C");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
}
function SearchRoomComponent_ul_12_li_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "li")(1, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](2, "\u64C1\u6709\u8005id:");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](4, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](5, "\u64C1\u6709\u8005\u4FE1\u7BB1:");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](7, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](8, "\u6559\u5BA4\u540D\u7A31:");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](10, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](11, "button", 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function SearchRoomComponent_ul_12_li_1_Template_button_click_11_listener() {
      const room_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r1).$implicit;
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r2.clickEditRoom(room_r2));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](12, "\u7DE8\u8F2F");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](13, "button", 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function SearchRoomComponent_ul_12_li_1_Template_button_click_13_listener() {
      const room_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r1).$implicit;
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r2.clickDeleteRoom(room_r2));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](14, "\u522A\u9664");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const room_r2 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", room_r2.ownerId, " | ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", room_r2.email, " | ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", room_r2.name, " | ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵstyleProp"]("opacity", room_r2.haveSite ? 0.5 : 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵstyleProp"]("opacity", room_r2.haveSite ? 0.5 : 1);
  }
}
function SearchRoomComponent_ul_12_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "ul");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](1, SearchRoomComponent_ul_12_li_1_Template, 15, 7, "li", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngForOf", ctx_r2.roomList);
  }
}
function SearchRoomComponent_div_13_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](1, "img", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
}
class SearchRoomComponent {
  constructor(router, roomDashboardService, googleAuthService, exportService) {
    this.router = router;
    this.roomDashboardService = roomDashboardService;
    this.googleAuthService = googleAuthService;
    this.exportService = exportService;
    this.isDefault = true;
    this.isLoading = false;
    this.searchRoomName = '';
    this.searchRoomDate = '';
    this.roomList = []; // 存放搜尋結果
  }
  clickAddRoom() {
    const navigationExtras = {
      queryParams: {
        model: "add"
      }
    };
    this.router.navigate(["manager-room/room-content"], navigationExtras);
  }
  clickEditRoom(room) {
    if (room.haveSite) {
      alert("此教室有所屬座位,無法編輯");
      return;
    }
    const navigationExtras = {
      queryParams: {
        model: "edit"
      }
    };
    this.roomDashboardService.setRoom(room);
    this.router.navigate(["manager-room/room-content"], navigationExtras);
  }
  clickDeleteRoom(room) {
    if (room.haveSite) {
      alert("此教室有所屬座位,無法刪除");
      return;
    }
    const ownerId = this.googleAuthService.getCurrentUser().id;
    this.roomDashboardService.deleteRoom(ownerId, room.id).subscribe({
      next: res => {
        alert("刪除成功");
        this.clickSearchRoom();
      },
      error: err => {
        alert("刪除失敗 err " + err);
      }
    });
  }
  clickExportRoom() {
    const ownerId = this.googleAuthService.getCurrentUser().id;
    this.roomDashboardService.exportRoom(ownerId).subscribe({
      next: res => {
        const roomList = res.result || [];
        if (roomList.length === 0) {
          alert("匯出無資料");
          return;
        }
        const csvData = this.exportService.convertToCSV(roomList);
        this.exportService.downloadCSV(csvData, '教室資訊.csv');
      },
      error: err => {
        alert("匯出錯誤 err :" + err);
        console.error('匯出錯誤', err);
      }
    });
  }
  clickSearchRoom() {
    const searchData = {
      room: {}
    };
    this.isDefault = false;
    this.isLoading = true;
    if (this.searchRoomName.trim()) {
      searchData.room.name = this.searchRoomName;
    }
    const ownerId = this.googleAuthService.getCurrentUser().id;
    this.roomDashboardService.searchRoom(ownerId, searchData).subscribe({
      next: res => {
        this.roomList = res.result || [];
        this.isLoading = false;
      },
      error: err => {
        alert("搜尋錯誤 err :" + err);
        console.error('搜尋錯誤', err);
        this.isLoading = false;
      }
    });
  }
  static {
    this.ɵfac = function SearchRoomComponent_Factory(t) {
      return new (t || SearchRoomComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_4__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_services_room_dashboard_service__WEBPACK_IMPORTED_MODULE_0__.RoomDashboardService), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](src_app_auth_route_services_google_auth_service__WEBPACK_IMPORTED_MODULE_1__.GoogleAuthService), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](src_app_common_export_import_services_export_service__WEBPACK_IMPORTED_MODULE_2__.ExportService));
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({
      type: SearchRoomComponent,
      selectors: [["app-search-room"]],
      decls: 14,
      vars: 5,
      consts: [[3, "click"], [1, "search-bar"], ["type", "text", "placeholder", "\u6559\u5BA4\u540D\u7A31\u4E0D\u9650", 3, "ngModelChange", "ngModel"], [1, "search-result"], [4, "ngIf"], ["class", "loading-gif", 4, "ngIf"], [4, "ngFor", "ngForOf"], [1, "loading-gif"], ["src", "assets/images/icon/icon_loading.gif", 2, "width", "50px"]],
      template: function SearchRoomComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "button", 0);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function SearchRoomComponent_Template_button_click_0_listener() {
            return ctx.clickAddRoom();
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, "\u65B0\u589E\u6559\u5BA4");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](2, "button", 0);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function SearchRoomComponent_Template_button_click_2_listener() {
            return ctx.clickExportRoom();
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](3, "\u532F\u51FA\u6559\u5BA4");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](4, "div", 1)(5, "input", 2);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtwoWayListener"]("ngModelChange", function SearchRoomComponent_Template_input_ngModelChange_5_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtwoWayBindingSet"](ctx.searchRoomName, $event) || (ctx.searchRoomName = $event);
            return $event;
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](6, "br");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](7, "button", 0);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function SearchRoomComponent_Template_button_click_7_listener() {
            return ctx.clickSearchRoom();
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](8, "\u641C\u5C0B");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](9, "div", 3);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](10, SearchRoomComponent_div_10_Template, 2, 0, "div", 4)(11, SearchRoomComponent_div_11_Template, 2, 0, "div", 4)(12, SearchRoomComponent_ul_12_Template, 2, 1, "ul", 4)(13, SearchRoomComponent_div_13_Template, 2, 0, "div", 5);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        }
        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](5);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtwoWayProperty"]("ngModel", ctx.searchRoomName);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](5);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.isDefault);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.roomList.length === 0 && !ctx.isDefault && !ctx.isLoading);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.roomList.length > 0);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.isLoading);
        }
      },
      dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_5__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_5__.NgIf, _angular_forms__WEBPACK_IMPORTED_MODULE_6__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_6__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_6__.NgModel],
      styles: ["/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzZWFyY2gtcm9vbS5jb21wb25lbnQuc2NzcyJ9 */\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvbWFuYWdlci1yb29tL2NvbXBvbmVudHMvY29udGVudC9zZWFyY2gtcm9vbS9zZWFyY2gtcm9vbS5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQ0Esd0tBQXdLIiwic291cmNlUm9vdCI6IiJ9 */"]
    });
  }
}

/***/ }),

/***/ 8863:
/*!******************************************************************************************************!*\
  !*** ./src/app/manager-room/components/content/search-site-content/search-site-content.component.ts ***!
  \******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SearchSiteContentComponent: () => (/* binding */ SearchSiteContentComponent)
/* harmony export */ });
/* harmony import */ var src_app_common_room_site_models_room_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/common/room-site/models/room.model */ 8655);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ 5072);
/* harmony import */ var src_app_auth_route_services_google_auth_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/auth-route/services/google-auth.service */ 899);
/* harmony import */ var src_app_manager_room_services_room_dashboard_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/manager-room/services/room-dashboard.service */ 3984);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ 316);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/forms */ 4456);
/* harmony import */ var _common_dialog_components_dialog_dialog_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../common/dialog/components/dialog/dialog.component */ 9276);








function SearchSiteContentComponent_button_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "button", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function SearchSiteContentComponent_button_7_Template_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r1);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](ctx_r1.clickAddSite());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1, "\u65B0\u589E");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
}
function SearchSiteContentComponent_button_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "button", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function SearchSiteContentComponent_button_8_Template_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r3);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](ctx_r1.clickEditSite());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1, "\u66F4\u65B0");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
}
class SearchSiteContentComponent {
  constructor(router, activatedRoute, googleAuthService, roomDashboardService) {
    this.router = router;
    this.activatedRoute = activatedRoute;
    this.googleAuthService = googleAuthService;
    this.roomDashboardService = roomDashboardService;
    // 教室 list
    this.roomList = new Array();
    // 教室 dialog 資訊
    this.dialogRoomList = [];
    // 教室dialog 是否隱藏 
    this.isHiddenDialogRoom = true;
    this.model = ""; // 新增 add , 編輯 edit
    //roomId: string = "";
    this.roomName = "";
    this.name = "";
  }
  ngOnInit() {
    // 取得所有 教室列表
    const ownerId = this.googleAuthService.getCurrentUser().id;
    this.roomDashboardService.searchRoom(ownerId, {
      room: {}
    }).subscribe({
      next: res => {
        if (!res.result) return;
        res.result.forEach(room => {
          this.roomList.push(new src_app_common_room_site_models_room_model__WEBPACK_IMPORTED_MODULE_0__.Room(room));
          this.dialogRoomList.push({
            id: room['id'],
            name: room['name'],
            isDisabled: false
          });
        });
        // 取得 model (新增 add , 編輯 edit), 若編輯, 取得編輯方案
        this.activatedRoute.queryParams.subscribe(params => {
          this.model = params['model'];
          if (this.model === 'edit') {
            this.roomToSite = this.roomDashboardService.getSite();
            this.selectRoom = this.roomList.find(room => room.id === this.roomToSite.roomId) || new src_app_common_room_site_models_room_model__WEBPACK_IMPORTED_MODULE_0__.Room({});
            this.roomName = this.roomToSite.roomName;
            this.name = this.roomToSite.name; // 座位名稱
          }
        });
      },
      error: err => {
        alert('取得教室資訊錯誤' + err);
        console.log(err);
      }
    });
  }
  /** 新增, 更新 前, 檢查欄位 */
  isFieldOk() {
    if (!this.roomName || this.roomName.trim() === "") {
      alert("請輸入座位");
      return false;
    }
    if (!this.name || this.name.trim() === "") {
      alert("請輸入教室座位名稱");
      return false;
    }
    return true;
  }
  clickAddSite() {
    if (!this.isFieldOk()) return;
    const name = this.name;
    const roomId = this.selectRoom.id;
    const ownerId = this.googleAuthService.getCurrentUser().id;
    this.roomDashboardService.addSite(ownerId, {
      name,
      roomId
    }).subscribe({
      next: res => {
        alert("教室座位 新增成功 ");
        this.router.navigate(["/manager-room/site"], {});
      },
      error: err => {
        alert("教室座位 新增失敗 err " + err);
      }
    });
  }
  clickEditSite() {
    if (!this.isFieldOk()) return;
    const id = this.roomToSite.id;
    const name = this.name;
    const roomId = this.selectRoom.id;
    const ownerId = this.googleAuthService.getCurrentUser().id;
    this.roomDashboardService.updateSite(ownerId, {
      id,
      name,
      roomId
    }).subscribe({
      next: res => {
        alert("教室座位 更新成功 ");
        this.router.navigate(["/manager-room/site"], {});
      },
      error: err => {
        alert("教室座位 更新失敗 err " + err);
      }
    });
  }
  /*
   * 教室 dialog 選擇之後觸發
  */
  selectedRoom(_selectRoomId) {
    if (!_selectRoomId) {
      return;
    }
    this.selectRoom = this.roomList.filter(room => {
      return room.id === _selectRoomId;
    })[0];
    this.roomName = this.selectRoom.name;
  }
  static {
    this.ɵfac = function SearchSiteContentComponent_Factory(t) {
      return new (t || SearchSiteContentComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_5__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_5__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](src_app_auth_route_services_google_auth_service__WEBPACK_IMPORTED_MODULE_1__.GoogleAuthService), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](src_app_manager_room_services_room_dashboard_service__WEBPACK_IMPORTED_MODULE_2__.RoomDashboardService));
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineComponent"]({
      type: SearchSiteContentComponent,
      selectors: [["app-search-site-content"]],
      decls: 11,
      vars: 8,
      consts: [[1, "form-container"], ["type", "text", "placeholder", "\u6240\u5C6C\u6559\u5BA4", "readonly", "", 3, "ngModelChange", "click", "ngModel"], ["type", "text", "placeholder", "\u5EA7\u4F4D\u540D\u7A31", 3, "ngModelChange", "ngModel"], [3, "click", 4, "ngIf"], [1, "dialog-container"], [3, "selectedItem", "hideDialog", "dialogTitle", "isHiddenDialog", "itemList"], [3, "click"]],
      template: function SearchSiteContentComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 0)(1, "h2");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](3, "input", 1);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtwoWayListener"]("ngModelChange", function SearchSiteContentComponent_Template_input_ngModelChange_3_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtwoWayBindingSet"](ctx.roomName, $event) || (ctx.roomName = $event);
            return $event;
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function SearchSiteContentComponent_Template_input_click_3_listener() {
            return ctx.isHiddenDialogRoom = false;
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](4, "br");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](5, "input", 2);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtwoWayListener"]("ngModelChange", function SearchSiteContentComponent_Template_input_ngModelChange_5_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtwoWayBindingSet"](ctx.name, $event) || (ctx.name = $event);
            return $event;
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](6, "br");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](7, SearchSiteContentComponent_button_7_Template, 2, 0, "button", 3)(8, SearchSiteContentComponent_button_8_Template, 2, 0, "button", 3);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](9, "div", 4)(10, "app-dialog", 5);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("selectedItem", function SearchSiteContentComponent_Template_app_dialog_selectedItem_10_listener($event) {
            return ctx.selectedRoom($event);
          })("hideDialog", function SearchSiteContentComponent_Template_app_dialog_hideDialog_10_listener() {
            return ctx.isHiddenDialogRoom = true;
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()();
        }
        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"]("", ctx.model === "add" ? "\u65B0\u589E" : "\u7DE8\u8F2F", "\u6559\u5BA4\u5EA7\u4F4D");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtwoWayProperty"]("ngModel", ctx.roomName);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtwoWayProperty"]("ngModel", ctx.name);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx.model === "add");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx.model === "edit");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("dialogTitle", "\u9078\u64C7\u6559\u5BA4")("isHiddenDialog", ctx.isHiddenDialogRoom)("itemList", ctx.dialogRoomList);
        }
      },
      dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_6__.NgIf, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.NgModel, _common_dialog_components_dialog_dialog_component__WEBPACK_IMPORTED_MODULE_3__.DialogComponent],
      styles: [".form-container[_ngcontent-%COMP%] {\n  width: 100%;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n}\n\n.dialog-container[_ngcontent-%COMP%] {\n  z-index: 91;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlYXJjaC1zaXRlLWNvbnRlbnQuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0E7RUFDSSxXQUFBO0VBQ0EsYUFBQTtFQUNBLHNCQUFBO0VBQ0EsdUJBQUE7RUFDQSxtQkFBQTtBQUFKOztBQUdBO0VBQ0ksV0FBQTtBQUFKIiwiZmlsZSI6InNlYXJjaC1zaXRlLWNvbnRlbnQuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuLmZvcm0tY29udGFpbmVyIHtcclxuICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbn1cclxuXHJcbi5kaWFsb2ctY29udGFpbmVyIHtcclxuICAgIHotaW5kZXg6IDkxO1xyXG59XHJcblxyXG4iXX0= */\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvbWFuYWdlci1yb29tL2NvbXBvbmVudHMvY29udGVudC9zZWFyY2gtc2l0ZS1jb250ZW50L3NlYXJjaC1zaXRlLWNvbnRlbnQuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0E7RUFDSSxXQUFBO0VBQ0EsYUFBQTtFQUNBLHNCQUFBO0VBQ0EsdUJBQUE7RUFDQSxtQkFBQTtBQUFKOztBQUdBO0VBQ0ksV0FBQTtBQUFKO0FBQ0Esb3BCQUFvcEIiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuLmZvcm0tY29udGFpbmVyIHtcclxuICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbn1cclxuXHJcbi5kaWFsb2ctY29udGFpbmVyIHtcclxuICAgIHotaW5kZXg6IDkxO1xyXG59XHJcblxyXG4iXSwic291cmNlUm9vdCI6IiJ9 */"]
    });
  }
}

/***/ }),

/***/ 6183:
/*!**************************************************************************************!*\
  !*** ./src/app/manager-room/components/content/search-site/search-site.component.ts ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SearchSiteComponent: () => (/* binding */ SearchSiteComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ 5072);
/* harmony import */ var _services_room_dashboard_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../services/room-dashboard.service */ 3984);
/* harmony import */ var src_app_auth_route_services_google_auth_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/auth-route/services/google-auth.service */ 899);
/* harmony import */ var src_app_common_export_import_services_export_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/common/export-import/services/export.service */ 5391);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ 316);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/forms */ 4456);







function SearchSiteComponent_div_13_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, "\u958B\u59CB\u641C\u5C0B");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
}
function SearchSiteComponent_div_14_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, "\u6C92\u6709\u627E\u5230\u7D50\u679C");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
}
function SearchSiteComponent_ul_15_li_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "li")(1, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](2, "\u64C1\u6709\u8005id:");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](4, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](5, "\u64C1\u6709\u8005\u4FE1\u7BB1:");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](7, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](8, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](9, "\u6559\u5BA4\u540D\u7A31:");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](10);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](11, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](12, "\u5EA7\u4F4D\u540D\u7A31:");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](13);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](14, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](15, "button", 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function SearchSiteComponent_ul_15_li_1_Template_button_click_15_listener() {
      const roomToSite_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r1).$implicit;
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r2.clickEditSite(roomToSite_r2));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](16, "\u7DE8\u8F2F");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](17, "button", 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function SearchSiteComponent_ul_15_li_1_Template_button_click_17_listener() {
      const roomToSite_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r1).$implicit;
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r2.clickDeleteSite(roomToSite_r2));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](18, "\u522A\u9664");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const roomToSite_r2 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", roomToSite_r2.ownerId, " | ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", roomToSite_r2.email, " | ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", roomToSite_r2.roomName, " | ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", roomToSite_r2.name, " | ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵstyleProp"]("opacity", roomToSite_r2.haveBooking ? 0.5 : 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵstyleProp"]("opacity", roomToSite_r2.haveBooking ? 0.5 : 1);
  }
}
function SearchSiteComponent_ul_15_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "ul");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](1, SearchSiteComponent_ul_15_li_1_Template, 19, 8, "li", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngForOf", ctx_r2.siteList);
  }
}
function SearchSiteComponent_div_16_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](1, "img", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
}
class SearchSiteComponent {
  constructor(router, roomDashboardService, googleAuthService, exportService) {
    this.router = router;
    this.roomDashboardService = roomDashboardService;
    this.googleAuthService = googleAuthService;
    this.exportService = exportService;
    this.isDefault = true;
    this.isLoading = false;
    this.searchRoomName = "";
    this.searchSiteName = "";
    this.siteList = [];
  }
  clickExportSite() {
    const ownerId = this.googleAuthService.getCurrentUser().id;
    this.roomDashboardService.exportSite(ownerId).subscribe({
      next: res => {
        const siteList = res.result || [];
        if (siteList.length === 0) {
          alert("匯出無資料");
          return;
        }
        const csvData = this.exportService.convertToCSV(siteList);
        this.exportService.downloadCSV(csvData, '教室座位資訊.csv');
      },
      error: err => {
        alert("匯出錯誤 err :" + err);
        console.error('匯出錯誤', err);
      }
    });
  }
  clickAddSite() {
    const navigationExtras = {
      queryParams: {
        model: "add"
      }
    };
    this.router.navigate(["manager-room/site-content"], navigationExtras);
  }
  clickEditSite(roomToSite) {
    if (roomToSite.haveBooking) {
      alert("此座位已被預約，無法編輯");
      return;
    }
    const navigationExtras = {
      queryParams: {
        model: "edit"
      }
    };
    this.roomDashboardService.setSite(roomToSite);
    this.router.navigate(["manager-room/site-content"], navigationExtras);
  }
  clickDeleteSite(roomToSite) {
    if (roomToSite.haveBooking) {
      alert("此座位已被預約，無法刪除");
      return;
    }
    if (!confirm("是否刪除座位?")) {
      return;
    }
    const ownerId = this.googleAuthService.getCurrentUser().id;
    this.roomDashboardService.deleteSite(ownerId, roomToSite.id).subscribe({
      next: res => {
        alert("座位刪除成功");
        this.searchSite();
      },
      error: err => {
        alert("刪除失敗 err " + err);
      }
    });
  }
  searchSite() {
    const searchData = {
      roomToSite: {}
    };
    this.isDefault = false;
    this.isLoading = true;
    if (this.searchRoomName.trim()) {
      searchData.roomToSite.roomName = this.searchRoomName;
    }
    if (this.searchSiteName.trim()) {
      searchData.roomToSite.siteName = this.searchSiteName;
    }
    const ownerId = this.googleAuthService.getCurrentUser().id;
    this.roomDashboardService.searchSite(ownerId, searchData).subscribe({
      next: res => {
        console.log(" site yoyoyo : ", res);
        this.siteList = res.result || [];
        this.isLoading = false;
      },
      error: err => {
        console.error('搜尋錯誤', err);
        this.isLoading = false;
      }
    });
  }
  static {
    this.ɵfac = function SearchSiteComponent_Factory(t) {
      return new (t || SearchSiteComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_4__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_services_room_dashboard_service__WEBPACK_IMPORTED_MODULE_0__.RoomDashboardService), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](src_app_auth_route_services_google_auth_service__WEBPACK_IMPORTED_MODULE_1__.GoogleAuthService), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](src_app_common_export_import_services_export_service__WEBPACK_IMPORTED_MODULE_2__.ExportService));
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({
      type: SearchSiteComponent,
      selectors: [["app-search-site"]],
      decls: 17,
      vars: 6,
      consts: [[3, "click"], [1, "search-bar"], ["type", "text", "placeholder", "\u6240\u5C6C\u6559\u5BA4\u540D\u7A31\u4E0D\u9650", 3, "ngModelChange", "ngModel"], ["type", "text", "placeholder", "\u5EA7\u4F4D\u540D\u7A31\u4E0D\u9650", 3, "ngModelChange", "ngModel"], [1, "search-result"], [4, "ngIf"], ["class", "loading-gif", 4, "ngIf"], [4, "ngFor", "ngForOf"], [1, "loading-gif"], ["src", "assets/images/icon/icon_loading.gif", 2, "width", "50px"]],
      template: function SearchSiteComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "button", 0);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function SearchSiteComponent_Template_button_click_0_listener() {
            return ctx.clickAddSite();
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, "\u65B0\u589E\u5EA7\u4F4D");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](2, "button", 0);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function SearchSiteComponent_Template_button_click_2_listener() {
            return ctx.clickExportSite();
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](3, "\u532F\u51FA\u5EA7\u4F4D");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](4, "div", 1)(5, "input", 2);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtwoWayListener"]("ngModelChange", function SearchSiteComponent_Template_input_ngModelChange_5_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtwoWayBindingSet"](ctx.searchRoomName, $event) || (ctx.searchRoomName = $event);
            return $event;
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](6, "span");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](7, "\u4E26\u4E14");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](8, "input", 3);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtwoWayListener"]("ngModelChange", function SearchSiteComponent_Template_input_ngModelChange_8_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtwoWayBindingSet"](ctx.searchSiteName, $event) || (ctx.searchSiteName = $event);
            return $event;
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](9, "br");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](10, "button", 0);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function SearchSiteComponent_Template_button_click_10_listener() {
            return ctx.searchSite();
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](11, "\u641C\u5C0B");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](12, "div", 4);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](13, SearchSiteComponent_div_13_Template, 2, 0, "div", 5)(14, SearchSiteComponent_div_14_Template, 2, 0, "div", 5)(15, SearchSiteComponent_ul_15_Template, 2, 1, "ul", 5)(16, SearchSiteComponent_div_16_Template, 2, 0, "div", 6);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        }
        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](5);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtwoWayProperty"]("ngModel", ctx.searchRoomName);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtwoWayProperty"]("ngModel", ctx.searchSiteName);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](5);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.isDefault);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.siteList.length === 0 && !ctx.isDefault && !ctx.isLoading);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.siteList.length > 0);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.isLoading);
        }
      },
      dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_5__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_5__.NgIf, _angular_forms__WEBPACK_IMPORTED_MODULE_6__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_6__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_6__.NgModel],
      styles: ["/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzZWFyY2gtc2l0ZS5jb21wb25lbnQuc2NzcyJ9 */\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvbWFuYWdlci1yb29tL2NvbXBvbmVudHMvY29udGVudC9zZWFyY2gtc2l0ZS9zZWFyY2gtc2l0ZS5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQ0Esd0tBQXdLIiwic291cmNlUm9vdCI6IiJ9 */"]
    });
  }
}

/***/ }),

/***/ 4119:
/*!************************************************************************************!*\
  !*** ./src/app/manager-room/components/room-dashboard/room-dashboard.component.ts ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   RoomDashboardComponent: () => (/* binding */ RoomDashboardComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ 5072);


class RoomDashboardComponent {
  constructor() {
    this.isMenuVisible = true; // 預設選單是顯示的
  }
  toggleMenu() {
    this.isMenuVisible = !this.isMenuVisible;
  }
  static {
    this.ɵfac = function RoomDashboardComponent_Factory(t) {
      return new (t || RoomDashboardComponent)();
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
      type: RoomDashboardComponent,
      selectors: [["app-room-dashboard"]],
      decls: 16,
      vars: 4,
      consts: [[1, "manager-container"], ["src", "assets/images/icon/icon_next.png", 1, "iconBtn", 3, "click"], [1, "manager-menu"], ["src", "assets/images/icon/icon_back.png", 1, "iconBtn", 3, "click"], ["routerLink", "/manager-room/room-site-import", "routerLinkActive", "active"], ["routerLink", "/manager-room/room", "routerLinkActive", "active"], ["routerLink", "/manager-room/site", "routerLinkActive", "active"], ["routerLink", "/manager-room/booking-user", "routerLinkActive", "active"], ["routerLink", "/manager-room/booking", "routerLinkActive", "active"]],
      template: function RoomDashboardComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0)(1, "img", 1);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function RoomDashboardComponent_Template_img_click_1_listener() {
            return ctx.toggleMenu();
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 2)(3, "img", 3);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function RoomDashboardComponent_Template_img_click_3_listener() {
            return ctx.toggleMenu();
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "button", 4);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5, "\u6559\u5BA4\u5EA7\u4F4D\u532F\u5165");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "button", 5);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](7, "\u6559\u5BA4\u7BA1\u7406");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "button", 6);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](9, "\u5EA7\u4F4D\u7BA1\u7406");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "button", 7);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](11, "\u9810\u7D04\u8005\u7BA1\u7406");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "button", 8);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](13, "\u9810\u7D04\u7D00\u9304\u7BA1\u7406");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "div", 0);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](15, "router-outlet");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
        }
        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵstyleProp"]("display", ctx.isMenuVisible ? "none" : "block");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵstyleProp"]("display", ctx.isMenuVisible ? "flex" : "none");
        }
      },
      dependencies: [_angular_router__WEBPACK_IMPORTED_MODULE_1__.RouterOutlet, _angular_router__WEBPACK_IMPORTED_MODULE_1__.RouterLink, _angular_router__WEBPACK_IMPORTED_MODULE_1__.RouterLinkActive],
      styles: ["@charset \"UTF-8\";\n\n\n.manager-container[_ngcontent-%COMP%] {\n  width: 90vw;\n  display: flex;\n  flex-direction: row;\n  justify-content: flex-start;\n  align-items: flex-start;\n  padding: 40px;\n}\n.manager-container[_ngcontent-%COMP%]   .iconBtn[_ngcontent-%COMP%] {\n  width: 30px;\n  margin: 10px;\n}\n.manager-container[_ngcontent-%COMP%]   .manager-menu[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  justify-content: flex-start;\n  align-items: flex-start;\n  padding: 20px;\n  min-width: 220px;\n  background: #661983;\n  border-radius: 20px;\n}\n.manager-container[_ngcontent-%COMP%]   .manager-container[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  justify-content: flex-start;\n  align-items: flex-start;\n  padding: 20px 40px;\n}\n.manager-container[_ngcontent-%COMP%]   .manager-container[_ngcontent-%COMP%]   .search-bar[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: row;\n  justify-content: flex-start;\n  align-items: center;\n  gap: 20px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJvb20tZGFzaGJvYXJkLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGdCQUFnQjtBQUVoQixXQUFBO0FBQ0E7RUFDSSxXQUFBO0VBQ0EsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsMkJBQUE7RUFDQSx1QkFBQTtFQUNBLGFBQUE7QUFBSjtBQUNJO0VBQ0ksV0FBQTtFQUNBLFlBQUE7QUFDUjtBQUVJO0VBQ0ksYUFBQTtFQUNBLHNCQUFBO0VBQ0EsMkJBQUE7RUFDQSx1QkFBQTtFQUNBLGFBQUE7RUFDQSxnQkFBQTtFQUNBLG1CQUFBO0VBQ0EsbUJBQUE7QUFBUjtBQUVJO0VBQ0ksYUFBQTtFQUNBLHNCQUFBO0VBQ0EsMkJBQUE7RUFDQSx1QkFBQTtFQUNBLGtCQUFBO0FBQVI7QUFFUTtFQUNJLGFBQUE7RUFDQSxtQkFBQTtFQUNBLDJCQUFBO0VBQ0EsbUJBQUE7RUFDQSxTQUFBO0FBQVoiLCJmaWxlIjoicm9vbS1kYXNoYm9hcmQuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuXHJcbi8qIOW+jOWPsOeuoeeQhuaoo+W8jyAqL1xyXG4ubWFuYWdlci1jb250YWluZXIge1xyXG4gICAgd2lkdGg6IDkwdnc7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgZmxleC1kaXJlY3Rpb246IHJvdztcclxuICAgIGp1c3RpZnktY29udGVudDogZmxleC1zdGFydDtcclxuICAgIGFsaWduLWl0ZW1zOiBmbGV4LXN0YXJ0O1xyXG4gICAgcGFkZGluZzogNDBweDtcclxuICAgIC5pY29uQnRuIHtcclxuICAgICAgICB3aWR0aDogMzBweDtcclxuICAgICAgICBtYXJnaW46IDEwcHg7XHJcbiAgICB9XHJcblxyXG4gICAgLm1hbmFnZXItbWVudSB7XHJcbiAgICAgICAgZGlzcGxheTogZmxleDtcclxuICAgICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gICAgICAgIGp1c3RpZnktY29udGVudDogZmxleC1zdGFydDtcclxuICAgICAgICBhbGlnbi1pdGVtczogZmxleC1zdGFydDtcclxuICAgICAgICBwYWRkaW5nOiAyMHB4O1xyXG4gICAgICAgIG1pbi13aWR0aDogMjIwcHg7XHJcbiAgICAgICAgYmFja2dyb3VuZDogIzY2MTk4MztcclxuICAgICAgICBib3JkZXItcmFkaXVzOiAyMHB4O1xyXG4gICAgfVxyXG4gICAgLm1hbmFnZXItY29udGFpbmVyIHtcclxuICAgICAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAgICAgICAganVzdGlmeS1jb250ZW50OiBmbGV4LXN0YXJ0O1xyXG4gICAgICAgIGFsaWduLWl0ZW1zOiBmbGV4LXN0YXJ0O1xyXG4gICAgICAgIHBhZGRpbmc6IDIwcHggNDBweDtcclxuXHJcbiAgICAgICAgLnNlYXJjaC1iYXIge1xyXG4gICAgICAgICAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgICAgICAgICBmbGV4LWRpcmVjdGlvbjogcm93O1xyXG4gICAgICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtc3RhcnQ7XHJcbiAgICAgICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgICAgICAgICAgIGdhcDogMjBweDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG5cclxuIl19 */\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvbWFuYWdlci1yb29tL2NvbXBvbmVudHMvcm9vbS1kYXNoYm9hcmQvcm9vbS1kYXNoYm9hcmQuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsZ0JBQWdCO0FBRWhCLFdBQUE7QUFDQTtFQUNJLFdBQUE7RUFDQSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSwyQkFBQTtFQUNBLHVCQUFBO0VBQ0EsYUFBQTtBQUFKO0FBQ0k7RUFDSSxXQUFBO0VBQ0EsWUFBQTtBQUNSO0FBRUk7RUFDSSxhQUFBO0VBQ0Esc0JBQUE7RUFDQSwyQkFBQTtFQUNBLHVCQUFBO0VBQ0EsYUFBQTtFQUNBLGdCQUFBO0VBQ0EsbUJBQUE7RUFDQSxtQkFBQTtBQUFSO0FBRUk7RUFDSSxhQUFBO0VBQ0Esc0JBQUE7RUFDQSwyQkFBQTtFQUNBLHVCQUFBO0VBQ0Esa0JBQUE7QUFBUjtBQUVRO0VBQ0ksYUFBQTtFQUNBLG1CQUFBO0VBQ0EsMkJBQUE7RUFDQSxtQkFBQTtFQUNBLFNBQUE7QUFBWjtBQUNBLHdoRUFBd2hFIiwic291cmNlc0NvbnRlbnQiOlsiXHJcblxyXG4vKiDDpcK+wozDpcKPwrDDp8KuwqHDp8KQwobDpsKowqPDpcK8wo8gKi9cclxuLm1hbmFnZXItY29udGFpbmVyIHtcclxuICAgIHdpZHRoOiA5MHZ3O1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGZsZXgtZGlyZWN0aW9uOiByb3c7XHJcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtc3RhcnQ7XHJcbiAgICBhbGlnbi1pdGVtczogZmxleC1zdGFydDtcclxuICAgIHBhZGRpbmc6IDQwcHg7XHJcbiAgICAuaWNvbkJ0biB7XHJcbiAgICAgICAgd2lkdGg6IDMwcHg7XHJcbiAgICAgICAgbWFyZ2luOiAxMHB4O1xyXG4gICAgfVxyXG5cclxuICAgIC5tYW5hZ2VyLW1lbnUge1xyXG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtc3RhcnQ7XHJcbiAgICAgICAgYWxpZ24taXRlbXM6IGZsZXgtc3RhcnQ7XHJcbiAgICAgICAgcGFkZGluZzogMjBweDtcclxuICAgICAgICBtaW4td2lkdGg6IDIyMHB4O1xyXG4gICAgICAgIGJhY2tncm91bmQ6ICM2NjE5ODM7XHJcbiAgICAgICAgYm9yZGVyLXJhZGl1czogMjBweDtcclxuICAgIH1cclxuICAgIC5tYW5hZ2VyLWNvbnRhaW5lciB7XHJcbiAgICAgICAgZGlzcGxheTogZmxleDtcclxuICAgICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gICAgICAgIGp1c3RpZnktY29udGVudDogZmxleC1zdGFydDtcclxuICAgICAgICBhbGlnbi1pdGVtczogZmxleC1zdGFydDtcclxuICAgICAgICBwYWRkaW5nOiAyMHB4IDQwcHg7XHJcblxyXG4gICAgICAgIC5zZWFyY2gtYmFyIHtcclxuICAgICAgICAgICAgZGlzcGxheTogZmxleDtcclxuICAgICAgICAgICAgZmxleC1kaXJlY3Rpb246IHJvdztcclxuICAgICAgICAgICAganVzdGlmeS1jb250ZW50OiBmbGV4LXN0YXJ0O1xyXG4gICAgICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gICAgICAgICAgICBnYXA6IDIwcHg7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5cclxuXHJcbiJdLCJzb3VyY2VSb290IjoiIn0= */"]
    });
  }
}

/***/ }),

/***/ 3984:
/*!*****************************************************************!*\
  !*** ./src/app/manager-room/services/room-dashboard.service.ts ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   RoomDashboardService: () => (/* binding */ RoomDashboardService)
/* harmony export */ });
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/environments/environment */ 5312);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ 6443);



class RoomDashboardService {
  constructor(http) {
    this.http = http;
    this.DOMAIN = src_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.domain;
    this.CONTEXT = "/api/manager";
    this.BASE_URL = this.DOMAIN + this.CONTEXT;
  }
  setRoom(room) {
    this.room = room;
  }
  getRoom() {
    return this.room;
  }
  setSite(roomToSite) {
    this.roomToSite = roomToSite;
  }
  getSite() {
    return this.roomToSite;
  }
  importRoomToSite(ownerId, roomToSite) {
    return this.http.post(`${this.BASE_URL}/room/site/import/${ownerId}`, roomToSite);
  }
  exportUserList(ownerId) {
    return this.http.post(`${this.BASE_URL}/room/booker/export/all/${ownerId}`, {
      user: {}
    });
  }
  searchUser(ownerId, data) {
    return this.http.post(`${this.BASE_URL}/room/booker/search/${ownerId}`, data);
  }
  exportRoom(ownerId) {
    return this.http.post(`${this.BASE_URL}/room/export/all/${ownerId}`, {
      user: {}
    });
  }
  searchRoom(ownerId, room) {
    return this.http.post(`${this.BASE_URL}/room/search/${ownerId}`, room);
  }
  addRoom(ownerId, room) {
    return this.http.post(`${this.BASE_URL}/room/add/${ownerId}`, {
      room
    });
  }
  updateRoom(ownerId, room) {
    return this.http.patch(`${this.BASE_URL}/room/update/${ownerId}`, {
      room
    });
  }
  deleteRoom(ownerId, id) {
    return this.http.delete(`${this.BASE_URL}/room/delete/${ownerId}/${id}`);
  }
  exportSite(ownerId) {
    return this.http.post(`${this.BASE_URL}/room/site/search/${ownerId}`, {
      roomToSite: {}
    });
  }
  searchSite(ownerId, data) {
    return this.http.post(`${this.BASE_URL}/room/site/search/${ownerId}`, data);
  }
  addSite(ownerId, roomToSite) {
    return this.http.post(`${this.BASE_URL}/room/site/add/${ownerId}`, {
      roomToSite
    });
  }
  updateSite(ownerId, roomToSite) {
    return this.http.patch(`${this.BASE_URL}/room/site/update/${ownerId}`, {
      roomToSite
    });
  }
  deleteSite(ownerId, id) {
    return this.http.delete(`${this.BASE_URL}/room/site/delete/${ownerId}/${id}`);
  }
  exportBooking(ownerId) {
    return this.http.post(`${this.BASE_URL}/room/booking/search/${ownerId}`, {
      booking: {}
    });
  }
  searchBooking(ownerId, booking) {
    return this.http.post(`${this.BASE_URL}/room/booking/search/${ownerId}`, booking);
  }
  static {
    this.ɵfac = function RoomDashboardService_Factory(t) {
      return new (t || RoomDashboardService)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpClient));
    };
  }
  static {
    this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({
      token: RoomDashboardService,
      factory: RoomDashboardService.ɵfac,
      providedIn: 'root'
    });
  }
}

/***/ }),

/***/ 7423:
/*!**************************************************************************!*\
  !*** ./src/app/manager-system/components/all-user/all-user.component.ts ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AllUserComponent: () => (/* binding */ AllUserComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _services_sys_dashboard_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../services/sys-dashboard.service */ 324);
/* harmony import */ var src_app_common_export_import_services_export_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/common/export-import/services/export.service */ 5391);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ 316);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ 4456);





function AllUserComponent_div_12_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, "\u958B\u59CB\u641C\u5C0B");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
}
function AllUserComponent_div_13_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, "\u6C92\u6709\u627E\u5230\u7D50\u679C");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
}
function AllUserComponent_ul_14_li_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "li")(1, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](2, "id:");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](4, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](5, "\u59D3\u540D:");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](7, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](8, "\u4FE1\u7BB1:");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const user_r1 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", user_r1.id, " | ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", user_r1.name, " | ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", user_r1.email, " ");
  }
}
function AllUserComponent_ul_14_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "ul");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](1, AllUserComponent_ul_14_li_1_Template, 10, 3, "li", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngForOf", ctx_r1.users);
  }
}
function AllUserComponent_div_15_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](1, "img", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
}
class AllUserComponent {
  constructor(sysDashboardService, exportService) {
    this.sysDashboardService = sysDashboardService;
    this.exportService = exportService;
    this.isDefault = true;
    this.isLoading = false;
    this.searchName = '';
    this.searchMail = '';
    this.users = []; // 存放搜尋結果
  }
  exportAllUser() {
    this.sysDashboardService.exportAllUserList().subscribe({
      next: res => {
        if (res.exportList && res.exportList.length > 0) {
          const csvData = this.exportService.convertToCSV(res.exportList);
          this.exportService.downloadCSV(csvData, 'user_all_export.csv');
        } else {
          alert('無可匯出的資料');
        }
      },
      error: err => {
        alert("匯出失敗 : " + err.error.message);
      }
    });
  }
  searchUser() {
    this.isDefault = false;
    this.isLoading = true;
    this.sysDashboardService.searchUser(this.searchName, this.searchMail).subscribe({
      next: res => {
        this.users = res.result.userList;
        this.isLoading = false;
      },
      error: err => {
        alert(`搜尋失敗 : ${err.error.message}`);
        this.isLoading = false;
      }
    });
  }
  static {
    this.ɵfac = function AllUserComponent_Factory(t) {
      return new (t || AllUserComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_services_sys_dashboard_service__WEBPACK_IMPORTED_MODULE_0__.SysDashboardService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](src_app_common_export_import_services_export_service__WEBPACK_IMPORTED_MODULE_1__.ExportService));
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({
      type: AllUserComponent,
      selectors: [["app-all-user"]],
      decls: 16,
      vars: 6,
      consts: [[1, "search-bar"], [3, "click"], ["type", "text", "placeholder", "\u4F7F\u7528\u8005\u5E33\u865F\u4E0D\u9650", 3, "ngModelChange", "ngModel"], ["type", "text", "placeholder", "\u4F7F\u7528\u8005\u4FE1\u7BB1\u4E0D\u9650", 3, "ngModelChange", "ngModel"], [1, "search-result"], [4, "ngIf"], ["class", "loading-gif", 4, "ngIf"], [4, "ngFor", "ngForOf"], [1, "loading-gif"], ["src", "assets/images/icon/icon_loading.gif", 2, "width", "50px"]],
      template: function AllUserComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 0)(1, "button", 1);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function AllUserComponent_Template_button_click_1_listener() {
            return ctx.exportAllUser();
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](2, "\u532F\u51FA\u6240\u6709\u4F7F\u7528\u8005");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](3, "br");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](4, "input", 2);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayListener"]("ngModelChange", function AllUserComponent_Template_input_ngModelChange_4_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayBindingSet"](ctx.searchName, $event) || (ctx.searchName = $event);
            return $event;
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](5, "span");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](6, "\u4E26\u4E14");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](7, "input", 3);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayListener"]("ngModelChange", function AllUserComponent_Template_input_ngModelChange_7_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayBindingSet"](ctx.searchMail, $event) || (ctx.searchMail = $event);
            return $event;
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](8, "br");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](9, "button", 1);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function AllUserComponent_Template_button_click_9_listener() {
            return ctx.searchUser();
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](10, "\u641C\u5C0B");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](11, "div", 4);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](12, AllUserComponent_div_12_Template, 2, 0, "div", 5)(13, AllUserComponent_div_13_Template, 2, 0, "div", 5)(14, AllUserComponent_ul_14_Template, 2, 1, "ul", 5)(15, AllUserComponent_div_15_Template, 2, 0, "div", 6);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        }
        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](4);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayProperty"]("ngModel", ctx.searchName);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayProperty"]("ngModel", ctx.searchMail);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](5);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.isDefault);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.users.length === 0 && !ctx.isDefault && !ctx.isLoading);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.users.length > 0);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.isLoading);
        }
      },
      dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_3__.NgIf, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.NgModel],
      styles: ["/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJhbGwtdXNlci5jb21wb25lbnQuc2NzcyJ9 */\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvbWFuYWdlci1zeXN0ZW0vY29tcG9uZW50cy9hbGwtdXNlci9hbGwtdXNlci5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQ0Esb0tBQW9LIiwic291cmNlUm9vdCI6IiJ9 */"]
    });
  }
}

/***/ }),

/***/ 5573:
/*!**********************************************************************!*\
  !*** ./src/app/manager-system/components/backup/backup.component.ts ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BackupComponent: () => (/* binding */ BackupComponent)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 1873);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _services_sys_dashboard_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../services/sys-dashboard.service */ 324);
/* harmony import */ var src_app_common_export_import_services_export_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/common/export-import/services/export.service */ 5391);




class BackupComponent {
  constructor(sysDashboardService, exportService) {
    this.sysDashboardService = sysDashboardService;
    this.exportService = exportService;
  }
  exportAllUser() {
    this.sysDashboardService.exportAllUserList().subscribe(res => {
      if (res.exportList && res.exportList.length > 0) {
        const csvData = this.exportService.convertToCSV(res.exportList);
        this.exportService.downloadCSV(csvData, 'user_all_export.csv');
      } else {
        alert('無可匯出使用者的資料');
      }
    }, err => {
      alert("全部使用者 匯出失敗" + err.error.message);
    });
  }
  exportAllRoom() {
    this.sysDashboardService.exportAllRoomList().subscribe(res => {
      if (res.exportList && res.exportList.length > 0) {
        const csvData = this.exportService.convertToCSV(res.exportList);
        this.exportService.downloadCSV(csvData, 'room_all_export.csv');
      } else {
        alert('無可匯出 全部教室資料');
      }
    }, err => {
      alert("全部教室資料 匯出失敗" + err.error.message);
    });
  }
  exportAllSite() {
    this.sysDashboardService.exportAllSiteList().subscribe(res => {
      if (res.exportList && res.exportList.length > 0) {
        const csvData = this.exportService.convertToCSV(res.exportList);
        this.exportService.downloadCSV(csvData, 'site_all_export.csv');
      } else {
        alert('無可匯出 全部教室資料');
      }
    }, err => {
      alert("全部教室資料 匯出失敗" + err.error.message);
    });
  }
  exportAllBooking() {
    this.sysDashboardService.exportAllBookingList().subscribe(res => {
      if (res.exportList && res.exportList.length > 0) {
        const csvData = this.exportService.convertToCSV(res.exportList);
        this.exportService.downloadCSV(csvData, 'booking_all_export.csv');
      } else {
        alert('無可匯出 預約資料');
      }
    }, err => {
      alert("全部預約資料 匯出失敗" + err.error.message);
    });
  }
  /* 匯出所有資料表 */
  exportAllDataTable() {
    (0,rxjs__WEBPACK_IMPORTED_MODULE_2__.forkJoin)({
      users: this.sysDashboardService.exportAllUserList(),
      usertopayment: this.sysDashboardService.exportAllUserToPaymentList(),
      usertoowner: this.sysDashboardService.exportAllUserToOwnerList(),
      usertopermission: this.sysDashboardService.exportAllUserToPermission(),
      rooms: this.sysDashboardService.exportAllRoomList(),
      sites: this.sysDashboardService.exportAllSiteList(),
      bookings: this.sysDashboardService.exportAllBookingList(),
      payment: this.sysDashboardService.exportAllPaymentList()
    }).subscribe({
      next: res => {
        // 使用者 資料
        if (res.users.exportList?.length) {
          const csv = this.exportService.convertToCSV(res.users.exportList);
          this.exportService.downloadCSV(csv, 'user_all.csv');
        } else {
          alert('無可匯出使用者的資料');
        }
        // 使用者 方案 資料
        if (res.usertopayment.exportList?.length) {
          const csv = this.exportService.convertToCSV(res.usertopayment.exportList);
          this.exportService.downloadCSV(csv, 'usertopayment_all.csv');
        } else {
          alert('無可匯出 使用者 方案 的資料');
        }
        // 使用者 轉 擁有者 資料
        if (res.usertoowner.exportList?.length) {
          const csv = this.exportService.convertToCSV(res.usertoowner.exportList);
          this.exportService.downloadCSV(csv, 'usertoowner_all.csv');
        } else {
          alert('無可匯出 使用者 轉 擁有者 的資料');
        }
        // 使用者 權限 資料
        if (res.usertopermission.exportList?.length) {
          const csv = this.exportService.convertToCSV(res.usertopermission.exportList);
          this.exportService.downloadCSV(csv, 'usertopermission_all.csv');
        } else {
          alert('無可匯出 使用者 權限 的資料');
        }
        // 教室資料
        if (res.rooms.exportList?.length) {
          const csv = this.exportService.convertToCSV(res.rooms.exportList);
          this.exportService.downloadCSV(csv, 'room_all.csv');
        } else {
          alert('無可匯出全部教室資料');
        }
        // 座位資料
        if (res.sites.exportList?.length) {
          const csv = this.exportService.convertToCSV(res.sites.exportList);
          this.exportService.downloadCSV(csv, 'site_all.csv');
        } else {
          alert('無可匯出全部座位資料');
        }
        // 預約資料
        if (res.bookings.exportList?.length) {
          const csv = this.exportService.convertToCSV(res.bookings.exportList);
          this.exportService.downloadCSV(csv, 'booking_all.csv');
        } else {
          alert('無可匯出預約資料');
        }
        // 付費方案 資料
        if (res.payment.exportList?.length) {
          const csv = this.exportService.convertToCSV(res.payment.exportList);
          this.exportService.downloadCSV(csv, 'payment_all.csv');
        } else {
          alert('無可匯出 付費方案 的資料');
        }
      },
      error: err => {
        console.error('部分或全部匯出失敗：', err);
        alert('匯出過程中發生錯誤，請查看主控台。');
      }
    });
  }
  /* 匯入備份資料表 建置環境 */
  // 使用者選取檔案後
  handleFiles(event) {
    const input = event.target;
    if (!input.files) return;
    const files = Array.from(input.files);
    const fileReadPromises = files.map(file => this.readCsvToJson(file));
    Promise.all(fileReadPromises).then(fileContents => {
      const payload = {};
      for (let i = 0; i < files.length; i++) {
        const name = files[i].name.replace('.csv', '');
        payload[name] = fileContents[i];
      }
      this.importAllDataTable(payload);
    });
  }
  // 將 CSV 檔案讀取並轉為 JSON 陣列
  readCsvToJson(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const text = reader.result;
        const lines = text.trim().split('\n');
        const headers = lines[0].split(',');
        const result = lines.slice(1).map(line => {
          const values = line.split(',');
          const obj = {};
          headers.forEach((header, idx) => {
            obj[header.trim()] = values[idx]?.trim() ?? '';
          });
          return obj;
        });
        resolve(result);
      };
      reader.onerror = reject;
      reader.readAsText(file, 'utf-8');
    });
  }
  // 呼叫 API 傳送 JSON 給後端
  importAllDataTable(payload) {
    this.sysDashboardService.importAllDB(payload).subscribe({
      next: res => alert('匯入成功！'),
      error: err => alert('匯入失敗：' + err.message)
    });
  }
  static {
    this.ɵfac = function BackupComponent_Factory(t) {
      return new (t || BackupComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_services_sys_dashboard_service__WEBPACK_IMPORTED_MODULE_0__.SysDashboardService), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](src_app_common_export_import_services_export_service__WEBPACK_IMPORTED_MODULE_1__.ExportService));
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({
      type: BackupComponent,
      selectors: [["app-backup"]],
      decls: 20,
      vars: 0,
      consts: [["csvFileInput", ""], [3, "click"], ["type", "file", "multiple", "", "accept", ".csv", 2, "display", "none", 3, "change"]],
      template: function BackupComponent_Template(rf, ctx) {
        if (rf & 1) {
          const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "h2");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, "\u500B\u5225\u8868\u532F\u51FA");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](2, "br");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](3, "button", 1);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function BackupComponent_Template_button_click_3_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r1);
            return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx.exportAllUser());
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](4, "\u532F\u51FA\u6240\u6709\u4F7F\u7528\u8005");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](5, "button", 1);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function BackupComponent_Template_button_click_5_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r1);
            return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx.exportAllRoom());
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](6, "\u532F\u51FA\u6240\u6709\u6559\u5BA4");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](7, "button", 1);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function BackupComponent_Template_button_click_7_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r1);
            return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx.exportAllSite());
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](8, "\u532F\u51FA\u6240\u6709\u5EA7\u4F4D");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](9, "button", 1);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function BackupComponent_Template_button_click_9_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r1);
            return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx.exportAllBooking());
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](10, "\u532F\u51FA\u6240\u6709\u9810\u7D04\u7D00\u9304");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](11, "h2");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](12, "\u5168\u8868\u532F\u51FA\u532F\u5165");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](13, "br");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](14, "button", 1);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function BackupComponent_Template_button_click_14_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r1);
            return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx.exportAllDataTable());
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](15, "\u532F\u51FA\u6240\u6709\u8868");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](16, "input", 2, 0);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("change", function BackupComponent_Template_input_change_16_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r1);
            return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx.handleFiles($event));
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](18, "button", 1);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function BackupComponent_Template_button_click_18_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r1);
            const csvFileInput_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵreference"](17);
            return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](csvFileInput_r2.click());
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](19, "\u532F\u5165\u5099\u4EFD\u8CC7\u6599\u8868");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        }
      },
      styles: ["/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJiYWNrdXAuY29tcG9uZW50LnNjc3MifQ== */\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvbWFuYWdlci1zeXN0ZW0vY29tcG9uZW50cy9iYWNrdXAvYmFja3VwLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFDQSxvS0FBb0siLCJzb3VyY2VSb290IjoiIn0= */"]
    });
  }
}

/***/ }),

/***/ 4201:
/*!******************************************************************************!*\
  !*** ./src/app/manager-system/components/log-record/log-record.component.ts ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LogRecordComponent: () => (/* binding */ LogRecordComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 7580);

class LogRecordComponent {
  static {
    this.ɵfac = function LogRecordComponent_Factory(t) {
      return new (t || LogRecordComponent)();
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
      type: LogRecordComponent,
      selectors: [["app-log-record"]],
      decls: 2,
      vars: 0,
      template: function LogRecordComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "p");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "log-record works!");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        }
      },
      styles: ["/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJsb2ctcmVjb3JkLmNvbXBvbmVudC5zY3NzIn0= */\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvbWFuYWdlci1zeXN0ZW0vY29tcG9uZW50cy9sb2ctcmVjb3JkL2xvZy1yZWNvcmQuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUNBLHdLQUF3SyIsInNvdXJjZVJvb3QiOiIifQ== */"]
    });
  }
}

/***/ }),

/***/ 2637:
/*!******************************************************************************!*\
  !*** ./src/app/manager-system/components/pay-record/pay-record.component.ts ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PayRecordComponent: () => (/* binding */ PayRecordComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _services_sys_dashboard_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../services/sys-dashboard.service */ 324);
/* harmony import */ var src_app_common_export_import_services_export_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/common/export-import/services/export.service */ 5391);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ 316);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ 4456);





function PayRecordComponent_div_12_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, "\u958B\u59CB\u641C\u5C0B");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
}
function PayRecordComponent_div_13_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, "\u6C92\u6709\u627E\u5230\u7D50\u679C");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
}
function PayRecordComponent_ul_14_li_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "li")(1, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](2, "\u8CFC\u8CB7\u8005\u4FE1\u7BB1:");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](4, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](5, "\u65B9\u6848\u540D\u7A31:");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](7, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](8, "\u8CC7\u8A0A:");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const payRecord_r1 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", payRecord_r1.email, " | ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", payRecord_r1.planName, " | ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", payRecord_r1.message, " ");
  }
}
function PayRecordComponent_ul_14_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "ul");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](1, PayRecordComponent_ul_14_li_1_Template, 10, 3, "li", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngForOf", ctx_r1.payRecordList);
  }
}
function PayRecordComponent_div_15_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](1, "img", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
}
class PayRecordComponent {
  constructor(sysDashboardService, exportService) {
    this.sysDashboardService = sysDashboardService;
    this.exportService = exportService;
    this.isDefault = true;
    this.isLoading = false;
    this.searchMail = '';
    this.searchPlanName = '';
    this.payRecordList = []; // 存放搜尋結果
  }
  clickExportPayRecord() {
    this.sysDashboardService.searchPayRecord("", "").subscribe({
      next: res => {
        console.log(res);
        if (res.result && res.result.length > 0) {
          const csvData = this.exportService.convertToCSV(res.result);
          this.exportService.downloadCSV(csvData, '金流紀錄.csv');
        } else {
          alert('無可匯出的資料');
        }
      },
      error: err => {
        alert("匯出失敗 : " + err.error.message);
      }
    });
  }
  clickSearchPayRecord() {
    this.isDefault = false;
    this.isLoading = true;
    this.sysDashboardService.searchPayRecord(this.searchMail, this.searchPlanName).subscribe({
      next: res => {
        console.log(res);
        this.payRecordList = res.result;
        this.isLoading = false;
      },
      error: err => {
        alert(`搜尋失敗 : ${err.error.message}`);
        this.isLoading = false;
      }
    });
  }
  static {
    this.ɵfac = function PayRecordComponent_Factory(t) {
      return new (t || PayRecordComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_services_sys_dashboard_service__WEBPACK_IMPORTED_MODULE_0__.SysDashboardService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](src_app_common_export_import_services_export_service__WEBPACK_IMPORTED_MODULE_1__.ExportService));
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({
      type: PayRecordComponent,
      selectors: [["app-pay-record"]],
      decls: 16,
      vars: 6,
      consts: [[1, "search-bar"], [3, "click"], ["type", "text", "placeholder", "\u8CFC\u8CB7\u8005\u4FE1\u7BB1\u4E0D\u9650", 3, "ngModelChange", "ngModel"], ["type", "text", "placeholder", "\u65B9\u6848\u540D\u7A31\u4E0D\u9650", 3, "ngModelChange", "ngModel"], [1, "search-result"], [4, "ngIf"], ["class", "loading-gif", 4, "ngIf"], [4, "ngFor", "ngForOf"], [1, "loading-gif"], ["src", "assets/images/icon/icon_loading.gif", 2, "width", "50px"]],
      template: function PayRecordComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 0)(1, "button", 1);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function PayRecordComponent_Template_button_click_1_listener() {
            return ctx.clickExportPayRecord();
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](2, "\u532F\u51FA\u6240\u6709\u65B9\u6848\u7D00\u9304");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](3, "br");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](4, "input", 2);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayListener"]("ngModelChange", function PayRecordComponent_Template_input_ngModelChange_4_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayBindingSet"](ctx.searchMail, $event) || (ctx.searchMail = $event);
            return $event;
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](5, "span");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](6, "\u4E26\u4E14");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](7, "input", 3);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayListener"]("ngModelChange", function PayRecordComponent_Template_input_ngModelChange_7_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayBindingSet"](ctx.searchPlanName, $event) || (ctx.searchPlanName = $event);
            return $event;
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](8, "br");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](9, "button", 1);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function PayRecordComponent_Template_button_click_9_listener() {
            return ctx.clickSearchPayRecord();
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](10, "\u641C\u5C0B");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](11, "div", 4);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](12, PayRecordComponent_div_12_Template, 2, 0, "div", 5)(13, PayRecordComponent_div_13_Template, 2, 0, "div", 5)(14, PayRecordComponent_ul_14_Template, 2, 1, "ul", 5)(15, PayRecordComponent_div_15_Template, 2, 0, "div", 6);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        }
        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](4);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayProperty"]("ngModel", ctx.searchMail);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayProperty"]("ngModel", ctx.searchPlanName);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](5);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.isDefault);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.payRecordList.length === 0 && !ctx.isDefault && !ctx.isLoading);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.payRecordList.length > 0);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.isLoading);
        }
      },
      dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_3__.NgIf, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.NgModel],
      styles: ["/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJwYXktcmVjb3JkLmNvbXBvbmVudC5zY3NzIn0= */\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvbWFuYWdlci1zeXN0ZW0vY29tcG9uZW50cy9wYXktcmVjb3JkL3BheS1yZWNvcmQuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUNBLHdLQUF3SyIsInNvdXJjZVJvb3QiOiIifQ== */"]
    });
  }
}

/***/ }),

/***/ 9923:
/*!************************************************************************************************!*\
  !*** ./src/app/manager-system/components/pay-setting-content/pay-setting-content.component.ts ***!
  \************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PaySettingContentComponent: () => (/* binding */ PaySettingContentComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 5072);
/* harmony import */ var _services_sys_dashboard_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../services/sys-dashboard.service */ 324);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ 316);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ 4456);





function PaySettingContentComponent_button_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "button", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function PaySettingContentComponent_button_2_Template_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r1);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r1.clickAddPayment());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1, "\u65B0\u589E");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
}
function PaySettingContentComponent_button_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "button", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function PaySettingContentComponent_button_3_Template_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r3);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r1.clickUpdatePayment());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1, "\u66F4\u65B0");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
}
class PaySettingContentComponent {
  constructor(activatedRoute, sysDashboardService, router) {
    this.activatedRoute = activatedRoute;
    this.sysDashboardService = sysDashboardService;
    this.router = router;
    this.model = ""; // 新增 add , 編輯 edit
    this.planName = "";
    this.planTimeType = "";
    this.planType = "";
    this.planDesc = "";
    this.cost = 0;
    this.siteTotal = 0;
  }
  ngOnInit() {
    // 取得 model (新增 add , 編輯 edit), 若編輯, 取得編輯方案
    this.activatedRoute.queryParams.subscribe(params => {
      this.model = params['model'];
      if (this.model === "edit") {
        this.payment = this.sysDashboardService.getPayment();
        this.planName = this.payment.planName;
        this.planTimeType = this.payment.planTimeType;
        this.planType = this.payment.planType;
        this.planDesc = this.payment.planDesc;
        this.cost = this.payment.cost;
        this.siteTotal = this.payment.siteTotal;
      }
    });
  }
  /** 新增, 更新 前, 檢查欄位 */
  isFieldOk() {
    if (!this.planName || this.planName.trim() === "") {
      alert("請輸入方案名稱");
      return false;
    }
    if (!this.cost || isNaN(this.cost)) {
      alert("費用請輸入數字");
      return false;
    }
    if (!this.siteTotal || isNaN(this.siteTotal)) {
      alert("座位數請輸入數字" + this.siteTotal);
      return false;
    }
    return true;
  }
  clickAddPayment() {
    if (!this.isFieldOk()) return;
    let planName = this.planName;
    let planTimeType = this.planTimeType;
    let planType = this.planType;
    let planDesc = this.planDesc;
    let cost = this.cost;
    let siteTotal = this.siteTotal;
    this.sysDashboardService.postPayment({
      planName,
      planTimeType,
      planType,
      planDesc,
      cost,
      siteTotal
    }).subscribe({
      next: res => {
        alert("方案新增成功");
        this.router.navigate(["/manager-sys/pay-setting"], {});
      },
      error: err => {
        alert("方案新增失敗 err " + err);
      }
    });
  }
  clickUpdatePayment() {
    if (!this.isFieldOk()) return;
    let id = this.payment.id;
    let planName = this.planName;
    let planTimeType = this.planTimeType;
    let planType = this.planType;
    let planDesc = this.planDesc;
    let cost = this.cost;
    let siteTotal = this.siteTotal;
    this.sysDashboardService.updatePayment({
      id,
      planName,
      planTimeType,
      planType,
      planDesc,
      cost,
      siteTotal
    }).subscribe({
      next: res => {
        alert("方案更新成功");
        this.router.navigate(["/manager-sys/pay-setting"], {});
      },
      error: err => {
        alert("方案更新失敗 err " + err);
      }
    });
  }
  static {
    this.ɵfac = function PaySettingContentComponent_Factory(t) {
      return new (t || PaySettingContentComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_2__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_services_sys_dashboard_service__WEBPACK_IMPORTED_MODULE_0__.SysDashboardService), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_2__.Router));
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
      type: PaySettingContentComponent,
      selectors: [["app-pay-setting-content"]],
      decls: 11,
      vars: 9,
      consts: [[3, "click", 4, "ngIf"], [1, "container"], ["type", "text", "placeholder", "\u540D\u7A31", 3, "ngModelChange", "ngModel"], ["type", "text", "placeholder", "\u65B9\u6848\u671F\u9593, \u8F38\u5165 day, month, year", 3, "ngModelChange", "ngModel"], ["type", "text", "placeholder", "\u65B9\u6848\u7A2E\u985E, \u8F38\u5165 studio, group", 3, "ngModelChange", "ngModel"], ["type", "text", "placeholder", "\u65B9\u6848\u8AAA\u660E", 3, "ngModelChange", "ngModel"], ["type", "text", "placeholder", "\u8CBB\u7528", 3, "ngModelChange", "ngModel"], ["type", "text", "placeholder", "\u5EA7\u4F4D\u6578\u91CF", 3, "ngModelChange", "ngModel"], [3, "click"]],
      template: function PaySettingContentComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "h2");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](2, PaySettingContentComponent_button_2_Template, 2, 0, "button", 0)(3, PaySettingContentComponent_button_3_Template, 2, 0, "button", 0);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "div", 1)(5, "input", 2);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayListener"]("ngModelChange", function PaySettingContentComponent_Template_input_ngModelChange_5_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayBindingSet"](ctx.planName, $event) || (ctx.planName = $event);
            return $event;
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](6, "input", 3);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayListener"]("ngModelChange", function PaySettingContentComponent_Template_input_ngModelChange_6_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayBindingSet"](ctx.planTimeType, $event) || (ctx.planTimeType = $event);
            return $event;
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](7, "input", 4);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayListener"]("ngModelChange", function PaySettingContentComponent_Template_input_ngModelChange_7_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayBindingSet"](ctx.planType, $event) || (ctx.planType = $event);
            return $event;
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](8, "input", 5);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayListener"]("ngModelChange", function PaySettingContentComponent_Template_input_ngModelChange_8_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayBindingSet"](ctx.planDesc, $event) || (ctx.planDesc = $event);
            return $event;
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](9, "input", 6);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayListener"]("ngModelChange", function PaySettingContentComponent_Template_input_ngModelChange_9_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayBindingSet"](ctx.cost, $event) || (ctx.cost = $event);
            return $event;
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](10, "input", 7);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayListener"]("ngModelChange", function PaySettingContentComponent_Template_input_ngModelChange_10_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayBindingSet"](ctx.siteTotal, $event) || (ctx.siteTotal = $event);
            return $event;
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
        }
        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"]("", ctx.model === "add" ? "\u65B0\u589E" : "\u7DE8\u8F2F", "\u65B9\u6848");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.model === "add");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.model === "edit");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayProperty"]("ngModel", ctx.planName);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayProperty"]("ngModel", ctx.planTimeType);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayProperty"]("ngModel", ctx.planType);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayProperty"]("ngModel", ctx.planDesc);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayProperty"]("ngModel", ctx.cost);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayProperty"]("ngModel", ctx.siteTotal);
        }
      },
      dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.NgIf, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.NgModel],
      styles: ["/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJwYXktc2V0dGluZy1jb250ZW50LmNvbXBvbmVudC5zY3NzIn0= */\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvbWFuYWdlci1zeXN0ZW0vY29tcG9uZW50cy9wYXktc2V0dGluZy1jb250ZW50L3BheS1zZXR0aW5nLWNvbnRlbnQuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUNBLG9MQUFvTCIsInNvdXJjZVJvb3QiOiIifQ== */"]
    });
  }
}

/***/ }),

/***/ 3155:
/*!********************************************************************************!*\
  !*** ./src/app/manager-system/components/pay-setting/pay-setting.component.ts ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PaySettingComponent: () => (/* binding */ PaySettingComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _services_sys_dashboard_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../services/sys-dashboard.service */ 324);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 5072);
/* harmony import */ var src_app_common_export_import_services_export_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/common/export-import/services/export.service */ 5391);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 316);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ 4456);






function PaySettingComponent_div_17_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, "\u958B\u59CB\u641C\u5C0B");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
}
function PaySettingComponent_div_18_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, "\u6C92\u6709\u627E\u5230\u7D50\u679C");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
}
function PaySettingComponent_ul_19_li_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "li")(1, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](2, "\u540D\u7A31:");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](4, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](5, "\u6642\u6BB5:");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](7, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](8, "\u7A2E\u985E:");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](10, "button", 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function PaySettingComponent_ul_19_li_1_Template_button_click_10_listener() {
      const payment_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r1).$implicit;
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx_r2.clickEditPayment(payment_r2));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](11, "\u7DE8\u8F2F");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](12, "button", 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function PaySettingComponent_ul_19_li_1_Template_button_click_12_listener() {
      const payment_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r1).$implicit;
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx_r2.clickDeletePayment(payment_r2));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](13, "\u522A\u9664");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const payment_r2 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", payment_r2.planName, " | ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", payment_r2.planTimeType, " | ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", payment_r2.planType, " | ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵstyleProp"]("opacity", payment_r2.haveBuy ? 0.5 : 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵstyleProp"]("opacity", payment_r2.haveBuy ? 0.5 : 1);
  }
}
function PaySettingComponent_ul_19_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "ul");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](1, PaySettingComponent_ul_19_li_1_Template, 14, 7, "li", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngForOf", ctx_r2.paymentList);
  }
}
class PaySettingComponent {
  constructor(sysDashboardService, router, exportService) {
    this.sysDashboardService = sysDashboardService;
    this.router = router;
    this.exportService = exportService;
    this.isFirstSearch = true;
    this.paymentList = [];
    this.planName = "";
    this.planTimeType = "";
    this.planType = "";
  }
  exportAllPayment() {
    this.sysDashboardService.exportPaymentAll().subscribe({
      next: res => {
        if (!res.result || res.result.length === 0) {
          alert("無匯出 方案 資料");
          return;
        }
        //alert("方案匯出成功");
        const csvData = this.exportService.convertToCSV(res.result);
        this.exportService.downloadCSV(csvData, '方案資料.csv');
      },
      error: err => {
        alert("匯出 方案 異常, err : " + err);
      }
    });
  }
  clickAddPayment() {
    const navigationExtras = {
      queryParams: {
        model: "add"
      }
    };
    this.router.navigate(["manager-sys/pay-setting-content"], navigationExtras);
  }
  clickDeletePayment(payment) {
    if (payment.haveBuy) {
      alert("該方案已被購買,無法刪除。");
      return;
    }
    if (!confirm("確定刪除方案嗎?")) {
      return;
    }
    this.sysDashboardService.deletePayment(payment.id).subscribe({
      next: res => {
        alert("方案刪除成功");
        this.searchPayment();
      },
      error: err => {
        alert("方案 刪除 失敗" + err);
      }
    });
  }
  clickEditPayment(payment) {
    if (payment.haveBuy) {
      alert("該方案已被購買,無法編輯。");
      return;
    }
    const navigationExtras = {
      queryParams: {
        model: "edit"
      }
    };
    this.sysDashboardService.setPayment(payment);
    this.router.navigate(["manager-sys/pay-setting-content"], navigationExtras);
  }
  searchPayment() {
    let planName = this.planName.trim() === "" ? "all" : this.planName;
    let planTimeType = this.planTimeType.trim() === "" ? "all" : this.planTimeType;
    let planType = this.planType.trim() === "" ? "all" : this.planType;
    this.sysDashboardService.searchPayment(planName, planTimeType, planType).subscribe({
      next: res => {
        console.log(" 方案 YOYOYO! ", res);
        this.paymentList = res.result || [];
        this.isFirstSearch = false;
      },
      error: err => {
        alert("搜尋方案出錯 err : " + err);
        console.log("搜尋方案出錯 err : ", err);
      }
    });
  }
  static {
    this.ɵfac = function PaySettingComponent_Factory(t) {
      return new (t || PaySettingComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_services_sys_dashboard_service__WEBPACK_IMPORTED_MODULE_0__.SysDashboardService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_3__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](src_app_common_export_import_services_export_service__WEBPACK_IMPORTED_MODULE_1__.ExportService));
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({
      type: PaySettingComponent,
      selectors: [["app-pay-setting"]],
      decls: 20,
      vars: 6,
      consts: [[3, "click"], [1, "search-bar"], ["type", "text", "placeholder", "\u65B9\u6848\u540D\u7A31\u4E0D\u9650", 3, "ngModelChange", "ngModel"], ["type", "text", "placeholder", "\u65B9\u6848\u671F\u9650\u4E0D\u9650", 3, "ngModelChange", "ngModel"], ["type", "text", "placeholder", "\u65B9\u6848\u7A2E\u985E\u4E0D\u9650", 3, "ngModelChange", "ngModel"], [1, "search-result"], [4, "ngIf"], [4, "ngFor", "ngForOf"]],
      template: function PaySettingComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "button", 0);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function PaySettingComponent_Template_button_click_0_listener() {
            return ctx.clickAddPayment();
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, "\u65B0\u589E");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](2, "button", 0);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function PaySettingComponent_Template_button_click_2_listener() {
            return ctx.exportAllPayment();
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](3, "\u532F\u51FA\u65B9\u6848");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](4, "div", 1)(5, "input", 2);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayListener"]("ngModelChange", function PaySettingComponent_Template_input_ngModelChange_5_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayBindingSet"](ctx.planName, $event) || (ctx.planName = $event);
            return $event;
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](6, "span");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](7, "\u4E26\u4E14");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](8, "input", 3);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayListener"]("ngModelChange", function PaySettingComponent_Template_input_ngModelChange_8_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayBindingSet"](ctx.planTimeType, $event) || (ctx.planTimeType = $event);
            return $event;
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](9, "span");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](10, "\u4E26\u4E14");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](11, "input", 4);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayListener"]("ngModelChange", function PaySettingComponent_Template_input_ngModelChange_11_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayBindingSet"](ctx.planType, $event) || (ctx.planType = $event);
            return $event;
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](12, "br")(13, "br");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](14, "button", 0);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function PaySettingComponent_Template_button_click_14_listener() {
            return ctx.searchPayment();
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](15, "\u641C\u5C0B");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](16, "div", 5);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](17, PaySettingComponent_div_17_Template, 2, 0, "div", 6)(18, PaySettingComponent_div_18_Template, 2, 0, "div", 6)(19, PaySettingComponent_ul_19_Template, 2, 1, "ul", 6);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        }
        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](5);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayProperty"]("ngModel", ctx.planName);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayProperty"]("ngModel", ctx.planTimeType);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayProperty"]("ngModel", ctx.planType);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](6);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.isFirstSearch);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.paymentList.length === 0 && !ctx.isFirstSearch);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.paymentList.length > 0);
        }
      },
      dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_4__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_4__.NgIf, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.NgModel],
      styles: ["/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJwYXktc2V0dGluZy5jb21wb25lbnQuc2NzcyJ9 */\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvbWFuYWdlci1zeXN0ZW0vY29tcG9uZW50cy9wYXktc2V0dGluZy9wYXktc2V0dGluZy5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQ0Esd0tBQXdLIiwic291cmNlUm9vdCI6IiJ9 */"]
    });
  }
}

/***/ }),

/***/ 4627:
/*!************************************************************************************!*\
  !*** ./src/app/manager-system/components/sys-dashboard/sys-dashboard.component.ts ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SysDashboardComponent: () => (/* binding */ SysDashboardComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ 5072);


class SysDashboardComponent {
  constructor() {
    this.isMenuVisible = true; // 預設選單是顯示的
  }
  toggleMenu() {
    this.isMenuVisible = !this.isMenuVisible;
  }
  static {
    this.ɵfac = function SysDashboardComponent_Factory(t) {
      return new (t || SysDashboardComponent)();
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
      type: SysDashboardComponent,
      selectors: [["app-sys-dashboard"]],
      decls: 18,
      vars: 4,
      consts: [[1, "manager-container"], ["src", "assets/images/icon/icon_next.png", 1, "iconBtn", 3, "click"], [1, "manager-menu"], ["src", "assets/images/icon/icon_back.png", 1, "iconBtn", 3, "click"], ["routerLink", "/manager-sys/all-user", "routerLinkActive", "active"], ["routerLink", "/manager-sys/user-role-list", "routerLinkActive", "active"], ["routerLink", "/manager-sys/user-payment-list", "routerLinkActive", "active"], ["routerLink", "/manager-sys/pay-record", "routerLinkActive", "active"], ["routerLink", "/manager-sys/pay-setting", "routerLinkActive", "active"], ["routerLink", "/manager-sys/backup", "routerLinkActive", "active"]],
      template: function SysDashboardComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0)(1, "img", 1);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function SysDashboardComponent_Template_img_click_1_listener() {
            return ctx.toggleMenu();
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 2)(3, "img", 3);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function SysDashboardComponent_Template_img_click_3_listener() {
            return ctx.toggleMenu();
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "button", 4);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5, "\u4F7F\u7528\u8005\u8CC7\u8A0A");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "button", 5);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](7, "\u4F7F\u7528\u8005\u89D2\u8272");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "button", 6);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](9, "\u4F7F\u7528\u8005\u65B9\u6848\u7D00\u9304");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "button", 7);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](11, "\u91D1\u6D41\u7CFB\u7D71\u7D00\u9304");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "button", 8);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](13, "\u91D1\u6D41\u65B9\u6848\u8A2D\u5B9A");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "button", 9);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](15, "\u7CFB\u7D71\u5099\u4EFD");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](16, "div", 0);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](17, "router-outlet");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
        }
        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵstyleProp"]("display", ctx.isMenuVisible ? "none" : "block");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵstyleProp"]("display", ctx.isMenuVisible ? "flex" : "none");
        }
      },
      dependencies: [_angular_router__WEBPACK_IMPORTED_MODULE_1__.RouterOutlet, _angular_router__WEBPACK_IMPORTED_MODULE_1__.RouterLink, _angular_router__WEBPACK_IMPORTED_MODULE_1__.RouterLinkActive],
      styles: ["@charset \"UTF-8\";\n\n\n.manager-container[_ngcontent-%COMP%] {\n  width: 90vw;\n  display: flex;\n  flex-direction: row;\n  justify-content: flex-start;\n  align-items: flex-start;\n  padding: 40px;\n}\n.manager-container[_ngcontent-%COMP%]   .iconBtn[_ngcontent-%COMP%] {\n  width: 30px;\n  margin: 10px;\n}\n.manager-container[_ngcontent-%COMP%]   .manager-menu[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  justify-content: flex-start;\n  align-items: flex-start;\n  padding: 20px;\n  min-width: 220px;\n  background: #661983;\n  border-radius: 20px;\n}\n.manager-container[_ngcontent-%COMP%]   .manager-container[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  justify-content: flex-start;\n  align-items: flex-start;\n  padding: 20px 40px;\n}\n.manager-container[_ngcontent-%COMP%]   .manager-container[_ngcontent-%COMP%]   .search-bar[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: row;\n  justify-content: flex-start;\n  align-items: center;\n  gap: 20px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN5cy1kYXNoYm9hcmQuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsZ0JBQWdCO0FBQ2hCLFdBQUE7QUFDQTtFQUNJLFdBQUE7RUFDQSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSwyQkFBQTtFQUNBLHVCQUFBO0VBQ0EsYUFBQTtBQUNKO0FBQUk7RUFDSSxXQUFBO0VBQ0EsWUFBQTtBQUVSO0FBQ0k7RUFDSSxhQUFBO0VBQ0Esc0JBQUE7RUFDQSwyQkFBQTtFQUNBLHVCQUFBO0VBQ0EsYUFBQTtFQUNBLGdCQUFBO0VBQ0EsbUJBQUE7RUFDQSxtQkFBQTtBQUNSO0FBQ0k7RUFDSSxhQUFBO0VBQ0Esc0JBQUE7RUFDQSwyQkFBQTtFQUNBLHVCQUFBO0VBQ0Esa0JBQUE7QUFDUjtBQUNRO0VBQ0ksYUFBQTtFQUNBLG1CQUFBO0VBQ0EsMkJBQUE7RUFDQSxtQkFBQTtFQUNBLFNBQUE7QUFDWiIsImZpbGUiOiJzeXMtZGFzaGJvYXJkLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbi8qIOW+jOWPsOeuoeeQhuaoo+W8jyAqL1xyXG4ubWFuYWdlci1jb250YWluZXIge1xyXG4gICAgd2lkdGg6IDkwdnc7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgZmxleC1kaXJlY3Rpb246IHJvdztcclxuICAgIGp1c3RpZnktY29udGVudDogZmxleC1zdGFydDtcclxuICAgIGFsaWduLWl0ZW1zOiBmbGV4LXN0YXJ0O1xyXG4gICAgcGFkZGluZzogNDBweDtcclxuICAgIC5pY29uQnRuIHtcclxuICAgICAgICB3aWR0aDogMzBweDtcclxuICAgICAgICBtYXJnaW46IDEwcHg7XHJcbiAgICB9XHJcblxyXG4gICAgLm1hbmFnZXItbWVudSB7XHJcbiAgICAgICAgZGlzcGxheTogZmxleDtcclxuICAgICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gICAgICAgIGp1c3RpZnktY29udGVudDogZmxleC1zdGFydDtcclxuICAgICAgICBhbGlnbi1pdGVtczogZmxleC1zdGFydDtcclxuICAgICAgICBwYWRkaW5nOiAyMHB4O1xyXG4gICAgICAgIG1pbi13aWR0aDogMjIwcHg7XHJcbiAgICAgICAgYmFja2dyb3VuZDogIzY2MTk4MztcclxuICAgICAgICBib3JkZXItcmFkaXVzOiAyMHB4O1xyXG4gICAgfVxyXG4gICAgLm1hbmFnZXItY29udGFpbmVyIHtcclxuICAgICAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAgICAgICAganVzdGlmeS1jb250ZW50OiBmbGV4LXN0YXJ0O1xyXG4gICAgICAgIGFsaWduLWl0ZW1zOiBmbGV4LXN0YXJ0O1xyXG4gICAgICAgIHBhZGRpbmc6IDIwcHggNDBweDtcclxuXHJcbiAgICAgICAgLnNlYXJjaC1iYXIge1xyXG4gICAgICAgICAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgICAgICAgICBmbGV4LWRpcmVjdGlvbjogcm93O1xyXG4gICAgICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtc3RhcnQ7XHJcbiAgICAgICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgICAgICAgICAgIGdhcDogMjBweDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG4iXX0= */\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvbWFuYWdlci1zeXN0ZW0vY29tcG9uZW50cy9zeXMtZGFzaGJvYXJkL3N5cy1kYXNoYm9hcmQuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsZ0JBQWdCO0FBQ2hCLFdBQUE7QUFDQTtFQUNJLFdBQUE7RUFDQSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSwyQkFBQTtFQUNBLHVCQUFBO0VBQ0EsYUFBQTtBQUNKO0FBQUk7RUFDSSxXQUFBO0VBQ0EsWUFBQTtBQUVSO0FBQ0k7RUFDSSxhQUFBO0VBQ0Esc0JBQUE7RUFDQSwyQkFBQTtFQUNBLHVCQUFBO0VBQ0EsYUFBQTtFQUNBLGdCQUFBO0VBQ0EsbUJBQUE7RUFDQSxtQkFBQTtBQUNSO0FBQ0k7RUFDSSxhQUFBO0VBQ0Esc0JBQUE7RUFDQSwyQkFBQTtFQUNBLHVCQUFBO0VBQ0Esa0JBQUE7QUFDUjtBQUNRO0VBQ0ksYUFBQTtFQUNBLG1CQUFBO0VBQ0EsMkJBQUE7RUFDQSxtQkFBQTtFQUNBLFNBQUE7QUFDWjtBQUNBLDRnRUFBNGdFIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbi8qIMOlwr7CjMOlwo/CsMOnwq7CocOnwpDChsOmwqjCo8OlwrzCjyAqL1xyXG4ubWFuYWdlci1jb250YWluZXIge1xyXG4gICAgd2lkdGg6IDkwdnc7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgZmxleC1kaXJlY3Rpb246IHJvdztcclxuICAgIGp1c3RpZnktY29udGVudDogZmxleC1zdGFydDtcclxuICAgIGFsaWduLWl0ZW1zOiBmbGV4LXN0YXJ0O1xyXG4gICAgcGFkZGluZzogNDBweDtcclxuICAgIC5pY29uQnRuIHtcclxuICAgICAgICB3aWR0aDogMzBweDtcclxuICAgICAgICBtYXJnaW46IDEwcHg7XHJcbiAgICB9XHJcblxyXG4gICAgLm1hbmFnZXItbWVudSB7XHJcbiAgICAgICAgZGlzcGxheTogZmxleDtcclxuICAgICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gICAgICAgIGp1c3RpZnktY29udGVudDogZmxleC1zdGFydDtcclxuICAgICAgICBhbGlnbi1pdGVtczogZmxleC1zdGFydDtcclxuICAgICAgICBwYWRkaW5nOiAyMHB4O1xyXG4gICAgICAgIG1pbi13aWR0aDogMjIwcHg7XHJcbiAgICAgICAgYmFja2dyb3VuZDogIzY2MTk4MztcclxuICAgICAgICBib3JkZXItcmFkaXVzOiAyMHB4O1xyXG4gICAgfVxyXG4gICAgLm1hbmFnZXItY29udGFpbmVyIHtcclxuICAgICAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAgICAgICAganVzdGlmeS1jb250ZW50OiBmbGV4LXN0YXJ0O1xyXG4gICAgICAgIGFsaWduLWl0ZW1zOiBmbGV4LXN0YXJ0O1xyXG4gICAgICAgIHBhZGRpbmc6IDIwcHggNDBweDtcclxuXHJcbiAgICAgICAgLnNlYXJjaC1iYXIge1xyXG4gICAgICAgICAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgICAgICAgICBmbGV4LWRpcmVjdGlvbjogcm93O1xyXG4gICAgICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtc3RhcnQ7XHJcbiAgICAgICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgICAgICAgICAgIGdhcDogMjBweDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG4iXSwic291cmNlUm9vdCI6IiJ9 */"]
    });
  }
}

/***/ }),

/***/ 1251:
/*!********************************************************************************************!*\
  !*** ./src/app/manager-system/components/user-payment-list/user-payment-list.component.ts ***!
  \********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   UserPaymentListComponent: () => (/* binding */ UserPaymentListComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _services_sys_dashboard_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../services/sys-dashboard.service */ 324);
/* harmony import */ var src_app_common_export_import_services_export_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/common/export-import/services/export.service */ 5391);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ 316);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ 4456);





function UserPaymentListComponent_div_12_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, "\u958B\u59CB\u641C\u5C0B");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
}
function UserPaymentListComponent_div_13_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, "\u6C92\u6709\u627E\u5230\u7D50\u679C");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
}
function UserPaymentListComponent_ul_14_li_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "li")(1, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](2, "\u4F7F\u7528\u8005id:");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](4, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](5, "\u4F7F\u7528\u8005\u4FE1\u7BB1:");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](7, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](8, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](9, "\u65B9\u6848\u540D\u7A31:");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](10);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](11, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](12, "\u7A7A\u9593\u6578\u91CF:");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](13);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](14, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](15, "\u65B9\u6848\u671F\u9593:");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](16);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](17, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](18, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](19, "\u8CFC\u8CB7\u65E5\u671F:");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](20);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](21, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](22, "\u5230\u671F\u65E5\u671F:");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](23);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const userPayment_r1 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", userPayment_r1.userId, " | ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", userPayment_r1.email, " | ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", userPayment_r1.planName, " | ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", userPayment_r1.siteTotal, " | ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", userPayment_r1.planTimeType, " | ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", userPayment_r1.purchaseDate, " | ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", userPayment_r1.expiryDate, " ");
  }
}
function UserPaymentListComponent_ul_14_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "ul");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](1, UserPaymentListComponent_ul_14_li_1_Template, 24, 7, "li", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngForOf", ctx_r1.userPaymentList);
  }
}
function UserPaymentListComponent_div_15_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](1, "img", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
}
class UserPaymentListComponent {
  constructor(sysDashboardService, exportService) {
    this.sysDashboardService = sysDashboardService;
    this.exportService = exportService;
    this.isDefault = true;
    this.isLoading = false;
    this.searchMail = '';
    this.searchPayment = '';
    this.userPaymentList = []; // 存放搜尋結果
  }
  export() {
    this.sysDashboardService.searchUserPayment("", "").subscribe({
      next: res => {
        if (res.result && res.result.length > 0) {
          const csvData = this.exportService.convertToCSV(res.result);
          this.exportService.downloadCSV(csvData, '使用者方案資料.csv');
        } else {
          alert('無可匯出的資料');
        }
      },
      error: err => {
        alert("匯出失敗 : " + err.error.message);
      }
    });
  }
  search() {
    this.isDefault = false;
    this.isLoading = true;
    this.sysDashboardService.searchUserPayment(this.searchMail, this.searchPayment).subscribe({
      next: res => {
        console.log("yoyo res ", res);
        this.userPaymentList = res.result;
        this.isLoading = false;
      },
      error: err => {
        alert(`搜尋失敗 : ${err.error.message}`);
        this.isLoading = false;
      }
    });
  }
  static {
    this.ɵfac = function UserPaymentListComponent_Factory(t) {
      return new (t || UserPaymentListComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_services_sys_dashboard_service__WEBPACK_IMPORTED_MODULE_0__.SysDashboardService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](src_app_common_export_import_services_export_service__WEBPACK_IMPORTED_MODULE_1__.ExportService));
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({
      type: UserPaymentListComponent,
      selectors: [["app-user-payment-list"]],
      decls: 16,
      vars: 6,
      consts: [[1, "search-bar"], [3, "click"], ["type", "text", "placeholder", "\u4F7F\u7528\u8005\u4FE1\u7BB1\u4E0D\u9650", 3, "ngModelChange", "ngModel"], ["type", "text", "placeholder", "\u65B9\u6848\u540D\u7A31\u4E0D\u9650", 3, "ngModelChange", "ngModel"], [1, "search-result"], [4, "ngIf"], ["class", "loading-gif", 4, "ngIf"], [4, "ngFor", "ngForOf"], [1, "loading-gif"], ["src", "assets/images/icon/icon_loading.gif", 2, "width", "50px"]],
      template: function UserPaymentListComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 0)(1, "button", 1);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function UserPaymentListComponent_Template_button_click_1_listener() {
            return ctx.export();
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](2, "\u532F\u51FA\u4F7F\u7528\u8005\u65B9\u6848");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](3, "br");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](4, "input", 2);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayListener"]("ngModelChange", function UserPaymentListComponent_Template_input_ngModelChange_4_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayBindingSet"](ctx.searchMail, $event) || (ctx.searchMail = $event);
            return $event;
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](5, "span");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](6, "\u4E26\u4E14");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](7, "input", 3);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayListener"]("ngModelChange", function UserPaymentListComponent_Template_input_ngModelChange_7_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayBindingSet"](ctx.searchPayment, $event) || (ctx.searchPayment = $event);
            return $event;
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](8, "br");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](9, "button", 1);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function UserPaymentListComponent_Template_button_click_9_listener() {
            return ctx.search();
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](10, "\u641C\u5C0B");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](11, "div", 4);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](12, UserPaymentListComponent_div_12_Template, 2, 0, "div", 5)(13, UserPaymentListComponent_div_13_Template, 2, 0, "div", 5)(14, UserPaymentListComponent_ul_14_Template, 2, 1, "ul", 5)(15, UserPaymentListComponent_div_15_Template, 2, 0, "div", 6);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        }
        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](4);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayProperty"]("ngModel", ctx.searchMail);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayProperty"]("ngModel", ctx.searchPayment);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](5);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.isDefault);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.userPaymentList.length === 0 && !ctx.isDefault && !ctx.isLoading);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.userPaymentList.length > 0);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.isLoading);
        }
      },
      dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_3__.NgIf, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.NgModel],
      styles: ["/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJ1c2VyLXBheW1lbnQtbGlzdC5jb21wb25lbnQuc2NzcyJ9 */\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvbWFuYWdlci1zeXN0ZW0vY29tcG9uZW50cy91c2VyLXBheW1lbnQtbGlzdC91c2VyLXBheW1lbnQtbGlzdC5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQ0EsZ0xBQWdMIiwic291cmNlUm9vdCI6IiJ9 */"]
    });
  }
}

/***/ }),

/***/ 8659:
/*!**************************************************************************************!*\
  !*** ./src/app/manager-system/components/user-role-list/user-role-list.component.ts ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   UserRoleListComponent: () => (/* binding */ UserRoleListComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _services_sys_dashboard_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../services/sys-dashboard.service */ 324);
/* harmony import */ var src_app_common_export_import_services_export_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/common/export-import/services/export.service */ 5391);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ 316);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ 4456);





function UserRoleListComponent_div_12_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, "\u958B\u59CB\u641C\u5C0B");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
}
function UserRoleListComponent_div_13_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, "\u6C92\u6709\u627E\u5230\u7D50\u679C");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
}
function UserRoleListComponent_ul_14_li_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "li")(1, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](2, "id:");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](4, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](5, "\u4FE1\u7BB1:");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](7, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](8, "\u89D2\u8272:");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const userRole_r1 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", userRole_r1.userId, " | ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", userRole_r1.email, " | ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", userRole_r1.role, " ");
  }
}
function UserRoleListComponent_ul_14_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "ul");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](1, UserRoleListComponent_ul_14_li_1_Template, 10, 3, "li", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngForOf", ctx_r1.userRoleList);
  }
}
function UserRoleListComponent_div_15_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](1, "img", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
}
class UserRoleListComponent {
  constructor(sysDashboardService, exportService) {
    this.sysDashboardService = sysDashboardService;
    this.exportService = exportService;
    this.isDefault = true;
    this.isLoading = false;
    this.searchMail = '';
    this.searchRole = '';
    this.userRoleList = []; // 存放搜尋結果
  }
  exportAllUser() {
    this.sysDashboardService.searchUserRole("", "").subscribe({
      next: res => {
        if (res.result && res.result.length > 0) {
          const csvData = this.exportService.convertToCSV(res.result);
          this.exportService.downloadCSV(csvData, '使用者角色資料.csv');
        } else {
          alert('無可匯出的資料');
        }
      },
      error: err => {
        alert("匯出失敗 : " + err.error.message);
      }
    });
  }
  searchUser() {
    this.isDefault = false;
    this.isLoading = true;
    this.sysDashboardService.searchUserRole(this.searchMail, this.searchRole).subscribe({
      next: res => {
        this.userRoleList = res.result;
        this.isLoading = false;
      },
      error: err => {
        alert(`搜尋失敗 : ${err.error.message}`);
        this.isLoading = false;
      }
    });
  }
  static {
    this.ɵfac = function UserRoleListComponent_Factory(t) {
      return new (t || UserRoleListComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_services_sys_dashboard_service__WEBPACK_IMPORTED_MODULE_0__.SysDashboardService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](src_app_common_export_import_services_export_service__WEBPACK_IMPORTED_MODULE_1__.ExportService));
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({
      type: UserRoleListComponent,
      selectors: [["app-user-role-list"]],
      decls: 16,
      vars: 6,
      consts: [[1, "search-bar"], [3, "click"], ["type", "text", "placeholder", "\u4F7F\u7528\u8005\u4FE1\u7BB1\u4E0D\u9650", 3, "ngModelChange", "ngModel"], ["type", "text", "placeholder", "\u89D2\u8272\u540D\u7A31\u4E0D\u9650", 3, "ngModelChange", "ngModel"], [1, "search-result"], [4, "ngIf"], ["class", "loading-gif", 4, "ngIf"], [4, "ngFor", "ngForOf"], [1, "loading-gif"], ["src", "assets/images/icon/icon_loading.gif", 2, "width", "50px"]],
      template: function UserRoleListComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 0)(1, "button", 1);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function UserRoleListComponent_Template_button_click_1_listener() {
            return ctx.exportAllUser();
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](2, "\u532F\u51FA\u4F7F\u7528\u8005\u89D2\u8272");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](3, "br");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](4, "input", 2);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayListener"]("ngModelChange", function UserRoleListComponent_Template_input_ngModelChange_4_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayBindingSet"](ctx.searchMail, $event) || (ctx.searchMail = $event);
            return $event;
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](5, "span");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](6, "\u4E26\u4E14");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](7, "input", 3);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayListener"]("ngModelChange", function UserRoleListComponent_Template_input_ngModelChange_7_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayBindingSet"](ctx.searchRole, $event) || (ctx.searchRole = $event);
            return $event;
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](8, "br");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](9, "button", 1);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function UserRoleListComponent_Template_button_click_9_listener() {
            return ctx.searchUser();
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](10, "\u641C\u5C0B");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](11, "div", 4);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](12, UserRoleListComponent_div_12_Template, 2, 0, "div", 5)(13, UserRoleListComponent_div_13_Template, 2, 0, "div", 5)(14, UserRoleListComponent_ul_14_Template, 2, 1, "ul", 5)(15, UserRoleListComponent_div_15_Template, 2, 0, "div", 6);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        }
        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](4);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayProperty"]("ngModel", ctx.searchMail);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayProperty"]("ngModel", ctx.searchRole);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](5);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.isDefault);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.userRoleList.length === 0 && !ctx.isDefault && !ctx.isLoading);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.userRoleList.length > 0);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.isLoading);
        }
      },
      dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_3__.NgIf, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.NgModel],
      styles: ["/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJ1c2VyLXJvbGUtbGlzdC5jb21wb25lbnQuc2NzcyJ9 */\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvbWFuYWdlci1zeXN0ZW0vY29tcG9uZW50cy91c2VyLXJvbGUtbGlzdC91c2VyLXJvbGUtbGlzdC5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQ0EsNEtBQTRLIiwic291cmNlUm9vdCI6IiJ9 */"]
    });
  }
}

/***/ }),

/***/ 324:
/*!******************************************************************!*\
  !*** ./src/app/manager-system/services/sys-dashboard.service.ts ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SysDashboardService: () => (/* binding */ SysDashboardService)
/* harmony export */ });
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/environments/environment */ 5312);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ 6443);



class SysDashboardService {
  constructor(http) {
    this.http = http;
    this.DOMAIN = src_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.domain;
    this.CONTEXT = "/api/manager";
    this.BASE_URL = this.DOMAIN + this.CONTEXT;
  }
  // 編輯 方案
  setPayment(payment) {
    this.payment = payment;
  }
  getPayment() {
    return this.payment;
  }
  /** 使用者管理 */
  searchUser(name, email) {
    return this.http.post(`${this.BASE_URL}/system/user/search`, {
      user: {
        name,
        email
      }
    });
  }
  /** 使用者角色 */
  searchUserRole(email, role) {
    return this.http.post(`${this.BASE_URL}/system/user/role/search`, {
      email,
      role
    });
  }
  /** 使用者方案 */
  searchUserPayment(email, paymentName) {
    return this.http.post(`${this.BASE_URL}/system/user/payment/search`, {
      email,
      paymentName
    });
  }
  /** [金流紀錄] */
  searchPayRecord(email, paymentName) {
    return this.http.post(`${this.BASE_URL}/system/payment/record/search`, {
      email,
      paymentName
    });
  }
  /** [方案管理] */
  searchPayment(planName, planTimeType, planType) {
    return this.http.post(`${this.BASE_URL}/system/payment/search/${planName}/${planTimeType}/${planType}`, {});
  }
  exportPaymentAll() {
    return this.http.get(`${this.BASE_URL}/system/payment/export/all`);
  }
  postPayment(payment) {
    return this.http.post(`${this.BASE_URL}/system/payment/add`, {
      payment
    });
  }
  updatePayment(payment) {
    return this.http.patch(`${this.BASE_URL}/system/payment/update`, {
      payment
    });
  }
  deletePayment(id) {
    return this.http.delete(`${this.BASE_URL}/system/payment/delete/${id}`);
  }
  /** [系統備份] */
  exportAllUserList() {
    return this.http.get(`${this.BASE_URL}/backup/export/user`);
  }
  exportAllUserToPaymentList() {
    return this.http.get(`${this.BASE_URL}/backup/export/usertopayment`);
  }
  exportAllUserToOwnerList() {
    return this.http.get(`${this.BASE_URL}/backup/export/usertoowner`);
  }
  exportAllUserToPermission() {
    return this.http.get(`${this.BASE_URL}/backup/export/usertopermission`);
  }
  exportAllRoomList() {
    return this.http.get(`${this.BASE_URL}/backup/export/room`);
  }
  exportAllSiteList() {
    return this.http.get(`${this.BASE_URL}/backup/export/roomtosite`);
  }
  exportAllBookingList() {
    return this.http.get(`${this.BASE_URL}/backup/export/booking`);
  }
  exportAllPaymentList() {
    return this.http.get(`${this.BASE_URL}/backup/export/payment`);
  }
  importAllDB(data) {
    return this.http.post(`${this.BASE_URL}/backup/import/all/db`, data);
  }
  static {
    this.ɵfac = function SysDashboardService_Factory(t) {
      return new (t || SysDashboardService)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpClient));
    };
  }
  static {
    this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({
      token: SysDashboardService,
      factory: SysDashboardService.ɵfac,
      providedIn: 'root'
    });
  }
}

/***/ }),

/***/ 3734:
/*!*****************************************************************************!*\
  !*** ./src/app/payment/components/check-payment/check-payment.component.ts ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CheckPaymentComponent: () => (/* binding */ CheckPaymentComponent)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ 8764);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs */ 6647);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs */ 1318);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs */ 9452);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/router */ 5072);
/* harmony import */ var _services_ecpay_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../services/ecpay.service */ 395);
/* harmony import */ var src_app_auth_route_services_google_auth_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/auth-route/services/google-auth.service */ 899);
/* harmony import */ var src_app_auth_route_services_route_url_record_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/auth-route/services/route-url-record.service */ 7228);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/common */ 316);







function CheckPaymentComponent_div_2_button_17_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "button", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function CheckPaymentComponent_div_2_button_17_Template_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r1);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r1.routeToECPayForm());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, "\u7E8C\u7D04");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
}
function CheckPaymentComponent_div_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div")(1, "h3");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](2, "\u8CFC\u8CB7\u65B9\u6848\u70BA:");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](3, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](5, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](7, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](9, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](10);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](11, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](12);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](13, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](14);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](15, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](16);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](17, CheckPaymentComponent_div_2_button_17_Template, 2, 0, "button", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"]("\u65B9\u6848\u540D\u7A31: ", ctx_r1.payment.planName, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"]("\u65B9\u6848\u4ECB\u7D39: ", ctx_r1.payment.planDesc, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"]("\u65B9\u6848\u8CBB\u7528: ", ctx_r1.payment.cost, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"]("\u65B9\u6848\u671F\u9593: ", ctx_r1.traslatePlanTimeType(ctx_r1.payment.planTimeType), "");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"]("\u65B9\u6848\u5EA7\u4F4D\u6578: ", ctx_r1.payment.siteTotal || 0, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"]("\u8CFC\u8CB7\u65E5\u671F: ", ctx_r1.userToPayment.purchaseDate, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"]("\u65B9\u6848\u671F\u9650: ", ctx_r1.userToPayment.expiryDate, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx_r1.isExpired);
  }
}
class CheckPaymentComponent {
  constructor(router, ecpayService, googleAuthService, routeUrlRecordService) {
    this.router = router;
    this.ecpayService = ecpayService;
    this.googleAuthService = googleAuthService;
    this.routeUrlRecordService = routeUrlRecordService;
    /**
     * 升級, 退費機制, 先暫緩, 寫死畫面
     * 續約直接新增按鈕
     */
    // 上方說明文字
    this.paymentDescription = "";
    this.payment = null;
    this.userToPayment = null;
    this.isExpired = false;
    // 帳號頁判斷不自動導向付款頁
    this.isFromAccountPage = false;
    //const userId = this.googleAuthService.getCurrentUser().userFirestoreId; // google User 舊 id
    const userId = this.googleAuthService.getCurrentUser().id;
    this.ecpayService.getUserToPayment(userId).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_4__.tap)(res => {
      if (!res.result) {
        this.paymentDescription = "尚未購買，需選擇方案才可升級為擁有者";
        alert(this.paymentDescription);
        if (!this.isFromAccountPage) {
          this.routeUrlRecordService.nextPage("pay-plan-list", {});
        }
        throw new Error("尚未購買");
      }
      this.userToPayment = res.result;
      const {
        purchaseDate,
        expiryDate
      } = res.result;
      const currentDate = new Date();
      if (currentDate >= new Date(expiryDate)) {
        this.paymentDescription = "購買方案已過期，需續約喔";
        alert(this.paymentDescription);
        this.isExpired = true;
      } else {
        this.paymentDescription = "已購買方案，成為擁有者";
        //alert(this.paymentDescription);
      }
      if (!res.result.paymentId) {
        alert("查無該擁有者方案資訊");
        throw new Error("paymentId 不存在");
      }
    }), (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.switchMap)(res => this.ecpayService.getPayment(res.result.paymentId)), (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.catchError)(err => {
      console.warn("流程中斷:", err.message);
      return (0,rxjs__WEBPACK_IMPORTED_MODULE_7__.of)(null); // 中斷流程，但不進入 subscribe
    })).subscribe(res => {
      if (res && res.result) {
        this.payment = res.result;
      }
    });
  }
  traslatePlanTimeType(planTimeType) {
    if (planTimeType === "year") return "年";
    if (planTimeType === "month") return "月";
    return "尚未設定";
  }
  /*
  *  下一步, 送給 伺服器 (google cloud function),由 伺服器 與 綠界金流 取付款介面
  */
  routeToECPayForm() {
    //檢查是否已勾選 購買方案
    if (this.payment.planType === "") {
      alert("請選擇購買方案");
      return;
    }
    //檢查是否已勾選 購買方案
    if (this.payment.planTimeType === "") {
      alert("請選擇購買方案時段");
      return;
    }
    //導向綠界付款
    const userId = this.googleAuthService.getCurrentUser().id;
    this.ecpayService.openECPayWindow(this.payment.id, userId);
    this.router.navigate(["/home"]);
  }
  static {
    this.ɵfac = function CheckPaymentComponent_Factory(t) {
      return new (t || CheckPaymentComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_8__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_services_ecpay_service__WEBPACK_IMPORTED_MODULE_0__.EcpayService), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](src_app_auth_route_services_google_auth_service__WEBPACK_IMPORTED_MODULE_1__.GoogleAuthService), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](src_app_auth_route_services_route_url_record_service__WEBPACK_IMPORTED_MODULE_2__.RouteUrlRecordService));
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({
      type: CheckPaymentComponent,
      selectors: [["app-check-payment"]],
      inputs: {
        isFromAccountPage: "isFromAccountPage"
      },
      decls: 3,
      vars: 2,
      consts: [[4, "ngIf"], [3, "click", 4, "ngIf"], [3, "click"]],
      template: function CheckPaymentComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "h2");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](2, CheckPaymentComponent_div_2_Template, 18, 8, "div", 0);
        }
        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", ctx.paymentDescription, "");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.payment);
        }
      },
      dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_9__.NgIf],
      styles: ["/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJjaGVjay1wYXltZW50LmNvbXBvbmVudC5zY3NzIn0= */\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvcGF5bWVudC9jb21wb25lbnRzL2NoZWNrLXBheW1lbnQvY2hlY2stcGF5bWVudC5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQ0EsNEtBQTRLIiwic291cmNlUm9vdCI6IiJ9 */"]
    });
  }
}

/***/ }),

/***/ 386:
/*!***********************************************************************!*\
  !*** ./src/app/payment/components/ecpay-form/ecpay-form.component.ts ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   EcpayFormComponent: () => (/* binding */ EcpayFormComponent)
/* harmony export */ });
/* harmony import */ var C_Users_ASUS_Desktop_2026_spacein_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 9204);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 5072);
/* harmony import */ var _services_ecpay_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../services/ecpay.service */ 395);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common/http */ 6443);





const _c0 = ["paymentPage"];
class EcpayFormComponent {
  constructor(router, ecpayService, http) {
    this.router = router;
    this.ecpayService = ecpayService;
    this.http = http;
  }
  ngOnInit() {
    var _this = this;
    return (0,C_Users_ASUS_Desktop_2026_spacein_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      // 取得 HTML 內容
      const paymentPageHtml = yield _this.fetchPaymentPageHtml();
      // 將 HTML 內容設定給 paymentPageEl
      _this.paymentPageEl.nativeElement.innerHTML = paymentPageHtml;
      console.log(document.getElementById('_form_aiochk'));
    })();
  }
  /*
   * 請求 fierbase cloud function 後, 由其回傳 綠界 付款 html 頁面
   */
  fetchPaymentPageHtml() {
    var _this2 = this;
    return (0,C_Users_ASUS_Desktop_2026_spacein_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      // 發送 HTTP 請求到綠界 API
      const apiUrl = 'https://getecpayresult-querqokzna-uc.a.run.app';
      _this2.http.get(apiUrl).subscribe(x => {
        console.log(x);
        return x;
      }, error => {
        _this2.paymentPageEl.nativeElement.innerHTML = error.error.text;
        return error.error.text;
      });
      return "畫面載入中,請稍等。";
    })();
  }
  static {
    this.ɵfac = function EcpayFormComponent_Factory(t) {
      return new (t || EcpayFormComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_3__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_services_ecpay_service__WEBPACK_IMPORTED_MODULE_1__.EcpayService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_4__.HttpClient));
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({
      type: EcpayFormComponent,
      selectors: [["app-ecpay-form"]],
      viewQuery: function EcpayFormComponent_Query(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵviewQuery"](_c0, 5);
        }
        if (rf & 2) {
          let _t;
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵloadQuery"]()) && (ctx.paymentPageEl = _t.first);
        }
      },
      decls: 3,
      vars: 0,
      consts: [["paymentPage", ""], ["href", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtrustConstantResourceUrl"]`https://payment-stage.ecpay.com.tw/`]],
      template: function EcpayFormComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](0, "base", 1)(1, "div", null, 0);
        }
      },
      styles: ["/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJlY3BheS1mb3JtLmNvbXBvbmVudC5zY3NzIn0= */\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvcGF5bWVudC9jb21wb25lbnRzL2VjcGF5LWZvcm0vZWNwYXktZm9ybS5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQ0Esd0tBQXdLIiwic291cmNlUm9vdCI6IiJ9 */"]
    });
  }
}

/***/ }),

/***/ 9446:
/*!*******************************************************************************!*\
  !*** ./src/app/payment/components/paid-plan-list/paid-plan-list.component.ts ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PaidPlanListComponent: () => (/* binding */ PaidPlanListComponent)
/* harmony export */ });
/* harmony import */ var _models_plan_type_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../models/plan-type.model */ 9507);
/* harmony import */ var _models_plan_time_type_model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../models/plan-time-type.model */ 8601);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ 5072);
/* harmony import */ var _services_ecpay_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../services/ecpay.service */ 395);
/* harmony import */ var src_app_auth_route_services_google_auth_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/auth-route/services/google-auth.service */ 899);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ 316);







function PaidPlanListComponent_div_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 4)(1, "div", 5)(2, "input", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function PaidPlanListComponent_div_2_Template_input_click_2_listener() {
      const payment_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r1).$implicit;
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](ctx_r2.checkSelectPaymentId(payment_r2.id));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](3, "label");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](5, "div", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](7, "div", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](9, "div", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](10);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const payment_r2 = ctx.$implicit;
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"](" ", ctx_r2.getPlanTitle(payment_r2.planType), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"](" ", payment_r2.planName, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"](" ", payment_r2.siteTotal, "\u7A7A\u9593");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate2"](" ", payment_r2.cost, " NTD / ", payment_r2.planTimeType, "");
  }
}
class PaidPlanListComponent {
  constructor(router, ecpayService, googleAuthService) {
    this.router = router;
    this.ecpayService = ecpayService;
    this.googleAuthService = googleAuthService;
    // 購買方案 清單
    this.paymentList = [];
    // 選擇購買方案 id
    this.selectPaymentId = "";
    // 選擇方案 models
    this.palnTypeModel = new _models_plan_type_model__WEBPACK_IMPORTED_MODULE_0__.PlanTypeModel();
    // 選擇時段 models
    this.planTimeTypeModel = new _models_plan_time_type_model__WEBPACK_IMPORTED_MODULE_1__.PlanTimeTypeModel();
    this.iconCheckNo = "/assets/images/icon/icon_check_no.png";
    this.iconCheckOk = "/assets/images/icon/icon_check_ok.png";
    // 取得所有方案
    this.ecpayService.getPaymentList().subscribe({
      next: res => {
        this.paymentList = res.result;
      },
      error: err => {
        alert("取得購買方案失敗 err : " + err);
      }
    });
  }
  checkSelectPaymentId(paymentId) {
    this.selectPaymentId = paymentId;
  }
  getPlanTitle(planType) {
    switch (planType) {
      case this.palnTypeModel.studio:
        return "小型工作室";
      case this.palnTypeModel.group:
        return "成長中團隊";
      case this.palnTypeModel.enterprise:
        return "大型組織企業";
    }
    return "無對應方案名稱";
  }
  /*
   *  下一步, 送給 伺服器 (google cloud function),由 伺服器 與 綠界金流 取付款介面
   */
  routeToECPayForm() {
    //檢查是否已勾選 購買方案
    if (this.selectPaymentId.trim() === "") {
      alert("請選擇購買方案");
      return;
    }
    //導向綠界付款
    const userId = this.googleAuthService.getCurrentUser().id;
    this.ecpayService.openECPayWindow(this.selectPaymentId, userId);
    this.router.navigate(["/home"]);
  }
  static {
    this.ɵfac = function PaidPlanListComponent_Factory(t) {
      return new (t || PaidPlanListComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_5__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_services_ecpay_service__WEBPACK_IMPORTED_MODULE_2__.EcpayService), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](src_app_auth_route_services_google_auth_service__WEBPACK_IMPORTED_MODULE_3__.GoogleAuthService));
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineComponent"]({
      type: PaidPlanListComponent,
      selectors: [["app-paid-plan-list"]],
      decls: 4,
      vars: 1,
      consts: [[1, "main-container"], [1, "pay-plan-list"], ["class", "pay-plan-item", 4, "ngFor", "ngForOf"], ["src", "/assets/images/icon/icon_next.png", 3, "click"], [1, "pay-plan-item"], [1, "pay-plan-title"], ["type", "radio", "name", "paymentId", 3, "click"], [1, "row"]],
      template: function PaidPlanListComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 0)(1, "div", 1);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](2, PaidPlanListComponent_div_2_Template, 11, 5, "div", 2);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](3, "img", 3);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function PaidPlanListComponent_Template_img_click_3_listener() {
            return ctx.routeToECPayForm();
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()();
        }
        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngForOf", ctx.paymentList);
        }
      },
      dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_6__.NgForOf],
      styles: ["input[type=radio][_ngcontent-%COMP%] {\n  accent-color: #661983;\n  border: 2px solid #661983;\n  border-radius: 50%;\n}\n\n.main-container[_ngcontent-%COMP%] {\n  width: 100%;\n  display: flex;\n  flex-direction: column;\n  justify-content: flex-start;\n  align-items: center;\n}\n.main-container[_ngcontent-%COMP%]   .pay-plan-list[_ngcontent-%COMP%] {\n  width: 350px;\n  display: flex;\n  flex-direction: column;\n  justify-content: flex-start;\n  align-items: center;\n  color: #661983;\n}\n.main-container[_ngcontent-%COMP%]   .pay-plan-list[_ngcontent-%COMP%]   .pay-plan-item[_ngcontent-%COMP%] {\n  width: 90%;\n  padding: 20px;\n}\n.main-container[_ngcontent-%COMP%]   .pay-plan-list[_ngcontent-%COMP%]   .pay-plan-item[_ngcontent-%COMP%]   .pay-plan-title[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: row;\n  justify-content: flex-start;\n  align-items: center;\n  font-size: 25px;\n  gap: 10px;\n}\n.main-container[_ngcontent-%COMP%]   .pay-plan-list[_ngcontent-%COMP%]   .pay-plan-item[_ngcontent-%COMP%]   .pay-plan-content[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  justify-content: flex-start;\n  align-items: center;\n  padding: 10px;\n}\n.main-container[_ngcontent-%COMP%]   .pay-plan-list[_ngcontent-%COMP%]   .row[_ngcontent-%COMP%] {\n  width: 100%;\n  display: flex;\n  flex-direction: row;\n  justify-content: flex-start;\n  align-items: center;\n  font-size: 20px;\n  gap: 10px;\n  text-align: center;\n}\n.main-container[_ngcontent-%COMP%]   .pay-plan-list[_ngcontent-%COMP%]   .row[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  width: 20px;\n  height: 20px;\n}\n.main-container[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: 40px;\n  height: 40px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhaWQtcGxhbi1saXN0LmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBO0VBQ0kscUJBQUE7RUFDQSx5QkFBQTtFQUNBLGtCQUFBO0FBQUo7O0FBR0E7RUFDSSxXQUFBO0VBQ0EsYUFBQTtFQUNBLHNCQUFBO0VBQ0EsMkJBQUE7RUFDQSxtQkFBQTtBQUFKO0FBRUk7RUFDSSxZQUFBO0VBQ0EsYUFBQTtFQUNBLHNCQUFBO0VBQ0EsMkJBQUE7RUFDQSxtQkFBQTtFQUNBLGNBQUE7QUFBUjtBQUVRO0VBQ0ksVUFBQTtFQUNBLGFBQUE7QUFBWjtBQUNZO0VBQ0ksYUFBQTtFQUNBLG1CQUFBO0VBQ0EsMkJBQUE7RUFDQSxtQkFBQTtFQUNBLGVBQUE7RUFDQSxTQUFBO0FBQ2hCO0FBRVk7RUFDSSxhQUFBO0VBQ0Esc0JBQUE7RUFDQSwyQkFBQTtFQUNBLG1CQUFBO0VBQ0EsYUFBQTtBQUFoQjtBQUlRO0VBQ0ksV0FBQTtFQUNBLGFBQUE7RUFDQSxtQkFBQTtFQUNBLDJCQUFBO0VBQ0EsbUJBQUE7RUFDQSxlQUFBO0VBQ0EsU0FBQTtFQUNBLGtCQUFBO0FBRlo7QUFHWTtFQUNJLFdBQUE7RUFDQSxZQUFBO0FBRGhCO0FBTUk7RUFDSSxXQUFBO0VBQ0EsWUFBQTtBQUpSIiwiZmlsZSI6InBhaWQtcGxhbi1saXN0LmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmlucHV0W3R5cGU9XCJyYWRpb1wiXSB7XHJcbiAgICBhY2NlbnQtY29sb3I6ICM2NjE5ODM7XHJcbiAgICBib3JkZXI6MnB4IHNvbGlkICM2NjE5ODM7XHJcbiAgICBib3JkZXItcmFkaXVzOiA1MCU7XHJcbn1cclxuXHJcbi5tYWluLWNvbnRhaW5lciB7XHJcbiAgICB3aWR0aDogMTAwJTtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gICAganVzdGlmeS1jb250ZW50OiBmbGV4LXN0YXJ0O1xyXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuXHJcbiAgICAucGF5LXBsYW4tbGlzdCB7XHJcbiAgICAgICAgd2lkdGg6IDM1MHB4O1xyXG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtc3RhcnQ7XHJcbiAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAgICAgICBjb2xvcjogIzY2MTk4MztcclxuXHJcbiAgICAgICAgLnBheS1wbGFuLWl0ZW0ge1xyXG4gICAgICAgICAgICB3aWR0aDogOTAlO1xyXG4gICAgICAgICAgICBwYWRkaW5nOiAyMHB4O1xyXG4gICAgICAgICAgICAucGF5LXBsYW4tdGl0bGUge1xyXG4gICAgICAgICAgICAgICAgZGlzcGxheTogZmxleDtcclxuICAgICAgICAgICAgICAgIGZsZXgtZGlyZWN0aW9uOiByb3c7XHJcbiAgICAgICAgICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtc3RhcnQ7XHJcbiAgICAgICAgICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gICAgICAgICAgICAgICAgZm9udC1zaXplOiAyNXB4O1xyXG4gICAgICAgICAgICAgICAgZ2FwOiAxMHB4O1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAucGF5LXBsYW4tY29udGVudCB7XHJcbiAgICAgICAgICAgICAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgICAgICAgICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuICAgICAgICAgICAgICAgIGp1c3RpZnktY29udGVudDogZmxleC1zdGFydDtcclxuICAgICAgICAgICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgICAgICAgICAgICAgICBwYWRkaW5nOiAxMHB4O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAucm93IHtcclxuICAgICAgICAgICAgd2lkdGg6IDEwMCU7XHJcbiAgICAgICAgICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICAgICAgICAgIGZsZXgtZGlyZWN0aW9uOiByb3c7XHJcbiAgICAgICAgICAgIGp1c3RpZnktY29udGVudDogZmxleC1zdGFydDtcclxuICAgICAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAgICAgICAgICAgZm9udC1zaXplOiAyMHB4O1xyXG4gICAgICAgICAgICBnYXA6IDEwcHg7XHJcbiAgICAgICAgICAgIHRleHQtYWxpZ246Y2VudGVyO1xyXG4gICAgICAgICAgICBpbnB1dCB7XHJcbiAgICAgICAgICAgICAgICB3aWR0aDogMjBweDtcclxuICAgICAgICAgICAgICAgIGhlaWdodDogMjBweDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpbWcge1xyXG4gICAgICAgIHdpZHRoOiA0MHB4O1xyXG4gICAgICAgIGhlaWdodDogNDBweDtcclxuICAgIH1cclxuXHJcblxyXG5cclxufVxyXG5cclxuIl19 */\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvcGF5bWVudC9jb21wb25lbnRzL3BhaWQtcGxhbi1saXN0L3BhaWQtcGxhbi1saXN0LmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBO0VBQ0kscUJBQUE7RUFDQSx5QkFBQTtFQUNBLGtCQUFBO0FBQUo7O0FBR0E7RUFDSSxXQUFBO0VBQ0EsYUFBQTtFQUNBLHNCQUFBO0VBQ0EsMkJBQUE7RUFDQSxtQkFBQTtBQUFKO0FBRUk7RUFDSSxZQUFBO0VBQ0EsYUFBQTtFQUNBLHNCQUFBO0VBQ0EsMkJBQUE7RUFDQSxtQkFBQTtFQUNBLGNBQUE7QUFBUjtBQUVRO0VBQ0ksVUFBQTtFQUNBLGFBQUE7QUFBWjtBQUNZO0VBQ0ksYUFBQTtFQUNBLG1CQUFBO0VBQ0EsMkJBQUE7RUFDQSxtQkFBQTtFQUNBLGVBQUE7RUFDQSxTQUFBO0FBQ2hCO0FBRVk7RUFDSSxhQUFBO0VBQ0Esc0JBQUE7RUFDQSwyQkFBQTtFQUNBLG1CQUFBO0VBQ0EsYUFBQTtBQUFoQjtBQUlRO0VBQ0ksV0FBQTtFQUNBLGFBQUE7RUFDQSxtQkFBQTtFQUNBLDJCQUFBO0VBQ0EsbUJBQUE7RUFDQSxlQUFBO0VBQ0EsU0FBQTtFQUNBLGtCQUFBO0FBRlo7QUFHWTtFQUNJLFdBQUE7RUFDQSxZQUFBO0FBRGhCO0FBTUk7RUFDSSxXQUFBO0VBQ0EsWUFBQTtBQUpSO0FBQ0Esb2lHQUFvaUciLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW5wdXRbdHlwZT1cInJhZGlvXCJdIHtcclxuICAgIGFjY2VudC1jb2xvcjogIzY2MTk4MztcclxuICAgIGJvcmRlcjoycHggc29saWQgIzY2MTk4MztcclxuICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcclxufVxyXG5cclxuLm1haW4tY29udGFpbmVyIHtcclxuICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtc3RhcnQ7XHJcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG5cclxuICAgIC5wYXktcGxhbi1saXN0IHtcclxuICAgICAgICB3aWR0aDogMzUwcHg7XHJcbiAgICAgICAgZGlzcGxheTogZmxleDtcclxuICAgICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gICAgICAgIGp1c3RpZnktY29udGVudDogZmxleC1zdGFydDtcclxuICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gICAgICAgIGNvbG9yOiAjNjYxOTgzO1xyXG5cclxuICAgICAgICAucGF5LXBsYW4taXRlbSB7XHJcbiAgICAgICAgICAgIHdpZHRoOiA5MCU7XHJcbiAgICAgICAgICAgIHBhZGRpbmc6IDIwcHg7XHJcbiAgICAgICAgICAgIC5wYXktcGxhbi10aXRsZSB7XHJcbiAgICAgICAgICAgICAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgICAgICAgICAgICAgZmxleC1kaXJlY3Rpb246IHJvdztcclxuICAgICAgICAgICAgICAgIGp1c3RpZnktY29udGVudDogZmxleC1zdGFydDtcclxuICAgICAgICAgICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgICAgICAgICAgICAgICBmb250LXNpemU6IDI1cHg7XHJcbiAgICAgICAgICAgICAgICBnYXA6IDEwcHg7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC5wYXktcGxhbi1jb250ZW50IHtcclxuICAgICAgICAgICAgICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICAgICAgICAgICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gICAgICAgICAgICAgICAganVzdGlmeS1jb250ZW50OiBmbGV4LXN0YXJ0O1xyXG4gICAgICAgICAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAgICAgICAgICAgICAgIHBhZGRpbmc6IDEwcHg7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC5yb3cge1xyXG4gICAgICAgICAgICB3aWR0aDogMTAwJTtcclxuICAgICAgICAgICAgZGlzcGxheTogZmxleDtcclxuICAgICAgICAgICAgZmxleC1kaXJlY3Rpb246IHJvdztcclxuICAgICAgICAgICAganVzdGlmeS1jb250ZW50OiBmbGV4LXN0YXJ0O1xyXG4gICAgICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gICAgICAgICAgICBmb250LXNpemU6IDIwcHg7XHJcbiAgICAgICAgICAgIGdhcDogMTBweDtcclxuICAgICAgICAgICAgdGV4dC1hbGlnbjpjZW50ZXI7XHJcbiAgICAgICAgICAgIGlucHV0IHtcclxuICAgICAgICAgICAgICAgIHdpZHRoOiAyMHB4O1xyXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiAyMHB4O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGltZyB7XHJcbiAgICAgICAgd2lkdGg6IDQwcHg7XHJcbiAgICAgICAgaGVpZ2h0OiA0MHB4O1xyXG4gICAgfVxyXG5cclxuXHJcblxyXG59XHJcblxyXG4iXSwic291cmNlUm9vdCI6IiJ9 */"]
    });
  }
}

/***/ }),

/***/ 8601:
/*!********************************************************!*\
  !*** ./src/app/payment/models/plan-time-type.model.ts ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PlanTimeTypeModel: () => (/* binding */ PlanTimeTypeModel)
/* harmony export */ });
class PlanTimeTypeModel {
  constructor() {
    //一年
    this.year = "year";
    //一月
    this.month = "month";
  }
}

/***/ }),

/***/ 9507:
/*!***************************************************!*\
  !*** ./src/app/payment/models/plan-type.model.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PlanTypeModel: () => (/* binding */ PlanTypeModel)
/* harmony export */ });
class PlanTypeModel {
  constructor() {
    //小工作室
    this.studio = "studio";
    //發展中團隊
    this.group = "group";
    //大型企業
    this.enterprise = "enterprise";
  }
}

/***/ }),

/***/ 395:
/*!***************************************************!*\
  !*** ./src/app/payment/services/ecpay.service.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   EcpayService: () => (/* binding */ EcpayService)
/* harmony export */ });
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/environments/environment */ 5312);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var src_app_firebase_api_services_cloud_fun_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/firebase-api/services/cloud-fun.service */ 7028);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ 6443);




class EcpayService {
  constructor(cloudFunService, httpClient) {
    this.cloudFunService = cloudFunService;
    this.httpClient = httpClient;
    this.DOMAIN = src_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.domain;
    this.CONTEXT = "/api/account/payment";
    this.BASE_URL = this.DOMAIN + this.CONTEXT;
  }
  /*
   * 取得所有購買方案
   */
  getPaymentList() {
    return this.httpClient.get(`${this.BASE_URL}/select/list`);
  }
  openECPayWindow(paymentId, userId) {
    //導向綠界付款
    //window.open(this.cloudFunService.cloudFunApiList.ECPAY_SELECT_PAY_PAGE + "?planType=" + planType + "&planTimeType=" + planTimeType);
    window.open(`${this.BASE_URL}/select/${paymentId}/${userId}`);
  }
  /*
   * 新增 預約者 對應 角色
   */
  getUserToPayment(userId) {
    return this.httpClient.get(`${this.BASE_URL}/userId/${userId}`);
  }
  /*
   * 搜尋 購買方案, 依照 paymentId
   */
  getPayment(paymentId) {
    return this.httpClient.get(`${this.BASE_URL}/paymentId/${paymentId}`);
  }
  static {
    this.ɵfac = function EcpayService_Factory(t) {
      return new (t || EcpayService)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](src_app_firebase_api_services_cloud_fun_service__WEBPACK_IMPORTED_MODULE_1__.CloudFunService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_3__.HttpClient));
    };
  }
  static {
    this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({
      token: EcpayService,
      factory: EcpayService.ɵfac,
      providedIn: 'root'
    });
  }
}

/***/ }),

/***/ 4668:
/*!********************************************************************************************************!*\
  !*** ./src/app/review-booking/components/review-booking-calendar/review-booking-calendar.component.ts ***!
  \********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ReviewBookingCalendarComponent: () => (/* binding */ ReviewBookingCalendarComponent)
/* harmony export */ });
/* harmony import */ var src_app_booking_models_booking_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/booking/models/booking.model */ 9305);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var src_app_auth_route_services_route_url_record_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/auth-route/services/route-url-record.service */ 7228);
/* harmony import */ var src_app_booking_services_booking_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/booking/services/booking.service */ 4377);
/* harmony import */ var src_app_auth_route_services_google_auth_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/auth-route/services/google-auth.service */ 899);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/common */ 316);
/* harmony import */ var _common_time_component_calendar_picker_calendar_picker_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../common/time/component/calendar-picker/calendar-picker.component */ 6544);
/* harmony import */ var _common_dialog_components_dialog_dialog_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../common/dialog/components/dialog/dialog.component */ 9276);
/* harmony import */ var _common_loading_components_loading_basic_loading_basic_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../common/loading/components/loading-basic/loading-basic.component */ 3408);









function ReviewBookingCalendarComponent_app_calendar_picker_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "app-calendar-picker", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("selectDatInfo", function ReviewBookingCalendarComponent_app_calendar_picker_1_Template_app_calendar_picker_selectDatInfo_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r2);
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵresetView"](ctx_r2.updateSelectDay($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("isEmitInitDate", false)("bookingList", ctx_r2.bookingList);
  }
}
function ReviewBookingCalendarComponent_ng_template_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "h2");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](1, "\u7121\u4EFB\u4F55\u9810\u7D04\u7D00\u9304");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
  }
}
class ReviewBookingCalendarComponent {
  constructor(routeUrlRecordService, bookingService, googleAuthService) {
    this.routeUrlRecordService = routeUrlRecordService;
    this.bookingService = bookingService;
    this.googleAuthService = googleAuthService;
    // 選擇日期
    this.selectDateInfo = "";
    // dialog 是否隱藏 該日 之 booking 紀錄
    this.isHiddenDialogBookingRecord = true;
    // dialog 該日 booking 紀錄陣列
    this.dialogBookingRecordItemList = new Array();
    // dialog 該日 title
    this.dialogTitle = "";
    // 所有 booking 紀錄
    this.bookingList = new Array();
    // 畫面 loading 中
    this.isLoading = true;
  }
  ngOnInit() {
    this.getAllBookingRecord();
  }
  /*
   * 從 FireStore 取得所有 booking 日期。
   */
  getAllBookingRecord() {
    const mail = this.googleAuthService.getCurrentUser().email;
    this.bookingService.getAllBooking().subscribe(bookingList => {
      this.bookingList = [];
      bookingList.forEach(booking => {
        if (booking["mail"] === mail) {
          this.bookingList.push(new src_app_booking_models_booking_model__WEBPACK_IMPORTED_MODULE_0__.Booking(
          //booking["fireStoreId"],
          booking["id"], booking["userId"], booking["mail"], booking["startDate"], booking["endDate"], booking["startTime"], booking["endTime"], booking["bookingType"], booking["roomId"], booking["roomName"], booking["siteId"], booking["siteName"]));
        }
      });
      this.isLoading = false;
    });
  }
  /*
   * 更新日期元件 之 日期資訊
   */
  updateSelectDay(selectDayStr) {
    this.dialogBookingRecordItemList = [];
    this.selectDateInfo = selectDayStr;
    const [_selectYear, _selectMonth, _selectDay] = this.selectDateInfo.split("-").map(Number);
    const selectDate = new Date(_selectYear, _selectMonth - 1, _selectDay);
    this.bookingList.forEach(booking => {
      // 篩選該日期 之前所有 booking 紀錄
      const [_year, _month, _day] = booking.startDate.split("-").map(Number);
      const bookingDate = new Date(_year, _month - 1, _day);
      if (selectDate.getTime() === bookingDate.getTime()) {
        this.dialogBookingRecordItemList.push({
          id: booking.id,
          name: booking.startTime + "~" + booking.endTime + " \n " + booking.roomName + " " + booking.siteName
        });
      }
    });
    if (this.dialogBookingRecordItemList.length > 0) {
      this.dialogTitle = _selectMonth + "/" + _selectDay + " 預約時段";
      this.isHiddenDialogBookingRecord = false;
    }
  }
  /*
   * 選擇該日 booking 紀錄, 並導向取消頁面
   */
  selectBookingToCancle(bookingId) {
    this.bookingList.forEach(booking => {
      if (booking.id === bookingId) {
        this.routeUrlRecordService.nextPage("review-booking-form", booking);
      }
    });
  }
  static {
    this.ɵfac = function ReviewBookingCalendarComponent_Factory(t) {
      return new (t || ReviewBookingCalendarComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](src_app_auth_route_services_route_url_record_service__WEBPACK_IMPORTED_MODULE_1__.RouteUrlRecordService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](src_app_booking_services_booking_service__WEBPACK_IMPORTED_MODULE_2__.BookingService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](src_app_auth_route_services_google_auth_service__WEBPACK_IMPORTED_MODULE_3__.GoogleAuthService));
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineComponent"]({
      type: ReviewBookingCalendarComponent,
      selectors: [["app-review-booking-calendar"]],
      decls: 8,
      vars: 6,
      consts: [["noBookingList", ""], [1, "container"], [3, "isEmitInitDate", "bookingList", "selectDatInfo", 4, "ngIf", "ngIfElse"], [1, "dialog-container"], [2, "white-space", "pre-line", 3, "selectedItem", "hideDialog", "dialogTitle", "isHiddenDialog", "itemList"], [1, "loading-container"], [3, "isLoading"], [3, "selectDatInfo", "isEmitInitDate", "bookingList"]],
      template: function ReviewBookingCalendarComponent_Template(rf, ctx) {
        if (rf & 1) {
          const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵgetCurrentView"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "div", 1);
          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](1, ReviewBookingCalendarComponent_app_calendar_picker_1_Template, 1, 2, "app-calendar-picker", 2)(2, ReviewBookingCalendarComponent_ng_template_2_Template, 2, 0, "ng-template", null, 0, _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplateRefExtractor"]);
          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](4, "div", 3)(5, "app-dialog", 4);
          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("selectedItem", function ReviewBookingCalendarComponent_Template_app_dialog_selectedItem_5_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r1);
            return _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵresetView"](ctx.selectBookingToCancle($event));
          })("hideDialog", function ReviewBookingCalendarComponent_Template_app_dialog_hideDialog_5_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r1);
            return _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵresetView"](ctx.isHiddenDialogBookingRecord = true);
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](6, "div", 5);
          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](7, "app-loading-basic", 6);
          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()();
        }
        if (rf & 2) {
          const noBookingList_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵreference"](3);
          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngIf", ctx.bookingList.length > 0)("ngIfElse", noBookingList_r4);
          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](4);
          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("dialogTitle", ctx.dialogTitle)("isHiddenDialog", ctx.isHiddenDialogBookingRecord)("itemList", ctx.dialogBookingRecordItemList);
          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("isLoading", ctx.isLoading);
        }
      },
      dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_8__.NgIf, _common_time_component_calendar_picker_calendar_picker_component__WEBPACK_IMPORTED_MODULE_4__.CalendarPickerComponent, _common_dialog_components_dialog_dialog_component__WEBPACK_IMPORTED_MODULE_5__.DialogComponent, _common_loading_components_loading_basic_loading_basic_component__WEBPACK_IMPORTED_MODULE_6__.LoadingBasicComponent],
      styles: [".container[_ngcontent-%COMP%] {\n  display: flex;\n  height: 450px;\n  flex-direction: column;\n  justify-content: space-between;\n  align-items: center;\n  padding: 20px 0;\n}\n\n.dialog-container[_ngcontent-%COMP%] {\n  z-index: 91;\n}\n\n.loading-container[_ngcontent-%COMP%] {\n  z-index: 91;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJldmlldy1ib29raW5nLWNhbGVuZGFyLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBO0VBQ0ksYUFBQTtFQUNBLGFBQUE7RUFDQSxzQkFBQTtFQUNBLDhCQUFBO0VBQ0EsbUJBQUE7RUFDQSxlQUFBO0FBQUo7O0FBR0E7RUFDSSxXQUFBO0FBQUo7O0FBR0E7RUFDSSxXQUFBO0FBQUoiLCJmaWxlIjoicmV2aWV3LWJvb2tpbmctY2FsZW5kYXIuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuLmNvbnRhaW5lciB7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgaGVpZ2h0OiA0NTBweDtcclxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XHJcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gICAgcGFkZGluZzogMjBweCAwO1xyXG59XHJcblxyXG4uZGlhbG9nLWNvbnRhaW5lciB7XHJcbiAgICB6LWluZGV4OiA5MTtcclxufVxyXG5cclxuLmxvYWRpbmctY29udGFpbmVyICB7XHJcbiAgICB6LWluZGV4OiA5MTtcclxufVxyXG5cclxuIl19 */\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvcmV2aWV3LWJvb2tpbmcvY29tcG9uZW50cy9yZXZpZXctYm9va2luZy1jYWxlbmRhci9yZXZpZXctYm9va2luZy1jYWxlbmRhci5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQTtFQUNJLGFBQUE7RUFDQSxhQUFBO0VBQ0Esc0JBQUE7RUFDQSw4QkFBQTtFQUNBLG1CQUFBO0VBQ0EsZUFBQTtBQUFKOztBQUdBO0VBQ0ksV0FBQTtBQUFKOztBQUdBO0VBQ0ksV0FBQTtBQUFKO0FBQ0Esb3pCQUFvekIiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuLmNvbnRhaW5lciB7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgaGVpZ2h0OiA0NTBweDtcclxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XHJcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gICAgcGFkZGluZzogMjBweCAwO1xyXG59XHJcblxyXG4uZGlhbG9nLWNvbnRhaW5lciB7XHJcbiAgICB6LWluZGV4OiA5MTtcclxufVxyXG5cclxuLmxvYWRpbmctY29udGFpbmVyICB7XHJcbiAgICB6LWluZGV4OiA5MTtcclxufVxyXG5cclxuIl0sInNvdXJjZVJvb3QiOiIifQ== */"]
    });
  }
}

/***/ }),

/***/ 2796:
/*!************************************************************************************************!*\
  !*** ./src/app/review-booking/components/review-booking-form/review-booking-form.component.ts ***!
  \************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ReviewBookingFormComponent: () => (/* binding */ ReviewBookingFormComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var src_app_auth_route_services_route_url_record_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/auth-route/services/route-url-record.service */ 7228);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ 5072);
/* harmony import */ var _services_review_booking_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../services/review-booking.service */ 6215);
/* harmony import */ var src_app_auth_route_services_google_auth_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/auth-route/services/google-auth.service */ 899);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/common */ 316);
/* harmony import */ var _common_pipe_word_shroten_pipe__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../common/pipe/word-shroten.pipe */ 9551);
/* harmony import */ var _common_pipe_date_to_day_of_week_pipe__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../common/pipe/date-to-day-of-week.pipe */ 4905);








function ReviewBookingFormComponent_div_24_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div", 2)(1, "label");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](2, "\u5EA7\u4F4D");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](3, "div", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"](" ", ctx_r0.selectSite, " ");
  }
}
class ReviewBookingFormComponent {
  constructor(routeUrlRecordService, activatedRoute, reviewBookingService, googleAuthService) {
    this.routeUrlRecordService = routeUrlRecordService;
    this.activatedRoute = activatedRoute;
    this.reviewBookingService = reviewBookingService;
    this.googleAuthService = googleAuthService;
    this.id = "";
    this.selectDate = "";
    this.startTime = "";
    this.endTime = "";
    this.bookingType = "";
    this.userMail = "";
    this.selectRoom = "";
    this.selectSite = "";
  }
  ngOnInit() {
    // 取得使用者資訊
    if (!this.googleAuthService.getCurrentUser()) {
      alert("無法取得使用者資訊");
    }
    this.googleAuthUser = this.googleAuthService.getCurrentUser();
    this.userMail = this.googleAuthUser.email;
    // 提取日期参数
    this.activatedRoute.queryParams.subscribe(params => {
      this.id = params['id'];
      this.selectDate = params['startDate'];
      this.startTime = params['startTime'];
      this.endTime = params['endTime'];
      this.bookingType = params['bookingType'];
      this.selectRoom = params['roomName'];
      this.selectSite = params['siteName'];
    });
  }
  deleteBooking() {
    if (!confirm("確定取消借用?")) {
      return;
    }
    this.reviewBookingService.deleteBookingById(this.id).subscribe({
      next: res => {
        alert("成功刪除");
        this.routeUrlRecordService.nextPage("review-booking-calendar", {});
      },
      error: err => {
        console.log("刪除異常, 請稍後再試 : " + err);
        alert("刪除異常, 請稍後再試 : " + err);
      }
    });
  }
  static {
    this.ɵfac = function ReviewBookingFormComponent_Factory(t) {
      return new (t || ReviewBookingFormComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](src_app_auth_route_services_route_url_record_service__WEBPACK_IMPORTED_MODULE_0__.RouteUrlRecordService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_6__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_services_review_booking_service__WEBPACK_IMPORTED_MODULE_1__.ReviewBookingService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](src_app_auth_route_services_google_auth_service__WEBPACK_IMPORTED_MODULE_2__.GoogleAuthService));
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineComponent"]({
      type: ReviewBookingFormComponent,
      selectors: [["app-review-booking-form"]],
      decls: 27,
      vars: 21,
      consts: [[1, "form-container"], [1, "form"], [1, "row"], [1, "select-item"], [1, "row-time"], ["class", "row", 4, "ngIf"], [3, "click"]],
      template: function ReviewBookingFormComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "label");
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](4, "\u7533\u8ACB\u4EBA");
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](5, "div", 3);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](6);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](7, "wordShroten");
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](8, "div", 2)(9, "label");
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](10, "\u8D77\u8FC4\u65E5");
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](11, "div", 4)(12, "div");
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](13);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](14, "dateToDayOfWeek");
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](15, "div");
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](16);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](17, "dateToDayOfWeek");
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](18, "div", 2)(19, "label");
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](20, "\u6559\u5BA4");
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](21, "div", 3);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](22);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](23, "wordShroten");
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](24, ReviewBookingFormComponent_div_24_Template, 5, 1, "div", 5);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](25, "button", 6);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function ReviewBookingFormComponent_Template_button_click_25_listener() {
            return ctx.deleteBooking();
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](26, " \u53D6\u6D88\u501F\u7528 ");
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
        }
        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](6);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind2"](7, 9, ctx.userMail, 8), " ");
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](7);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate3"](" ", ctx.selectDate, " ", _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind2"](14, 12, ctx.selectDate, "tw"), " ", ctx.startTime, " ");
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](3);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate3"](" ", ctx.selectDate, " ", _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind2"](17, 15, ctx.selectDate, "tw"), " ", ctx.endTime, " ");
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](6);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind2"](23, 18, ctx.selectRoom, 6));
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx.bookingType === "site");
        }
      },
      dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_7__.NgIf, _common_pipe_word_shroten_pipe__WEBPACK_IMPORTED_MODULE_3__.WordShrotenPipe, _common_pipe_date_to_day_of_week_pipe__WEBPACK_IMPORTED_MODULE_4__.DateToDayOfWeekPipe],
      styles: [".form-container[_ngcontent-%COMP%] {\n  width: 100%;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n}\n\n.title[_ngcontent-%COMP%] {\n  color: #661983;\n  font-size: 25px;\n  padding: 10px;\n}\n\n.form[_ngcontent-%COMP%] {\n  width: 350px;\n  display: flex;\n  flex-direction: column;\n  justify-content: flex-start;\n  align-items: flex-start;\n  padding: 25px;\n}\n.form[_ngcontent-%COMP%]   .row[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: row;\n  justify-content: flex-start;\n  align-items: center;\n  padding: 10px;\n}\n.form[_ngcontent-%COMP%]   .row[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  color: #661983;\n  margin-right: 30px;\n  font-size: 25px;\n}\n.form[_ngcontent-%COMP%]   .row[_ngcontent-%COMP%]   .select-item[_ngcontent-%COMP%] {\n  color: #661983;\n  font-size: 20px;\n  background: #FBE0FF;\n  padding: 10px 30px;\n  border-radius: 100px;\n  margin-right: 15px;\n}\n.form[_ngcontent-%COMP%]   .row-time[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  justify-content: flex-start;\n  align-items: flex-start;\n  margin-left: 25px;\n  width: 80%;\n  padding: 10px;\n  color: #661983;\n  font-size: 20px;\n}\n\nimg[_ngcontent-%COMP%] {\n  height: 40px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJldmlldy1ib29raW5nLWZvcm0uY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBRUE7RUFDSSxXQUFBO0VBQ0EsYUFBQTtFQUNBLHNCQUFBO0VBQ0EsbUJBQUE7QUFESjs7QUFJQTtFQUNJLGNBQUE7RUFDQSxlQUFBO0VBQ0EsYUFBQTtBQURKOztBQUlBO0VBQ0ksWUFBQTtFQUNBLGFBQUE7RUFDQSxzQkFBQTtFQUNBLDJCQUFBO0VBQ0EsdUJBQUE7RUFDQSxhQUFBO0FBREo7QUFHSTtFQUNJLGFBQUE7RUFDQSxtQkFBQTtFQUNBLDJCQUFBO0VBQ0EsbUJBQUE7RUFDQSxhQUFBO0FBRFI7QUFHUTtFQUNJLGNBQUE7RUFDQSxrQkFBQTtFQUNBLGVBQUE7QUFEWjtBQUlRO0VBQ0ksY0FBQTtFQUNBLGVBQUE7RUFDQSxtQkFBQTtFQUNBLGtCQUFBO0VBQ0Esb0JBQUE7RUFDQSxrQkFBQTtBQUZaO0FBTUk7RUFDSSxhQUFBO0VBQ0Esc0JBQUE7RUFDQSwyQkFBQTtFQUNBLHVCQUFBO0VBQ0EsaUJBQUE7RUFDQSxVQUFBO0VBQ0EsYUFBQTtFQUNBLGNBQUE7RUFDQSxlQUFBO0FBSlI7O0FBUUE7RUFDSSxZQUFBO0FBTEoiLCJmaWxlIjoicmV2aWV3LWJvb2tpbmctZm9ybS5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5cclxuLmZvcm0tY29udGFpbmVyIHtcclxuICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG59XHJcblxyXG4udGl0bGUge1xyXG4gICAgY29sb3I6ICM2NjE5ODM7XHJcbiAgICBmb250LXNpemU6IDI1cHg7XHJcbiAgICBwYWRkaW5nOiAxMHB4O1xyXG59XHJcblxyXG4uZm9ybSB7XHJcbiAgICB3aWR0aDogMzUwcHg7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuICAgIGp1c3RpZnktY29udGVudDogZmxleC1zdGFydDtcclxuICAgIGFsaWduLWl0ZW1zOiBmbGV4LXN0YXJ0O1xyXG4gICAgcGFkZGluZzogMjVweDtcclxuXHJcbiAgICAucm93IHtcclxuICAgICAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgICAgIGZsZXgtZGlyZWN0aW9uOiByb3c7XHJcbiAgICAgICAganVzdGlmeS1jb250ZW50OiBmbGV4LXN0YXJ0O1xyXG4gICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgICAgICAgcGFkZGluZzogMTBweDtcclxuXHJcbiAgICAgICAgbGFiZWwge1xyXG4gICAgICAgICAgICBjb2xvcjogIzY2MTk4MztcclxuICAgICAgICAgICAgbWFyZ2luLXJpZ2h0OiAzMHB4O1xyXG4gICAgICAgICAgICBmb250LXNpemU6IDI1cHg7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAuc2VsZWN0LWl0ZW0ge1xyXG4gICAgICAgICAgICBjb2xvcjogIzY2MTk4MztcclxuICAgICAgICAgICAgZm9udC1zaXplOiAyMHB4OyAgICAgICAgIFxyXG4gICAgICAgICAgICBiYWNrZ3JvdW5kOiAjRkJFMEZGO1xyXG4gICAgICAgICAgICBwYWRkaW5nOiAxMHB4IDMwcHg7XHJcbiAgICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDEwMHB4O1xyXG4gICAgICAgICAgICBtYXJnaW4tcmlnaHQ6IDE1cHg7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC5yb3ctdGltZSB7XHJcbiAgICAgICAgZGlzcGxheTogZmxleDtcclxuICAgICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gICAgICAgIGp1c3RpZnktY29udGVudDogZmxleC1zdGFydDtcclxuICAgICAgICBhbGlnbi1pdGVtczogZmxleC1zdGFydDtcclxuICAgICAgICBtYXJnaW4tbGVmdDogMjVweDtcclxuICAgICAgICB3aWR0aDogODAlO1xyXG4gICAgICAgIHBhZGRpbmc6IDEwcHg7XHJcbiAgICAgICAgY29sb3I6ICM2NjE5ODM7XHJcbiAgICAgICAgZm9udC1zaXplOiAyMHB4OyAgICBcclxuICAgIH1cclxufVxyXG5cclxuaW1nIHtcclxuICAgIGhlaWdodDogNDBweDtcclxufVxyXG5cclxuXHJcbiJdfQ== */\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvcmV2aWV3LWJvb2tpbmcvY29tcG9uZW50cy9yZXZpZXctYm9va2luZy1mb3JtL3Jldmlldy1ib29raW5nLWZvcm0uY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBRUE7RUFDSSxXQUFBO0VBQ0EsYUFBQTtFQUNBLHNCQUFBO0VBQ0EsbUJBQUE7QUFESjs7QUFJQTtFQUNJLGNBQUE7RUFDQSxlQUFBO0VBQ0EsYUFBQTtBQURKOztBQUlBO0VBQ0ksWUFBQTtFQUNBLGFBQUE7RUFDQSxzQkFBQTtFQUNBLDJCQUFBO0VBQ0EsdUJBQUE7RUFDQSxhQUFBO0FBREo7QUFHSTtFQUNJLGFBQUE7RUFDQSxtQkFBQTtFQUNBLDJCQUFBO0VBQ0EsbUJBQUE7RUFDQSxhQUFBO0FBRFI7QUFHUTtFQUNJLGNBQUE7RUFDQSxrQkFBQTtFQUNBLGVBQUE7QUFEWjtBQUlRO0VBQ0ksY0FBQTtFQUNBLGVBQUE7RUFDQSxtQkFBQTtFQUNBLGtCQUFBO0VBQ0Esb0JBQUE7RUFDQSxrQkFBQTtBQUZaO0FBTUk7RUFDSSxhQUFBO0VBQ0Esc0JBQUE7RUFDQSwyQkFBQTtFQUNBLHVCQUFBO0VBQ0EsaUJBQUE7RUFDQSxVQUFBO0VBQ0EsYUFBQTtFQUNBLGNBQUE7RUFDQSxlQUFBO0FBSlI7O0FBUUE7RUFDSSxZQUFBO0FBTEo7QUFDQSw0bUZBQTRtRiIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5cclxuLmZvcm0tY29udGFpbmVyIHtcclxuICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG59XHJcblxyXG4udGl0bGUge1xyXG4gICAgY29sb3I6ICM2NjE5ODM7XHJcbiAgICBmb250LXNpemU6IDI1cHg7XHJcbiAgICBwYWRkaW5nOiAxMHB4O1xyXG59XHJcblxyXG4uZm9ybSB7XHJcbiAgICB3aWR0aDogMzUwcHg7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuICAgIGp1c3RpZnktY29udGVudDogZmxleC1zdGFydDtcclxuICAgIGFsaWduLWl0ZW1zOiBmbGV4LXN0YXJ0O1xyXG4gICAgcGFkZGluZzogMjVweDtcclxuXHJcbiAgICAucm93IHtcclxuICAgICAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgICAgIGZsZXgtZGlyZWN0aW9uOiByb3c7XHJcbiAgICAgICAganVzdGlmeS1jb250ZW50OiBmbGV4LXN0YXJ0O1xyXG4gICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgICAgICAgcGFkZGluZzogMTBweDtcclxuXHJcbiAgICAgICAgbGFiZWwge1xyXG4gICAgICAgICAgICBjb2xvcjogIzY2MTk4MztcclxuICAgICAgICAgICAgbWFyZ2luLXJpZ2h0OiAzMHB4O1xyXG4gICAgICAgICAgICBmb250LXNpemU6IDI1cHg7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAuc2VsZWN0LWl0ZW0ge1xyXG4gICAgICAgICAgICBjb2xvcjogIzY2MTk4MztcclxuICAgICAgICAgICAgZm9udC1zaXplOiAyMHB4OyAgICAgICAgIFxyXG4gICAgICAgICAgICBiYWNrZ3JvdW5kOiAjRkJFMEZGO1xyXG4gICAgICAgICAgICBwYWRkaW5nOiAxMHB4IDMwcHg7XHJcbiAgICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDEwMHB4O1xyXG4gICAgICAgICAgICBtYXJnaW4tcmlnaHQ6IDE1cHg7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC5yb3ctdGltZSB7XHJcbiAgICAgICAgZGlzcGxheTogZmxleDtcclxuICAgICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gICAgICAgIGp1c3RpZnktY29udGVudDogZmxleC1zdGFydDtcclxuICAgICAgICBhbGlnbi1pdGVtczogZmxleC1zdGFydDtcclxuICAgICAgICBtYXJnaW4tbGVmdDogMjVweDtcclxuICAgICAgICB3aWR0aDogODAlO1xyXG4gICAgICAgIHBhZGRpbmc6IDEwcHg7XHJcbiAgICAgICAgY29sb3I6ICM2NjE5ODM7XHJcbiAgICAgICAgZm9udC1zaXplOiAyMHB4OyAgICBcclxuICAgIH1cclxufVxyXG5cclxuaW1nIHtcclxuICAgIGhlaWdodDogNDBweDtcclxufVxyXG5cclxuXHJcbiJdLCJzb3VyY2VSb290IjoiIn0= */"]
    });
  }
}

/***/ }),

/***/ 6215:
/*!*******************************************************************!*\
  !*** ./src/app/review-booking/services/review-booking.service.ts ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ReviewBookingService: () => (/* binding */ ReviewBookingService)
/* harmony export */ });
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/environments/environment */ 5312);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ 6443);
//import { FireStoreService } from 'src/app/firebase-api/services/fire-store.service';



class ReviewBookingService {
  //bookingTableName = this.fireStoreService.fireStoreTabelNameList.Booking;
  constructor(
  //private fireStoreService: FireStoreService,
  http) {
    this.http = http;
    this.DOMAIN = src_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.domain;
    this.CONTEXT = "/api/booking";
    this.BASE_URL = this.DOMAIN + this.CONTEXT;
  }
  /*
   * 使用 fireStoreId 找該員之紀錄
   */
  getAllBookingDayByUserId() {
    //return this.fireStoreService.getAll(this.bookingTableName);
  }
  /*
   * 使用 fireStoreId ,取消(刪除) 預約booking 紀錄
   */
  deleteBookingById(id) {
    //this.fireStoreService.deleteById(this.bookingTableName, fireStoreId);
    return this.http.delete(`${this.BASE_URL}/delete/${id}`);
  }
  static {
    this.ɵfac = function ReviewBookingService_Factory(t) {
      return new (t || ReviewBookingService)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpClient));
    };
  }
  static {
    this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({
      token: ReviewBookingService,
      factory: ReviewBookingService.ɵfac,
      providedIn: 'root'
    });
  }
}

/***/ }),

/***/ 9090:
/*!***********************************************************************************************!*\
  !*** ./src/app/review-room/components/review-room-overview/review-room-overview.component.ts ***!
  \***********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ReviewRoomOverviewComponent: () => (/* binding */ ReviewRoomOverviewComponent)
/* harmony export */ });
/* harmony import */ var _models_review_type_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../models/review-type.model */ 676);
/* harmony import */ var src_app_common_room_site_models_room_model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/common/room-site/models/room.model */ 8655);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _services_review_room_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../services/review-room.service */ 2903);
/* harmony import */ var src_app_auth_route_services_google_auth_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/auth-route/services/google-auth.service */ 899);
/* harmony import */ var src_app_firebase_api_services_fire_store_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/firebase-api/services/fire-store.service */ 871);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/common */ 316);
/* harmony import */ var _review_room_trend_review_room_trend_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../review-room-trend/review-room-trend.component */ 2644);
/* harmony import */ var _review_room_remanet_rate_review_room_remanet_rate_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../review-room-remanet-rate/review-room-remanet-rate.component */ 4766);









const _c0 = a0 => ({
  "item-icon-selected": a0
});
const _c1 = a0 => ({
  "width": a0
});
function ReviewRoomOverviewComponent_app_review_room_trend_16_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](0, "app-review-room-trend");
  }
}
function ReviewRoomOverviewComponent_app_review_room_remanet_rate_17_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](0, "app-review-room-remanet-rate");
  }
}
class ReviewRoomOverviewComponent {
  constructor(reviewRoomService, googleAuthService, fireStoreService) {
    this.reviewRoomService = reviewRoomService;
    this.googleAuthService = googleAuthService;
    this.fireStoreService = fireStoreService;
    // 選擇 總攬種類模型
    this.reviewType = new _models_review_type_model__WEBPACK_IMPORTED_MODULE_0__.ReviewType();
    // 當前選擇 總攬種類
    this.selectReviewType = this.reviewType.BOOKING_TREND;
    // 今日剩餘比率
    this.todayRemanent = {
      remanent: 0,
      totalRoom: 0
    };
  }
  ngOnInit() {
    // 取得 今日剩餘比率]
    this.reviewRoomService.getTodayRemanent().subscribe(todayRemanent => {
      this.todayRemanent = todayRemanent;
    });
    this.getTodayRemanet();
  }
  /*
   *  (temp) 取得 [今日剩餘]
   */
  getTodayRemanet() {
    //const userId = this.googleAuthService.getCurrentUser().userFirestoreId; // google User 舊 id
    let ownerId = this.googleAuthService.getCurrentUser().id;
    let ownerRoomList = [];
    // 取得 Room教室
    this.fireStoreService.getAll("Room").subscribe(roomList => {
      roomList.forEach(room => {
        // 取得 該 擁有者 之 空間(教室)
        if (room["ownerId"] === ownerId) {
          ownerRoomList.push(new src_app_common_room_site_models_room_model__WEBPACK_IMPORTED_MODULE_1__.Room(room));
        }
      });
      // 取得 該 擁有者 其 空間(教室)所有被預約紀錄
      const today = new Date();
      this.fireStoreService.getAll("Booking").subscribe(bookingList => {
        bookingList.forEach(booking => {
          ownerRoomList.forEach(room => {
            if (booking["roomId"] === room.id && new Date(booking["startDate"]).getDate() === today.getDate()) {
              room.bookingCount = 1;
            }
          });
        });
        // 計算 [今日剩餘]
        let bookingCount = 0;
        ownerRoomList.forEach(ownerRoom => {
          if (ownerRoom.bookingCount === 1) {
            bookingCount++;
          }
        });
        if (bookingCount === 0) {
          this.todayRemanent = {
            remanent: 0,
            totalRoom: 0
          };
        } else {
          this.todayRemanent = {
            remanent: ownerRoomList.length - bookingCount,
            totalRoom: ownerRoomList.length
          };
        }
      });
    });
  }
  /*
   * 點選 總攬種類
   */
  changeReviewType(selectType) {
    this.selectReviewType = selectType;
  }
  /*
   * 取得今日剩餘比率
   */
  getToDayRate() {
    if (this.todayRemanent.totalRoom === 0) {
      return 100;
    }
    return (this.todayRemanent.remanent / this.todayRemanent.totalRoom * 100).toFixed(2);
  }
  /*
   * 回覆剩餘文字
   */
  getRateWording() {
    return this.todayRemanent.remanent.toString() + "/" + this.todayRemanent.totalRoom.toString();
  }
  static {
    this.ɵfac = function ReviewRoomOverviewComponent_Factory(t) {
      return new (t || ReviewRoomOverviewComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_services_review_room_service__WEBPACK_IMPORTED_MODULE_2__.ReviewRoomService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](src_app_auth_route_services_google_auth_service__WEBPACK_IMPORTED_MODULE_3__.GoogleAuthService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](src_app_firebase_api_services_fire_store_service__WEBPACK_IMPORTED_MODULE_4__.FireStoreService));
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineComponent"]({
      type: ReviewRoomOverviewComponent,
      selectors: [["app-review-room-overview"]],
      decls: 18,
      vars: 13,
      consts: [[1, "main-container"], [1, "select-review-type-bar"], [1, "item-icon", 3, "click", "ngClass"], [1, "review-container"], [1, "row"], [1, "title-second"], [1, "content"], [1, "progress-bar"], [1, "progress", 3, "ngStyle"], [4, "ngIf"]],
      template: function ReviewRoomOverviewComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "div", 0)(1, "div", 1)(2, "div", 2);
          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("click", function ReviewRoomOverviewComponent_Template_div_click_2_listener() {
            return ctx.changeReviewType(ctx.reviewType.BOOKING_TREND);
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](3, " \u501F\u7528\u8DA8\u52E2 ");
          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](4, "div", 2);
          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("click", function ReviewRoomOverviewComponent_Template_div_click_4_listener() {
            return ctx.changeReviewType(ctx.reviewType.REMANET_RATE);
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](5, " \u5269\u9918\u7A7A\u9593 ");
          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](6, "div", 3)(7, "div", 4)(8, "label", 5);
          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](9, "\u4ECA\u65E5\u5269\u9918\u7A7A\u9593");
          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](10, "div", 4)(11, "label", 6);
          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](12);
          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](13, "div", 4)(14, "div", 7);
          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](15, "div", 8);
          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](16, ReviewRoomOverviewComponent_app_review_room_trend_16_Template, 1, 0, "app-review-room-trend", 9)(17, ReviewRoomOverviewComponent_app_review_room_remanet_rate_17_Template, 1, 0, "app-review-room-remanet-rate", 9);
        }
        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpureFunction1"](7, _c0, ctx.selectReviewType === ctx.reviewType.BOOKING_TREND));
          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpureFunction1"](9, _c0, ctx.selectReviewType === ctx.reviewType.REMANET_RATE));
          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](8);
          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate2"](" ", ctx.getRateWording(), " \u9593 ( ", ctx.getToDayRate(), "% )");
          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](3);
          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngStyle", _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpureFunction1"](11, _c1, ctx.getToDayRate() + "%"));
          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngIf", ctx.selectReviewType === ctx.reviewType.BOOKING_TREND);
          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngIf", ctx.selectReviewType === ctx.reviewType.REMANET_RATE);
        }
      },
      dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_8__.NgClass, _angular_common__WEBPACK_IMPORTED_MODULE_8__.NgIf, _angular_common__WEBPACK_IMPORTED_MODULE_8__.NgStyle, _review_room_trend_review_room_trend_component__WEBPACK_IMPORTED_MODULE_5__.ReviewRoomTrendComponent, _review_room_remanet_rate_review_room_remanet_rate_component__WEBPACK_IMPORTED_MODULE_6__.ReviewRoomRemanetRateComponent],
      styles: [".main-container[_ngcontent-%COMP%] {\n  width: 100%;\n  display: flex;\n  flex-direction: column;\n  justify-content: start;\n  align-items: center;\n}\n\n.review-container[_ngcontent-%COMP%] {\n  width: 350px;\n  display: flex;\n  flex-direction: column;\n  align-items: flex-start;\n  padding: 10px;\n}\n\n.select-review-type-bar[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: row;\n  justify-content: center;\n  align-items: center;\n  padding: 10px;\n}\n.select-review-type-bar[_ngcontent-%COMP%]   .item-icon[_ngcontent-%COMP%] {\n  color: #661983;\n  font-size: 20px;\n  background: #FBE0FF;\n  padding: 10px 30px;\n  border-radius: 100px;\n  margin: 0 5px;\n}\n.select-review-type-bar[_ngcontent-%COMP%]   .item-icon-selected[_ngcontent-%COMP%] {\n  color: #FBE0FF;\n  background: #661983;\n}\n\n.row[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: row;\n  justify-content: flex-start;\n  align-items: center;\n  width: 100%;\n}\n.row[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  color: #661983;\n  margin-right: 30px;\n}\n.row[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%] {\n  font-size: 25px;\n}\n.row[_ngcontent-%COMP%]   .title-second[_ngcontent-%COMP%] {\n  padding: 0px 10px;\n  font-size: 20px;\n}\n.row[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%] {\n  padding: 0px 20px;\n  font-size: 20px;\n}\n\n.progress-bar[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 40px;\n  background: #FBE0FF;\n  border-radius: 5px;\n  margin: 0px 20px;\n  padding: 5px;\n}\n\n.progress[_ngcontent-%COMP%] {\n  width: 30%;\n  height: 100%;\n  border-radius: 5px;\n  background: #661983;\n  animation-name: _ngcontent-%COMP%_progress-slide;\n  animation-duration: 2s;\n}\n@keyframes _ngcontent-%COMP%_progress-slide {\n  from {\n    width: 0;\n  }\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJldmlldy1yb29tLW92ZXJ2aWV3LmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBO0VBQ0ksV0FBQTtFQUNBLGFBQUE7RUFDQSxzQkFBQTtFQUNBLHNCQUFBO0VBQ0EsbUJBQUE7QUFESjs7QUFJQTtFQUNJLFlBQUE7RUFDQSxhQUFBO0VBQ0Esc0JBQUE7RUFDQSx1QkFBQTtFQUNBLGFBQUE7QUFESjs7QUFJQTtFQUNJLGFBQUE7RUFDQSxtQkFBQTtFQUNBLHVCQUFBO0VBQ0EsbUJBQUE7RUFDQSxhQUFBO0FBREo7QUFJSTtFQUNJLGNBQUE7RUFDQSxlQUFBO0VBQ0EsbUJBQUE7RUFDQSxrQkFBQTtFQUNBLG9CQUFBO0VBQ0EsYUFBQTtBQUZSO0FBS0k7RUFDSSxjQUFBO0VBQ0EsbUJBQUE7QUFIUjs7QUFRQTtFQUNJLGFBQUE7RUFDQSxtQkFBQTtFQUNBLDJCQUFBO0VBQ0EsbUJBQUE7RUFDQSxXQUFBO0FBTEo7QUFPSTtFQUNJLGNBQUE7RUFDQSxrQkFBQTtBQUxSO0FBUUk7RUFDSSxlQUFBO0FBTlI7QUFTSTtFQUNJLGlCQUFBO0VBQ0EsZUFBQTtBQVBSO0FBVUk7RUFDSSxpQkFBQTtFQUNBLGVBQUE7QUFSUjs7QUFZQTtFQUNJLFdBQUE7RUFDQSxZQUFBO0VBQ0EsbUJBQUE7RUFDQSxrQkFBQTtFQUNBLGdCQUFBO0VBQ0EsWUFBQTtBQVRKOztBQWFBO0VBQ0ksVUFBQTtFQUNBLFlBQUE7RUFDQSxrQkFBQTtFQUNBLG1CQUFBO0VBRUEsOEJBQUE7RUFDQSxzQkFBQTtBQVhKO0FBYUk7RUFDSTtJQUNJLFFBQUE7RUFYVjtBQUNGIiwiZmlsZSI6InJldmlldy1yb29tLW92ZXJ2aWV3LmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcblxyXG4ubWFpbi1jb250YWluZXIge1xyXG4gICAgd2lkdGg6IDEwMCU7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuICAgIGp1c3RpZnktY29udGVudDogc3RhcnQ7XHJcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG59XHJcblxyXG4ucmV2aWV3LWNvbnRhaW5lciB7XHJcbiAgICB3aWR0aDogMzUwcHg7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuICAgIGFsaWduLWl0ZW1zOiBmbGV4LXN0YXJ0O1xyXG4gICAgcGFkZGluZzogMTBweDtcclxufVxyXG5cclxuLnNlbGVjdC1yZXZpZXctdHlwZS1iYXIge1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGZsZXgtZGlyZWN0aW9uOiByb3c7XHJcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgICBwYWRkaW5nOiAxMHB4O1xyXG4gICAgXHJcblxyXG4gICAgLml0ZW0taWNvbiB7XHJcbiAgICAgICAgY29sb3I6ICM2NjE5ODM7XHJcbiAgICAgICAgZm9udC1zaXplOiAyMHB4OyAgICAgICAgIFxyXG4gICAgICAgIGJhY2tncm91bmQ6ICNGQkUwRkY7XHJcbiAgICAgICAgcGFkZGluZzogMTBweCAzMHB4O1xyXG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDEwMHB4O1xyXG4gICAgICAgIG1hcmdpbjogMCA1cHg7XHJcbiAgICB9XHJcblxyXG4gICAgLml0ZW0taWNvbi1zZWxlY3RlZCB7XHJcbiAgICAgICAgY29sb3I6ICNGQkUwRkY7ICAgIFxyXG4gICAgICAgIGJhY2tncm91bmQ6ICM2NjE5ODM7XHJcbiAgICB9XHJcblxyXG59XHJcblxyXG4ucm93IHtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBmbGV4LWRpcmVjdGlvbjogcm93O1xyXG4gICAganVzdGlmeS1jb250ZW50OiBmbGV4LXN0YXJ0O1xyXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAgIHdpZHRoOiAxMDAlO1xyXG5cclxuICAgIGxhYmVsIHtcclxuICAgICAgICBjb2xvcjogIzY2MTk4MztcclxuICAgICAgICBtYXJnaW4tcmlnaHQ6IDMwcHg7XHJcbiAgICB9XHJcblxyXG4gICAgLnRpdGxlIHsgICAgIFxyXG4gICAgICAgIGZvbnQtc2l6ZTogMjVweDtcclxuICAgIH1cclxuXHJcbiAgICAudGl0bGUtc2Vjb25kIHtcclxuICAgICAgICBwYWRkaW5nOiAwcHggMTBweDsgICBcclxuICAgICAgICBmb250LXNpemU6IDIwcHg7XHJcbiAgICB9XHJcblxyXG4gICAgLmNvbnRlbnQge1xyXG4gICAgICAgIHBhZGRpbmc6IDBweCAyMHB4OyAgIFxyXG4gICAgICAgIGZvbnQtc2l6ZTogMjBweDsgICAgICAgIFxyXG4gICAgfVxyXG59XHJcblxyXG4ucHJvZ3Jlc3MtYmFyIHtcclxuICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgaGVpZ2h0OiA0MHB4O1xyXG4gICAgYmFja2dyb3VuZDogI0ZCRTBGRjtcclxuICAgIGJvcmRlci1yYWRpdXM6IDVweDtcclxuICAgIG1hcmdpbjogMHB4IDIwcHg7ICBcclxuICAgIHBhZGRpbmc6IDVweDsgXHJcbn1cclxuXHJcblxyXG4ucHJvZ3Jlc3Mge1xyXG4gICAgd2lkdGg6IDMwJTtcclxuICAgIGhlaWdodDogMTAwJTtcclxuICAgIGJvcmRlci1yYWRpdXM6IDVweDtcclxuICAgIGJhY2tncm91bmQ6ICM2NjE5ODM7XHJcblxyXG4gICAgYW5pbWF0aW9uLW5hbWU6IHByb2dyZXNzLXNsaWRlO1xyXG4gICAgYW5pbWF0aW9uLWR1cmF0aW9uOjJzO1xyXG5cclxuICAgIEBrZXlmcmFtZXMgcHJvZ3Jlc3Mtc2xpZGUge1xyXG4gICAgICAgIGZyb217XHJcbiAgICAgICAgICAgIHdpZHRoOjA7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufVxyXG5cclxuXHJcblxyXG4iXX0= */\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvcmV2aWV3LXJvb20vY29tcG9uZW50cy9yZXZpZXctcm9vbS1vdmVydmlldy9yZXZpZXctcm9vbS1vdmVydmlldy5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFQTtFQUNJLFdBQUE7RUFDQSxhQUFBO0VBQ0Esc0JBQUE7RUFDQSxzQkFBQTtFQUNBLG1CQUFBO0FBREo7O0FBSUE7RUFDSSxZQUFBO0VBQ0EsYUFBQTtFQUNBLHNCQUFBO0VBQ0EsdUJBQUE7RUFDQSxhQUFBO0FBREo7O0FBSUE7RUFDSSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSx1QkFBQTtFQUNBLG1CQUFBO0VBQ0EsYUFBQTtBQURKO0FBSUk7RUFDSSxjQUFBO0VBQ0EsZUFBQTtFQUNBLG1CQUFBO0VBQ0Esa0JBQUE7RUFDQSxvQkFBQTtFQUNBLGFBQUE7QUFGUjtBQUtJO0VBQ0ksY0FBQTtFQUNBLG1CQUFBO0FBSFI7O0FBUUE7RUFDSSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSwyQkFBQTtFQUNBLG1CQUFBO0VBQ0EsV0FBQTtBQUxKO0FBT0k7RUFDSSxjQUFBO0VBQ0Esa0JBQUE7QUFMUjtBQVFJO0VBQ0ksZUFBQTtBQU5SO0FBU0k7RUFDSSxpQkFBQTtFQUNBLGVBQUE7QUFQUjtBQVVJO0VBQ0ksaUJBQUE7RUFDQSxlQUFBO0FBUlI7O0FBWUE7RUFDSSxXQUFBO0VBQ0EsWUFBQTtFQUNBLG1CQUFBO0VBQ0Esa0JBQUE7RUFDQSxnQkFBQTtFQUNBLFlBQUE7QUFUSjs7QUFhQTtFQUNJLFVBQUE7RUFDQSxZQUFBO0VBQ0Esa0JBQUE7RUFDQSxtQkFBQTtFQUVBLDhCQUFBO0VBQ0Esc0JBQUE7QUFYSjtBQWFJO0VBQ0k7SUFDSSxRQUFBO0VBWFY7QUFDRjtBQUNBLDQ5R0FBNDlHIiwic291cmNlc0NvbnRlbnQiOlsiXHJcblxyXG4ubWFpbi1jb250YWluZXIge1xyXG4gICAgd2lkdGg6IDEwMCU7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuICAgIGp1c3RpZnktY29udGVudDogc3RhcnQ7XHJcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG59XHJcblxyXG4ucmV2aWV3LWNvbnRhaW5lciB7XHJcbiAgICB3aWR0aDogMzUwcHg7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuICAgIGFsaWduLWl0ZW1zOiBmbGV4LXN0YXJ0O1xyXG4gICAgcGFkZGluZzogMTBweDtcclxufVxyXG5cclxuLnNlbGVjdC1yZXZpZXctdHlwZS1iYXIge1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGZsZXgtZGlyZWN0aW9uOiByb3c7XHJcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgICBwYWRkaW5nOiAxMHB4O1xyXG4gICAgXHJcblxyXG4gICAgLml0ZW0taWNvbiB7XHJcbiAgICAgICAgY29sb3I6ICM2NjE5ODM7XHJcbiAgICAgICAgZm9udC1zaXplOiAyMHB4OyAgICAgICAgIFxyXG4gICAgICAgIGJhY2tncm91bmQ6ICNGQkUwRkY7XHJcbiAgICAgICAgcGFkZGluZzogMTBweCAzMHB4O1xyXG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDEwMHB4O1xyXG4gICAgICAgIG1hcmdpbjogMCA1cHg7XHJcbiAgICB9XHJcblxyXG4gICAgLml0ZW0taWNvbi1zZWxlY3RlZCB7XHJcbiAgICAgICAgY29sb3I6ICNGQkUwRkY7ICAgIFxyXG4gICAgICAgIGJhY2tncm91bmQ6ICM2NjE5ODM7XHJcbiAgICB9XHJcblxyXG59XHJcblxyXG4ucm93IHtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBmbGV4LWRpcmVjdGlvbjogcm93O1xyXG4gICAganVzdGlmeS1jb250ZW50OiBmbGV4LXN0YXJ0O1xyXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAgIHdpZHRoOiAxMDAlO1xyXG5cclxuICAgIGxhYmVsIHtcclxuICAgICAgICBjb2xvcjogIzY2MTk4MztcclxuICAgICAgICBtYXJnaW4tcmlnaHQ6IDMwcHg7XHJcbiAgICB9XHJcblxyXG4gICAgLnRpdGxlIHsgICAgIFxyXG4gICAgICAgIGZvbnQtc2l6ZTogMjVweDtcclxuICAgIH1cclxuXHJcbiAgICAudGl0bGUtc2Vjb25kIHtcclxuICAgICAgICBwYWRkaW5nOiAwcHggMTBweDsgICBcclxuICAgICAgICBmb250LXNpemU6IDIwcHg7XHJcbiAgICB9XHJcblxyXG4gICAgLmNvbnRlbnQge1xyXG4gICAgICAgIHBhZGRpbmc6IDBweCAyMHB4OyAgIFxyXG4gICAgICAgIGZvbnQtc2l6ZTogMjBweDsgICAgICAgIFxyXG4gICAgfVxyXG59XHJcblxyXG4ucHJvZ3Jlc3MtYmFyIHtcclxuICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgaGVpZ2h0OiA0MHB4O1xyXG4gICAgYmFja2dyb3VuZDogI0ZCRTBGRjtcclxuICAgIGJvcmRlci1yYWRpdXM6IDVweDtcclxuICAgIG1hcmdpbjogMHB4IDIwcHg7ICBcclxuICAgIHBhZGRpbmc6IDVweDsgXHJcbn1cclxuXHJcblxyXG4ucHJvZ3Jlc3Mge1xyXG4gICAgd2lkdGg6IDMwJTtcclxuICAgIGhlaWdodDogMTAwJTtcclxuICAgIGJvcmRlci1yYWRpdXM6IDVweDtcclxuICAgIGJhY2tncm91bmQ6ICM2NjE5ODM7XHJcblxyXG4gICAgYW5pbWF0aW9uLW5hbWU6IHByb2dyZXNzLXNsaWRlO1xyXG4gICAgYW5pbWF0aW9uLWR1cmF0aW9uOjJzO1xyXG5cclxuICAgIEBrZXlmcmFtZXMgcHJvZ3Jlc3Mtc2xpZGUge1xyXG4gICAgICAgIGZyb217XHJcbiAgICAgICAgICAgIHdpZHRoOjA7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufVxyXG5cclxuXHJcblxyXG4iXSwic291cmNlUm9vdCI6IiJ9 */"]
    });
  }
}

/***/ }),

/***/ 4766:
/*!*******************************************************************************************************!*\
  !*** ./src/app/review-room/components/review-room-remanet-rate/review-room-remanet-rate.component.ts ***!
  \*******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ReviewRoomRemanetRateComponent: () => (/* binding */ ReviewRoomRemanetRateComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var src_app_auth_route_services_google_auth_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/auth-route/services/google-auth.service */ 899);
/* harmony import */ var _services_review_room_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../services/review-room.service */ 2903);
/* harmony import */ var _common_time_component_calendar_picker_calendar_picker_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../common/time/component/calendar-picker/calendar-picker.component */ 6544);
/* harmony import */ var _common_dialog_components_dialog_dialog_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../common/dialog/components/dialog/dialog.component */ 9276);
/* harmony import */ var _common_loading_components_loading_basic_loading_basic_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../common/loading/components/loading-basic/loading-basic.component */ 3408);






class ReviewRoomRemanetRateComponent {
  constructor(googleAuthService, reviewRoomService) {
    this.googleAuthService = googleAuthService;
    this.reviewRoomService = reviewRoomService;
    // 畫面正在 loading 中
    this.isLoading = true;
    //選擇空間種類 dialog
    this.dialogRoomTypeList = [{
      id: "all",
      name: "全部"
    }, {
      id: "room",
      name: "教室預約"
    }, {
      id: "site",
      name: "座位預約"
    }];
    this.isDialogHiddenRoomType = true;
    //選擇剩餘空間 dialog
    this.dialogRemainRoomRate = [{
      id: "1",
      name: "10%"
    }, {
      id: "2",
      name: "20%"
    }, {
      id: "3",
      name: "30%"
    }, {
      id: "4",
      name: "40%"
    }, {
      id: "5",
      name: "50%"
    }];
    this.isDialogHiddenRemainRommRate = true;
    // 選擇 顯示剩餘率 之 空間種類
    this._selectRoomType = this.dialogRoomTypeList[0];
    // 該空間 其 剩餘率 紀錄
    this.rateList = [];
    // 當前選擇呈現剩餘率 %
    this.showRate = 30;
    // 當前 剩餘行事曆 所切換日期，於以換算月份
    this.selectDate = "";
  }
  ngOnInit() {
    const currentDate = new Date();
    this.selectDate = currentDate.getFullYear() + "-" + (currentDate.getMonth() + 1) + "-1";
    this.getRateList();
  }
  /*
   * 從 service => api 取 該擁有者空間剩餘率
   */
  getRateList() {
    //const userId = this.googleAuthService.getCurrentUser().userFirestoreId; // google User 舊 id
    let ownerId = this.googleAuthService.getCurrentUser().id;
    this.reviewRoomService.getBookingRate("all", this.selectDate).subscribe(res => {
      this.rateList = res;
      this.isLoading = false;
    }, error => {
      alert(" 取空間剩餘率錯誤 error : " + error);
    });
  }
  /*
   * dialog 選擇行事曆呈現 剩餘率
   */
  selectDialogRate(selectRateTypeId) {
    this.dialogRemainRoomRate.forEach(rateType => {
      const rateChar = rateType.name.split("%");
      if (rateType.id === selectRateTypeId && !isNaN(+rateChar[0])) {
        this.showRate = +rateChar[0];
      }
    });
  }
  /*
   * dialog 選擇行事曆呈現 空間種類
   */
  selectDialogRoomType(selectRoomTypeId) {
    this.dialogRoomTypeList.forEach(roomType => {
      if (roomType.id === selectRoomTypeId) {
        this._selectRoomType = roomType;
      }
    });
  }
  /*
   * 更新日期元件 之 日期資訊
   * 接收 行事曆 component 的 emit
   */
  getEmitterSelectDay(selectDay) {
    this.selectDate = selectDay;
    this.getRateList();
  }
  static {
    this.ɵfac = function ReviewRoomRemanetRateComponent_Factory(t) {
      return new (t || ReviewRoomRemanetRateComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](src_app_auth_route_services_google_auth_service__WEBPACK_IMPORTED_MODULE_0__.GoogleAuthService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_services_review_room_service__WEBPACK_IMPORTED_MODULE_1__.ReviewRoomService));
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineComponent"]({
      type: ReviewRoomRemanetRateComponent,
      selectors: [["app-review-room-remanet-rate"]],
      decls: 21,
      vars: 11,
      consts: [[1, "main-container"], [1, "review-container"], [1, "row"], [1, "title"], [1, "select-item", 3, "click"], [1, "title-second"], [3, "selectDatInfo", "rateList", "showRate"], [1, "dialog-container"], [3, "hideDialog", "selectedItem", "dialogTitle", "isHiddenDialog", "itemList"], [1, "loading-container"], [3, "isLoading"]],
      template: function ReviewRoomRemanetRateComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "label", 3);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](4, "\u7A7A\u9593\u7A2E\u985E");
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](5, "div", 4);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function ReviewRoomRemanetRateComponent_Template_div_click_5_listener() {
            return ctx.isDialogHiddenRoomType = false;
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](6);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](7, "div", 2)(8, "label", 5);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](9, "\u986F\u793A\u5269\u9918\u7A7A\u9593");
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](10, "div", 4);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function ReviewRoomRemanetRateComponent_Template_div_click_10_listener() {
            return ctx.isDialogHiddenRemainRommRate = false;
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](11);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](12, "label", 5);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](13, "\u4EE5\u4E0B");
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](14, "app-calendar-picker", 6);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("selectDatInfo", function ReviewRoomRemanetRateComponent_Template_app_calendar_picker_selectDatInfo_14_listener($event) {
            return ctx.getEmitterSelectDay($event);
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](15, "div", 7)(16, "app-dialog", 8);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("hideDialog", function ReviewRoomRemanetRateComponent_Template_app_dialog_hideDialog_16_listener() {
            return ctx.isDialogHiddenRemainRommRate = true;
          })("selectedItem", function ReviewRoomRemanetRateComponent_Template_app_dialog_selectedItem_16_listener($event) {
            return ctx.selectDialogRate($event);
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](17, "div", 7)(18, "app-dialog", 8);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("hideDialog", function ReviewRoomRemanetRateComponent_Template_app_dialog_hideDialog_18_listener() {
            return ctx.isDialogHiddenRoomType = true;
          })("selectedItem", function ReviewRoomRemanetRateComponent_Template_app_dialog_selectedItem_18_listener($event) {
            return ctx.selectDialogRoomType($event);
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](19, "div", 9);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](20, "app-loading-basic", 10);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
        }
        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](6);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"](" ", ctx._selectRoomType.name, " ");
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](5);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"](" ", ctx.showRate, " %");
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](3);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("rateList", ctx.rateList)("showRate", ctx.showRate);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("dialogTitle", "\u9078\u64C7\u5269\u9918\u7A7A\u9593\u6BD4\u4F8B")("isHiddenDialog", ctx.isDialogHiddenRemainRommRate)("itemList", ctx.dialogRemainRoomRate);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("dialogTitle", "\u9078\u64C7\u5269\u9918\u7A7A\u9593\u7A2E\u985E")("isHiddenDialog", ctx.isDialogHiddenRoomType)("itemList", ctx.dialogRoomTypeList);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("isLoading", ctx.isLoading);
        }
      },
      dependencies: [_common_time_component_calendar_picker_calendar_picker_component__WEBPACK_IMPORTED_MODULE_2__.CalendarPickerComponent, _common_dialog_components_dialog_dialog_component__WEBPACK_IMPORTED_MODULE_3__.DialogComponent, _common_loading_components_loading_basic_loading_basic_component__WEBPACK_IMPORTED_MODULE_4__.LoadingBasicComponent],
      styles: [".main-container[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  justify-content: start;\n  align-items: center;\n}\n\n.review-container[_ngcontent-%COMP%] {\n  width: 350px;\n  display: flex;\n  flex-direction: column;\n  align-items: flex-start;\n  padding: 10px;\n}\n\n.row[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: row;\n  justify-content: flex-start;\n  align-items: center;\n  width: 100%;\n  padding: 5px;\n}\n.row[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  color: #661983;\n  margin-right: 10px;\n}\n.row[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%] {\n  font-size: 25px;\n}\n.row[_ngcontent-%COMP%]   .title-second[_ngcontent-%COMP%] {\n  padding: 0px 10px;\n  font-size: 20px;\n}\n.row[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%] {\n  padding: 0px 20px;\n  font-size: 20px;\n}\n.row[_ngcontent-%COMP%]   .select-item[_ngcontent-%COMP%] {\n  color: #661983;\n  font-size: 20px;\n  background: #FBE0FF;\n  padding: 10px 30px;\n  border-radius: 100px;\n  margin-right: 15px;\n}\n\n.progress-bar[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 40px;\n  background: #FBE0FF;\n  border-radius: 5px;\n  margin: 0px 20px;\n  padding: 5px;\n}\n.progress-bar[_ngcontent-%COMP%]   .progress[_ngcontent-%COMP%] {\n  width: 70%;\n  height: 100%;\n  border-radius: 5px;\n  background: #661983;\n}\n\n.dialog-container[_ngcontent-%COMP%] {\n  z-index: 91;\n}\n\n.loading-container[_ngcontent-%COMP%] {\n  z-index: 91;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJldmlldy1yb29tLXJlbWFuZXQtcmF0ZS5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQTtFQUNJLGFBQUE7RUFDQSxzQkFBQTtFQUNBLHNCQUFBO0VBQ0EsbUJBQUE7QUFBSjs7QUFHQTtFQUNJLFlBQUE7RUFDQSxhQUFBO0VBQ0Esc0JBQUE7RUFDQSx1QkFBQTtFQUNBLGFBQUE7QUFBSjs7QUFHQTtFQUNJLGFBQUE7RUFDQSxtQkFBQTtFQUNBLDJCQUFBO0VBQ0EsbUJBQUE7RUFDQSxXQUFBO0VBQ0EsWUFBQTtBQUFKO0FBRUk7RUFDSSxjQUFBO0VBQ0Esa0JBQUE7QUFBUjtBQUdJO0VBQ0ksZUFBQTtBQURSO0FBSUk7RUFDSSxpQkFBQTtFQUNBLGVBQUE7QUFGUjtBQUtJO0VBQ0ksaUJBQUE7RUFDQSxlQUFBO0FBSFI7QUFNSTtFQUNJLGNBQUE7RUFDQSxlQUFBO0VBQ0EsbUJBQUE7RUFDQSxrQkFBQTtFQUNBLG9CQUFBO0VBQ0Esa0JBQUE7QUFKUjs7QUFRQTtFQUNJLFdBQUE7RUFDQSxZQUFBO0VBQ0EsbUJBQUE7RUFDQSxrQkFBQTtFQUNBLGdCQUFBO0VBQ0EsWUFBQTtBQUxKO0FBT0k7RUFDSSxVQUFBO0VBQ0EsWUFBQTtFQUNBLGtCQUFBO0VBQ0EsbUJBQUE7QUFMUjs7QUFXQTtFQUNJLFdBQUE7QUFSSjs7QUFZQTtFQUNJLFdBQUE7QUFUSiIsImZpbGUiOiJyZXZpZXctcm9vbS1yZW1hbmV0LXJhdGUuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuLm1haW4tY29udGFpbmVyIHtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gICAganVzdGlmeS1jb250ZW50OiBzdGFydDtcclxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbn1cclxuXHJcbi5yZXZpZXctY29udGFpbmVyIHtcclxuICAgIHdpZHRoOiAzNTBweDtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gICAgYWxpZ24taXRlbXM6IGZsZXgtc3RhcnQ7XHJcbiAgICBwYWRkaW5nOiAxMHB4O1xyXG59XHJcblxyXG4ucm93IHtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBmbGV4LWRpcmVjdGlvbjogcm93O1xyXG4gICAganVzdGlmeS1jb250ZW50OiBmbGV4LXN0YXJ0O1xyXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgcGFkZGluZzogNXB4O1xyXG5cclxuICAgIGxhYmVsIHtcclxuICAgICAgICBjb2xvcjogIzY2MTk4MztcclxuICAgICAgICBtYXJnaW4tcmlnaHQ6IDEwcHg7XHJcbiAgICB9XHJcblxyXG4gICAgLnRpdGxlIHsgICAgIFxyXG4gICAgICAgIGZvbnQtc2l6ZTogMjVweDtcclxuICAgIH1cclxuXHJcbiAgICAudGl0bGUtc2Vjb25kIHtcclxuICAgICAgICBwYWRkaW5nOiAwcHggMTBweDsgICBcclxuICAgICAgICBmb250LXNpemU6IDIwcHg7XHJcbiAgICB9XHJcblxyXG4gICAgLmNvbnRlbnQge1xyXG4gICAgICAgIHBhZGRpbmc6IDBweCAyMHB4OyAgIFxyXG4gICAgICAgIGZvbnQtc2l6ZTogMjBweDsgICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIC5zZWxlY3QtaXRlbSB7XHJcbiAgICAgICAgY29sb3I6ICM2NjE5ODM7XHJcbiAgICAgICAgZm9udC1zaXplOiAyMHB4OyAgICAgICAgIFxyXG4gICAgICAgIGJhY2tncm91bmQ6ICNGQkUwRkY7XHJcbiAgICAgICAgcGFkZGluZzogMTBweCAzMHB4O1xyXG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDEwMHB4O1xyXG4gICAgICAgIG1hcmdpbi1yaWdodDogMTVweDtcclxuICAgIH1cclxufVxyXG5cclxuLnByb2dyZXNzLWJhciB7XHJcbiAgICB3aWR0aDogMTAwJTtcclxuICAgIGhlaWdodDogNDBweDtcclxuICAgIGJhY2tncm91bmQ6ICNGQkUwRkY7XHJcbiAgICBib3JkZXItcmFkaXVzOiA1cHg7XHJcbiAgICBtYXJnaW46IDBweCAyMHB4OyAgXHJcbiAgICBwYWRkaW5nOiA1cHg7IFxyXG5cclxuICAgIC5wcm9ncmVzcyB7XHJcbiAgICAgICAgd2lkdGg6IDcwJTtcclxuICAgICAgICBoZWlnaHQ6IDEwMCU7XHJcbiAgICAgICAgYm9yZGVyLXJhZGl1czogNXB4O1xyXG4gICAgICAgIGJhY2tncm91bmQ6ICM2NjE5ODM7XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG5cclxuLmRpYWxvZy1jb250YWluZXIge1xyXG4gICAgei1pbmRleDogOTE7XHJcbn1cclxuXHJcblxyXG4ubG9hZGluZy1jb250YWluZXIge1xyXG4gICAgei1pbmRleDogOTE7XHJcbn1cclxuXHJcbiJdfQ== */\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvcmV2aWV3LXJvb20vY29tcG9uZW50cy9yZXZpZXctcm9vbS1yZW1hbmV0LXJhdGUvcmV2aWV3LXJvb20tcmVtYW5ldC1yYXRlLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBO0VBQ0ksYUFBQTtFQUNBLHNCQUFBO0VBQ0Esc0JBQUE7RUFDQSxtQkFBQTtBQUFKOztBQUdBO0VBQ0ksWUFBQTtFQUNBLGFBQUE7RUFDQSxzQkFBQTtFQUNBLHVCQUFBO0VBQ0EsYUFBQTtBQUFKOztBQUdBO0VBQ0ksYUFBQTtFQUNBLG1CQUFBO0VBQ0EsMkJBQUE7RUFDQSxtQkFBQTtFQUNBLFdBQUE7RUFDQSxZQUFBO0FBQUo7QUFFSTtFQUNJLGNBQUE7RUFDQSxrQkFBQTtBQUFSO0FBR0k7RUFDSSxlQUFBO0FBRFI7QUFJSTtFQUNJLGlCQUFBO0VBQ0EsZUFBQTtBQUZSO0FBS0k7RUFDSSxpQkFBQTtFQUNBLGVBQUE7QUFIUjtBQU1JO0VBQ0ksY0FBQTtFQUNBLGVBQUE7RUFDQSxtQkFBQTtFQUNBLGtCQUFBO0VBQ0Esb0JBQUE7RUFDQSxrQkFBQTtBQUpSOztBQVFBO0VBQ0ksV0FBQTtFQUNBLFlBQUE7RUFDQSxtQkFBQTtFQUNBLGtCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxZQUFBO0FBTEo7QUFPSTtFQUNJLFVBQUE7RUFDQSxZQUFBO0VBQ0Esa0JBQUE7RUFDQSxtQkFBQTtBQUxSOztBQVdBO0VBQ0ksV0FBQTtBQVJKOztBQVlBO0VBQ0ksV0FBQTtBQVRKO0FBQ0EsZzZGQUFnNkYiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuLm1haW4tY29udGFpbmVyIHtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gICAganVzdGlmeS1jb250ZW50OiBzdGFydDtcclxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbn1cclxuXHJcbi5yZXZpZXctY29udGFpbmVyIHtcclxuICAgIHdpZHRoOiAzNTBweDtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gICAgYWxpZ24taXRlbXM6IGZsZXgtc3RhcnQ7XHJcbiAgICBwYWRkaW5nOiAxMHB4O1xyXG59XHJcblxyXG4ucm93IHtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBmbGV4LWRpcmVjdGlvbjogcm93O1xyXG4gICAganVzdGlmeS1jb250ZW50OiBmbGV4LXN0YXJ0O1xyXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgcGFkZGluZzogNXB4O1xyXG5cclxuICAgIGxhYmVsIHtcclxuICAgICAgICBjb2xvcjogIzY2MTk4MztcclxuICAgICAgICBtYXJnaW4tcmlnaHQ6IDEwcHg7XHJcbiAgICB9XHJcblxyXG4gICAgLnRpdGxlIHsgICAgIFxyXG4gICAgICAgIGZvbnQtc2l6ZTogMjVweDtcclxuICAgIH1cclxuXHJcbiAgICAudGl0bGUtc2Vjb25kIHtcclxuICAgICAgICBwYWRkaW5nOiAwcHggMTBweDsgICBcclxuICAgICAgICBmb250LXNpemU6IDIwcHg7XHJcbiAgICB9XHJcblxyXG4gICAgLmNvbnRlbnQge1xyXG4gICAgICAgIHBhZGRpbmc6IDBweCAyMHB4OyAgIFxyXG4gICAgICAgIGZvbnQtc2l6ZTogMjBweDsgICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIC5zZWxlY3QtaXRlbSB7XHJcbiAgICAgICAgY29sb3I6ICM2NjE5ODM7XHJcbiAgICAgICAgZm9udC1zaXplOiAyMHB4OyAgICAgICAgIFxyXG4gICAgICAgIGJhY2tncm91bmQ6ICNGQkUwRkY7XHJcbiAgICAgICAgcGFkZGluZzogMTBweCAzMHB4O1xyXG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDEwMHB4O1xyXG4gICAgICAgIG1hcmdpbi1yaWdodDogMTVweDtcclxuICAgIH1cclxufVxyXG5cclxuLnByb2dyZXNzLWJhciB7XHJcbiAgICB3aWR0aDogMTAwJTtcclxuICAgIGhlaWdodDogNDBweDtcclxuICAgIGJhY2tncm91bmQ6ICNGQkUwRkY7XHJcbiAgICBib3JkZXItcmFkaXVzOiA1cHg7XHJcbiAgICBtYXJnaW46IDBweCAyMHB4OyAgXHJcbiAgICBwYWRkaW5nOiA1cHg7IFxyXG5cclxuICAgIC5wcm9ncmVzcyB7XHJcbiAgICAgICAgd2lkdGg6IDcwJTtcclxuICAgICAgICBoZWlnaHQ6IDEwMCU7XHJcbiAgICAgICAgYm9yZGVyLXJhZGl1czogNXB4O1xyXG4gICAgICAgIGJhY2tncm91bmQ6ICM2NjE5ODM7XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG5cclxuLmRpYWxvZy1jb250YWluZXIge1xyXG4gICAgei1pbmRleDogOTE7XHJcbn1cclxuXHJcblxyXG4ubG9hZGluZy1jb250YWluZXIge1xyXG4gICAgei1pbmRleDogOTE7XHJcbn1cclxuXHJcbiJdLCJzb3VyY2VSb290IjoiIn0= */"]
    });
  }
}

/***/ }),

/***/ 2644:
/*!*****************************************************************************************!*\
  !*** ./src/app/review-room/components/review-room-trend/review-room-trend.component.ts ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ReviewRoomTrendComponent: () => (/* binding */ ReviewRoomTrendComponent)
/* harmony export */ });
/* harmony import */ var chart_js_auto__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! chart.js/auto */ 3596);
/* harmony import */ var _models_chartTimeType_model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../models/chartTimeType.model */ 1734);
/* harmony import */ var _models_chartTimeWord_model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../models/chartTimeWord.model */ 4654);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _services_review_room_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../services/review-room.service */ 2903);
/* harmony import */ var src_app_auth_route_services_google_auth_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/auth-route/services/google-auth.service */ 899);
/* harmony import */ var src_app_firebase_api_services_fire_store_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/firebase-api/services/fire-store.service */ 871);
/* harmony import */ var _common_dialog_components_dialog_dialog_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../common/dialog/components/dialog/dialog.component */ 9276);
/* harmony import */ var _common_loading_components_loading_basic_loading_basic_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../common/loading/components/loading-basic/loading-basic.component */ 3408);









class ReviewRoomTrendComponent {
  constructor(reviewRoomService, googleAuthService, fireStoreService) {
    this.reviewRoomService = reviewRoomService;
    this.googleAuthService = googleAuthService;
    this.fireStoreService = fireStoreService;
    // 資料仍在 loading中, 顯示 loading mask
    this.isLoading = true;
    this.chartTimeType = new _models_chartTimeType_model__WEBPACK_IMPORTED_MODULE_1__.ChartTimeType();
    this.chartTimeWording = new _models_chartTimeWord_model__WEBPACK_IMPORTED_MODULE_2__.ChartTimeWord();
    this.selectChartTimeWording = this.chartTimeWording.halfYear;
    this.isHiddenDialog = true;
    this.dialogChartTimeItemList = [{
      id: this.chartTimeType.week,
      name: this.chartTimeWording.week
    }, {
      id: this.chartTimeType.month,
      name: this.chartTimeWording.month
    }, {
      id: this.chartTimeType.season,
      name: this.chartTimeWording.season
    }, {
      id: this.chartTimeType.halfYear,
      name: this.chartTimeWording.halfYear
    }, {
      id: this.chartTimeType.year,
      name: this.chartTimeWording.year
    }];
  }
  ngOnInit() {
    this.selectChartTimeWording = this.chartTimeWording.halfYear;
    this.createChart(this.chartTimeType.halfYear);
  }
  createChart(selectTimeModel) {
    this.reviewRoomService.getChartByTimeType(selectTimeModel).subscribe(res => {
      this.isLoading = false;
      const chartTitle = res.timeTitle;
      const charCharSite = res.siteCount;
      const charCharRoom = res.roomCount;
      this.lineChart = new chart_js_auto__WEBPACK_IMPORTED_MODULE_0__["default"]("lineChart", {
        type: 'line',
        //this denotes tha type of chart
        data: {
          labels: chartTitle,
          // X 軸上的標籤
          datasets: [{
            label: this.chartTimeWording.booking_site,
            data: charCharSite,
            borderColor: '#FBE0FF'
          },
          // Dataset 1 的資料
          {
            label: this.chartTimeWording.booking_room,
            data: charCharRoom,
            borderColor: '#661983'
          } // Dataset 2 的資料
          ]
        },
        options: {
          aspectRatio: 1
        }
      });
    }, error => {
      alert(" 取得預約趨勢資料錯誤  " + error);
    });
  }
  /*
   * 確認 該日期是否在範圍內
   */
  isInTimeRange(timeInterval, index, date, startdate) {
    if (timeInterval === "month") {
      //該月份第一天
      const startDate = new Date(startdate.getFullYear(), index - 1, 1); //月份減1
      //該月份最後一天
      const endDate = new Date(startdate.getFullYear(), index, 0);
      // 當前日期 在 範圍內
      return startDate <= date && date <= endDate;
    } else if (timeInterval === "week") {
      //該週第一天
      const startDate = new Date(startdate.getFullYear(), startdate.getMonth(), index);
      //該週最後一天
      const endDate = new Date(startdate.getFullYear(), startdate.getMonth(), index + 7);
      // 當前日期 在 範圍內
      return startDate <= date && date <= endDate;
    } else if (timeInterval === "day") {
      const checkDate = new Date(startdate.getFullYear(), startdate.getMonth(), index);
      return checkDate.getTime() === date.getTime();
    }
    return false;
  }
  selectCharTimeModel(selectTimeTypeId) {
    this.isLoading = true;
    this.lineChart.destroy(); // 銷毀現有圖表
    this.dialogChartTimeItemList.forEach(timeType => {
      if (timeType.id === selectTimeTypeId) {
        this.selectChartTimeWording = timeType.name;
        this.createChart(timeType.id);
      }
    });
  }
  static {
    this.ɵfac = function ReviewRoomTrendComponent_Factory(t) {
      return new (t || ReviewRoomTrendComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_services_review_room_service__WEBPACK_IMPORTED_MODULE_3__.ReviewRoomService), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](src_app_auth_route_services_google_auth_service__WEBPACK_IMPORTED_MODULE_4__.GoogleAuthService), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](src_app_firebase_api_services_fire_store_service__WEBPACK_IMPORTED_MODULE_5__.FireStoreService));
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdefineComponent"]({
      type: ReviewRoomTrendComponent,
      selectors: [["app-review-room-trend"]],
      decls: 13,
      vars: 6,
      consts: [[1, "main-container"], [1, "review-container"], [1, "row"], [1, "title"], [1, "select-item", 3, "click"], ["id", "lineChart"], [1, "dialog-container"], [3, "selectedItem", "hideDialog", "dialogTitle", "isHiddenDialog", "itemList"], [1, "loading-container"], [3, "isLoading"]],
      template: function ReviewRoomTrendComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "label", 3);
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](4, "\u501F\u7528\u8DA8\u52E2");
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](5, "div", 4);
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function ReviewRoomTrendComponent_Template_div_click_5_listener() {
            return ctx.isHiddenDialog = false;
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](6);
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](7, "canvas", 5);
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](8);
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](9, "div", 6)(10, "app-dialog", 7);
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("selectedItem", function ReviewRoomTrendComponent_Template_app_dialog_selectedItem_10_listener($event) {
            return ctx.selectCharTimeModel($event);
          })("hideDialog", function ReviewRoomTrendComponent_Template_app_dialog_hideDialog_10_listener() {
            return ctx.isHiddenDialog = true;
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](11, "div", 8);
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](12, "app-loading-basic", 9);
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
        }
        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](6);
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate1"](" ", ctx.selectChartTimeWording, "");
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate"](ctx.lineChart);
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("dialogTitle", "\u9078\u64C7\u501F\u7528\u8DA8\u52E2\u4E4B\u6642\u5340")("isHiddenDialog", ctx.isHiddenDialog)("itemList", ctx.dialogChartTimeItemList);
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("isLoading", ctx.isLoading);
        }
      },
      dependencies: [_common_dialog_components_dialog_dialog_component__WEBPACK_IMPORTED_MODULE_6__.DialogComponent, _common_loading_components_loading_basic_loading_basic_component__WEBPACK_IMPORTED_MODULE_7__.LoadingBasicComponent],
      styles: [".main-container[_ngcontent-%COMP%] {\n  width: 100%;\n  display: flex;\n  flex-direction: column;\n  justify-content: start;\n  align-items: center;\n}\n\n.review-container[_ngcontent-%COMP%] {\n  width: 350px;\n  display: flex;\n  flex-direction: column;\n  align-items: flex-start;\n  padding: 10px;\n}\n\n.row[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: row;\n  justify-content: flex-start;\n  align-items: center;\n  width: 100%;\n}\n.row[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  color: #661983;\n  margin-right: 30px;\n}\n.row[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%] {\n  font-size: 25px;\n}\n.row[_ngcontent-%COMP%]   .title-second[_ngcontent-%COMP%] {\n  padding: 0px 10px;\n  font-size: 20px;\n}\n.row[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%] {\n  padding: 0px 20px;\n  font-size: 20px;\n}\n.row[_ngcontent-%COMP%]   .select-item[_ngcontent-%COMP%] {\n  color: #661983;\n  font-size: 20px;\n  background: #FBE0FF;\n  padding: 10px 30px;\n  border-radius: 100px;\n  margin-right: 15px;\n}\n\n.progress-bar[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 40px;\n  background: #FBE0FF;\n  border-radius: 5px;\n  margin: 0px 20px;\n  padding: 5px;\n}\n.progress-bar[_ngcontent-%COMP%]   .progress[_ngcontent-%COMP%] {\n  width: 70%;\n  height: 100%;\n  border-radius: 5px;\n  background: #661983;\n}\n\n.dialog-container[_ngcontent-%COMP%] {\n  z-index: 91;\n}\n\n.loading-container[_ngcontent-%COMP%] {\n  z-index: 91;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJldmlldy1yb29tLXRyZW5kLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBO0VBQ0ksV0FBQTtFQUNBLGFBQUE7RUFDQSxzQkFBQTtFQUNBLHNCQUFBO0VBQ0EsbUJBQUE7QUFBSjs7QUFHQTtFQUNJLFlBQUE7RUFDQSxhQUFBO0VBQ0Esc0JBQUE7RUFDQSx1QkFBQTtFQUNBLGFBQUE7QUFBSjs7QUFHQTtFQUNJLGFBQUE7RUFDQSxtQkFBQTtFQUNBLDJCQUFBO0VBQ0EsbUJBQUE7RUFDQSxXQUFBO0FBQUo7QUFFSTtFQUNJLGNBQUE7RUFDQSxrQkFBQTtBQUFSO0FBR0k7RUFDSSxlQUFBO0FBRFI7QUFJSTtFQUNJLGlCQUFBO0VBQ0EsZUFBQTtBQUZSO0FBS0k7RUFDSSxpQkFBQTtFQUNBLGVBQUE7QUFIUjtBQU1JO0VBQ0ksY0FBQTtFQUNBLGVBQUE7RUFDQSxtQkFBQTtFQUNBLGtCQUFBO0VBQ0Esb0JBQUE7RUFDQSxrQkFBQTtBQUpSOztBQVFBO0VBQ0ksV0FBQTtFQUNBLFlBQUE7RUFDQSxtQkFBQTtFQUNBLGtCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxZQUFBO0FBTEo7QUFPSTtFQUNJLFVBQUE7RUFDQSxZQUFBO0VBQ0Esa0JBQUE7RUFDQSxtQkFBQTtBQUxSOztBQVdBO0VBQ0ksV0FBQTtBQVJKOztBQVdBO0VBQ0ksV0FBQTtBQVJKIiwiZmlsZSI6InJldmlldy1yb29tLXRyZW5kLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbi5tYWluLWNvbnRhaW5lciB7XHJcbiAgICB3aWR0aDogMTAwJTtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gICAganVzdGlmeS1jb250ZW50OiBzdGFydDtcclxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbn1cclxuXHJcbi5yZXZpZXctY29udGFpbmVyIHtcclxuICAgIHdpZHRoOiAzNTBweDtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gICAgYWxpZ24taXRlbXM6IGZsZXgtc3RhcnQ7XHJcbiAgICBwYWRkaW5nOiAxMHB4O1xyXG59XHJcblxyXG4ucm93IHtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBmbGV4LWRpcmVjdGlvbjogcm93O1xyXG4gICAganVzdGlmeS1jb250ZW50OiBmbGV4LXN0YXJ0O1xyXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAgIHdpZHRoOiAxMDAlO1xyXG5cclxuICAgIGxhYmVsIHtcclxuICAgICAgICBjb2xvcjogIzY2MTk4MztcclxuICAgICAgICBtYXJnaW4tcmlnaHQ6IDMwcHg7XHJcbiAgICB9XHJcblxyXG4gICAgLnRpdGxlIHsgICAgIFxyXG4gICAgICAgIGZvbnQtc2l6ZTogMjVweDtcclxuICAgIH1cclxuXHJcbiAgICAudGl0bGUtc2Vjb25kIHtcclxuICAgICAgICBwYWRkaW5nOiAwcHggMTBweDsgICBcclxuICAgICAgICBmb250LXNpemU6IDIwcHg7XHJcbiAgICB9XHJcblxyXG4gICAgLmNvbnRlbnQge1xyXG4gICAgICAgIHBhZGRpbmc6IDBweCAyMHB4OyAgIFxyXG4gICAgICAgIGZvbnQtc2l6ZTogMjBweDsgICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIC5zZWxlY3QtaXRlbSB7XHJcbiAgICAgICAgY29sb3I6ICM2NjE5ODM7XHJcbiAgICAgICAgZm9udC1zaXplOiAyMHB4OyAgICAgICAgIFxyXG4gICAgICAgIGJhY2tncm91bmQ6ICNGQkUwRkY7XHJcbiAgICAgICAgcGFkZGluZzogMTBweCAzMHB4O1xyXG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDEwMHB4O1xyXG4gICAgICAgIG1hcmdpbi1yaWdodDogMTVweDtcclxuICAgIH1cclxufVxyXG5cclxuLnByb2dyZXNzLWJhciB7XHJcbiAgICB3aWR0aDogMTAwJTtcclxuICAgIGhlaWdodDogNDBweDtcclxuICAgIGJhY2tncm91bmQ6ICNGQkUwRkY7XHJcbiAgICBib3JkZXItcmFkaXVzOiA1cHg7XHJcbiAgICBtYXJnaW46IDBweCAyMHB4OyAgXHJcbiAgICBwYWRkaW5nOiA1cHg7IFxyXG5cclxuICAgIC5wcm9ncmVzcyB7XHJcbiAgICAgICAgd2lkdGg6IDcwJTtcclxuICAgICAgICBoZWlnaHQ6IDEwMCU7XHJcbiAgICAgICAgYm9yZGVyLXJhZGl1czogNXB4O1xyXG4gICAgICAgIGJhY2tncm91bmQ6ICM2NjE5ODM7XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG5cclxuLmRpYWxvZy1jb250YWluZXIge1xyXG4gICAgei1pbmRleDogOTE7XHJcbn1cclxuXHJcbi5sb2FkaW5nLWNvbnRhaW5lciB7XHJcbiAgICB6LWluZGV4OiA5MTtcclxufVxyXG5cclxuIl19 */\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvcmV2aWV3LXJvb20vY29tcG9uZW50cy9yZXZpZXctcm9vbS10cmVuZC9yZXZpZXctcm9vbS10cmVuZC5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQTtFQUNJLFdBQUE7RUFDQSxhQUFBO0VBQ0Esc0JBQUE7RUFDQSxzQkFBQTtFQUNBLG1CQUFBO0FBQUo7O0FBR0E7RUFDSSxZQUFBO0VBQ0EsYUFBQTtFQUNBLHNCQUFBO0VBQ0EsdUJBQUE7RUFDQSxhQUFBO0FBQUo7O0FBR0E7RUFDSSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSwyQkFBQTtFQUNBLG1CQUFBO0VBQ0EsV0FBQTtBQUFKO0FBRUk7RUFDSSxjQUFBO0VBQ0Esa0JBQUE7QUFBUjtBQUdJO0VBQ0ksZUFBQTtBQURSO0FBSUk7RUFDSSxpQkFBQTtFQUNBLGVBQUE7QUFGUjtBQUtJO0VBQ0ksaUJBQUE7RUFDQSxlQUFBO0FBSFI7QUFNSTtFQUNJLGNBQUE7RUFDQSxlQUFBO0VBQ0EsbUJBQUE7RUFDQSxrQkFBQTtFQUNBLG9CQUFBO0VBQ0Esa0JBQUE7QUFKUjs7QUFRQTtFQUNJLFdBQUE7RUFDQSxZQUFBO0VBQ0EsbUJBQUE7RUFDQSxrQkFBQTtFQUNBLGdCQUFBO0VBQ0EsWUFBQTtBQUxKO0FBT0k7RUFDSSxVQUFBO0VBQ0EsWUFBQTtFQUNBLGtCQUFBO0VBQ0EsbUJBQUE7QUFMUjs7QUFXQTtFQUNJLFdBQUE7QUFSSjs7QUFXQTtFQUNJLFdBQUE7QUFSSjtBQUNBLG80RkFBbzRGIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbi5tYWluLWNvbnRhaW5lciB7XHJcbiAgICB3aWR0aDogMTAwJTtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gICAganVzdGlmeS1jb250ZW50OiBzdGFydDtcclxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbn1cclxuXHJcbi5yZXZpZXctY29udGFpbmVyIHtcclxuICAgIHdpZHRoOiAzNTBweDtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gICAgYWxpZ24taXRlbXM6IGZsZXgtc3RhcnQ7XHJcbiAgICBwYWRkaW5nOiAxMHB4O1xyXG59XHJcblxyXG4ucm93IHtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBmbGV4LWRpcmVjdGlvbjogcm93O1xyXG4gICAganVzdGlmeS1jb250ZW50OiBmbGV4LXN0YXJ0O1xyXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAgIHdpZHRoOiAxMDAlO1xyXG5cclxuICAgIGxhYmVsIHtcclxuICAgICAgICBjb2xvcjogIzY2MTk4MztcclxuICAgICAgICBtYXJnaW4tcmlnaHQ6IDMwcHg7XHJcbiAgICB9XHJcblxyXG4gICAgLnRpdGxlIHsgICAgIFxyXG4gICAgICAgIGZvbnQtc2l6ZTogMjVweDtcclxuICAgIH1cclxuXHJcbiAgICAudGl0bGUtc2Vjb25kIHtcclxuICAgICAgICBwYWRkaW5nOiAwcHggMTBweDsgICBcclxuICAgICAgICBmb250LXNpemU6IDIwcHg7XHJcbiAgICB9XHJcblxyXG4gICAgLmNvbnRlbnQge1xyXG4gICAgICAgIHBhZGRpbmc6IDBweCAyMHB4OyAgIFxyXG4gICAgICAgIGZvbnQtc2l6ZTogMjBweDsgICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIC5zZWxlY3QtaXRlbSB7XHJcbiAgICAgICAgY29sb3I6ICM2NjE5ODM7XHJcbiAgICAgICAgZm9udC1zaXplOiAyMHB4OyAgICAgICAgIFxyXG4gICAgICAgIGJhY2tncm91bmQ6ICNGQkUwRkY7XHJcbiAgICAgICAgcGFkZGluZzogMTBweCAzMHB4O1xyXG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDEwMHB4O1xyXG4gICAgICAgIG1hcmdpbi1yaWdodDogMTVweDtcclxuICAgIH1cclxufVxyXG5cclxuLnByb2dyZXNzLWJhciB7XHJcbiAgICB3aWR0aDogMTAwJTtcclxuICAgIGhlaWdodDogNDBweDtcclxuICAgIGJhY2tncm91bmQ6ICNGQkUwRkY7XHJcbiAgICBib3JkZXItcmFkaXVzOiA1cHg7XHJcbiAgICBtYXJnaW46IDBweCAyMHB4OyAgXHJcbiAgICBwYWRkaW5nOiA1cHg7IFxyXG5cclxuICAgIC5wcm9ncmVzcyB7XHJcbiAgICAgICAgd2lkdGg6IDcwJTtcclxuICAgICAgICBoZWlnaHQ6IDEwMCU7XHJcbiAgICAgICAgYm9yZGVyLXJhZGl1czogNXB4O1xyXG4gICAgICAgIGJhY2tncm91bmQ6ICM2NjE5ODM7XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG5cclxuLmRpYWxvZy1jb250YWluZXIge1xyXG4gICAgei1pbmRleDogOTE7XHJcbn1cclxuXHJcbi5sb2FkaW5nLWNvbnRhaW5lciB7XHJcbiAgICB6LWluZGV4OiA5MTtcclxufVxyXG5cclxuIl0sInNvdXJjZVJvb3QiOiIifQ== */"]
    });
  }
}

/***/ }),

/***/ 1734:
/*!***********************************************************!*\
  !*** ./src/app/review-room/models/chartTimeType.model.ts ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ChartTimeType: () => (/* binding */ ChartTimeType)
/* harmony export */ });
class ChartTimeType {
  constructor() {
    this.week = "week";
    this.month = "month";
    this.season = "season";
    this.halfYear = "halfYear";
    this.year = "year";
  }
}

/***/ }),

/***/ 4654:
/*!***********************************************************!*\
  !*** ./src/app/review-room/models/chartTimeWord.model.ts ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ChartTimeWord: () => (/* binding */ ChartTimeWord)
/* harmony export */ });
class ChartTimeWord {
  constructor() {
    this.week = "本周";
    this.month = "本月";
    this.season = "本季";
    this.halfYear = "半年";
    this.year = "今年";
    this.booking_room = "教室預約";
    this.booking_site = "座位預約";
  }
}

/***/ }),

/***/ 676:
/*!*********************************************************!*\
  !*** ./src/app/review-room/models/review-type.model.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ReviewType: () => (/* binding */ ReviewType)
/* harmony export */ });
class ReviewType {
  constructor() {
    // 借用趨勢
    this.BOOKING_TREND = "BOOKING_TREND";
    // 剩餘空間率
    this.REMANET_RATE = "REMANET_RATE";
  }
}

/***/ }),

/***/ 2903:
/*!*************************************************************!*\
  !*** ./src/app/review-room/services/review-room.service.ts ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ReviewRoomService: () => (/* binding */ ReviewRoomService)
/* harmony export */ });
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/environments/environment */ 5312);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ 6443);
/* harmony import */ var src_app_firebase_api_services_cloud_fun_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/firebase-api/services/cloud-fun.service */ 7028);




class ReviewRoomService {
  constructor(http, cloudFunService) {
    this.http = http;
    this.cloudFunService = cloudFunService;
    this.DOMAIN = src_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.domain;
    this.CONTEXT = "/api/review/room";
    this.BASE_URL = this.DOMAIN + this.CONTEXT;
  }
  /*
   * 取得 今日剩餘比率資訊
     剩餘 / 空間總數 => 小數點
   */
  getTodayRemanent() {
    //return this.cloudFunService.getTodayRate();
    return this.http.get(`${this.BASE_URL}/rate/today`);
  }
  /*
   * 取得 booking 變化趨勢
   */
  getChartByTimeType(timeType) {
    //return this.cloudFunService.getBookingTrend(timeType)
    return this.http.get(`${this.BASE_URL}/chart/${timeType}`);
  }
  /*
   * 取得 booking 該月每日剩餘空間
   */
  getBookingRate(roomType, date) {
    //return this.cloudFunService.getBookingRate(date, roomType);
    return this.http.get(`${this.BASE_URL}/rate/${roomType}/${date}`);
  }
  static {
    this.ɵfac = function ReviewRoomService_Factory(t) {
      return new (t || ReviewRoomService)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_3__.HttpClient), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](src_app_firebase_api_services_cloud_fun_service__WEBPACK_IMPORTED_MODULE_1__.CloudFunService));
    };
  }
  static {
    this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({
      token: ReviewRoomService,
      factory: ReviewRoomService.ɵfac,
      providedIn: 'root'
    });
  }
}

/***/ }),

/***/ 5312:
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   environment: () => (/* binding */ environment)
/* harmony export */ });
const environment = {
  production: false,
  domain: 'https://api-2qiy7ro3ea-uc.a.run.app'
};

/***/ }),

/***/ 4429:
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser */ 436);
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app/app.module */ 635);


_angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__.platformBrowser().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_0__.AppModule).catch(err => console.error(err));

/***/ }),

/***/ 942:
/*!*****************************************************************!*\
  !*** ./src/app/common/export-import/sample/roomToSiteList.json ***!
  \*****************************************************************/
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"roomToSiteList":[{"roomName":"教室名稱_測試1","siteName":"座位名稱_測試1_1"},{"roomName":"教室名稱_測試1","siteName":"座位名稱_測試1_2"},{"roomName":"教室名稱_測試2","siteName":"座位名稱_測試2_1"}]}');

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["vendor"], () => (__webpack_exec__(4429)));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=main.js.map