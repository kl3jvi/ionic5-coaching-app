import { CurrencyPipe, DatePipe, DecimalPipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { CustomCurrencyPipe } from '../currency/custom-currency.pipe';
@Pipe({
  name: 'format'
})
export class FormatPipe implements PipeTransform {

  // public currencyPipe: CurrencyPipe = new CustomCurrencyPipe(CurrencyPipe);
  public datePipe: DatePipe = new DatePipe('en-US');
  public decimalPipe: DecimalPipe = new DecimalPipe('en-US');

  constructor(
    private sanitize: DomSanitizer,
    private currencyPipe: CustomCurrencyPipe
  ) { }

  public transform(input: string | any, args: any): any {
    let format = '';
    let parsedFloat = 0;
    const pipeArgs = args.split(':');
    for (let i = 0; i < pipeArgs.length; i++) {
      pipeArgs[i] = pipeArgs[i].trim(' ');
    }

    switch (pipeArgs[0].toLowerCase()) {
      case 'text':
        return input;
      case 'badge':
        format = pipeArgs.length > 1 ? pipeArgs[1] : null;
        return `<div class="badge badge-${format}">${input}</div>`;
      case 'decimal':
      case 'number':
        parsedFloat = !isNaN(parseFloat(input)) ? parseFloat(input) : 0;
        format = pipeArgs.length > 1 ? pipeArgs[1] : null;
        return this.decimalPipe.transform(parsedFloat, format);
      case 'percentage':
        parsedFloat = !isNaN(parseFloat(input)) ? parseFloat(input) : 0;
        format = pipeArgs.length > 1 ? pipeArgs[1] : null;
        return this.decimalPipe.transform(parsedFloat, format) + '%';
      case 'currency':
        parsedFloat = !isNaN(parseFloat(input)) ? parseFloat(input) : 0;
        format = pipeArgs.length > 1 ? pipeArgs[1] : null;
        return this.currencyPipe.transform(parsedFloat, format);
      case 'json':
        return JSON.stringify(input, null, 2)
          .replace(' ', '&nbsp;')
          .replace('\n', '<br/>');
      case 'date':
        format = 'longDate';
        if (pipeArgs.length > 1) {
          format = '';
          for (let i = 1; i < pipeArgs.length; i++) {
            format += pipeArgs[i];
          }
        }
        if (input && input.trim === '') {
          return input;
        } else {
          return this.datePipe.transform(input, format);
        }
      case 'bool':
        return this.humanizeBool(input);
      case 'status':
        return this.humanizeStatus(input);
      default:
        return input;
    }
  }

  public humanizeBool(input): string {
    switch (input) {
      case true:
        return 'Yes';
      case false:
        return 'No';
      default:
        break;
    }
  }

  public humanizeStatus(input): string {
    switch (input) {
      case true:
        return '<img src="/assets/images/smile.png" width="40px">';
      case false:
        return '<img src="/assets/images/frown.png" width="40px">';
      default:
        break;
    }
  }

}
