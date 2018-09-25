import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecognizedFacesComponent } from './recognized-faces.component';

describe('RecognizedFacesComponent', () => {
  let component: RecognizedFacesComponent;
  let fixture: ComponentFixture<RecognizedFacesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecognizedFacesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecognizedFacesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
