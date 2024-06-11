import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate {
  constructor(private router:Router) { }
canActivate(): boolean {
  const isLoginIn = localStorage.getItem('email') && localStorage.getItem('password');
  if(isLoginIn){
    return true;
  }else{
    this.router.navigate(['/login']);
    return false;
  }
} 
}
