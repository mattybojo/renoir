import { TableColumn } from './../../shared/shared.beans';
import { Component, Input, OnInit } from '@angular/core';
import { Components } from '@ionic/core';
import { GiftCard } from './../gift-card-tracker.beans';

@Component({
  selector: 'ren-gift-card-totals',
  templateUrl: './gift-card-totals.component.html',
  styleUrls: ['./gift-card-totals.component.scss'],
})
export class GiftCardTotalsComponent implements OnInit {

  @Input() giftCardList: GiftCard[];
  @Input() modal: Components.IonModal;

  giftCardTotals: GiftCard[] = [];
  sortOrder = 'desc';
  sortParam = 'amount';
  tableColumns: TableColumn[] = [{
    label: 'Store',
    param: 'storeName'
  }, {
    label: 'Amount',
    param: 'amount'
  }];

  constructor() { }

  ngOnInit() {
    this.giftCardList.forEach((giftCard: GiftCard) => {
      const storeIndex = this.giftCardTotals.findIndex(item => item.storeName === giftCard.storeName);
      if (storeIndex === -1) {
        // Store not found, add entry
        this.giftCardTotals.push(Object.assign({}, giftCard));
      } else {
        // Store found, add values
        this.giftCardTotals[storeIndex].amount += giftCard.amount;
      }
    });
    this.sortTable(this.sortParam);
  }

  onHeaderClick(sortProp: string): void {
    // If the props match, switch the sort order
    if (this.sortParam === sortProp) {
      this.sortOrder = (this.sortOrder === 'asc') ? 'desc' : 'asc';
    } else {
      this.sortParam = sortProp;
    }

    this.sortTable(sortProp);
  }

  sortTable(sortProp: string): void {
    this.giftCardTotals.sort((a: GiftCard, b: GiftCard) => {
      if (a[sortProp] < b[sortProp]) {
        return (this.sortOrder === 'asc') ? -1 : 1;
      } else if (a[sortProp] > b[sortProp]) {
        return (this.sortOrder === 'asc') ? 1 : -1;
      } else {
        // a[sortProp] == b[sortProp]
        return 0;
      }
    });
  }
}
