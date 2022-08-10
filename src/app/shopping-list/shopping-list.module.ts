import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HeaderModule } from '../header/header.module';
import { ShoppingListItemFormComponent } from './shopping-list-item-form/shopping-list-item-form.component';
import { ShoppingListPageRoutingModule } from './shopping-list-routing.module';
import { ShoppingListPage } from './shopping-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ShoppingListPageRoutingModule,
    HeaderModule,
  ],
  declarations: [ShoppingListPage, ShoppingListItemFormComponent]
})
export class ShoppingListPageModule { }
