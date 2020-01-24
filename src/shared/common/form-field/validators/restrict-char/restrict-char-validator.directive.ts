import { Directive, forwardRef, HostListener, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator } from '@angular/forms';
import { maskDigitValidators, neverValidator } from '../../directives/input-mask/helpers/digit-validators';

const numRegex = /\d/;
const textRegex = /^[a-zA-Z ]*$/;

const CHAR_VALIDATOR: any = {
  multi: true,
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => RestrictCharValidatorDirective)
};

@Directive({
  providers: [CHAR_VALIDATOR],
  selector: '[restrict][ngModel]'
})
export class RestrictCharValidatorDirective implements Validator {

  @Input() private restrict: string;

  public validate(control: AbstractControl): { [key: string]: any } {
    let returnVal;
    if (this.restrict === 'text') {
      returnVal = numRegex.test(control.value) ? { textOnly: true } : null;
    } else {
      returnVal = textRegex.test(control.value) ? { numberOnly: true } : null;
    }
    return returnVal;
  }

  /**
   * on keypress validate input is numeric, is a card number and format card number
   * @method onKeypress
   * @return {void}
   */
  @HostListener('keypress', ['$event', '$event.keyCode'])
  public onKeypress(event, keyCode: number) {
    const key = String.fromCharCode(keyCode);
    const digitValidator = maskDigitValidators['T'] || neverValidator;

    if (this.restrict === 'number') {
      if (digitValidator(key)) {
        event.preventDefault();
      }
    } else if (this.restrict === 'text') {
      if (!digitValidator(key)) {
        event.preventDefault();
      }
    }
  }

}
