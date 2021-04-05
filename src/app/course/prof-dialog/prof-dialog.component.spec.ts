import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfDialogComponent } from './prof-dialog.component';

describe('ProfDialogComponent', () => {
  let component: ProfDialogComponent;
  let fixture: ComponentFixture<ProfDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
