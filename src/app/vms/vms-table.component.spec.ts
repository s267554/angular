import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {VmsTableComponent} from './vms-table.component';

describe('VmsTableComponent', () => {
  let component: VmsTableComponent;
  let fixture: ComponentFixture<VmsTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [VmsTableComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VmsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
