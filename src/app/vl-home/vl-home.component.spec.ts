import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {VlHomeComponent} from './vl-home.component';

describe('VlHomeComponent', () => {
  let component: VlHomeComponent;
  let fixture: ComponentFixture<VlHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [VlHomeComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VlHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
