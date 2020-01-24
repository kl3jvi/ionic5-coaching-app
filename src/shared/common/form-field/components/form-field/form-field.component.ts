import { AfterContentInit, Component, ContentChild, HostBinding, Input } from '@angular/core';
import { InputRefDirective } from '../../directives';

@Component({
  selector: 'form-field',
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.scss'],
})
export class FormFieldComponent implements AfterContentInit {
  @Input() public color: string = 'primary';
  @Input() public fill: boolean = false;
  @Input() public outline: boolean = false;
  @Input() public shape: boolean = true;
  @Input() public border: boolean = false;
  @Input() public prefix: boolean = false;
  @Input() public suffix: boolean = false;
  @Input() public label: string = '';
  @Input() public size: string = '';
  @Input() public expand: string = '';
  @ContentChild(InputRefDirective) public input: InputRefDirective;
  private readonly: boolean;

  @HostBinding('class.has-value')
  public get gethasValueState(): boolean {
    return this.input && this.input.element.value && this.input.element.value.trim() !== ''
      ? true
      : false;
  }

  @HostBinding('class.readonly')
  public get getReadOnlyState(): boolean {
    return this.input && this.readonly;
  }

  @HostBinding('class.is-dirty')
  public get getDirtyState(): boolean {
    return this.input ? this.input.control.dirty : false;
  }

  @HostBinding('class.is-pristine')
  public get getPristineState(): boolean {
    return this.input ? this.input.control.pristine : false;
  }

  @HostBinding('class.is-valid')
  public get getValidState(): boolean {
    return this.input ? this.input.control.valid : false;
  }

  @HostBinding('class.is-invalid')
  public get getInvalidState(): boolean {
    const state = this.input ? this.input.control.invalid : false;
    state && this.input.control.touched
      ? this.input.element.classList.add('is-invalid')
      : this.input.element.classList.remove('is-invalid');
    return state;
  }

  @HostBinding('class.is-touched')
  public get getTouchedState(): boolean {
    return this.input ? this.input.control.touched : false;
  }

  @HostBinding('class.has-focus')
  public get isInputFocus(): boolean {
    return this.input && !this.readonly ? this.input.focus : false;
  }

  @HostBinding('class.has-prefix')
  public get hasPrefix(): boolean {
    return this.prefix ? true : false;
  }

  @HostBinding('class.has-suffix')
  public get hasSuffix(): boolean {
    return this.suffix ? true : false;
  }

  public isRequired(): string {
    return this.input && this.input.element.required && this.label ? this.label + ' *' : this.label;
  }

  public ngAfterContentInit(): void {
    if (!this.input) {
      console.error('form field needs an input element');
      return;
    }
    // if (!this.label) {
    //   console.error('form field must have a label');
    // }
    this.label = this.isRequired();
    this.readonly = this.input.element.readOnly;
    this.input.element.id = this.input.element.name;
    this.input.element.classList.add('form-control');
    this.input.element.classList.add(`form-control-${this.size}`);
  }

  public focusInput(): void {
    this.input.element.focus();
  }
}
