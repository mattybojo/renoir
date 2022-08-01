import { Component, OnDestroy } from '@angular/core';
import { IonItemSliding, ModalOptions, ViewWillEnter } from '@ionic/angular';
import { SubSink } from 'subsink';
import { ComponentProps, ComponentRef } from '../app.beans';
import { AppService } from '../app.service';
import { HeaderAction } from '../header/header.beans';
import { GiftCardFormComponent } from './gift-card-form/gift-card-form.component';
import { GiftCardTotalsComponent } from './gift-card-totals/gift-card-totals.component';
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

  constructor(private giftCardTrackerService: GiftCardTrackerService, private appService: AppService) {
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
        this.presentModal(GiftCardFormComponent, {});
        break;
      case 'showTotals':
        this.presentModal(GiftCardTotalsComponent, { giftCardList: this.giftCardList });
        break;
      default:
        console.error(`Unknown action type: ${actionType}`);
    }
  }

  async presentModal(compRef: ComponentRef, giftCardProps: ComponentProps<ComponentRef>): Promise<void> {
    const modalOpts: ModalOptions = {
      component: compRef,
      componentProps: giftCardProps,
      presentingElement: await this.appService.getModalPresentingElement(),
      canDismiss: true
    };

    this.appService.presentModal(modalOpts);
  }

  updateItem(giftCard: GiftCard, slidingItem: IonItemSliding): void {
    this.presentModal(GiftCardFormComponent, { giftCard });
    slidingItem.close();
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
