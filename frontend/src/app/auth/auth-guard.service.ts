import { Injectable } from '@angular/core';
import { CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs/Observable';
import * as fromApp from '../store/app.reducer';
import * as fromAuth from './store/auth.reducer';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private store: Store<fromApp.AppState>,
              private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): boolean {

    let authed;
    this.store.select('auth')
      .subscribe(
        (state) => {
          debugger
          authed = state.authenticated;
        }
      );

    if (!authed) {
      this.router.navigate(['/login']);
    }
    return authed;
  }
}
