import { TestBed } from '@angular/core/testing';

import { UrgenceService } from './urgence.service';

describe('UrgenceService', () => {
  let service: UrgenceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UrgenceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
