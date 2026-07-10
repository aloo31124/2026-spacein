import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SysDashboardComponent } from './sys-dashboard.component';

describe('SysDashboardComponent', () => {
  let component: SysDashboardComponent;
  let fixture: ComponentFixture<SysDashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SysDashboardComponent]
    });
    fixture = TestBed.createComponent(SysDashboardComponent);
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
