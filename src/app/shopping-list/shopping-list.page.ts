import { Component, OnDestroy } from '@angular/core';
import { IonItemSliding, ModalController, ViewWillEnter } from '@ionic/angular';
import { SubSink } from 'subsink';
import { AppService } from './../app.service';
import { HeaderAction } from './../header/header.beans';
import { ShoppingListItemFormComponent } from './shopping-list-item-form/shopping-list-item-form.component';
import { ShoppingListItem } from './shopping-list.beans';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'ren-shopping-list',
  templateUrl: './shopping-list.page.html',
  styleUrls: ['./shopping-list.page.scss'],
})
export class ShoppingListPage implements OnDestroy, ViewWillEnter {

  shoppingList: ShoppingListItem[] = [];
  headerActions: HeaderAction[];

  private subs = new SubSink();

  constructor(private shoppingListService: ShoppingListService, protected modalController: ModalController,
    private appService: AppService) {
    this.headerActions = [{
      type: 'add',
      slot: 'start',
      icon: 'add'
    }];
  }

  ionViewWillEnter(): void {
    this.loadShoppingListData();
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

  loadShoppingListData(): void {
    this.subs.sink = this.shoppingListService.getShoppingList().subscribe((list: ShoppingListItem[]) => {
      this.shoppingList = list;
    });
  }

  async presentModal(item?: ShoppingListItem) {
    const modal = await this.modalController.create({
      component: ShoppingListItemFormComponent,
      componentProps: {
        item
      },
      presentingElement: await this.modalController.getTop(),
      canDismiss: true
    });

    return await modal.present();
  }

  updateItem(item: ShoppingListItem, slidingItem: IonItemSliding) {
    this.presentModal(item);
    slidingItem.close();
  }

  deleteItem(item: ShoppingListItem) {
    this.subs.sink = this.shoppingListService.deleteListItem(item).subscribe(() => {
      this.appService.presentToast({
        color: 'success', message: 'Item deleted successfully!', duration: 1000
      });
    }, () => {
      this.appService.presentToast({
        color: 'danger', message: 'Error deleting item!', duration: 1000
      });
    });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
