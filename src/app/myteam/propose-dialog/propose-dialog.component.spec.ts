import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProposeDialogComponent } from './propose-dialog.component';

describe('ProposeDialogComponent', () => {
  let component: ProposeDialogComponent;
  let fixture: ComponentFixture<ProposeDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProposeDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProposeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
