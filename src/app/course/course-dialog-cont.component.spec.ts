import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CourseDialogContComponent} from './course-dialog-cont.component';

describe('CourseDialogContComponent', () => {
  let component: CourseDialogContComponent;
  let fixture: ComponentFixture<CourseDialogContComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CourseDialogContComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseDialogContComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
