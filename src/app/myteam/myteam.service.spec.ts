import {TestBed} from '@angular/core/testing';

import {MyTeamService} from './myteam.service';

describe('TeamService', () => {
  let service: MyTeamService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyTeamService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
