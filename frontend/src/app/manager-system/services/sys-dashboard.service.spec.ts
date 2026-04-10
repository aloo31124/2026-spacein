import { TestBed } from '@angular/core/testing';

import { SysDashboardService } from './sys-dashboard.service';

describe('SysDashboardService', () => {
  let service: SysDashboardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SysDashboardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
