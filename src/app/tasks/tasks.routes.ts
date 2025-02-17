import { Route } from '@angular/router';
import { authGuard } from '../shared/guards/auth.guard';
import { TaskListPage } from './task-list/task-list.page';

export const routes: Route[] = [{
  path: '', component: TaskListPage, canActivate: [authGuard]
},
{
  path: 'edit',
  loadComponent: () => import('./edit-task/edit-task.page').then(m => m.EditTaskPage), canActivate: [authGuard]
}];
