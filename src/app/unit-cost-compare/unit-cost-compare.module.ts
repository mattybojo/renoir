import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UnitCostComparePageRoutingModule } from './unit-cost-compare-routing.module';

import { UnitCostComparePage } from './unit-cost-compare.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UnitCostComparePageRoutingModule
  ],
  declarations: [UnitCostComparePage]
})
export class UnitCostComparePageModule {}
