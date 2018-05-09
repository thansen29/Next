import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable()
export class AuthProtect implements CanActivate {

  constructor(private router: Router) {}

  canActivate() {
    if (localStorage.getItem('token')) {
      this.router.navigate(['/lists']);
      return false;
    } else {
      return true;
    }
  }
}

