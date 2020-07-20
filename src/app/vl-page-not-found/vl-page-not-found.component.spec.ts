import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {VlPageNotFoundComponent} from './vl-page-not-found.component';

describe('VlPageNotFoundComponent', () => {
  let component: VlPageNotFoundComponent;
  let fixture: ComponentFixture<VlPageNotFoundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [VlPageNotFoundComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VlPageNotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
