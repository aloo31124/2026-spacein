import { Component, OnInit } from '@angular/core';
import { APP_VERSION } from '../../constants/version.constant';

/**
 * 共用版本號元件
 * 顯示 Git 版本資訊（維護版 / 優化版）與當前日期。
 * 版本字串統一由 version.constant.ts 管理，發版只需更新常數。
 */
@Component({
  selector: 'app-version',
  templateUrl: './app-version.component.html',
  styleUrls: ['./app-version.component.scss']
})
export class AppVersionComponent implements OnInit {

  fixLabel  = APP_VERSION.fixLabel;
  fixHash   = APP_VERSION.fixHash;
  featLabel = APP_VERSION.featLabel;
  featHash  = APP_VERSION.featHash;
  buildDate = APP_VERSION.buildDate;

  /** 執行期間取得的當前日期，格式：YYYY/M/D */
  todayDate = '';

  ngOnInit(): void {
    const now = new Date();
    const yyyy = now.getFullYear();
    const m   = now.getMonth() + 1;
    const d   = now.getDate();
    const hh  = String(now.getHours()).padStart(2, '0');
    const mm  = String(now.getMinutes()).padStart(2, '0');
    this.todayDate = `${m}/${d} ${hh}:${mm}`;
  }
}
