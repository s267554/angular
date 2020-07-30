import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {VmsTableContComponent} from './vms-table-cont.component';

describe('VmsTableContComponent', () => {
  let component: VmsTableContComponent;
  let fixture: ComponentFixture<VmsTableContComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [VmsTableContComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VmsTableContComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
