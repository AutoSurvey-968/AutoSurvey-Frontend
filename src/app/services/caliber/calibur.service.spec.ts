import { TestBed } from '@angular/core/testing';

import { CaliburService } from './calibur.service';

describe('CaliburService', () => {
  let service: CaliburService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CaliburService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
