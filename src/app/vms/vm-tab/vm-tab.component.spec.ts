import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {VmTabComponent} from './vm-tab.component';

describe('VmTabComponent', () => {
  let component: VmTabComponent;
  let fixture: ComponentFixture<VmTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [VmTabComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VmTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
