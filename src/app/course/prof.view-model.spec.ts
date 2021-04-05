import {TestBed} from '@angular/core/testing';

import {ProfessorViewModel} from './prof.view-model';

describe('ProfessorViewModel', () => {
  let service: ProfessorViewModel;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfessorViewModel);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
