import { Component, Input, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { IonButton, IonDatetime, IonButtons } from "@ionic/angular/standalone";
import { getLocalISOString } from '../../../app.helpers';

@Component({
  selector: 'ren-ion-datetime-buttons-today',
  templateUrl: './ion-datetime-buttons-today.component.html',
  styleUrls: ['./ion-datetime-buttons-today.component.scss'],
  imports: [IonButtons, IonButton],
  standalone: true,
})
export class IonDatetimeButtonsTodayComponent {

  @Input() thisDT!: IonDatetime;
  @ViewChild('template', { static: true }) template!: TemplateRef<IonDatetimeButtonsTodayComponent>;

  constructor(private viewContainerRef: ViewContainerRef) { }

  ngOnInit() {
    this.viewContainerRef.createEmbeddedView(this.template);
  }

  selectTodayDate(dt: IonDatetime): void {
    dt.reset(getLocalISOString()).then(() => {
      dt.confirm(true);
    });
  }
}
