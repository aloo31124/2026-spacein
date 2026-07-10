import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomDashboardComponent } from './room-dashboard.component';

describe('RoomDashboardComponent', () => {
  let component: RoomDashboardComponent;
  let fixture: ComponentFixture<RoomDashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RoomDashboardComponent]
    });
    fixture = TestBed.createComponent(RoomDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should collapse below 1000px and expand when returning to desktop', () => {
    Object.defineProperty(window, 'innerWidth', { configurable: true, value: 999 });
    window.dispatchEvent(new Event('resize'));
    expect(component.isMenuVisible).toBeFalse();

    Object.defineProperty(window, 'innerWidth', { configurable: true, value: 1000 });
    window.dispatchEvent(new Event('resize'));
    expect(component.isMenuVisible).toBeTrue();
  });
});
