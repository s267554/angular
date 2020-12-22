import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {MyTeamTabComponent} from './myteam-tab.component';

describe('MyTeamTabComponent', () => {
  let component: MyTeamTabComponent;
  let fixture: ComponentFixture<MyTeamTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MyTeamTabComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyTeamTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
