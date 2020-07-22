import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {StudentTableContComponent} from './student-table-cont.component';

describe('StudentTableContComponent', () => {
  let component: StudentTableContComponent;
  let fixture: ComponentFixture<StudentTableContComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StudentTableContComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentTableContComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
