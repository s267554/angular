import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {VlLoginDialogComponent} from './vl-login-dialog.component';

describe('VlLoginDialogComponent', () => {
  let component: VlLoginDialogComponent;
  let fixture: ComponentFixture<VlLoginDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [VlLoginDialogComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VlLoginDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
