import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgetPasswordVerityComponent } from './forget-password-verity.component';

describe('ForgetPasswordVerityComponent', () => {
  let component: ForgetPasswordVerityComponent;
  let fixture: ComponentFixture<ForgetPasswordVerityComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ForgetPasswordVerityComponent]
    });
    fixture = TestBed.createComponent(ForgetPasswordVerityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
