import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActuatorsComponent } from './actuators.component';

describe('ActuatorsComponent', () => {
  let component: ActuatorsComponent;
  let fixture: ComponentFixture<ActuatorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActuatorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActuatorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
