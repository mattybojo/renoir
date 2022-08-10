import { ShoppingListItemFormComponent } from './shopping-list-item-form/shopping-list-item-form.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShoppingListPage } from './shopping-list.page';

const routes: Routes = [
  {
    path: '',
    component: ShoppingListPage
  },
  {
    path: 'edit',
    component: ShoppingListItemFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShoppingListPageRoutingModule { }
