import {TestBed} from '@angular/core/testing';

import {StudentViewModel} from './student.view-model';

describe('StudentTabService', () => {
  let service: StudentViewModel;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudentViewModel);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
