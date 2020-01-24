import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoalsGridComponent } from './goals-grid.component';

describe('GoalsGridComponent', () => {
  let component: GoalsGridComponent;
  let fixture: ComponentFixture<GoalsGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoalsGridComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoalsGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
