import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignTableContComponent } from './assign-table-cont.component';

describe('AssignTableContComponent', () => {
  let component: AssignTableContComponent;
  let fixture: ComponentFixture<AssignTableContComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignTableContComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignTableContComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
