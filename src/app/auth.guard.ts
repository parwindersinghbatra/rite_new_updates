import { CanActivate, Route, Router } from '@angular/router';

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {
  constructor(private router:Router) { }
  canActivate(): boolean {
    const isLoggedIn = localStorage.getItem('email') && localStorage.getItem('password');
    if (!isLoggedIn) {
      this.router.navigate(['/login']);
      return true;
    } else {
      // this.router.navigate(['/login']);
      // return false;
      return true;
    }
  }
}

