import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-sys-dashboard',
  templateUrl: './sys-dashboard.component.html',
  styleUrls: ['./sys-dashboard.component.scss']
})
export class SysDashboardComponent {
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
