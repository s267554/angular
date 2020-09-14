import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TeamTableContComponent} from './team-table-cont.component';

describe('TeamTableContComponent', () => {
  let component: TeamTableContComponent;
  let fixture: ComponentFixture<TeamTableContComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TeamTableContComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamTableContComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
