import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { DocumentData, DocumentReference } from '@angular/fire/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Components } from '@ionic/core';
import { AppService } from 'src/app/app.service';
import { SubSink } from 'subsink';
import { GiftCard } from '../gift-card-tracker.beans';
import { GiftCardTrackerService } from '../gift-card-tracker.service';

@Component({
  selector: 'ren-gift-card-form',
  templateUrl: './gift-card-form.component.html',
  styleUrls: ['./gift-card-form.component.scss'],
})
export class GiftCardFormComponent implements OnInit, OnDestroy {
  @Input() giftCard: GiftCard;
  @Input() modal: Components.IonModal;

  title = 'Add New Gift Card';
  giftCardForm: FormGroup;

  private subs = new SubSink();

  constructor(private giftCardTrackerService: GiftCardTrackerService, private appService: AppService) { }

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
  }

  saveItem() {
    const formGiftCard: GiftCard = this.giftCardForm.value;
    if (this.title.includes('Add')) {
      this.subs.sink = this.giftCardTrackerService.addGiftCard(formGiftCard).subscribe((resp: DocumentReference<DocumentData>) => {
        this.appService.presentToast({
          color: 'success', message: 'Gift card saved successfully!', duration: 1000
        });
        this.modal.dismiss();
      }, () => {
        this.appService.presentToast({ color: 'danger', message: 'Error saving gift card!', duration: 1000 });
      });
    } else {
      this.subs.sink = this.giftCardTrackerService.updateGiftCard(formGiftCard).subscribe(() => {
        this.appService.presentToast({
          color: 'success', message: 'Gift card saved successfully!', duration: 1000
        });
        this.modal.dismiss();
      }, () => {
        this.appService.presentToast({ color: 'danger', message: 'Error saving gift card!', duration: 1000 });
      });
    }
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
