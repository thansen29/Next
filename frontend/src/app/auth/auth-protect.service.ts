import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable()
export class AuthProtect implements CanActivate {

  constructor(private router: Router) {}

  canActivate() {
    if (localStorage.getItem('token')) {
      this.router.navigate(['/todos']);
      return false;
    } else {
      return true;
    }
  }
}

