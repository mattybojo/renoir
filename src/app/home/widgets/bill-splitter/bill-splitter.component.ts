import { formatNumber } from '@angular/common';
import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';

@Component({
  selector: 'ren-bill-splitter',
  templateUrl: './bill-splitter.component.html',
  styleUrls: ['./bill-splitter.component.scss'],
})
export class BillSplitterComponent implements OnInit {

  subtotal: number;
  tax: number;
  tip = 15;
  tipType = '%';
  tipAmount: number;
  total: number;
  numPeople: number;
  costPerPerson: number;

  constructor(@Inject(LOCALE_ID) private locale: string) { }

  ngOnInit() { }

  onInputChange($event: any): void {
    if ($event) {
      this.tipType = $event.detail.value;
    }

    if (!!this.subtotal) {
      if (!!this.tip) {
        if (this.tipType === '%') {
          this.tipAmount = this.subtotal * (this.tip / 100);
          this.total = this.tipAmount + this.subtotal;
        } else {
          this.tipAmount = 100 * (this.tip / this.subtotal);
          this.total = this.subtotal + this.tip;
        }
      }
      if (!!this.tax) {
        if (!!this.tip) {
          this.total += this.tax;
        } else {
          this.total = this.subtotal + this.tax;
        }
      }
    }

    if (this.total && this.numPeople) {
      this.costPerPerson = this.total / this.numPeople;
    }
  }

  roundupTotal(): void {
    this.total = Math.ceil(this.total);
    this.tipAmount = this.total - this.subtotal - this.tax;
    this.tip = +formatNumber(this.tipAmount / this.subtotal * 100, this.locale, '1.2-2');
  }

  reset(): void {
    this.subtotal = this.total = this.numPeople = this.costPerPerson = undefined;
    this.tipType = '%';
    this.tip = 15;
  }
}
