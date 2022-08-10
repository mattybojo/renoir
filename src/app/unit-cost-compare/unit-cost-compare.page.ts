import { Component } from '@angular/core';
import { HeaderAction } from '../header/header.beans';

@Component({
  selector: 'ren-unit-cost-compare',
  templateUrl: './unit-cost-compare.page.html',
  styleUrls: ['./unit-cost-compare.page.scss'],
})
export class UnitCostComparePage {

  headerActions: HeaderAction[];

  costItem1: number;
  qtyItem1: number;
  costItem2: number;
  qtyItem2: number;
  priceItem1 = 0;
  priceItem2 = 0;
  priceClass1 = '';
  priceClass2 = '';

  constructor() {
    this.headerActions = [{
      type: 'reset',
      slot: 'start',
      icon: 'refresh-outline'
    }];
  }

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

  actionHandler(actionType: string) {
    switch (actionType) {
      case 'reset':
        this.reset();
        break;
      default:
        console.error(`Unknown action type: ${actionType}`);
    }
  }

  reset(): void {
    this.costItem1 = undefined;
    this.qtyItem1 = undefined;
    this.costItem2 = undefined;
    this.qtyItem2 = undefined;
    this.priceItem1 = 0;
    this.priceItem2 = 0;
    this.priceClass1 = '';
    this.priceClass2 = '';
  }
}
