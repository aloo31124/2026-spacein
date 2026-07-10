import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReviewBookingService } from '../../services/review-booking.service';
import { RouteUrlRecordService } from 'src/app/auth-route/services/route-url-record.service';
import { GoogleAuthService } from 'src/app/auth-route/services/google-auth.service';
import { GoogleAuthUser } from 'src/app/auth-route/models/google-auth-user.model';
import { DialogService } from 'src/app/common/dialog/services/dialog.service';
import { BookingService } from 'src/app/booking/services/booking.service';
import { Room } from 'src/app/common/room-site/models/room.model';

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
  roomId = "";
  // 教室資訊 (地址/電話), 依 roomId 查詢後顯示
  selectRoomInfo: Room | null = null;

  constructor(
    private routeUrlRecordService: RouteUrlRecordService<{}>,
    private activatedRoute: ActivatedRoute,
    private reviewBookingService: ReviewBookingService,
    private googleAuthService: GoogleAuthService,
    private dialogService: DialogService,
    private bookingService: BookingService,
  ) { }

  ngOnInit(): void {

    // 取得使用者資訊
    if(!this.googleAuthService.getCurrentUser()) {
      alert("無法取得使用者資訊");
    }
    this.googleAuthUser = this.googleAuthService.getCurrentUser();
    this.userMail = this.googleAuthUser.email;

    // 提取日期参数
    this.activatedRoute.queryParams.subscribe((params: any) => {
      this.id = params['id'];
      this.selectDate = params['startDate'];
      this.startTime = params['startTime'];
      this.endTime = params['endTime'];
      this.bookingType = params['bookingType'];
      this.selectRoom = params['roomName'];
      this.selectSite = params['siteName'];
      this.roomId = params['roomId'];
      this.loadRoomInfo();
    });
  }

  /*
   * 依 roomId 取得教室資訊 (地址/電話) 供頁面顯示
   * 走既有 GET /api/booking/room/userId/:userId (已處理 booker→owner 身分換算)
   * 顯示為輔助資訊, 取得失敗不影響取消借用流程 (error 靜默)
   */
  loadRoomInfo() {
    if(!this.roomId || !this.googleAuthUser) {
      return;
    }
    this.bookingService
      .getRoomByOwnerId(this.googleAuthUser.id)
      .subscribe({
        next: (roomList: any) => {
          const room = (roomList || []).find((room: any) => room.id === this.roomId);
          this.selectRoomInfo = room ? new Room(room) : null;
        },
        error: () => {}
      });
  }

  async deleteBooking() {
    if(!await this.dialogService.confirm("確定取消借用?")) {
      return;
    }
    this.reviewBookingService
      .deleteBookingById(this.id)
      .subscribe({
        next: (res: any) => {
          alert("成功刪除");
          this.routeUrlRecordService.nextPage("review-booking-calendar", {});
        },
        error: (err: any) => {
          console.log("刪除異常, 請稍後再試 : " + err)
          alert("刪除異常, 請稍後再試 : " + err);
        }
      });
  }

}
