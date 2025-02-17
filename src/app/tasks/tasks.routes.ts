import { Route } from '@angular/router';
import { TaskListPage } from './task-list/task-list.page';

export const routes: Route[] = [{
  path: '', component: TaskListPage
},
{
  path: 'edit',
  loadComponent: () => import('./edit-task/edit-task.page').then(m => m.EditTaskPage)
}];
