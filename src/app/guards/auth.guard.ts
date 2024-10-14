import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map } from 'rxjs/operators';

export const authGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.isAuthenticated().pipe(
    map(isAuth => {
      if (isAuth) {
        router.navigate(['/']);
        return false; // User is authenticated, prevent access to the route
      }
      return true; // User is not authenticated, allow access
    })
  );
};
