import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VlProfileDialogComponent } from './vl-profile-dialog.component';

describe('VlProfileDialogComponent', () => {
  let component: VlProfileDialogComponent;
  let fixture: ComponentFixture<VlProfileDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VlProfileDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VlProfileDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
