import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HeaderModule } from './../header/header.module';
import { FilterSortModule } from './../shared/filter-sort/filter-sort.module';
import { TodoListItemFormComponent } from './todo-list-item-form/todo-list-item-form.component';
import { TodoListPageRoutingModule } from './todo-list-routing.module';
import { TodoListPage } from './todo-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TodoListPageRoutingModule,
    HeaderModule,
    ReactiveFormsModule,
    FilterSortModule
  ],
  declarations: [TodoListPage, TodoListItemFormComponent]
})
export class TodoListPageModule { }
