import { CommonModule } from '@angular/common';
import { Component, effect, model, signal } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonCol, IonContent, IonGrid, IonHeader, IonInput, IonItem, IonLabel, IonList, IonRow, IonSegment, IonSegmentButton, IonTitle, IonToolbar, IonButton } from '@ionic/angular/standalone';
import { HeaderComponent } from '../../shared/components/header/header.component';

@Component({
  selector: 'app-unit-rate-calculator',
  templateUrl: './unit-rate-calculator.page.html',
  styleUrls: ['./unit-rate-calculator.page.scss'],
  standalone: true,
  imports: [IonButton, IonList, IonItem, IonInput, IonLabel, IonSegmentButton, IonSegment, IonCol, IonRow, IonGrid, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, ReactiveFormsModule, HeaderComponent]
})
export class UnitRateCalculatorPage {

  unitPriceA = model<number | undefined>(undefined);
  unitQtyA = model<number | undefined>(undefined);
  unitRateA = model<number | undefined>(undefined);
  unitPriceB = model<number | undefined>(undefined);
  unitQtyB = model<number | undefined>(undefined);
  unitRateB = model<number | undefined>(undefined);
  itemBorderA = signal<string>('border-dark-default');
  itemBackgroundA = signal<string>('');
  itemBorderB = signal<string>('border-dark-default');
  itemBackgroundB = signal<string>('');

  constructor() {
    effect(() => {
      if (this.unitPriceA() != undefined && this.unitQtyA() != undefined) {
        this.unitRateA.set(this.unitPriceA()! / this.unitQtyA()!);
      } else {
        this.unitRateA.set(undefined);
      }
    });

    effect(() => {
      if (this.unitPriceB() != undefined && this.unitQtyB() != undefined) {
        this.unitRateB.set(this.unitPriceB()! / this.unitQtyB()!);
      } else {
        this.unitRateB.set(undefined);
      }
    });

    effect(() => {
      if (this.unitRateA() != undefined && this.unitRateB() != undefined) {
        if (this.unitRateA()! < this.unitRateB()!) {
          this.itemBorderA.set('border-success-shade');
          this.itemBackgroundA.set('bg-success');
          this.itemBorderB.set('border-dark-default');
          this.itemBackgroundB.set('');
        } else if (this.unitRateA()! > this.unitRateB()!) {
          this.itemBorderA.set('border-dark-default');
          this.itemBackgroundA.set('');
          this.itemBorderB.set('border-success-shade');
          this.itemBackgroundB.set('bg-success');
        } else if (this.unitRateA()! == this.unitRateB()!) {
          this.itemBorderA.set('border-success-shade');
          this.itemBackgroundA.set('bg-success');
          this.itemBorderB.set('border-success-shade');
          this.itemBackgroundB.set('bg-success');
        }
      } else {
        this.itemBorderA.set('border-dark-default');
        this.itemBackgroundA.set('');
        this.itemBorderB.set('border-dark-default');
        this.itemBackgroundB.set('');
      }
    });
  }

  resetValues(): void {
    this.unitPriceA.set(undefined);
    this.unitQtyA.set(undefined);
    this.unitRateA.set(undefined);
    this.unitPriceB.set(undefined);
    this.unitQtyB.set(undefined);
    this.unitRateB.set(undefined);
    this.itemBorderA.set('border-dark-default');
    this.itemBackgroundA.set('');
    this.itemBorderB.set('border-dark-default');
    this.itemBackgroundB.set('');
  }
}
