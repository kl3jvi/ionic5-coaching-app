import { CommonModule } from '@angular/common';
import { Component, DebugElement, ElementRef, Renderer2 } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { InputMaskDirective } from './input-mask.directive';

const rendererMock = jasmine.createSpyObj('rendererMock', [
  'createElement',
  'appendChild',
  'addClass',
  'setProperty'
]);

const renderer2Mock = {
  renderComponent: () => {
    return rendererMock;
  }
};

describe('Mask Directive', () => {

  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let directive: InputMaskDirective;
  let inputEl: DebugElement;
  const rendererCreateElement = rendererMock.createElement('div');

  beforeEach((() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent],
      imports: [
        CommonModule,
        FormsModule
      ],
      providers: [
        { provide: Renderer2, useValue: rendererMock }
      ]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    directive = new InputMaskDirective(new ElementRef(fixture.nativeElement));
    inputEl = fixture.debugElement.query(By.css('input'));
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });
});

@Component({
  template: `
  <form #form="ngForm">
    <input name="password" [(ngModel)]="password" mask>
  </form>`
})
class TestComponent {
  public password: string;
}
