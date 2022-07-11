import { Component, Input, OnInit } from '@angular/core';
import { ModalOptions } from '@ionic/angular';
import { Components } from '@ionic/core';
import { AppService } from 'src/app/app.service';
import { AuthPage } from '../auth/auth.page';
import { JokeSettingsComponent } from './joke-settings/joke-settings.component';

@Component({
  selector: 'ren-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  @Input() modal: Components.IonModal;
  title = 'Settings';

  constructor(private appService: AppService) { }

  ngOnInit() {
  }

  async openModal(type: string): Promise<void> {
    let modalOpts: ModalOptions;
    const presentingElement = await this.appService.getModalPresentingElement();
    switch (type) {
      case 'joke':
        modalOpts = {
          component: JokeSettingsComponent,
          presentingElement,
          canDismiss: true
        };
        break;
      case 'auth':
        modalOpts = {
          component: AuthPage,
          presentingElement,
          canDismiss: true
        };
        break;
      default:
        console.error(`Invalid modal type: ${type}`);
    }

    this.appService.presentModal(modalOpts);
  }
}
