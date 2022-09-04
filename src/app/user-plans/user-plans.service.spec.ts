import { TestBed } from '@angular/core/testing';

import { UserPlansService } from './user-plans.service';

describe('UserPlansService', () => {
  let service: UserPlansService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserPlansService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
