import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { lat, lon } from '../config/api.config';
import { weatherApiKey } from './../config/api.config';
import { Weather } from './weather.beans';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private weatherObs$ = new BehaviorSubject<Weather>(undefined);

  constructor(private http: HttpClient) { }

  getWeatherData(): void {
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?units=imperial&lat=${lat}&lon=${lon}&appid=${weatherApiKey}`;
    this.http.get<Weather>(weatherUrl).subscribe(weatherData => this.setWeatherObs(weatherData));
  };

  getWeatherObs(): Observable<Weather> {
    return this.weatherObs$.asObservable();
  }

  private setWeatherObs(weatherData: Weather): void {
    this.weatherObs$.next(weatherData);
  }
}
