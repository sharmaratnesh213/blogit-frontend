import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, of } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:8080/api/auth';

  constructor(private http: HttpClient, private router: Router) { }

  login(credentials: { email: string, password: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, credentials, {observe: 'response'}).pipe(
      map(response => {
        const jwtToken = response.headers.get('Authorization');
        const user = response.body;

        return { jwtToken, user };
      })
    );
  }

  verifyToken(): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/verify-token`).pipe(
      catchError(() => of(false)) 
    );
  }

  logout(): void {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('jwtToken');
  }

  setUser(user: User): void {
    localStorage.setItem('user', JSON.stringify(user));
  }

  getUser(): User | null {
    const userJson = localStorage.getItem('user');
    return userJson ? JSON.parse(userJson) : null;
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('jwtToken');
    return !!token;
  }
  
}
