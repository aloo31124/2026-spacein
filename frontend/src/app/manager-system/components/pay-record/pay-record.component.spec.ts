import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayRecordComponent } from './pay-record.component';

describe('PayRecordComponent', () => {
  let component: PayRecordComponent;
  let fixture: ComponentFixture<PayRecordComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PayRecordComponent]
    });
    fixture = TestBed.createComponent(PayRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
