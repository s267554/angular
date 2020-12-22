import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {MyTeamTableContComponent} from './myteam-table-cont.component';

describe('MyTeamTableContComponent', () => {
  let component: MyTeamTableContComponent;
  let fixture: ComponentFixture<MyTeamTableContComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MyTeamTableContComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyTeamTableContComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
