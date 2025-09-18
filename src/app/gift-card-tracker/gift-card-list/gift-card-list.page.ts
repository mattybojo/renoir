import { CommonModule } from '@angular/common';
import { Component, effect, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faFilter, faPenToSquare, faThumbsUp, faTrash, faXmark } from '@fortawesome/free-solid-svg-icons';
import { AlertController, IonContent, IonFab, IonFabButton, IonFabList, IonIcon, IonInput, IonItem, IonItemDivider, IonItemGroup, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonList, ModalController } from '@ionic/angular/standalone';
import { AlertButton } from '@ionic/core';
import { orderBy } from 'lodash-es';
import { take } from 'rxjs';
import { SubSink } from 'subsink';
import { SortOrderOption } from '../../app.beans';
import { AuthService } from '../../auth/auth.service';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { EditGiftCardPage } from '../edit-gift-card/edit-gift-card.page';
import { GiftCard } from '../gift-card-tracker.beans';
import { createGiftCard } from '../gift-card-tracker.helpers';
import { GiftCardTrackerService } from '../gift-card-tracker.service';

@Component({
  selector: 'app-gift-card-list',
  templateUrl: './gift-card-list.page.html',
  styleUrls: ['./gift-card-list.page.scss'],
  standalone: true,
  imports: [IonItemDivider, IonItemGroup, IonItemOption, IonItemOptions, IonLabel, IonItemSliding, IonList, IonContent, IonItem, IonInput, IonFab, IonFabButton, IonFabList, IonIcon, CommonModule, FormsModule, FontAwesomeModule, HeaderComponent]
})
export class GiftCardListPage {

  rowData: GiftCard[] = [];
  filteredRowData: GiftCard[] = [];
  textFilter: string = '';
  likeFilter: boolean = false;

  sortCol: string = 'avg';
  sortOrder: SortOrderOption = 'desc';

  private subs = new SubSink();

  // DI
  private authService = inject(AuthService);
  private giftCardTrackerService = inject(GiftCardTrackerService);
  private modalCtrl = inject(ModalController);
  private alertController = inject(AlertController);

  // Icons
  faXmark = faXmark;
  faPenToSquare = faPenToSquare;
  faTrash = faTrash;
  faFilter = faFilter;
  faThumbsUp = faThumbsUp;

  constructor() {
    effect(() => {
      if (this.authService.currentUser()) {
        this.subs.sink = this.giftCardTrackerService.getGiftCards().subscribe({
          next: (results: GiftCard[]) => {
            this.filteredRowData = this.rowData = results;
          },
          error: (err) => { console.error(err); }
        })
      }
    });
  }

  filterGiftCards(evt: CustomEvent | null): void {
    if (evt?.detail) {
      this.textFilter = evt.detail.value;
    }
    const textFilterUppercase = this.textFilter.toUpperCase();
    this.filteredRowData = this.rowData.filter(x => x.storeName.toUpperCase().includes(textFilterUppercase) || `${x.amount}`.includes(textFilterUppercase));
  }

  async addGiftCard(): Promise<void> {
    this.openGiftCardModal(createGiftCard());
  }

  async openGiftCardModal(clickedGiftCard: GiftCard): Promise<void> {
    const modal = await this.modalCtrl.create({
      component: EditGiftCardPage,
      componentProps: { giftCard: clickedGiftCard }
    });
    modal.present();
    await modal.onDidDismiss().then((result) => {
      if (result.data) {
        const foundIndex = this.rowData.findIndex((item: GiftCard) => item.id && item.id === result.data.id);
        // foundIndex === -1 means this is a new item
        if (foundIndex === -1) {
          this.rowData.push(result.data);
        } else {
          this.rowData[foundIndex] = result.data;
        }
        this.filterGiftCards(null);
      }
    });
  }

  async showConfirmDelete(giftCard: GiftCard): Promise<void> {
    const alertButtons: AlertButton[] = [
      {
        text: 'Cancel',
        role: 'cancel',
      },
      {
        text: 'OK',
        role: 'confirm',
        handler: () => {
          this.giftCardTrackerService.deleteGiftCard(giftCard).pipe(take(1)).subscribe({
            next: () => {
              // Remove item from array
              let foundIndex: number;
              foundIndex = this.rowData.findIndex(x => x.id === giftCard.id);
              if (foundIndex > -1) {
                this.rowData.splice(foundIndex, 1);
              }
              this.filterGiftCards(null);
            }
          });
        },
      },
    ];

    const alert = await this.alertController.create({
      header: 'Confirm deletion',
      message: 'Gift card will be deleted.',
      buttons: alertButtons,
    });

    await alert.present();
  }

  sortGiftCards(sortCol: string): void {
    // Calculate sort order
    if (this.sortCol !== sortCol) {
      if (sortCol === 'storeName') {
        this.sortOrder = 'asc';
      } else {
        this.sortOrder = 'desc';
      }
    } else {
      if (this.sortOrder === 'asc') {
        this.sortOrder = 'desc';
      } else {
        this.sortOrder = 'asc';
      }
    }

    this.sortCol = sortCol;

    this.rowData = orderBy(this.rowData, sortCol, this.sortOrder);
    this.filterGiftCards(null);
  }
}
