import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {VmTabContComponent} from './vm-tab-cont.component';

describe('VmTabContComponent', () => {
  let component: VmTabContComponent;
  let fixture: ComponentFixture<VmTabContComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [VmTabContComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VmTabContComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
