import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodoListItemFormComponent } from './todo-list-item-form/todo-list-item-form.component';
import { TodoListPage } from './todo-list.page';

const routes: Routes = [
  {
    path: '',
    component: TodoListPage
  },
  {
    path: 'edit',
    component: TodoListItemFormComponent,

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TodoListPageRoutingModule { }
