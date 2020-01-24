import { CurrencyPipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ccurrency',
})
export class CustomCurrencyPipe implements PipeTransform {

  constructor(
    private currency: CurrencyPipe
  ) { }

  public transform(value: any, args?: any): any {
    return this.currency.transform(value, args || 'GBP', 'symbol', '0.0-2');
  }

}
