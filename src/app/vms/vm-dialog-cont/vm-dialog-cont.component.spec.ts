import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VmDialogContComponent } from './vm-dialog-cont.component';

describe('VmDialogContComponent', () => {
  let component: VmDialogContComponent;
  let fixture: ComponentFixture<VmDialogContComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VmDialogContComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VmDialogContComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
