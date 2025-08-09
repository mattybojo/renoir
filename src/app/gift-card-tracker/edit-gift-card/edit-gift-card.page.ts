import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonButton, IonContent, IonInput, IonItem, IonList, ModalController } from '@ionic/angular/standalone';
import { isEmpty } from 'lodash-es';
import { take } from 'rxjs';
import { ModalHeaderComponent } from "../../shared/components/modal-header/modal-header.component";
import { GiftCard } from '../gift-card-tracker.beans';
import { createGiftCard } from '../gift-card-tracker.helpers';
import { GiftCardTrackerService } from '../gift-card-tracker.service';
@Component({
  selector: 'app-edit-gift-card',
  templateUrl: './edit-gift-card.page.html',
  styleUrls: ['./edit-gift-card.page.scss'],
  standalone: true,
  imports: [IonButton, IonInput, IonItem, IonList, IonContent, CommonModule, FormsModule, ReactiveFormsModule, ModalHeaderComponent]
})
export class EditGiftCardPage implements OnInit {

  @Input() giftCard!: GiftCard;

  title!: string;
  form!: FormGroup;

  // DI
  private giftCardTrackerService = inject(GiftCardTrackerService);
  private modalCtrl = inject(ModalController);

  constructor() { }

  ngOnInit() {
    if (isEmpty(this.giftCard)) {
      this.giftCard = createGiftCard();
    }
    this.title = isEmpty(this.giftCard) ? 'Create gift card' : 'Edit gift card';

    this.createForm();
  }

  createForm(): void {
    this.form = new FormGroup({
      storeName: new FormControl(this.giftCard.storeName, [Validators.required]),
      amount: new FormControl(this.giftCard.amount, [Validators.required]),
      last4: new FormControl(this.giftCard.last4, [Validators.required]),
    });
  }

  saveItem(): void {
    const controls = this.form.controls;
    // Create updated gift card object
    const updatedGiftCard: GiftCard = { ...this.giftCard, storeName: controls['storeName'].getRawValue(), amount: controls['amount'].getRawValue(), last4: controls['last4'].getRawValue() };

    this.giftCardTrackerService.saveGiftCard(updatedGiftCard).pipe(take(1)).subscribe(() => {
      // Close the modal
      this.modalCtrl.dismiss(updatedGiftCard);
    });
  }

  closeModal(): void {
    this.modalCtrl.dismiss();
  }
}
