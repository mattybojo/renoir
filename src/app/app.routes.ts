import { Routes } from '@angular/router';
import { canActivateAuthGuard, canMatchAuthGuard } from './shared/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'tasks',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.routes').then(m => m.routes)
  },
  {
    path: 'tasks',
    loadChildren: () => import('./tasks/tasks.routes').then((m) => m.routes),
    canMatch: [canMatchAuthGuard],
    canActivate: [canActivateAuthGuard]
  },
  {
    path: 'unit-rate-calculator',
    loadChildren: () => import('./unit-rate-calculator/unit-rate-calculator.routes').then((m) => m.routes),
    canMatch: [canMatchAuthGuard],
    canActivate: [canActivateAuthGuard]
  },
  {
    path: 'pet-foods',
    loadChildren: () => import('./pet-food-prefs/pet-food-prefs.routes').then((m) => m.routes),
    canMatch: [canMatchAuthGuard],
    canActivate: [canActivateAuthGuard]
  },
];
