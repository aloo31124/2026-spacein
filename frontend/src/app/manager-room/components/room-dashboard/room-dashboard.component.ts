import { Component } from '@angular/core';

@Component({
  selector: 'app-room-dashboard',
  templateUrl: './room-dashboard.component.html',
  styleUrls: ['./room-dashboard.component.scss']
})
export class RoomDashboardComponent {
  isMenuVisible: boolean = true; // 預設選單是顯示的

  toggleMenu() {
    this.isMenuVisible = !this.isMenuVisible;
  }

}
