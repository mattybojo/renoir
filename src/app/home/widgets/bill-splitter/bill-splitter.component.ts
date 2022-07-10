import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ren-bill-splitter',
  templateUrl: './bill-splitter.component.html',
  styleUrls: ['./bill-splitter.component.scss'],
})
export class BillSplitterComponent implements OnInit {

  subtotal: number;
  tip = 15;
  tipType = '%';
  tipAmount: number;
  total: number;
  numPeople: number;
  costPerPerson: number;

  constructor() { }

  ngOnInit() { }

  onInputChange($event: any): void {
    if ($event) {
      this.tipType = $event.detail.value;
    }

    if (this.subtotal && this.tip) {
      if (this.tipType === '%') {
        this.tipAmount = this.subtotal * (this.tip / 100);
        this.total = this.tipAmount + this.subtotal;
      } else {
        this.tipAmount = 100 * (this.tip / this.subtotal);
        this.total = this.subtotal + this.tip;
      }
    }

    if (this.total && this.numPeople) {
      this.costPerPerson = this.total / this.numPeople;
    }
  }

  reset(): void {
    this.subtotal = this.total = this.numPeople = this.costPerPerson = undefined;
    this.tipType = '%';
    this.tip = 15;
  }
}
