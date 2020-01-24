import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMeasurementComponent } from './add-measurement.component';

describe('AddMeasurementComponent', () => {
  let component: AddMeasurementComponent;
  let fixture: ComponentFixture<AddMeasurementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddMeasurementComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMeasurementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
