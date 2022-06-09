import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GiftCardTrackerPageRoutingModule } from './gift-card-tracker-routing.module';

import { GiftCardTrackerPage } from './gift-card-tracker.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GiftCardTrackerPageRoutingModule
  ],
  declarations: [GiftCardTrackerPage]
})
export class GiftCardTrackerPageModule {}
