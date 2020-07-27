import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TeamDialogContComponent} from './team-dialog-cont.component';

describe('TeamDialogContComponent', () => {
  let component: TeamDialogContComponent;
  let fixture: ComponentFixture<TeamDialogContComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TeamDialogContComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamDialogContComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
