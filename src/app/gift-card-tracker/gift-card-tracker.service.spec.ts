import { TestBed } from '@angular/core/testing';

import { GiftCardTrackerService } from './gift-card-tracker.service';

describe('GiftCardTrackerService', () => {
  let service: GiftCardTrackerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GiftCardTrackerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
