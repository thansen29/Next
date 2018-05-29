import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthProtect implements CanActivate {

  constructor(private authService: AuthService) {}

  canActivate(): Observable<boolean> {
    return this.authService.authProtect();
  }
}

