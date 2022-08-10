import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditTodoItemComponent } from './edit-todo-item/edit-todo-item.component';

import { TodoListPage } from './todo-list.page';

const routes: Routes = [
  {
    path: '',
    component: TodoListPage
  },
  {
    path: 'edit',
    component: EditTodoItemComponent,

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TodoListPageRoutingModule { }
