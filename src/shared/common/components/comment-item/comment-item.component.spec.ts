import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentItemComponent } from './comment-item.component';

describe('CommentItemComponent', () => {
  let component: CommentItemComponent;
  let fixture: ComponentFixture<CommentItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommentItemComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
