import { Component, OnInit } from '@angular/core';
import { WeatherService } from './weather/weather.service';

@Component({
  selector: 'ren-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {

  constructor(private weatherService: WeatherService) { }

  ngOnInit(): void {
    this.weatherService.getWeatherData();
  }
}
