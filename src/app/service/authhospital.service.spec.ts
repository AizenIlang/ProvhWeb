import { TestBed } from '@angular/core/testing';

import { AuthhospitalService } from './authhospital.service';

describe('AuthhospitalService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthhospitalService = TestBed.get(AuthhospitalService);
    expect(service).toBeTruthy();
  });
});
