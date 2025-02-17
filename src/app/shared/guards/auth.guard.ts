import { inject } from '@angular/core';
import { CanActivateFn, CanMatchFn, Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { environment } from '../../../environments/environment';

export const canActivateAuthGuard: CanActivateFn = async (route, state) => {
  return authGuard();
};

export const canMatchAuthGuard: CanMatchFn = async (route, segments) => {
  return authGuard();
};

const authGuard = (): boolean => {
  if (environment.bypassAuthGuard) {
    return true;
  }
  const authService = inject(AuthService);
  const router = inject(Router);
  const user = authService.currentUser();
  if (user) {
    return true;
  }
  router.navigate(['/auth/login']);
  return false;
}
