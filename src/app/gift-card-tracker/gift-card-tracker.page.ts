import { Component, OnDestroy } from '@angular/core';
import { IonItemSliding, ModalOptions, ViewWillEnter } from '@ionic/angular';
import { SubSink } from 'subsink';
import { AppService } from '../app.service';
import { HeaderAction } from '../header/header.beans';
import { GiftCardFormComponent } from './gift-card-form/gift-card-form.component';
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
    }];
  }

  ionViewWillEnter(): void {
    this.loadGiftCardData();
  }

  loadGiftCardData(): void {
    this.subs.sink = this.giftCardTrackerService.getGiftCards().subscribe((list: GiftCard[]) => {
      this.giftCardList = list;
    });
  }

  actionHandler(actionType: string) {
    switch (actionType) {
      case 'add':
        this.presentModal();
        break;
      default:
        console.error(`Unknown action type: ${actionType}`);
    }
  }

  async presentModal(giftCard?: GiftCard) {
    const modalOpts: ModalOptions = {
      component: GiftCardFormComponent,
      componentProps: {
        giftCard
      },
      presentingElement: await this.appService.getModalPresentingElement(),
      canDismiss: true
    };

    this.appService.presentModal(modalOpts);
  }

  updateItem(giftCard: GiftCard, slidingItem: IonItemSliding) {
    this.presentModal(giftCard);
    slidingItem.close();
  }

  deleteItem(giftCard: GiftCard) {
    this.subs.sink = this.giftCardTrackerService.deleteGiftCard(giftCard).subscribe(() => {
      this.appService.presentToast({
        color: 'success', message: 'Gift card deleted successfully!', duration: 1000
      });
    }, () => {
      this.appService.presentToast({
        color: 'danger', message: 'Error deleting gift crad!', duration: 1000
      });
    });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
