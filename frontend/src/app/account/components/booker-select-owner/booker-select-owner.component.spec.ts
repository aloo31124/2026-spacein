import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { of } from 'rxjs';

import { BookerSelectOwnerComponent } from './booker-select-owner.component';
import { AccountService } from '../../services/account.service';
import { GoogleAuthService } from 'src/app/auth-route/services/google-auth.service';

describe('BookerSelectOwnerComponent', () => {
  let component: BookerSelectOwnerComponent;
  let fixture: ComponentFixture<BookerSelectOwnerComponent>;
  let accountService: jasmine.SpyObj<AccountService>;

  beforeEach(() => {
    accountService = jasmine.createSpyObj<AccountService>('AccountService', [
      'getOwnerByUserId',
      'getOwner',
      'postUserToOwner',
      'postUserToRole',
    ]);

    TestBed.configureTestingModule({
      declarations: [BookerSelectOwnerComponent],
      imports: [FormsModule],
      providers: [
        {provide: AccountService, useValue: accountService},
        {provide: GoogleAuthService, useValue: {getCurrentUser: () => ({id: 'booker-1'})}},
        {provide: Router, useValue: {navigate: jasmine.createSpy('navigate')}},
      ]
    });
  });

  function createComponent() {
    fixture = TestBed.createComponent(BookerSelectOwnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }

  it('已有綁定時只顯示目前擁有者且不顯示輸入欄位', () => {
    accountService.getOwnerByUserId.and.returnValue(of({
      result: {id: 'owner-1', name: '王小明', email: 'owner@example.com'}
    }));

    createComponent();

    expect(fixture.nativeElement.textContent).toContain('王小明');
    expect(fixture.nativeElement.textContent).toContain('owner@example.com');
    expect(fixture.nativeElement.querySelector('input')).toBeNull();
    expect(fixture.nativeElement.querySelector('button')).toBeNull();
  });

  it('沒有綁定時才顯示輸入欄位與不可修改提示', () => {
    accountService.getOwnerByUserId.and.returnValue(of({result: null}));

    createComponent();

    expect(fixture.nativeElement.querySelector('input')).not.toBeNull();
    expect(fixture.nativeElement.textContent).toContain('綁定後不可修改');
  });
});
