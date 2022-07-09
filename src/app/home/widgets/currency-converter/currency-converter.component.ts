import { AppService } from 'src/app/app.service';
import { WidgetsService } from './../widgets.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Currency, CurrencyRate, RateData } from '../widgets.beans';
import { SubSink } from 'subsink';

@Component({
  selector: 'ren-currency-converter',
  templateUrl: './currency-converter.component.html',
  styleUrls: ['./currency-converter.component.scss'],
})
export class CurrencyConverterComponent implements OnDestroy {

  toCurrency: string;
  fromCurrency: string;
  amount1: number;
  amount2: number;
  currencyOpts: Currency[];
  rateData: RateData;

  private subs: SubSink;

  constructor(private widgetsService: WidgetsService, private appService: AppService) {
    this.currencyOpts = this.widgetsService.getCurrencies();
    this.fromCurrency = this.toCurrency = this.currencyOpts[0].value;
  }

  convertCurrency() {
    this.appService.presentLoadingModal();
    this.subs.sink = this.widgetsService.convertCurrency(this.fromCurrency, this.toCurrency, this.amount1)
      .subscribe((currencyData: CurrencyRate) => {
        this.rateData = currencyData.rates[this.toCurrency];
        this.amount2 = +currencyData.rates[this.toCurrency].rate_for_amount;
        this.appService.dismissLoadingModal();
      });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
