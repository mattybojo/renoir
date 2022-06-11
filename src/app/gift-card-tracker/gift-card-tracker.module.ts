import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GiftCardTrackerPageRoutingModule } from './gift-card-tracker-routing.module';

import { GiftCardTrackerPage } from './gift-card-tracker.page';
import { HeaderModule } from '../header/header.module';
import { GiftCardFormComponent } from './gift-card-form/gift-card-form.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    GiftCardTrackerPageRoutingModule,
    HeaderModule
  ],
  declarations: [GiftCardTrackerPage, GiftCardFormComponent]
})
export class GiftCardTrackerPageModule { }
