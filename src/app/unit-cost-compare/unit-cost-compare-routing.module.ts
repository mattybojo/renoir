import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UnitCostComparePage } from './unit-cost-compare.page';

const routes: Routes = [
  {
    path: '',
    component: UnitCostComparePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UnitCostComparePageRoutingModule {}
