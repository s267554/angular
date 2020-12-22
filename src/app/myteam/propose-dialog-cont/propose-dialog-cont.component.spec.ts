import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProposeDialogContComponent } from './propose-dialog-cont.component';

describe('ProposeDialogContComponent', () => {
  let component: ProposeDialogContComponent;
  let fixture: ComponentFixture<ProposeDialogContComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProposeDialogContComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProposeDialogContComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
