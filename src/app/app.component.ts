
import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCalculator, faClipboardList, faCreditCard, faPaw } from '@fortawesome/free-solid-svg-icons';
import { IonApp, IonContent, IonItem, IonLabel, IonList, IonListHeader, IonMenu, IonMenuToggle, IonNote, IonRouterLink, IonRouterOutlet, IonSplitPane } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { addOutline, chevronUpCircleOutline, closeOutline, logOutOutline, personCircleOutline } from 'ionicons/icons';
import { MenuItem } from './app.beans';
import { AuthService } from './auth/auth.service';
import { WeatherService } from './weather/weather.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [RouterLink, RouterLinkActive, IonApp, IonSplitPane, IonMenu, IonContent, IonList, IonListHeader, IonNote, IonMenuToggle, IonItem, IonLabel, IonRouterLink, IonRouterOutlet, FontAwesomeModule],
})
export class AppComponent {
  protected menuItems: MenuItem[] = [
    { title: 'Task List', url: '/tasks', icon: faClipboardList },
    { title: 'Unit Rate Calculator', url: '/unit-rate-calculator', icon: faCalculator },
    { title: 'Pet Food Prefs', url: '/pet-foods', icon: faPaw },
    { title: 'Gift Card Tracker', url: '/gift-cards', icon: faCreditCard },
  ];

  // DI
  protected authService = inject(AuthService);
  private weatherService = inject(WeatherService);

  constructor() {
    this.authService.initAuthListener();
    this.weatherService.getWeatherData();
    addIcons({ personCircleOutline, logOutOutline, closeOutline, chevronUpCircleOutline, addOutline });
  }
}
