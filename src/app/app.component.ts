
import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faClipboardList } from '@fortawesome/free-solid-svg-icons';
import { IonApp, IonContent, IonItem, IonLabel, IonList, IonListHeader, IonMenu, IonMenuToggle, IonNote, IonRouterLink, IonRouterOutlet, IonSplitPane } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { closeOutline, logOutOutline, personCircleOutline } from 'ionicons/icons';
import { MenuItem } from './app.beans';
import { AuthService } from './auth/auth.service';

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
  ];

  // DI
  protected authService = inject(AuthService);

  constructor() {
    this.authService.initAuthListener();
    addIcons({ personCircleOutline, logOutOutline, closeOutline });
  }
}
