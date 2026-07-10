import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-room-dashboard',
  templateUrl: './room-dashboard.component.html',
  styleUrls: ['./room-dashboard.component.scss']
})
export class RoomDashboardComponent {
  private readonly menuBreakpoint = 1000;
  isMenuVisible = window.innerWidth >= this.menuBreakpoint;

  @HostListener('window:resize')
  onWindowResize(): void {
    if (window.innerWidth < this.menuBreakpoint) {
      this.isMenuVisible = false;
    }
  }

  toggleMenu(): void {
    this.isMenuVisible = !this.isMenuVisible;
  }

}
