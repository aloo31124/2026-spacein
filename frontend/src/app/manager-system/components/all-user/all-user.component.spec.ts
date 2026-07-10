import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';

import { AllUserComponent } from './all-user.component';
import { SysDashboardService } from '../../services/sys-dashboard.service';
import { ExportService } from 'src/app/common/export-import/services/export.service';
import { DialogService } from 'src/app/common/dialog/services/dialog.service';

describe('AllUserComponent', () => {
  let component: AllUserComponent;
  let fixture: ComponentFixture<AllUserComponent>;
  let sysDashboardService: jasmine.SpyObj<SysDashboardService>;
  let dialogService: jasmine.SpyObj<DialogService>;

  beforeEach(() => {
    sysDashboardService = jasmine.createSpyObj<SysDashboardService>('SysDashboardService', [
      'searchUser',
      'addSystemRole',
      'removeSystemRole',
      'exportAllUserList',
    ]);
    dialogService = jasmine.createSpyObj<DialogService>('DialogService', ['confirm']);
    dialogService.confirm.and.resolveTo(true);
    spyOn(window, 'alert');

    TestBed.configureTestingModule({
      declarations: [AllUserComponent],
      imports: [FormsModule],
      providers: [
        {provide: SysDashboardService, useValue: sysDashboardService},
        {provide: DialogService, useValue: dialogService},
        {provide: ExportService, useValue: {}},
      ]
    });
    fixture = TestBed.createComponent(AllUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('列表依 isSystem 顯示 轉系統管理員 或 取消系統管理員 按鈕', () => {
    component.users = [
      {id: 'u1', name: '一般使用者', email: 'a@example.com', isSystem: false},
      {id: 'u2', name: '管理員使用者', email: 'b@example.com', isSystem: true},
    ];
    component.isDefault = false;
    fixture.detectChanges();

    const buttons = fixture.nativeElement.querySelectorAll('td.table-actions button');
    expect(buttons.length).toBe(2);
    expect(buttons[0].textContent.trim()).toBe('轉系統管理員');
    expect(buttons[1].textContent.trim()).toBe('取消系統管理員');
  });

  it('點擊 轉系統管理員 確認後應呼叫 API 並更新為系統管理員', async () => {
    sysDashboardService.addSystemRole.and.returnValue(of({result: {}}));
    const user = {id: 'u1', name: '一般使用者', email: 'a@example.com', isSystem: false};

    await component.clickAddSystemRole(user);

    expect(sysDashboardService.addSystemRole).toHaveBeenCalledWith('u1');
    expect(user.isSystem).toBeTrue();
  });

  it('點擊 取消系統管理員 確認後應呼叫 API 並取消系統管理員', async () => {
    sysDashboardService.removeSystemRole.and.returnValue(of({result: {}}));
    const user = {id: 'u2', name: '管理員使用者', email: 'b@example.com', isSystem: true};

    await component.clickRemoveSystemRole(user);

    expect(sysDashboardService.removeSystemRole).toHaveBeenCalledWith('u2');
    expect(user.isSystem).toBeFalse();
  });

  it('confirm 取消時不應呼叫任何角色 API', async () => {
    dialogService.confirm.and.resolveTo(false);
    const user = {id: 'u1', name: '一般使用者', email: 'a@example.com', isSystem: false};

    await component.clickAddSystemRole(user);
    await component.clickRemoveSystemRole(user);

    expect(sysDashboardService.addSystemRole).not.toHaveBeenCalled();
    expect(sysDashboardService.removeSystemRole).not.toHaveBeenCalled();
  });
});
