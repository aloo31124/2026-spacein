import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactActionIconComponent } from './contact-action-icon.component';

describe('ContactActionIconComponent', () => {
  let component: ContactActionIconComponent;
  let fixture: ComponentFixture<ContactActionIconComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContactActionIconComponent],
    });
    fixture = TestBed.createComponent(ContactActionIconComponent);
    component = fixture.componentInstance;
  });

  it('地址 icon 產生編碼後的 Google Maps 新視窗連結', () => {
    component.actionType = 'map';
    component.value = '台北市中正區測試路 1 號';
    fixture.detectChanges();

    const link: HTMLAnchorElement = fixture.nativeElement.querySelector('a');
    expect(link.getAttribute('href')).toBe(
      'https://www.google.com/maps/search/?api=1&query=%E5%8F%B0%E5%8C%97%E5%B8%82%E4%B8%AD%E6%AD%A3%E5%8D%80%E6%B8%AC%E8%A9%A6%E8%B7%AF%201%20%E8%99%9F'
    );
    expect(link.getAttribute('target')).toBe('_blank');
    expect(link.getAttribute('rel')).toBe('noopener noreferrer');
  });

  it('電話 icon 產生 tel 通話連結', () => {
    component.actionType = 'phone';
    component.value = '02-12345678';
    fixture.detectChanges();

    const link: HTMLAnchorElement = fixture.nativeElement.querySelector('a');
    expect(link.getAttribute('href')).toBe('tel:02-12345678');
    expect(link.getAttribute('target')).toBeNull();
  });

  it('欄位未設定時顯示停用 icon 且不產生連結', () => {
    component.value = '   ';
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('a')).toBeNull();
    expect(fixture.nativeElement.querySelector('.contact-action-icon.disabled')).toBeTruthy();
  });
});
