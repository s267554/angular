import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VmsTabComponent } from './vms-tab.component';

describe('VmsTabComponent', () => {
  let component: VmsTabComponent;
  let fixture: ComponentFixture<VmsTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VmsTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VmsTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
