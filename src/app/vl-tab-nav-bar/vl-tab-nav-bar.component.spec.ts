import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {VlTabNavBarComponent} from './vl-tab-nav-bar.component';

describe('VlTabNavBarComponent', () => {
  let component: VlTabNavBarComponent;
  let fixture: ComponentFixture<VlTabNavBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [VlTabNavBarComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VlTabNavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
