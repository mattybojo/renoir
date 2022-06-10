import { Component, OnDestroy, OnInit } from '@angular/core';
import { IonItemSliding, ModalController, ToastController, ViewWillEnter } from '@ionic/angular';
import { SubSink } from 'subsink';
import { ShoppingListItemFormComponent } from './shopping-list-item-form/shopping-list-item-form.component';
import { OverlayEventDetail, ShoppingListItem } from './shopping-list.beans';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'ren-shopping-list',
  templateUrl: './shopping-list.page.html',
  styleUrls: ['./shopping-list.page.scss'],
})
export class ShoppingListPage implements OnInit, OnDestroy, ViewWillEnter {

  shoppingList: ShoppingListItem[] = [];

  private subs = new SubSink();

  constructor(private shoppingListService: ShoppingListService, protected modalController: ModalController,
    private toastController: ToastController) { }

  ngOnInit() { }

  ionViewWillEnter(): void {
    this.loadShoppingListData();
  }

  loadShoppingListData(): void {
    this.subs.sink = this.shoppingListService.getShoppingList().subscribe((list: ShoppingListItem[]) => {
      this.shoppingList = list;
    });
  }

  async presentModal(item) {
    const modal = await this.modalController.create({
      component: ShoppingListItemFormComponent,
      componentProps: {
        item
      },
      presentingElement: await this.modalController.getTop(),
      canDismiss: true
    });

    modal.onWillDismiss().then((data: OverlayEventDetail<ShoppingListItem>) => {
      if (!!data.data) {
        this.createSaveSuccessToast();
      }
    });

    return await modal.present();
  }

  async createSaveSuccessToast() {
    const toast = await this.toastController.create({
      color: 'success', message: 'Item saved successfully!', duration: 1000
    });
    await toast.present();
  }

  updateItem(item: ShoppingListItem, slidingItem: IonItemSliding) {
    this.presentModal(item);
    slidingItem.close();
  }

  deleteItem(item: ShoppingListItem) {
    this.subs.sink = this.shoppingListService.deleteListItem(item).subscribe(() => { });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
