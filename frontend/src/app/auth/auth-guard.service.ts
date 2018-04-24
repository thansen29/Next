import { Injectable } from '@angular/core';
import { CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Angular2TokenService } from 'angular2-token';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router,
              private authToken: Angular2TokenService) {}

  canActivate() {

    if (this.authToken.userSignedIn()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }


  }
}

// canActivate(route: ActivatedRouteSnapshot,
//   state: RouterStateSnapshot): boolean {

// const token = Boolean(localStorage.getItem('token'));
// if (!token) {
// this.router.navigate(['/login']);
// }

// return token;

// }
