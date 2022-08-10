import { Component, OnDestroy, OnInit } from '@angular/core';
import { DocumentData, DocumentReference } from '@angular/fire/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AppService } from 'src/app/app.service';
import { HeaderAction } from 'src/app/header/header.beans';
import { SubSink } from 'subsink';
import { GiftCard } from '../gift-card-tracker.beans';
import { GiftCardTrackerService } from '../gift-card-tracker.service';
import { DataService } from './../../shared/data.service';

@Component({
  selector: 'ren-gift-card-form',
  templateUrl: './gift-card-form.component.html',
  styleUrls: ['./gift-card-form.component.scss'],
})
export class GiftCardFormComponent implements OnInit, OnDestroy {

  giftCard: GiftCard;
  headerActions: HeaderAction[];
  title = 'Add New Gift Card';
  giftCardForm: FormGroup;

  private subs = new SubSink();

  constructor(private giftCardTrackerService: GiftCardTrackerService, private appService: AppService,
    private dataService: DataService) {
    this.subs.sink = this.dataService.getDataObs().subscribe((data: any) => {
      this.giftCard = data;
    });
  }

  ngOnInit() {
    if (!!this.giftCard) {
      this.title = `Edit "${this.giftCard.storeName} (${this.giftCard.last4})"`;
    }

    this.giftCardForm = new FormGroup({
      id: new FormControl(this.giftCard?.id),
      storeName: new FormControl(this.giftCard?.storeName, [Validators.required]),
      amount: new FormControl(this.giftCard?.amount, [Validators.required]),
      last4: new FormControl(this.giftCard?.last4, [Validators.required, Validators.minLength(4), Validators.maxLength(4)])
    });

    this.headerActions = [{
      type: 'back',
      slot: 'start',
      icon: 'arrow-back-outline'
    }, {
      type: 'save',
      slot: 'start',
      icon: 'save',
      disabled: this.giftCardForm?.invalid
    }];

    this.subs.sink = this.giftCardForm.valueChanges.subscribe(() => {
      this.headerActions[1].disabled = this.giftCardForm.invalid;
    });
  }

  actionHandler(actionType: string) {
    switch (actionType) {
      case 'back':
        this.appService.goBack();
        break;
      case 'save':
        this.saveItem();
        break;
      default:
        console.error(`Unknown action type: ${actionType}`);
    }
  }

  saveItem() {
    const formGiftCard: GiftCard = this.processFormGiftCard(this.giftCardForm.value);
    this.appService.presentLoadingModalSave();
    if (this.title.includes('Add')) {
      this.subs.sink = this.giftCardTrackerService.addGiftCard(formGiftCard).subscribe((resp: DocumentReference<DocumentData>) => {
        this.appService.dismissLoadingModal();
        this.appService.presentToast({
          color: 'success', message: 'Gift card saved successfully!', duration: 1000
        });
        this.appService.goBack();
      }, (err) => {
        this.appService.dismissLoadingModal();
        this.appService.presentToast({ color: 'danger', message: 'Error saving gift card!', duration: 1000 });
      });
    } else {
      this.subs.sink = this.giftCardTrackerService.updateGiftCard(formGiftCard).subscribe(() => {
        this.appService.dismissLoadingModal();
        this.appService.presentToast({
          color: 'success', message: 'Gift card saved successfully!', duration: 1000
        });
        this.appService.goBack();
      }, (err) => {
        this.appService.dismissLoadingModal();
        this.appService.presentToast({ color: 'danger', message: 'Error saving gift card!', duration: 1000 });
      });
    }
  }

  processFormGiftCard(formGiftCard: GiftCard): GiftCard {
    formGiftCard.amount = +formGiftCard.amount;
    formGiftCard.last4 = +formGiftCard.last4;
    return formGiftCard;
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
