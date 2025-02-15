import { Component, inject, Input, ViewChild } from '@angular/core';
import { IonButton, IonButtons, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonMenuButton, IonPopover, IonTitle, IonToolbar } from "@ionic/angular/standalone";
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'ren-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [IonLabel, IonItem, IonList, IonButton, IonHeader, IonToolbar, IonMenuButton, IonButtons, IonTitle, IonPopover, IonIcon]
})
export class HeaderComponent {

  @Input() title: string = '';
  @ViewChild('popover') popover!: HTMLIonPopoverElement;

  isOpen: boolean = false;

  // DI
  private authService = inject(AuthService);

  constructor() { }

  showPopover(e: Event): void {
    this.popover.event = e;
    this.isOpen = true;
  }

  signOut(): void {
    this.authService.signOut();
  }
}
