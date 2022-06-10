import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShoppingListPageRoutingModule } from './shopping-list-routing.module';

import { ShoppingListPage } from './shopping-list.page';
import { HeaderModule } from '../header/header.module';
import { ShoppingListItemFormComponent } from './shopping-list-item-form/shopping-list-item-form.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShoppingListPageRoutingModule,
    HeaderModule
  ],
  declarations: [ShoppingListPage, ShoppingListItemFormComponent]
})
export class ShoppingListPageModule { }
