import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DietBlogItemComponent } from './diet-blog-item.component';

describe('DietBlogItemComponent', () => {
  let component: DietBlogItemComponent;
  let fixture: ComponentFixture<DietBlogItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DietBlogItemComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DietBlogItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
