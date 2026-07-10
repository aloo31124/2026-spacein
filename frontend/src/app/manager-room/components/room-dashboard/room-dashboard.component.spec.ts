import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomDashboardComponent } from './room-dashboard.component';

describe('RoomDashboardComponent', () => {
  let component: RoomDashboardComponent;
  let fixture: ComponentFixture<RoomDashboardComponent>;
  const originalInnerWidth = window.innerWidth;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RoomDashboardComponent]
    });
    fixture = TestBed.createComponent(RoomDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    Object.defineProperty(window, 'innerWidth', { configurable: true, value: originalInnerWidth });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('瀏覽器寬度小於 1000px 時應自動收合選單', () => {
    Object.defineProperty(window, 'innerWidth', { configurable: true, value: 999 });
    component.isMenuVisible = true;

    component.onWindowResize();

    expect(component.isMenuVisible).toBeFalse();
  });

  it('瀏覽器寬度至少 1000px 時新頁面應顯示選單', () => {
    Object.defineProperty(window, 'innerWidth', { configurable: true, value: 1000 });

    const wideScreenComponent = new RoomDashboardComponent();

    expect(wideScreenComponent.isMenuVisible).toBeTrue();
  });
});
