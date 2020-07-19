import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {VlSidenavComponent} from './vl-sidenav.component';

describe('VlSidenavComponent', () => {
  let component: VlSidenavComponent;
  let fixture: ComponentFixture<VlSidenavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [VlSidenavComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VlSidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
