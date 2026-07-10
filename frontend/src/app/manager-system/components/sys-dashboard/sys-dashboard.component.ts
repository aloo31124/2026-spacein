import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-sys-dashboard',
  templateUrl: './sys-dashboard.component.html',
  styleUrls: ['./sys-dashboard.component.scss']
})
export class SysDashboardComponent {
  private isCompactViewport = window.innerWidth < 1000;
  isMenuVisible: boolean = !this.isCompactViewport;

  toggleMenu() {
    this.isMenuVisible = !this.isMenuVisible;
  }

  @HostListener('window:resize')
  onWindowResize(): void {
    const isCompactViewport = window.innerWidth < 1000;

    // 只在跨越斷點時同步選單，避免桌面上的細微縮放覆蓋使用者手動操作。
    if (isCompactViewport !== this.isCompactViewport) {
      this.isCompactViewport = isCompactViewport;
      this.isMenuVisible = !isCompactViewport;
    }
  }

}
