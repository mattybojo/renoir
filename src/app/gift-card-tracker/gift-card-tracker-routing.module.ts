import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GiftCardTrackerPage } from './gift-card-tracker.page';

const routes: Routes = [
  {
    path: '',
    component: GiftCardTrackerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GiftCardTrackerPageRoutingModule {}
