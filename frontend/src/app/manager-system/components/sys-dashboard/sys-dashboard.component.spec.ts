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
});
