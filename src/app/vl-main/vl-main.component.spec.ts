import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {VlMainComponent} from './vl-main.component';

describe('VlMainComponent', () => {
  let component: VlMainComponent;
  let fixture: ComponentFixture<VlMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [VlMainComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VlMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
