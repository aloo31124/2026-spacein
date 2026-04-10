import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookerSelectOwnerComponent } from './booker-select-owner.component';

describe('BookerSelectOwnerComponent', () => {
  let component: BookerSelectOwnerComponent;
  let fixture: ComponentFixture<BookerSelectOwnerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BookerSelectOwnerComponent]
    });
    fixture = TestBed.createComponent(BookerSelectOwnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
