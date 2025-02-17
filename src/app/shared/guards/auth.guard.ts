import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { environment } from '../../../environments/environment';

export const authGuard: CanActivateFn = async (route, state) => {
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
};
