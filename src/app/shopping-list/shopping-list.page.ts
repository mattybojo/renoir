import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { PickerOptions, ViewWillEnter } from '@ionic/angular';
import { SubSink } from 'subsink';
import { AppService } from '../app.service';
import { HeaderAction } from '../header/header.beans';
import { FilterSetting, SortSetting } from '../shared/filter-sort/filter-sort.beans';
import { DataService } from './../shared/data.service';
import { ShoppingListItem } from './shopping-list.beans';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'ren-shopping-list',
  templateUrl: './shopping-list.page.html',
  styleUrls: ['./shopping-list.page.scss'],
})
export class ShoppingListPage implements OnDestroy, ViewWillEnter {

  headerActions: HeaderAction[];

  shoppingList: ShoppingListItem[] = [];
  filteredShoppingList: ShoppingListItem[] = [];

  sortSettings: SortSetting;
  pickerOptions: PickerOptions;
  filterSettings: FilterSetting[];

  private subs = new SubSink();

  constructor(private shoppingListService: ShoppingListService, private appService: AppService,
    private router: Router, private dataService: DataService) {
    this.headerActions = [{
      type: 'add',
      slot: 'start',
      icon: 'add'
    }];

    this.sortSettings = {
      sortProperty: 'name',
      sortPropertyLabel: 'Item Name',
      sortOrder: 'ASC'
    };

    this.pickerOptions = {
      columns: [{
        name: 'Property',
        options: [{
          text: 'Item Name',
          value: 'name'
        }, {
          text: 'Quantity',
          value: 'quantity'
        }, /*{
          text: 'Shopped?',
          value: 'isShopped'
        }, */{
          text: 'Date Created',
          value: 'dateCreated'
        }, {
          text: 'Date Modified',
          value: 'dateModified'
        }]
      }]
    };

    this.filterSettings = [{
      label: 'Item Name',
      property: 'name',
      type: 'text',
    }, {
      label: 'Quantity',
      property: 'quantity',
      type: 'text'
    }, /*{
      label: 'Shopped?',
      property: 'isShopped',
      type: 'text'
    }, */{
      label: 'Date Created',
      property: 'dateCreated',
      type: 'date'
    }, {
      label: 'Date Modified',
      property: 'dateModified',
      type: 'date'
    }];
  }

  ionViewWillEnter(): void {
    this.loadShoppingListData();
  }

  loadShoppingListData(): void {
    this.appService.presentLoadingModal();
    this.subs.sink = this.shoppingListService.getShoppingList().subscribe((list: ShoppingListItem[]) => {
      this.shoppingList = this.filteredShoppingList = list;
      this.appService.dismissLoadingModal();
    }, (err) => {
      this.appService.dismissLoadingModal();
      this.appService.presentToast({ color: 'danger', message: 'Unable to retrieve shopping list!', duration: 1000 });
    });
  }

  actionHandler(actionType: string) {
    switch (actionType) {
      case 'add':
        this.updateItem(null);
        break;
      default:
        console.error(`Unknown action type: ${actionType}`);
    }
  }

  updateItem(item: ShoppingListItem) {
    this.dataService.setDataObs(item);
    this.router.navigate(['tabs/shopping-list/edit']);
  }

  deleteItem(item: ShoppingListItem) {
    this.appService.presentLoadingModalDelete();
    this.subs.sink = this.shoppingListService.deleteListItem(item).subscribe(() => {
      this.appService.dismissLoadingModal();
      this.appService.presentToast({
        color: 'success', message: 'Item deleted successfully!', duration: 1000
      });
    }, (err) => {
      this.appService.dismissLoadingModal();
      this.appService.presentToast({
        color: 'danger', message: 'Error deleting item!', duration: 1000
      });
    });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
