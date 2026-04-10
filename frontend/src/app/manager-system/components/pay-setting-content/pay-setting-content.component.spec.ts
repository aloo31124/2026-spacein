import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaySettingContentComponent } from './pay-setting-content.component';

describe('PaySettingContentComponent', () => {
  let component: PaySettingContentComponent;
  let fixture: ComponentFixture<PaySettingContentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaySettingContentComponent]
    });
    fixture = TestBed.createComponent(PaySettingContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
