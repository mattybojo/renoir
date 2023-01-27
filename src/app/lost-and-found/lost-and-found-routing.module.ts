import { LostAndFoundItemFormComponent } from './lost-and-found-item-form/lost-and-found-item-form.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LostAndFoundPage } from './lost-and-found.page';

const routes: Routes = [
  {
    path: '',
    component: LostAndFoundPage
  },
  {
    path: 'edit',
    component: LostAndFoundItemFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LostAndFoundPageRoutingModule { }
