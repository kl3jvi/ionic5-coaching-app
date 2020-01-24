import { Directive, forwardRef, Input } from '@angular/core';
import { AbstractControl, FormControl, NG_VALIDATORS, Validator } from '@angular/forms';

const COMPARE_TO_VALIDATOR: any = {
  multi: true,
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => ComparePasswordDirective)
};

@Directive({
  providers: [COMPARE_TO_VALIDATOR],
  selector: '[compare-password]'
})
export class ComparePasswordDirective implements Validator {

  @Input('compare-password') public comparedControl: FormControl;

  public validate(control: AbstractControl): { [key: string]: any } {
    return control.value === this.comparedControl.value ? null : { compareTo: true };
  }

}
