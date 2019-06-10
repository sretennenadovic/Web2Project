import { Injectable } from '@angular/core';
import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivateChild,
} from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardContorllor implements CanActivate, CanActivateChild {
  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if(localStorage.jwt === null || localStorage.jwt === "" || localStorage.jwt == "undefined" || localStorage.jwt == undefined)  {
      console.error("Can't access, not logged in");
      alert("Niste logovani!")
      this.router.navigate(['unauthorizedUser','login']);
      return false;
    }  
    else if (localStorage.role === 'Controller') {
      return true;
    }
    // not logged in so redirect to login page
    else {
      console.error("Can't access, not controllor");
      this.router.navigate(['unauthorizedUser','login']);
      return false;
    }
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.canActivate(route, state);
  }

}