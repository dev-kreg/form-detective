import { CanActivate, CanActivateChild, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {


  constructor(private authService: AuthService, private router: Router) { }

  genericAuthCheck(): boolean {

    if (!this.authService.isAuthenticated) {
      this.router.navigate(['/login']);
    }
    return this.authService.isAuthenticated;
  }

  canActivate(): boolean {
    return this.genericAuthCheck()
  }

  canActivateChild(): boolean {
    return this.genericAuthCheck()
  }
}