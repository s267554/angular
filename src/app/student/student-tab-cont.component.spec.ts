import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {StudentTabContComponent} from './student-tab-cont.component';

describe('StudentTabContComponent', () => {
  let component: StudentTabContComponent;
  let fixture: ComponentFixture<StudentTabContComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StudentTabContComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentTabContComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
