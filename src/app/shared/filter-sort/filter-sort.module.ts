import { FilterModalComponent } from './filter-modal/filter-modal.component';
import { IonicModule } from '@ionic/angular';
import { FilterSortComponent } from './filter-sort.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [FilterSortComponent, FilterModalComponent],
  imports: [
    IonicModule,
    CommonModule
  ],
  exports: [FilterSortComponent]
})
export class FilterSortModule { }
