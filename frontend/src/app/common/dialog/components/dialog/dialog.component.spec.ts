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

  it('長項目文字會完整換行而非以省略號截斷', () => {
    component.itemList = [{
      id: 'long-item',
      name: '這是一個需要在共用視窗中完整顯示的長項目名稱，內容超過單行寬度時應自然換行並維持舒適的閱讀間距。'
    }];
    fixture.detectChanges();

    const row = fixture.nativeElement.querySelector('.row') as HTMLElement;
    const style = getComputedStyle(row);

    expect(style.whiteSpace).toBe('normal');
    expect(style.overflowWrap).toBe('anywhere');
    expect(row.clientHeight).toBeGreaterThan(50);
  });

  it('項目超過視窗可用高度時只讓內容區垂直滾動', () => {
    component.itemList = Array.from({ length: 30 }, (_, index) => ({
      id: `item-${index}`,
      name: `選擇項目 ${index + 1}`
    }));
    fixture.detectChanges();

    const dialog = fixture.nativeElement.querySelector('.dialog') as HTMLElement;
    const content = fixture.nativeElement.querySelector('.dialog-content') as HTMLElement;
    const footer = fixture.nativeElement.querySelector('.dialog-footer') as HTMLElement;

    expect(dialog.clientHeight).toBeLessThanOrEqual(window.innerHeight - 48);
    expect(content.scrollHeight).toBeGreaterThan(content.clientHeight);
    expect(getComputedStyle(content).overflowY).toBe('auto');
    expect(footer.getBoundingClientRect().bottom).toBeLessThanOrEqual(dialog.getBoundingClientRect().bottom);
  });
});
