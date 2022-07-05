import { WidgetsService } from './../widgets.service';
import { Component, OnInit } from '@angular/core';
import { Currency, CurrencyRate, RateData } from '../widgets.beans';

@Component({
  selector: 'ren-currency-converter',
  templateUrl: './currency-converter.component.html',
  styleUrls: ['./currency-converter.component.scss'],
})
export class CurrencyConverterComponent implements OnInit {

  toCurrency: string;
  fromCurrency: string;
  amount1: number;
  amount2: number;
  currencyOpts: Currency[];
  rateData: RateData;

  constructor(private widgetsService: WidgetsService) {
    this.currencyOpts = this.widgetsService.getCurrencies();
    this.fromCurrency = this.toCurrency = this.currencyOpts[0].value;
  }

  ngOnInit() { }

  convertCurrency() {
    this.widgetsService.convertCurrency(this.fromCurrency, this.toCurrency, this.amount1).subscribe((currencyData: CurrencyRate) => {
      this.rateData = currencyData.rates[this.toCurrency];
      this.amount2 = +currencyData.rates[this.toCurrency].rate_for_amount;
    });
  }
}
