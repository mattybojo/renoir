import { FilterSortModule } from './../shared/filter-sort/filter-sort.module';
import { EditTodoItemComponent } from './edit-todo-item/edit-todo-item.component';
import { HeaderModule } from './../header/header.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

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
  declarations: [TodoListPage, EditTodoItemComponent]
})
export class TodoListPageModule { }
