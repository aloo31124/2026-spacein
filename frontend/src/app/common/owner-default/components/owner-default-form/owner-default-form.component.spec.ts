import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { ContactActionIconComponent } from 'src/app/common/contact-action/components/contact-action-icon/contact-action-icon.component';
import { OwnerDefault } from '../../models/owner-default.model';
import { OwnerDefaultFormComponent } from './owner-default-form.component';

describe('OwnerDefaultFormComponent', () => {
  let component: OwnerDefaultFormComponent;
  let fixture: ComponentFixture<OwnerDefaultFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OwnerDefaultFormComponent, ContactActionIconComponent],
      imports: [FormsModule],
    });
    fixture = TestBed.createComponent(OwnerDefaultFormComponent);
    component = fixture.componentInstance;
  });

  it('地址有值時在輸入框旁顯示 Google Maps icon 連結', () => {
    component.form = new OwnerDefault({address: '台北市中正區測試路1號'});
    fixture.detectChanges();

    const field = fixture.nativeElement.querySelector('.input-with-action');
    expect(field.querySelector('input')).toBeTruthy();
    expect(field.querySelector('a').getAttribute('href')).toContain('google.com/maps/search/');
  });

  it('地址未設定時 map icon 為停用狀態', () => {
    component.form = new OwnerDefault({address: ''});
    fixture.detectChanges();

    const field = fixture.nativeElement.querySelector('.input-with-action');
    expect(field.querySelector('a')).toBeNull();
    expect(field.querySelector('.contact-action-icon.disabled')).toBeTruthy();
  });
});
