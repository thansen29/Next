import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash';
// import  from 'rxjs/map'
import 'rxjs/add/operator/map';

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
    this.httpClient.post('api/session', { email, password })
      .subscribe(
        (response) => {
          const id = response['listId'];
          // localStorage.setItem('token', response['token']);
          this.store.dispatch(new AuthActions.Signin());
          if (id) {
            this.router.navigate(['lists', id]);
          } else {
            this.router.navigate(['lists']);            
          }
        },
        (error) => {
          console.log('LOGIN FAILED');
          const errors = _.values(error.error);
          this.store.dispatch(new AuthActions.AuthError(errors));
        }
      )
  }

  signoutUser() {
    this.httpClient.delete('api/session')
      .subscribe(
        (response) => {
          // localStorage.removeItem('token');
          this.store.dispatch(new AuthActions.Logout())
          this.router.navigate(['/login']);
        },
        (error) => {
          console.log('SIGNOUT FAILED');

        }
      )
  }

  signupUser(email: string, password: string) {
    this.httpClient.post('api/users', { user: { email, password }})
      .subscribe(
        (response) => {
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

  authGuard() {
    return this.httpClient.get('api/signed_in')
      .map(
        (res) => {
          if (res['loggedIn']) {  
            return true;
          } else {
              this.router.navigate(['/login']);
              return false;
          }
        },
        (err) => {

        }
      )
  }

  authProtect() {
    return this.httpClient.get('api/signed_in')
      .map(
        (res) => {
          if (res['loggedIn']) {
            this.router.navigate(['/lists']);            
            return false;
          } else {
              return true;
          }
        },
        (err) => {

        }
      )
  }
}
