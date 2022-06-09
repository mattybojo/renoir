import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'shopping-list',
        loadChildren: () => import('../shopping-list/shopping-list.module').then(m => m.ShoppingListPageModule)
      },
      {
        path: 'unit-cost',
        loadChildren: () => import('../unit-cost-compare/unit-cost-compare.module').then(m => m.UnitCostComparePageModule)
      },
      {
        path: 'gift-card',
        loadChildren: () => import('../gift-card-tracker/gift-card-tracker.module').then(m => m.GiftCardTrackerPageModule)
      },
      {
        path: 'auth',
        loadChildren: () => import('../auth/auth.module').then(m => m.AuthPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/shopping-list',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/shopping-list',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule { }
