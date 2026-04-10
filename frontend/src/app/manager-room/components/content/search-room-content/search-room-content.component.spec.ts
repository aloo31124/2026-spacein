import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchRoomContentComponent } from './search-room-content.component';

describe('SearchRoomContentComponent', () => {
  let component: SearchRoomContentComponent;
  let fixture: ComponentFixture<SearchRoomContentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchRoomContentComponent]
    });
    fixture = TestBed.createComponent(SearchRoomContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
