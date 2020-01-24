import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LifestyleBlogItemComponent } from './lifestyle-blog-item.component';

describe('LifestyleBlogItemComponent', () => {
  let component: LifestyleBlogItemComponent;
  let fixture: ComponentFixture<LifestyleBlogItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LifestyleBlogItemComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LifestyleBlogItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
