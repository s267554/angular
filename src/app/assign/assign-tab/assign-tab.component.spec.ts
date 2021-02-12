import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignTabComponent } from './assign-tab.component';

describe('AssignTabComponent', () => {
  let component: AssignTabComponent;
  let fixture: ComponentFixture<AssignTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
