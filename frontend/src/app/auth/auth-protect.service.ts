import { Injectable } from '@angular/core';
import { CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Angular2TokenService } from 'angular2-token';

@Injectable()
export class AuthProtect implements CanActivate {

  constructor(private router: Router,
              private authToken: Angular2TokenService) {}

  canActivate() {
    if (localStorage.getItem('token')) {
      this.router.navigate(['/todos']);
      return false;
    } else {
      return true;
    }
  }
}

