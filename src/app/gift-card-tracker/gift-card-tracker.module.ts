import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HeaderModule } from '../header/header.module';
import { FilterSortModule } from './../shared/filter-sort/filter-sort.module';
import { SharedModule } from './../shared/shared.module';
import { GiftCardFormComponent } from './gift-card-form/gift-card-form.component';
import { GiftCardTotalsComponent } from './gift-card-totals/gift-card-totals.component';
import { GiftCardTrackerPageRoutingModule } from './gift-card-tracker-routing.module';
import { GiftCardTrackerPage } from './gift-card-tracker.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    GiftCardTrackerPageRoutingModule,
    HeaderModule,
    SharedModule,
    FilterSortModule
  ],
  declarations: [GiftCardTrackerPage, GiftCardFormComponent, GiftCardTotalsComponent]
})
export class GiftCardTrackerPageModule { }
