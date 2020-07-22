import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {VlTabNavBarContComponent} from './vl-tab-nav-bar-cont.component';

describe('VlTabNavBarContComponent', () => {
  let component: VlTabNavBarContComponent;
  let fixture: ComponentFixture<VlTabNavBarContComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [VlTabNavBarContComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VlTabNavBarContComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
