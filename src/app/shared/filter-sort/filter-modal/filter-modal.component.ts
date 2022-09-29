import { Component, Input, OnInit } from '@angular/core';
import { Components } from '@ionic/core';
import { toLocalISOString } from '../../date-helpers';
import { FilterSetting } from './../filter-sort.beans';

@Component({
  selector: 'ren-filter-modal',
  templateUrl: './filter-modal.component.html',
  styleUrls: ['./filter-modal.component.scss'],
})
export class FilterModalComponent implements OnInit {

  @Input() filters: FilterSetting[] = [];
  @Input() modal: Components.IonModal;

  areFiltersValid: boolean;

  constructor() { }

  ngOnInit() {
    for (const filter of this.filters) {
      // Check for all types that have use value as an array
      if (['checkbox'].includes(filter.type)) {
        if (!filter.value) {
          filter.value = [];
        }
      }
      // Set value of areFiltersValid
      this.areFiltersValid = true;
    }
  }

  onDateChange($event: Event, value: string, index: number, operand: string): void {
    const theValue: Date = !!$event && !!($event as CustomEvent).detail.value ? new Date(($event as CustomEvent).detail.value)
      : !!value ? new Date(value) : undefined;
    this.filters[index].operand = operand;
    if (!!theValue && !!operand) {
      this.filters[index].value = toLocalISOString(theValue);
      this.setAreFiltersValid();
    } else if ((!!theValue && !operand) || (!theValue && !!operand)) {
      this.areFiltersValid = false;
      if (!!theValue) {
        this.filters[index].value = toLocalISOString(theValue);
      }
    }
  }

  onTextChange($event: Event, value: string, index: number, operand: string): void {
    const theValue: string = !!$event ? ($event as CustomEvent).detail.value : value;
    this.filters[index].value = theValue;
    this.filters[index].operand = operand;
    if (!!theValue && !!operand) {
      this.setAreFiltersValid();
    } else if ((!!theValue && !operand) || (!theValue && !!operand)) {
      this.areFiltersValid = false;
    }
  }

  setAreFiltersValid(): void {
    let isValid = true;
    for (const filter of this.filters) {
      if (!isValid) {
        break;
      }

      // Validation logic here
      switch (filter.type) {
        case 'date':
        case 'text':
          if ((!filter.operand && !!filter.value) || (!!filter.operand && !filter.value)) {
            isValid = false;
          }
          break;
        default:
          console.error(`Unknown filter type: ${filter.type}`);
      }
    }
    this.areFiltersValid = isValid;
  }

  resetFilters(): void {
    for (const filter of this.filters) {
      filter.operand = undefined;
      filter.value = undefined;
    }
  }

  dismissFilterModal(): void {
    this.modal.dismiss(this.filters);
  }
}
