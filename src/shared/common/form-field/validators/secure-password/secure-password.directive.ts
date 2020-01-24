import { Directive, EventEmitter, forwardRef, Output } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator } from '@angular/forms';

const PASSWORD_VALIDATOR: any = {
  multi: true,
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => SecurePasswordDirective)
};

const strongRegex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})');
const mediumRegex = new RegExp('^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})');

@Directive({
  providers: [PASSWORD_VALIDATOR],
  selector: '[secure]'
})
export class SecurePasswordDirective implements Validator {

  @Output('secure') public output: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  public validate(control: AbstractControl): { [key: string]: any } {
    return this.checkSecure(control.value);
  }

  /**
   * validates password length, strength and invalid characters
   * @method validatePassword
   * @return { [key: string]: any }
   */
  public checkSecure(value: string): { [key: string]: any } {
    if (value && value.length < 4) {
      this.output.emit('danger');
      return { length: true };
    } else {
      if (value) {
        if (strongRegex.test(value)) {
          this.output.emit('success');
        } else if (mediumRegex.test(value)) {
          this.output.emit('warning');
        } else {
          this.output.emit('danger');
          return { secure: true };
        }
      }
      if (/\s/.test(value)) {
        return { invalid: true };
      }
    }
  }

}
