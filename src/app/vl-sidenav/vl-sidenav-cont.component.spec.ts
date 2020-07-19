import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {VlSidenavContComponent} from './vl-sidenav-cont.component';

describe('VlSidenavContComponent', () => {
  let component: VlSidenavContComponent;
  let fixture: ComponentFixture<VlSidenavContComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [VlSidenavContComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VlSidenavContComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
