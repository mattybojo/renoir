import { GiftCardTotalsComponent } from './gift-card-totals/gift-card-totals.component';
import { GiftCardFormComponent } from './gift-card-form/gift-card-form.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GiftCardTrackerPage } from './gift-card-tracker.page';

const routes: Routes = [
  {
    path: '',
    component: GiftCardTrackerPage
  },
  {
    path: 'edit',
    component: GiftCardFormComponent
  },
  {
    path: 'totals',
    component: GiftCardTotalsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GiftCardTrackerPageRoutingModule { }
