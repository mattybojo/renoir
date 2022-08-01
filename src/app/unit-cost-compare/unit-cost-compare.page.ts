import { Component, Input } from '@angular/core';
import { Components } from '@ionic/core';

@Component({
  selector: 'ren-unit-cost-compare',
  templateUrl: './unit-cost-compare.page.html',
  styleUrls: ['./unit-cost-compare.page.scss'],
})
export class UnitCostComparePage {

  @Input() modal: Components.IonModal;

  costItem1: number;
  qtyItem1: number;
  costItem2: number;
  qtyItem2: number;
  priceItem1 = 0;
  priceItem2 = 0;
  priceClass1 = '';
  priceClass2 = '';

  constructor() { }

  onInputChange(): void {
    if (this.costItem1 && this.qtyItem1) {
      this.priceItem1 = this.costItem1 / this.qtyItem1;
    } else {
      this.priceItem1 = 0;
    }

    if (this.costItem2 && this.qtyItem2) {
      this.priceItem2 = this.costItem2 / this.qtyItem2;
    } else {
      this.priceItem2 = 0;
    }

    if (this.priceItem1 && this.priceItem2) {
      if (this.priceItem1 > this.priceItem2) {
        this.priceClass1 = 'costlier';
        this.priceClass2 = 'cheaper';
      } else if (this.priceItem1 < this.priceItem2) {
        this.priceClass1 = 'cheaper';
        this.priceClass2 = 'costlier';
      } else {
        this.priceClass1 = 'equal';
        this.priceClass2 = 'equal';
      }
    }
  }
}
