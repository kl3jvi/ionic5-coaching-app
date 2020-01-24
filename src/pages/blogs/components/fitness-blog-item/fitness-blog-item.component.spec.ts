import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FitnessBlogItemComponent } from './fitness-blog-item.component';

describe('FitnessBlogItemComponent', () => {
  let component: FitnessBlogItemComponent;
  let fixture: ComponentFixture<FitnessBlogItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FitnessBlogItemComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FitnessBlogItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
