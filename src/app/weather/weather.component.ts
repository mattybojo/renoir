import { AppService } from 'src/app/app.service';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Components } from '@ionic/core';
import { SubSink } from 'subsink';
import { Weather } from './weather.beans';
import { WeatherService } from './weather.service';

@Component({
  selector: 'ren-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss'],
})
export class WeatherComponent implements OnInit, OnDestroy {

  @Input() modal: Components.IonModal;

  KM_TO_MI_CONVERSION = 1609;
  MMHG_TO_HPA_CONVERSION = 1.33322387415;
  DIRECTIONS: string[] = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW', 'N'];

  weather: Weather;
  weatherIconUrl: string;
  windDirection: string;
  visibility: number;
  mmHg: number;
  sunriseTime: Date;
  sunsetTime: Date;

  private subs = new SubSink();

  constructor(public weatherService: WeatherService, private appService: AppService) { }

  ngOnInit() {
    this.appService.presentLoadingModal();
    this.subs.sink = this.weatherService.getWeatherObs().subscribe((weather: Weather) => {
      this.weather = weather;
      this.weatherIconUrl = `http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`;
      this.calculateWindDirection();
      this.visibility = this.weather.visibility / this.KM_TO_MI_CONVERSION;
      this.mmHg = weather.main.pressure / this.MMHG_TO_HPA_CONVERSION;
      this.sunriseTime = new Date(weather.sys.sunrise * 1000);
      this.sunsetTime = new Date(weather.sys.sunset * 1000);
      this.appService.dismissLoadingModal();
    }, (err) => {
      this.appService.dismissLoadingModal();
      this.appService.presentToast({ color: 'danger', message: 'Error retrieving weather data.', duration: 1000 });
    });
  }

  calculateWindDirection(): void {
    const degrees = this.weather.wind.deg % 360;
    const index = Math.round(degrees / 22.5);
    this.windDirection = this.DIRECTIONS[index];
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
