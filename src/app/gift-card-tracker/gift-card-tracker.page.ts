import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ViewWillEnter } from '@ionic/angular';
import { SubSink } from 'subsink';
import { AppService } from '../app.service';
import { HeaderAction } from '../header/header.beans';
import { DataService } from './../shared/data.service';
import { GiftCard } from './gift-card-tracker.beans';
import { GiftCardTrackerService } from './gift-card-tracker.service';

@Component({
  selector: 'ren-gift-card-tracker',
  templateUrl: './gift-card-tracker.page.html',
  styleUrls: ['./gift-card-tracker.page.scss'],
})
export class GiftCardTrackerPage implements OnDestroy, ViewWillEnter {

  giftCardList: GiftCard[] = [];
  headerActions: HeaderAction[];

  private subs = new SubSink();

  constructor(private giftCardTrackerService: GiftCardTrackerService, private appService: AppService,
    private router: Router, private dataService: DataService) {
    this.headerActions = [{
      type: 'add',
      slot: 'start',
      icon: 'add'
    }, {
      type: 'showTotals',
      slot: 'start',
      icon: 'list',
      disabled: true
    }];
  }

  ionViewWillEnter(): void {
    this.loadGiftCardData();
  }

  setHeaderActions(): void {
    const currentActions = this.headerActions;
    if (currentActions?.length > 1) {
      currentActions[1].disabled = this.giftCardList.length === 0;
      this.headerActions = [...currentActions];
    }
  }

  loadGiftCardData(): void {
    this.appService.presentLoadingModal();
    this.subs.sink = this.giftCardTrackerService.getGiftCards().subscribe((list: GiftCard[]) => {
      this.giftCardList = list;
      this.setHeaderActions();
      this.appService.dismissLoadingModal();
    }, (err) => {
      this.appService.dismissLoadingModal();
      this.appService.presentToast({ color: 'danger', message: 'Unable to retrieve gift cards!', duration: 1000 });
    });
  }

  actionHandler(actionType: string): void {
    switch (actionType) {
      case 'add':
        this.dataService.setDataObs(undefined);
        this.router.navigate(['tabs/gift-card/edit']);
        break;
      case 'showTotals':
        this.dataService.setDataObs(this.giftCardList);
        this.router.navigate(['tabs/gift-card/totals']);
        break;
      default:
        console.error(`Unknown action type: ${actionType}`);
    }
  }

  updateItem(giftCard: GiftCard): void {
    this.dataService.setDataObs(giftCard);
    this.router.navigate(['tabs/gift-card/edit']);
  }

  deleteItem(giftCard: GiftCard): void {
    this.appService.presentLoadingModalDelete();
    this.subs.sink = this.giftCardTrackerService.deleteGiftCard(giftCard).subscribe(() => {
      this.appService.dismissLoadingModal();
      this.appService.presentToast({
        color: 'success', message: 'Gift card deleted successfully!', duration: 1000
      });
    }, (err) => {
      this.appService.dismissLoadingModal();
      this.appService.presentToast({
        color: 'danger', message: 'Error deleting gift card!', duration: 1000
      });
    });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
