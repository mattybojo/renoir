import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { weatherApiKey } from './../config/api.config';
import { Weather } from './weather.beans';
import { Geolocation } from '@capacitor/geolocation';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private weatherObs$ = new BehaviorSubject<Weather>(undefined);

  constructor(private http: HttpClient) { }

  async getWeatherData(): Promise<void> {
    const debugMode = false;
    if (debugMode) {
      this.setWeatherObs({
        coord: {
          lon: -121.3238,
          lat: 38.0563
        },
        weather: [
          {
            id: 800,
            main: 'Clear',
            description: 'clear sky',
            icon: '01d'
          }
        ],
        base: 'stations',
        main: {
          temp: 69.66,
          feels_like: 68.77,
          temp_min: 67.08,
          temp_max: 70.32,
          pressure: 1015,
          humidity: 52
        },
        visibility: 10000,
        wind: {
          speed: 8.05,
          deg: 300
        },
        clouds: {
          all: 0
        },
        dt: 1656873783,
        sys: {
          type: 1,
          id: 5789,
          country: 'US',
          sunrise: 1656852428,
          sunset: 1656905499
        },
        timezone: -25200,
        id: 5366524,
        name: 'Lincoln Village',
        cod: 200
      });
    } else {
      const coordinates = await Geolocation.getCurrentPosition();
      const lat = coordinates.coords.latitude;
      const lon = coordinates.coords.longitude;
      const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?units=imperial&lat=${lat}&lon=${lon}&appid=${weatherApiKey}`;
      this.http.get<Weather>(weatherUrl).subscribe(weatherData => this.setWeatherObs(weatherData));
    }
  };

  getWeatherObs(): Observable<Weather> {
    return this.weatherObs$.asObservable();
  }

  private setWeatherObs(weatherData: Weather): void {
    this.weatherObs$.next(weatherData);
  }
}
