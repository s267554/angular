import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {VlSidenavContentComponent} from './vl-sidenav-content.component';

describe('VlSidenavContentComponent', () => {
  let component: VlSidenavContentComponent;
  let fixture: ComponentFixture<VlSidenavContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [VlSidenavContentComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VlSidenavContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
