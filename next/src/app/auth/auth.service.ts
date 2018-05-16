import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash';

import { State as AuthState } from './store/auth.reducer';
import { AppState } from '../store/app.reducer';
import * as AuthActions from './store/auth.actions';

@Injectable()
export class AuthService {
  authState: Observable<AuthState>;

  constructor(private store: Store<AppState>,
              private router: Router,
              private httpClient: HttpClient) {

                this.authState = this.store.select('auth');
              }
  logInUser(email: string, password: string) {
    this.httpClient.post('https://localhost:3000/api/session', { email, password })
      .subscribe(
        (response) => {
          const id = response['listId'];
          localStorage.setItem('token', response['token']);
          this.store.dispatch(new AuthActions.Signin());
          this.router.navigate(['lists', id]);
        },
        (error) => {
          console.log('LOGIN FAILED');
          const errors = _.values(error.error);
          this.store.dispatch(new AuthActions.AuthError(errors));
        }
      )
  }

  signoutUser() {
    this.httpClient.delete('https://localhost:3000/api/session')
      .subscribe(
        (response) => {
          localStorage.removeItem('token');
          this.store.dispatch(new AuthActions.Logout())
          this.router.navigate(['/login']);
        },
        (error) => {
          console.log('SIGNOUT FAILED');

        }
      )
  }

  signupUser(email: string, password: string) {
    this.httpClient.post('https://localhost:3000/api/users', { user: { email, password }})
      .subscribe(
        (response) => {
          localStorage.setItem('token', response['token']);
          this.store.dispatch(new AuthActions.Signup());
          this.router.navigate(['lists']);
        },
        (error) => {
          console.log("SIGNUP FAILED")
          const errors = _.values(error.error);
          this.store.dispatch(new AuthActions.AuthError(errors));
        }
      )
  }

  isSignedIn() {
    return Boolean(localStorage.getItem('token'));
  }
}
