import { SettingsPage } from './../settings/settings.page';
import { WeatherComponent } from '../weather/weather.component';
import { AfterContentInit, Component, EventEmitter, Input, OnInit, Output, OnDestroy, ComponentRef } from '@angular/core';
import { Router } from '@angular/router';
import { WeatherService } from '../weather/weather.service';
import { HeaderAction } from './header.beans';
import { SubSink } from 'subsink';
import { Weather } from '../weather/weather.beans';
import { AppService } from '../app.service';
import { ModalOptions } from '@ionic/angular';

@Component({
  selector: 'ren-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, AfterContentInit, OnDestroy {

  @Input() actions: HeaderAction[];
  @Output() actionType: EventEmitter<string> = new EventEmitter<string>();
  startActions: HeaderAction[] = [];
  endActions: HeaderAction[] = [];
  weather: Weather;
  weatherIconUrl: string;

  private subs = new SubSink();

  constructor(protected router: Router, protected weatherService: WeatherService,
    private appService: AppService) { }

  ngOnInit(): void {
    this.subs.sink = this.weatherService.getWeatherObs().subscribe((weather: Weather) => {
      if (!!weather) {
        this.weather = weather;
        this.weatherIconUrl = `http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`;
      }
    }, (err) => {
      this.appService.dismissLoadingModal();
      this.appService.presentToast({ color: 'danger', message: 'Error retrieving weather data.', duration: 1000 });
    });
  }

  ngAfterContentInit() {
    if (!!this.actions) {
      this.actions.forEach((action: HeaderAction) => {
        if (action.slot === 'start') {
          this.startActions.push(action);
        } else {
          this.endActions.push(action);
        }
      });
    }
  }

  async openModal(type: string): Promise<void> {
    let modalOpts: ModalOptions;
    const presentingElement = await this.appService.getModalPresentingElement();
    switch (type) {
      case 'settings':
        modalOpts = {
          component: SettingsPage,
          presentingElement,
          canDismiss: true
        };
        break;
      case 'weather':
        modalOpts = {
          component: WeatherComponent,
          presentingElement,
          canDismiss: true
        };
        break;
      default:
        console.error(`Invalid modal type: ${type}`);
    }

    this.appService.presentModal(modalOpts);
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
