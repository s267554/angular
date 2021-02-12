import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VersionDialogContComponent } from './version-dialog-cont.component';

describe('VersionDialogContComponent', () => {
  let component: VersionDialogContComponent;
  let fixture: ComponentFixture<VersionDialogContComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VersionDialogContComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VersionDialogContComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
