import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { PickerOptions } from '@ionic/angular';
import { SubSink } from 'subsink';
import { HeaderAction } from '../header/header.beans';
import { DataService } from '../shared/data.service';
import { FilterSetting, SortSetting } from '../shared/filter-sort/filter-sort.beans';
import { AppService } from './../app.service';
import { LostAndFoundItem } from './lost-and-found.beans';
import { LostAndFoundService } from './lost-and-found.service';

@Component({
  selector: 'ren-lost-and-found',
  templateUrl: './lost-and-found.page.html',
  styleUrls: ['./lost-and-found.page.scss'],
})
export class LostAndFoundPage implements OnDestroy {

  headerActions: HeaderAction[];

  lostAndFoundList: LostAndFoundItem[] = [];
  filteredLostAndFoundList: LostAndFoundItem[] = [];
  isLoading = false;

  sortSettings: SortSetting;
  pickerOptions: PickerOptions;
  filterSettings: FilterSetting[];

  private subs = new SubSink();

  constructor(private lostAndFoundService: LostAndFoundService, private appService: AppService,
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
          text: 'Item Location',
          value: 'location'
        }]
      }]
    };

    this.filterSettings = [{
      label: 'Item Name',
      property: 'name',
      type: 'text',
    }, {
      label: 'Item Location',
      property: 'location',
      type: 'text'
    }];
  }

  ionViewWillEnter(): void {
    this.loadLostAndFoundData();
  }

  loadLostAndFoundData(): void {
    this.isLoading = true;
    this.subs.sink = this.lostAndFoundService.getLostAndFoundList().subscribe((list: LostAndFoundItem[]) => {
      this.lostAndFoundList = this.filteredLostAndFoundList = list;
      this.isLoading = false;
    }, (err) => {
      this.isLoading = false;
      this.appService.presentToast({ color: 'danger', message: 'Unable to retrieve lost and found items!', duration: 1000 });
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

  updateItem(item: LostAndFoundItem) {
    this.dataService.setDataObs(item);
    this.router.navigate(['tabs/lost-and-found/edit']);
  }

  deleteItem(item: LostAndFoundItem) {
    this.appService.presentLoadingModalDelete();
    this.subs.sink = this.lostAndFoundService.deleteItem(item).subscribe(() => {
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
