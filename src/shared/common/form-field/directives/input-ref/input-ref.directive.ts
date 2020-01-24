import { Directive, ElementRef, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[inputRef]'
})
export class InputRefDirective {

  public focus: boolean = false;

  public element: HTMLInputElement;
  public control: NgControl;

  constructor(
    private _el: ElementRef,
    private _control: NgControl
  ) {
    this.element = this._el.nativeElement;
    this.control = this._control;
  }

  @HostListener('focus')
  public onFocus(): void {
    this.focus = true;
  }

  @HostListener('blur')
  public onBlur(): void {
    this.focus = false;
  }

}
