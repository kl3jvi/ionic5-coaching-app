import { ElementRef, Renderer2 } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ButtonStatusDirective } from './button-status.directive';

describe('ButtonStatusDirective', () => {

  it('should create an instance', () => {
    const directive = new ButtonStatusDirective(null, null);
    expect(directive).toBeTruthy();
  });
});
