import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { currencyApiKey } from 'src/app/config/api.config';
import { JokeSettings } from './../../settings/settings.beans';
import { Currency, CurrencyRate, Joke } from './widgets.beans';

@Injectable({
  providedIn: 'root'
})
export class WidgetsService {

  constructor(private http: HttpClient) { }

  getJoke(settings: JokeSettings): Observable<Joke> {
    const categories = settings.categories.replace('AnyJoke', 'Any');
    let blacklist = '';
    if (settings.blacklist != null) {
      blacklist = `?blacklistFlags=${settings.blacklist}`;
    }
    const url = `https://v2.jokeapi.dev/joke/${categories}${blacklist}`;
    return this.http.get<Joke>(url);
  }

  convertCurrency(from: string, to: string, amount: number): Observable<CurrencyRate> {
    const url = `https://api.getgeoapi.com/v2/currency/convert?api_key=${currencyApiKey}&from=${from}&to=${to}&amount=${amount}`;
    return this.http.get<CurrencyRate>(url);
  }

  getCurrencies(): Currency[] {
    return [{
      label: 'United States dollar',
      value: 'USD'
    }, {
      label: 'Mexican peso',
      value: 'MXN'
    }, {
      label: 'Euro',
      value: 'EUR'
    }, {
      label: 'Pound sterling',
      value: 'GBP'
    }, {
      label: 'Canadian dollar',
      value: 'CAD'
    }, {
      label: 'Russian ruble',
      value: 'RUB'
    }, {
      label: 'Japanese yen',
      value: 'JPY'
    }, {
      label: 'Swedish krona',
      value: 'SEK'
    }, {
      label: 'Indian rupee',
      value: 'INR'
    }];
  }
}
