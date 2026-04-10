import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReviewBookingService } from '../../services/review-booking.service';
import { RouteUrlRecordService } from 'src/app/auth-route/services/route-url-record.service';
import { GoogleAuthService } from 'src/app/auth-route/services/google-auth.service';
import { GoogleAuthUser } from 'src/app/auth-route/models/google-auth-user.model';

@Component({
  selector: 'app-review-booking-form',
  templateUrl: './review-booking-form.component.html',
  styleUrls: ['./review-booking-form.component.scss']
})
export class ReviewBookingFormComponent {

  id = "";
  selectDate = "";
  startTime = "";
  endTime = "";
  bookingType = "";
  googleAuthUser!: GoogleAuthUser;
  userMail = "";
  selectRoom = "";
  selectSite = "";

  constructor(
    private routeUrlRecordService: RouteUrlRecordService<{}>,
    private activatedRoute: ActivatedRoute,
    private reviewBookingService: ReviewBookingService,
    private googleAuthService: GoogleAuthService,
  ) { }

  ngOnInit(): void {

    // 取得使用者資訊
    if(!this.googleAuthService.getCurrentUser()) {
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
    if(!confirm("確定取消借用?")) {
      return;
    }
    this.reviewBookingService
      .deleteBookingById(this.id)
      .subscribe({
        next: res => {
          alert("成功刪除");
          this.routeUrlRecordService.nextPage("review-booking-calendar", {});
        },
        error: err => {
          console.log("刪除異常, 請稍後再試 : " + err)
          alert("刪除異常, 請稍後再試 : " + err);
        }
      });
  }

}
