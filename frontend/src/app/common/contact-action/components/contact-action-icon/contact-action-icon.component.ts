import { Component, Input } from '@angular/core';

type ContactActionType = 'map' | 'phone';

/**
 * 地址與電話欄位共用的動作圖示。
 * map 另開 Google Maps 搜尋視窗，phone 交由裝置的 tel: 通話介面處理。
 */
@Component({
  selector: 'app-contact-action-icon',
  templateUrl: './contact-action-icon.component.html',
  styleUrls: ['./contact-action-icon.component.scss']
})
export class ContactActionIconComponent {

  @Input() actionType: ContactActionType = 'map';
  @Input() value = '';

  get href(): string | null {
    const value = String(this.value ?? '').trim();
    if (!value) {
      return null;
    }

    return this.actionType === 'map'
      ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(value)}`
      : `tel:${value}`;
  }

  get actionLabel(): string {
    if (!this.href) {
      return this.actionType === 'map' ? '尚未設定地址' : '尚未設定電話';
    }
    return this.actionType === 'map' ? '使用 Google 地圖開啟地址' : `撥打 ${this.value}`;
  }
}
