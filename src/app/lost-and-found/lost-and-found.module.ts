import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HeaderModule } from '../header/header.module';
import { FilterSortModule } from '../shared/filter-sort/filter-sort.module';
import { LostAndFoundItemFormComponent } from './lost-and-found-item-form/lost-and-found-item-form.component';
import { LostAndFoundPageRoutingModule } from './lost-and-found-routing.module';
import { LostAndFoundPage } from './lost-and-found.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    LostAndFoundPageRoutingModule,
    HeaderModule,
    FilterSortModule,
  ],
  declarations: [LostAndFoundPage, LostAndFoundItemFormComponent]
})
export class LostAndFoundPageModule { }
