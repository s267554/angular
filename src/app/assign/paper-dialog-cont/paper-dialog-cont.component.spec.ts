import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaperDialogContComponent } from './paper-dialog-cont.component';

describe('PaperDialogContComponent', () => {
  let component: PaperDialogContComponent;
  let fixture: ComponentFixture<PaperDialogContComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaperDialogContComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaperDialogContComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
