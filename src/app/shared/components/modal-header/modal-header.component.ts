import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IonButton, IonButtons, IonHeader, IonIcon, IonTitle, IonToolbar } from "@ionic/angular/standalone";

@Component({
  selector: 'ren-modal-header',
  templateUrl: './modal-header.component.html',
  styleUrls: ['./modal-header.component.scss'],
  standalone: true,
  imports: [IonHeader, IonButton, IonHeader, IonToolbar, IonButtons, IonTitle, IonIcon]
})
export class ModalHeaderComponent {

  @Input() title: string = '';
  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();

  constructor() { }
}
