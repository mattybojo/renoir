import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import * as firestore from '@angular/fire/firestore';
import { ModalOptions, PickerController, PickerOptions } from '@ionic/angular';
import * as dateFns from 'date-fns';
import { ModalDismissData } from 'src/app/app.beans';
import { AppService } from 'src/app/app.service';
import { isAfterDate, isBeforeDate } from '../date-helpers';
import { FilterModalComponent } from './filter-modal/filter-modal.component';
import { FilterSetting, SortSetting } from './filter-sort.beans';

@Component({
  selector: 'ren-filter-sort',
  templateUrl: './filter-sort.component.html',
  styleUrls: ['./filter-sort.component.scss'],
})
export class FilterSortComponent implements OnInit, OnChanges {

  @Input() sortSettings: SortSetting;
  @Input() pickerOptions: PickerOptions;
  @Input() filterSettings: FilterSetting[];
  @Input() items: any[];
  @Output() exportedItems = new EventEmitter<any[]>();

  filteredItems: any[];
  isInitiallySorted: boolean;

  constructor(private pickerCtrl: PickerController, private appService: AppService) { }

  ngOnInit(): void {
    this.initSort();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.items?.currentValue?.length > 0 && !this.isInitiallySorted) {
      this.sortItems(this.items);
      this.isInitiallySorted = false;
    }
  }

  initSort(): void {
    const handler = (value: any) => {
      const sortSettings: SortSetting = {};
      Object.keys(value).forEach(key => {
        switch (key) {
          case 'Property':
            sortSettings.sortProperty = value[key].value;
            sortSettings.sortPropertyLabel = value[key].text;
            break;
          case 'Sort Direction':
            sortSettings.sortOrder = value[key].value;
            break;
          default:
            console.error(`Unknown property: ${key}`);
        }
      });

      this.sortSettings = Object.assign(this.sortSettings, sortSettings);

      this.sortItems(this.items);
    };

    this.pickerOptions?.columns.push({
      name: 'Sort Direction',
      options: [{
        text: 'Ascending',
        value: 'ASC'
      }, {
        text: 'Descending',
        value: 'DESC'
      }]
    });

    if (!!this.pickerOptions.buttons) {
      // Make sure the handler is set for affirmative button
      this.pickerOptions.buttons[1].handler = handler;
    } else {
      // Use default buttons
      this.pickerOptions.buttons = [{
        text: 'Cancel',
        role: 'cancel'
      }, {
        text: 'Select',
        handler,
      }];
    }
  }

  async openSortPicker(): Promise<void> {
    const picker = await this.pickerCtrl.create(this.pickerOptions);
    await picker.present();
  }

  async openFilterMenu() {
    const presentingElement = await this.appService.getModalPresentingElement();
    const modalOpts: ModalOptions = {
      component: FilterModalComponent,
      presentingElement,
      canDismiss: true,
      componentProps: { filters: this.filterSettings }
    };
    const modal = this.appService.presentModal(modalOpts);
    const onModalDismiss$ = (await modal).onWillDismiss();
    onModalDismiss$.then((value: ModalDismissData) => {
      if (value.data) {
        this.filterSettings = value.data;
      }
      this.applyFilters();
    });
  }

  clearFilters(): void {
    this.sortItems(this.items);
  }

  private applyFilters(): void {
    const validFilters = this.filterSettings.filter((filter) => !!filter.operand && !!filter.value);
    const filteredItems = this.items.filter((item: any) => {
      let isValid = true;
      validFilters.forEach((filter: FilterSetting) => {
        // If isValid is false for one of the filters then we don't care about checking other filters
        if (isValid) {
          // If the property is null or undefined, skip and set isValid to false
          if (item[filter.property] == null) {
            isValid = false;
          } else {
            switch (filter.type) {
              case 'text':
                switch (filter.operand) {
                  case '===':
                    isValid = `${item[filter.property]}` === filter.value;
                    break;
                  case '!==':
                    isValid = `${item[filter.property]}` !== filter.value;
                    break;
                  case 'contains':
                    isValid = `${item[filter.property]}`.includes(filter.value);
                    break;
                  case '!contains':
                    isValid = !`${item[filter.property]}`.includes(filter.value);
                    break;
                  default:
                    console.error(`Unknown operand: ${filter.operand}`);
                }
                break;
              case 'date':
                switch (filter.operand) {
                  case '<':
                    isValid = isBeforeDate(item[filter.property].toDate(), new Date(filter.value));
                    break;
                  case '>':
                    isValid = isAfterDate(item[filter.property].toDate(), new Date(filter.value));
                    break;
                  case '===':
                    isValid = dateFns.isSameDay(item[filter.property].toDate(), new Date(filter.value));
                    break;
                  case '!==':
                    isValid = !dateFns.isSameDay(item[filter.property].toDate(), new Date(filter.value));
                    break;
                  default:
                    console.error(`Unknown operand: ${filter.operand}`);
                };
                break;
              default:
                console.error(`Unknown filter type: ${filter.type}`);
            }
          }
        }
      });
      return isValid;
    });

    this.sortItems(filteredItems);
  }

  private sortItems(itemArray: any[]): void {
    const sortProperty = this.sortSettings.sortProperty;
    const sortOrder = this.sortSettings.sortOrder;
    itemArray.sort((a, b) => {
      if (a[sortProperty] instanceof firestore.Timestamp) {
        return (a[sortProperty] as firestore.Timestamp).seconds - (b[sortProperty] as firestore.Timestamp).seconds;
      }
      if (typeof a[sortProperty] === 'string' || a[sortProperty] instanceof String) {
        return (a[sortProperty] as string).localeCompare(b[sortProperty]);
      }
      return a[sortProperty] - b[sortProperty];
    });
    if (sortOrder === 'DESC') {
      itemArray.reverse();
    }

    this.exportedItems.emit(itemArray);
  }
}
