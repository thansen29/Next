import { Injectable } from '@angular/core';
import { CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot, Router } from '@angular/router';

@Injectable()
export class AuthProtect implements CanActivate {

  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): boolean {

    const token = Boolean(localStorage.getItem('token'));

    if (token) {
      this.router.navigate(['todos'])
      return false;

    } else {
      return true;
    }

  }
}
