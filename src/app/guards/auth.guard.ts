import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

export const authGuard = (requiresLogin: boolean = false): Observable<boolean> => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.isAuthenticated().pipe(
    map(isAuth => {
      if (requiresLogin) {
        if (!isAuth) {
          router.navigate(['/login']);
          return false;
        }
      } else {
        if (isAuth) {
          router.navigate(['/']);
          return false;
        }
      }
      return true;
    })
  );
};
