import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaySettingComponent } from './pay-setting.component';

describe('PaySettingComponent', () => {
  let component: PaySettingComponent;
  let fixture: ComponentFixture<PaySettingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaySettingComponent]
    });
    fixture = TestBed.createComponent(PaySettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
