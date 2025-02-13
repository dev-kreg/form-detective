import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';

export enum access_lvl {
  "BASIC_EMPLOYEE",
  "TRUSTED_EMPLOYEE",
  "ADMIN_EMPLOYEE",
}

export interface User {
  id: number;
  username: string;
  password: string;
  token: string;
  access_lvl: access_lvl;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly STORAGE_KEY = "";
  private mockUsers: User[] = [
    {
      id: 1,
      username: 'JohnSmith',
      password: 'password',
      token: 'mock_token_12345',
      access_lvl: access_lvl.BASIC_EMPLOYEE
    }
  ];
  public currentUser: User | undefined;
  public isAuthenticated = false;

  login(username: string, password: string): Observable<User> {
    const user = this.mockUsers.find(u => u.username === username);

    if (user && password === user.password) {
      localStorage.setItem(this.STORAGE_KEY, user.token);
      this.currentUser = user;
      return of(user).pipe(delay(1000));
    }

    return throwError(() => new Error('Invalid credentials')).pipe(delay(800));
  }

  logout(): void {
    localStorage.removeItem(this.STORAGE_KEY);
  }

  checkCachedAuthToken(): void {
    // simulate sending an auth token to API to check validity of session
    of(!!localStorage.getItem(this.STORAGE_KEY)).pipe(delay(1000)).subscribe(
      {
        next: (value) => {
          this.isAuthenticated = true
        },
        error: (err) => {
          this.isAuthenticated = false
        }
      }
    )
  }
}