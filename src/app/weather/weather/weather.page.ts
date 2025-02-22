import { CommonModule } from '@angular/common';
import { Component, effect, inject, Input, OnInit, Renderer2 } from '@angular/core';
import { FontAwesomeModule, IconDefinition } from '@fortawesome/angular-fontawesome';
import { faDroplet, faWind } from '@fortawesome/free-solid-svg-icons';
import { IonCol, IonContent, IonGrid, IonItem, IonLabel, IonRow, ModalController } from '@ionic/angular/standalone';
import { ModalHeaderComponent } from '../../shared/components/modal-header/modal-header.component';
import { WeatherForecastDayComponent } from '../shared/weather-forecast-day/weather-forecast-day.component';
import { WeatherForecast } from '../weather.beans';
import { calculateWindDirection, translateWeatherCode } from '../weather.helpers';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.page.html',
  styleUrls: ['./weather.page.scss'],
  standalone: true,
  imports: [IonLabel, IonItem, IonCol, IonRow, IonGrid, IonContent, CommonModule, FontAwesomeModule, ModalHeaderComponent, WeatherForecastDayComponent]
})
export class WeatherPage implements OnInit {

  @Input() weatherDesc: string = '';
  @Input() weatherIcon!: IconDefinition;

  forecastDivWidth: number = 0;

  windDir: string = '';

  weatherForecast: WeatherForecast[] = [];

  // Icons
  faWind = faWind;
  faDroplet = faDroplet;

  // DI
  protected weatherService = inject(WeatherService);
  private modalCtrl = inject(ModalController);
  private renderer = inject(Renderer2);

  constructor() {
    effect(() => {
      if (this.weatherService.weatherData()) {
        [this.weatherIcon, this.weatherDesc] = translateWeatherCode(this.weatherService.weatherData()?.current.weatherCode);
        if (this.weatherService.weatherData()?.daily.time) {
          const forecastDay = this.weatherService.weatherData()?.daily;
          for (let i = 0; i < this.weatherService.weatherData()!.daily.time.length; i++) {
            this.weatherForecast.push({
              time: forecastDay?.time[i],
              weatherCode: forecastDay?.weatherCode[i],
              tempMin: forecastDay?.temperature2mMin[i],
              tempMax: forecastDay?.temperature2mMax[i],
              sunrise: forecastDay?.sunrise ? forecastDay?.sunrise[i] : undefined,
              sunset: forecastDay?.sunset ? forecastDay?.sunset[i] : undefined,
              rain: forecastDay?.rainSum[i],
              windSpeed: forecastDay?.windSpeed10mMax[i],
              windDirection: forecastDay?.windDirection10mDominant[i]
            });
          }
        }
      }
    });
  }

  ngOnInit() {
    if (this.weatherService.weatherData()?.current.windDirection10m) {
      this.windDir = calculateWindDirection(this.weatherService.weatherData()?.current.windDirection10m!);
    }
  }

  closeModal(): void {
    this.modalCtrl.dismiss();
  }
}
