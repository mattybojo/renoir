import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { HeaderAction } from 'src/app/header/header.beans';
import { SubSink } from 'subsink';
import { DataService } from './../../shared/data.service';
import { TableColumn } from './../../shared/shared.beans';
import { GiftCard } from './../gift-card-tracker.beans';

@Component({
  selector: 'ren-gift-card-totals',
  templateUrl: './gift-card-totals.component.html',
  styleUrls: ['./gift-card-totals.component.scss'],
})
export class GiftCardTotalsComponent implements OnInit, OnDestroy {

  giftCardList: GiftCard[];
  headerActions: HeaderAction[];
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

  private subs = new SubSink();

  constructor(private appService: AppService, private dataService: DataService) {
    this.subs.sink = this.dataService.getDataObs().subscribe((data: any) => {
      this.giftCardList = data;
    });
    this.headerActions = [{
      type: 'back',
      slot: 'start',
      icon: 'arrow-back-outline'
    }];
  }

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

  actionHandler(actionType: string) {
    switch (actionType) {
      case 'back':
        this.appService.goBack();
        break;
      default:
        console.error(`Unknown action type: ${actionType}`);
    }
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

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
