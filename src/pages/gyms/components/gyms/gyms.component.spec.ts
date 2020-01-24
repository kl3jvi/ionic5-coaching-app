import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GymsComponent } from './gyms.component';

describe('GymsComponent', () => {
  let component: GymsComponent;
  let fixture: ComponentFixture<GymsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GymsComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GymsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
