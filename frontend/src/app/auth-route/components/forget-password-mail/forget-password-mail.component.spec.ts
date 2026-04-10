import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgetPasswordMailComponent } from './forget-password-mail.component';

describe('ForgetPasswordMailComponent', () => {
  let component: ForgetPasswordMailComponent;
  let fixture: ComponentFixture<ForgetPasswordMailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ForgetPasswordMailComponent]
    });
    fixture = TestBed.createComponent(ForgetPasswordMailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
