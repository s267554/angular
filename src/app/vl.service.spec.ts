import {TestBed} from '@angular/core/testing';

import {VlService} from './vl.service';

describe('VlService', () => {
  let service: VlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
