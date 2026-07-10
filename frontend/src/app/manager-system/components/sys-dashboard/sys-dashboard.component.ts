import { Component } from '@angular/core';

@Component({
  selector: 'app-sys-dashboard',
  templateUrl: './sys-dashboard.component.html',
  styleUrls: ['./sys-dashboard.component.scss']
})
export class SysDashboardComponent {
  isMenuVisible: boolean = true; // 預設選單是顯示的

  toggleMenu() {
    this.isMenuVisible = !this.isMenuVisible;
  }

}
