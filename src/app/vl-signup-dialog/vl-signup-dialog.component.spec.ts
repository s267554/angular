import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VlSignupDialogComponent } from './vl-signup-dialog.component';

describe('VlSignupDialogComponent', () => {
  let component: VlSignupDialogComponent;
  let fixture: ComponentFixture<VlSignupDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VlSignupDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VlSignupDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
