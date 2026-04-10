import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomSiteImportComponent } from './room-site-import.component';

describe('RoomSiteImportComponent', () => {
  let component: RoomSiteImportComponent;
  let fixture: ComponentFixture<RoomSiteImportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RoomSiteImportComponent]
    });
    fixture = TestBed.createComponent(RoomSiteImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
