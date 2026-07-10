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
});
