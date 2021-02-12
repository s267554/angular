import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignDialogContComponent } from './assign-dialog-cont.component';

describe('AssignDialogContComponent', () => {
  let component: AssignDialogContComponent;
  let fixture: ComponentFixture<AssignDialogContComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignDialogContComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignDialogContComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
