import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {VlToolbarComponent} from './vl-toolbar.component';

describe('VlToolbarComponent', () => {
  let component: VlToolbarComponent;
  let fixture: ComponentFixture<VlToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [VlToolbarComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VlToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
