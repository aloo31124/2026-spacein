import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchBookingUserComponent } from './search-booking-user.component';

describe('SearchBookingUserComponent', () => {
  let component: SearchBookingUserComponent;
  let fixture: ComponentFixture<SearchBookingUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchBookingUserComponent]
    });
    fixture = TestBed.createComponent(SearchBookingUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
