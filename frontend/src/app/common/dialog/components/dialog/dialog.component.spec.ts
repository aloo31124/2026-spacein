import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogComponent } from './dialog.component';
import { DialogItemModel } from '../../models/item.model';

describe('DialogComponent', () => {
  let component: DialogComponent<DialogItemModel>;
  let fixture: ComponentFixture<DialogComponent<DialogItemModel>>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogComponent]
    });
    fixture = TestBed.createComponent(DialogComponent<DialogItemModel>);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('點選可用項目後套用粉紅反白選取樣式', () => {
    component.itemList = [{ id: 'room-a', name: '教室 A', isDisabled: false }];
    fixture.detectChanges();

    const row = fixture.nativeElement.querySelector('.row') as HTMLElement;
    row.click();
    fixture.detectChanges();

    expect(component.selectItemId).toBe('room-a');
    expect(row.classList.contains('row-click')).toBeTrue();
    expect(row.getAttribute('aria-pressed')).toBe('true');
  });

  it('點選停用項目不變更選取值', () => {
    component.itemList = [{ id: 'disabled', name: '不可選', isDisabled: true }];
    fixture.detectChanges();

    (fixture.nativeElement.querySelector('.row') as HTMLElement).click();

    expect(component.selectItemId).toBe('');
  });
});
