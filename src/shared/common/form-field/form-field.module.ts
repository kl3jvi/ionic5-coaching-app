import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormFieldComponent } from './components/form-field/form-field.component';
import { FormsModule } from '@angular/forms';
import { SecurePasswordDirective, DateValidatorDirective, PhoneInputValidatorDirective, RestrictCharValidatorDirective, ComparePasswordDirective } from './validators';
import { ButtonStatusDirective, InputMaskDirective, InputRefDirective } from './directives';

@NgModule({
  declarations: [
    FormFieldComponent,
    InputRefDirective,
    ButtonStatusDirective,
    InputMaskDirective,
    SecurePasswordDirective,
    DateValidatorDirective,
    PhoneInputValidatorDirective,
    RestrictCharValidatorDirective,
    ComparePasswordDirective
  ],
  exports: [
    FormFieldComponent,
    InputRefDirective,
    ButtonStatusDirective,
    InputMaskDirective,
    FormsModule,
    SecurePasswordDirective,
    DateValidatorDirective,
    PhoneInputValidatorDirective,
    RestrictCharValidatorDirective,
    ComparePasswordDirective
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class FormFieldModule { }
