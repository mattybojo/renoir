import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShortcutsPage } from './shortcuts.page';

const routes: Routes = [
  {
    path: '',
    component: ShortcutsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShortcutsPageRoutingModule {}
