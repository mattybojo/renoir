import { CommonModule } from '@angular/common';
import { Component, effect, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faFilter, faPenToSquare, faThumbsUp, faTrash, faXmark } from '@fortawesome/free-solid-svg-icons';
import { AlertController, IonCheckbox, IonContent, IonFab, IonFabButton, IonFabList, IonIcon, IonInput, IonItem, IonItemDivider, IonItemGroup, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonList, ModalController } from '@ionic/angular/standalone';
import { AlertButton } from '@ionic/core';
import { camelCase, capitalize, orderBy, startCase } from 'lodash';
import { take } from 'rxjs';
import { SubSink } from 'subsink';
import { SortOrderOption } from '../../app.beans';
import { AuthService } from '../../auth/auth.service';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { EditPetFoodPage } from '../edit-pet-food/edit-pet-food.page';
import { PetFood, PetFoodFilterType, PetFoodPrefs } from '../pet-food-prefs.beans';
import { createPetFood } from '../pet-food-prefs.helpers';
import { PetFoodPrefsService } from '../pet-food-prefs.service';

@Component({
  selector: 'app-pet-food-list',
  templateUrl: './pet-food-list.page.html',
  styleUrls: ['./pet-food-list.page.scss'],
  standalone: true,
  imports: [IonItemDivider, IonItemGroup, IonItemOption, IonItemOptions, IonLabel, IonItemSliding, IonList, IonContent, IonItem, IonInput, IonFab, IonFabButton, IonFabList, IonIcon, IonCheckbox, CommonModule, FormsModule, FontAwesomeModule, HeaderComponent]
})
export class PetFoodListPage {

  rowData: PetFood[] = [];
  filteredRowData: PetFood[] = [];
  textFilter: string = '';
  likeFilter: boolean = false;

  sortCol: string = 'avg';
  sortOrder: SortOrderOption = 'desc';

  private subs = new SubSink();

  // DI
  private authService = inject(AuthService);
  private petFoodPrefsService = inject(PetFoodPrefsService);
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
        this.subs.sink = this.petFoodPrefsService.getPetFoodPrefs().subscribe({
          next: (results: PetFood[]) => {
            this.processPetFoodPrefs(results);
          },
          error: (err) => { console.error(err); }
        })
      }
    });
  }

  // love: 2
  // like: 1
  // hate: 0
  processPetFoodPrefs(results: PetFood[]): void {
    // Calculate display name
    let total: number, count: number;
    this.rowData = results.map(x => {
      x.displayName = `${startCase(camelCase(x.brand))} ${capitalize(x.name)}`;
      total = count = 0;
      for (var key in x.prefs) {
        if (x.prefs.hasOwnProperty(key) && key !== 'avg') {
          total += x.prefs[key as keyof PetFoodPrefs];
          count++;
        }
      }
      x.prefs.avg = total / count;
      return x;
    });

    this.rowData = this.filteredRowData = orderBy(results, x => x.prefs.avg, 'desc')
  }

  filterPetFood(evt: CustomEvent | null, type: PetFoodFilterType | null): void {
    if (evt?.detail) {
      if (type === 'like') {
        this.likeFilter = evt.detail.checked;
      } else if (type === 'name') {
        this.textFilter = evt.detail.value;
      }
    }
    const textFilterUppercase = this.textFilter.toUpperCase();
    this.filteredRowData = this.rowData.filter(x => x.displayName.toUpperCase().includes(textFilterUppercase));

    if (this.likeFilter) {
      this.filteredRowData = this.filteredRowData.filter(x => {
        return x.prefs.simba > 0 && x.prefs.rory > 0 && x.prefs.willy > 0 && x.prefs.milo > 0
      });
    }
  }

  async addPetFood(): Promise<void> {
    this.openPetFoodModal(createPetFood());
  }

  async openPetFoodModal(clickedPetFood: PetFood): Promise<void> {
    const modal = await this.modalCtrl.create({
      component: EditPetFoodPage,
      componentProps: { petFood: clickedPetFood }
    });
    modal.present();
    await modal.onDidDismiss().then((result) => {
      if (result.data) {
        const foundIndex = this.rowData.findIndex((item: PetFood) => item.id === clickedPetFood.id);
        // foundIndex === -1 means this is a new item
        if (foundIndex === -1) {
          this.rowData.push(result.data);
        } else {
          this.rowData[foundIndex] = result.data;
        }
        this.filterPetFood(null, null);
      }
    });
  }

  async showConfirmDelete(petFood: PetFood): Promise<void> {
    const alertButtons: AlertButton[] = [
      {
        text: 'Cancel',
        role: 'cancel',
      },
      {
        text: 'OK',
        role: 'confirm',
        handler: () => {
          this.petFoodPrefsService.deletePetFood(petFood).pipe(take(1)).subscribe({
            next: () => {
              // Remove item from array
              let foundIndex: number;
              foundIndex = this.rowData.findIndex(x => x.id === petFood.id);
              if (foundIndex > -1) {
                this.rowData.splice(foundIndex, 1);
              }
              this.filterPetFood(null, null);
            }
          });
        },
      },
    ];

    const alert = await this.alertController.create({
      header: 'Confirm deletion',
      message: 'Pet food will be deleted.',
      buttons: alertButtons,
    });

    await alert.present();
  }

  sortPetFood(sortCol: string): void {
    // Calculate sort order
    if (this.sortCol !== sortCol) {
      if (sortCol === 'displayName') {
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

    // Sort the table and then re-apply any filters
    switch (sortCol) {
      case 'displayName':
        this.rowData = orderBy(this.rowData, sortCol, this.sortOrder);
        this.filterPetFood(null, null);
        break;
      case 'simba':
      case 'rory':
      case 'willy':
      case 'milo':
      case 'avg':
        this.rowData = orderBy(this.rowData, x => x.prefs[sortCol], this.sortOrder);
        this.filterPetFood(null, null);
        break;
    }
  }
}
