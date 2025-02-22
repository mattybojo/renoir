import { DatePipe, DecimalPipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FontAwesomeModule, IconDefinition } from '@fortawesome/angular-fontawesome';
import { faDroplet, faTemperatureQuarter, faTemperatureThreeQuarters, faWind } from '@fortawesome/free-solid-svg-icons';
import { isSameDay } from 'date-fns';
import { WeatherForecast } from '../../weather.beans';
import { calculateWindDirection, translateWeatherCode } from '../../weather.helpers';

@Component({
  selector: 'ren-weather-forecast-day',
  templateUrl: './weather-forecast-day.component.html',
  styleUrls: ['./weather-forecast-day.component.scss'],
  standalone: true,
  imports: [DatePipe, DecimalPipe, FontAwesomeModule]
})
export class WeatherForecastDayComponent implements OnInit {

  @Input() forecast!: WeatherForecast;

  weatherDesc: string = '';
  weatherIcon!: IconDefinition;

  borderColor: string = '';

  windDir: string = '';

  // Icons
  faTemperatureThreeQuarters = faTemperatureThreeQuarters;
  faTemperatureQuarter = faTemperatureQuarter;
  faWind = faWind;
  faDroplet = faDroplet;

  constructor() { }

  ngOnInit() {
    [this.weatherIcon, this.weatherDesc] = translateWeatherCode(this.forecast.weatherCode);
    this.borderColor = isSameDay(this.forecast.time!, new Date()) ? 'border-primary-default' : 'border-dark-default';
    this.windDir = calculateWindDirection(this.forecast.windDirection!);
  }
}
