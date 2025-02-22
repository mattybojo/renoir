import { DecimalPipe } from '@angular/common';
import { Component, effect, inject } from '@angular/core';
import { FontAwesomeModule, IconDefinition } from '@fortawesome/angular-fontawesome';
import { faCloudBolt, faCloudRain, faCloudShowersHeavy, faCloudSun, faCloudSunRain, faSmog, faSnowflake, faSun, faTemperatureFull } from '@fortawesome/free-solid-svg-icons';
import { ModalController } from '@ionic/angular/standalone';
import { WeatherService } from '../weather.service';
import { WeatherPage } from '../weather/weather.page';
import { translateWeatherCode } from '../weather.helpers';

@Component({
  selector: 'ren-weather-header',
  templateUrl: './weather-header.component.html',
  styleUrls: ['./weather-header.component.scss'],
  standalone: true,
  imports: [DecimalPipe, FontAwesomeModule]
})
export class WeatherHeaderComponent {

  weatherIcon: IconDefinition | undefined;
  weatherDesc: string = '';

  // DI
  private modalCtrl = inject(ModalController);
  protected weatherService = inject(WeatherService);

  constructor() {
    effect(() => {
      if (this.weatherService.weatherData()) {
        [this.weatherIcon, this.weatherDesc] = translateWeatherCode(this.weatherService.weatherData()?.current.weatherCode);
      }
    });
  }

  async openWeatherModal(): Promise<void> {
    const modal = await this.modalCtrl.create({
      component: WeatherPage,
    });
    modal.present();
  }
}
