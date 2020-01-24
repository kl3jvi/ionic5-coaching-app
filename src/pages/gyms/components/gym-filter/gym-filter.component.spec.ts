import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GymFilterComponent } from './gym-filter.component';

describe('GymFilterComponent', () => {
  let component: GymFilterComponent;
  let fixture: ComponentFixture<GymFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GymFilterComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GymFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
