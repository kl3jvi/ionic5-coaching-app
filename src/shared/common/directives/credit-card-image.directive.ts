import {
  Directive,
  ElementRef,
  EventEmitter,
  forwardRef,
  HostListener,
  Output,
} from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator } from '@angular/forms';
import { CreditCard, CreditCardValidator } from 'angular-cc-library';

const CREDIT_CARD_VALIDATOR: any = {
  multi: true,
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => CreditCardImageDirective),
};

@Directive({
  providers: [CREDIT_CARD_VALIDATOR],
  selector: '[cc-image]',
})
export class CreditCardImageDirective {
  public target: any;
  @Output('cc-image') public output: EventEmitter<any> = new EventEmitter<any>();

  constructor(el: ElementRef) {
    this.target = el.nativeElement;
    this.output.emit(null);
  }

  @HostListener('keypress', ['$event'])
  public onKeypress(e) {
    if (!CreditCard.restrictNumeric(e)) {
      e.preventDefault();
      return false;
    }
  }

  @HostListener('input', ['$event.target.value'])
  public onInput(e) {
    const cardType = CreditCard.cardType(this.target.value) || null;
    this.output.emit(cardType);
  }
}
