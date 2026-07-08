import { Component, Input } from '@angular/core';
import { OwnerDefault } from '../../models/owner-default.model';

/*
 * [擁有者預設] 共用表單元件
 * 帳號頁面 (labelPrefix="預設") 與 教室新增/編輯表單 共用
 * 欄位: 地址、電話、每周不開放星期、每天開放時段
 */
@Component({
  selector: 'app-owner-default-form',
  templateUrl: './owner-default-form.component.html',
  styleUrls: ['./owner-default-form.component.scss']
})
export class OwnerDefaultFormComponent {

  // 表單資料, 由父元件傳入同一物件參考, 直接雙向修改
  @Input() form = new OwnerDefault();

  // 欄位標籤前綴, 帳號頁傳入 "預設", 教室表單留空
  @Input() labelPrefix = "";

  // 星期顯示名稱, 索引對應 Date.getDay() (0=星期日 ~ 6=星期六)
  readonly weekdayNames = ["日", "一", "二", "三", "四", "五", "六"];

  /* 該星期是否勾選為不開放 */
  isClosedWeekday(day: number) {
    return this.form.closedWeekdays.includes(day);
  }

  /* 勾選/取消 該星期不開放 */
  toggleClosedWeekday(day: number) {
    if (this.isClosedWeekday(day)) {
      this.form.closedWeekdays = this.form.closedWeekdays.filter(d => d !== day);
    } else {
      this.form.closedWeekdays = [...this.form.closedWeekdays, day].sort((a, b) => a - b);
    }
  }
}
