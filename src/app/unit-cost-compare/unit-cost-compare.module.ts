import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HeaderModule } from '../header/header.module';
import { UnitCostComparePageRoutingModule } from './unit-cost-compare-routing.module';
import { UnitCostComparePage } from './unit-cost-compare.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UnitCostComparePageRoutingModule,
    HeaderModule
  ],
  declarations: [UnitCostComparePage]
})
export class UnitCostComparePageModule { }
