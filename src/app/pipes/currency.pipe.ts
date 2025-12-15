import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currency',
  standalone: true
})
export class CurrencyPipe implements PipeTransform {

  transform(value: number, currencyCode: string = 'USD', display: 'symbol' | 'code' | 'name' = 'symbol', digitsInfo: string = '1.0-2', locale: string = 'en-US'): string {
    if (isNaN(value)) {
      return '';
    }
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currencyCode,
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    }).format(value);
  
  
  }
  }
