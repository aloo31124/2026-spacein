import { TestBed } from '@angular/core/testing';

import { RoomDashboardService } from './room-dashboard.service';

describe('RoomDashboardService', () => {
  let service: RoomDashboardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoomDashboardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
