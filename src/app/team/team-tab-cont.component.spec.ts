import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TeamTabContComponent} from './team-tab-cont.component';

describe('TeamTabContComponent', () => {
  let component: TeamTabContComponent;
  let fixture: ComponentFixture<TeamTabContComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TeamTabContComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamTabContComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
