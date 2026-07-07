import { Component, OnInit } from '@angular/core';
import { ReviewType } from '../../models/review-type.model';
import { ReviewRoomService } from '../../services/review-room.service';
import { TodayRemanent } from '../../models/today-remanent.model';

@Component({
  selector: 'app-review-room-overview',
  templateUrl: './review-room-overview.component.html',
  styleUrls: ['./review-room-overview.component.scss']
})
export class ReviewRoomOverviewComponent implements OnInit {

  // 選擇 總攬種類模型
  reviewType = new ReviewType();

  // 當前選擇 總攬種類
  selectReviewType = this.reviewType.BOOKING_TREND;

  // 今日剩餘比率
  todayRemanent: TodayRemanent = {remanent: 0, totalRoom: 0};

  constructor(
    private reviewRoomService: ReviewRoomService,
  ) {}

  ngOnInit(): void {
    // 取得 今日剩餘比率, 統一由後端 API 計算
    this.reviewRoomService
      .getTodayRemanent()
        .subscribe((todayRemanent: any) => {
          this.todayRemanent = todayRemanent;
        });
  }

  /*
   * 點選 總攬種類 
   */
  changeReviewType(selectType: string){
    this.selectReviewType = selectType;
  }

  /*
   * 取得今日剩餘比率 
   */
  getToDayRate() {
    if(this.todayRemanent.totalRoom === 0) {
      return 100;
    }
    return ((this.todayRemanent.remanent / this.todayRemanent.totalRoom) * 100).toFixed(2);
  }

  /*
   * 回覆剩餘文字 
   */
  getRateWording() {
    return this.todayRemanent.remanent.toString() +"/" + this.todayRemanent.totalRoom.toString();
  }

}
