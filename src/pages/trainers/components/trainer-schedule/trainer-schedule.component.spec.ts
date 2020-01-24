import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TrainerScheduleComponent } from './trainer-schedule.component';

describe('TrainerScheduleComponent', () => {
  let component: TrainerScheduleComponent;
  let fixture: ComponentFixture<TrainerScheduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TrainerScheduleComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainerScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
