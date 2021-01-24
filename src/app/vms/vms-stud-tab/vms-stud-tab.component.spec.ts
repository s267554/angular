import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VmsStudTabComponent } from './vms-stud-tab.component';

describe('VmsStudTabComponent', () => {
  let component: VmsStudTabComponent;
  let fixture: ComponentFixture<VmsStudTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VmsStudTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VmsStudTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
