import {
  Directive,
  ElementRef,
  forwardRef,
  HostListener,
  Input,
  OnInit
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import * as _ from 'lodash';
import {
  maskDigitValidators,
  neverValidator
} from './helpers/digit-validators';
import {
  BACKSPACE,
  DELETE,
  LEFT_ARROW,
  overwriteCharAtPosition,
  RIGHT_ARROW,
  SPECIAL_CHARACTERS,
  TAB
} from './helpers/utils';

@Directive({
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputMaskDirective),
      multi: true
    }
  ],
  selector: '[input-mask]'
})
export class InputMaskDirective implements OnInit, ControlValueAccessor {
  @Input('input-mask') public mask: string = '';

  public input: HTMLInputElement;
  public fullFieldSelected: boolean = false;

  private _placeholder: string = '';

  constructor(private el: ElementRef) {
    this.input = this.el.nativeElement;
  }

  @HostListener('select', ['$event'])
  public onSelect(): void {
    this.fullFieldSelected =
      this.input.selectionStart === 0 &&
      this.input.selectionEnd === this.input.value.length;
  }

  @HostListener('focus', ['$event'])
  public onClick(): void {
    setTimeout(() => {
      if (this.input.value === this._placeholder) {
        this.input.setSelectionRange(0, 0);
      }
    }, 0);
  }

  /**
   * @description overwite particular chararcter of the input on keypress
   * @method onKeyDown
   * @param $event KeyboardEvent
   * @param keyCode number
   * @returns void
   */
  @HostListener('keydown', ['$event', '$event.keyCode'])
  public onKeyDown($event: KeyboardEvent, keyCode: number): void {
    // get conrol for cases for copy and paste keyboard shortcut
    if ($event.metaKey || $event.ctrlKey) {
      return;
    }

    if (keyCode !== TAB) {
      $event.preventDefault();
    }

    const key = String.fromCharCode(keyCode);
    const cursorPos = this.input.selectionStart;

    // if true, clear field and select first position
    if (this.fullFieldSelected) {
      this.input.value = this._placeholder;

      const firstPlaceholderPos = _.findIndex(
        this.input.value,
        (char) => char === '_'
      );

      this.input.setSelectionRange(firstPlaceholderPos, firstPlaceholderPos);
    }

    switch (keyCode) {
      case LEFT_ARROW:
        this.handleLeftArrow(cursorPos);
        return;

      case RIGHT_ARROW:
        this.handleRightArrow(cursorPos);
        return;

      case BACKSPACE:
        this.handleBackspace(cursorPos);
        return;

      case DELETE:
        this.handleDelete(cursorPos);
        return;
    }

    const maskDigit = this.mask.charAt(cursorPos);
    const digitValidator = maskDigitValidators[maskDigit] || neverValidator;

    if (digitValidator(key)) {
      overwriteCharAtPosition(this.input, cursorPos, key);

      this.handleRightArrow(cursorPos);
    }

    this.onChange(this.input.value);
    this.onTouch();
  }

  public handleDelete(cursorPos: number): any {
    overwriteCharAtPosition(this.input, cursorPos, '_');
    this.input.setSelectionRange(cursorPos, cursorPos);
  }

  public handleBackspace(cursorPos: number): any {
    const previousPos = this.calculatePreviousCursorPos(cursorPos);

    if (previousPos >= 0) {
      overwriteCharAtPosition(this.input, previousPos, '_');
      this.input.setSelectionRange(previousPos, previousPos);
    }
  }

  public handleLeftArrow(cursorPos): void {
    const previousPos = this.calculatePreviousCursorPos(cursorPos);

    if (previousPos >= 0) {
      this.input.setSelectionRange(previousPos, previousPos);
    }
  }

  public handleRightArrow(cursorPos: number): void {
    const valueAfterCursor = this.input.value.slice(cursorPos + 1);

    const nextPos = _.findIndex(
      valueAfterCursor,
      (char) => !_.includes(SPECIAL_CHARACTERS, char)
    );

    if (nextPos >= 0) {
      const newCursorPos = cursorPos + nextPos + 1;

      this.input.setSelectionRange(newCursorPos, newCursorPos);
    }
  }

  public ngOnInit(): void {
    this._placeholder = this.buildPlaceholder();
    if (!this.input.value) {
      this.input.value = this._placeholder;
    }
  }

  public buildPlaceholder(): string {
    const chars = this.mask.split('');

    return chars.reduce((result, char) => {
      return (result += _.includes(SPECIAL_CHARACTERS, char) ? char : '_');
    }, '');
  }

  public onChange = (_: any) => {};
  public onTouch = () => {};

  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  public writeValue(obj: any): void {}

  private calculatePreviousCursorPos(cursorPos: number): number {
    const valueBeforeCursor = this.input.value.slice(0, cursorPos);

    return _.findLastIndex(
      valueBeforeCursor,
      (char) => !_.includes(SPECIAL_CHARACTERS, char)
    );
  }
}
