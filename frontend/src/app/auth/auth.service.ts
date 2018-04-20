import { Injectable } from '@angular/core';
import { Angular2TokenService } from 'angular2-token';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as fromAuth from './store/auth.reducer';
import * as fromApp from '../store/app.reducer';
import * as authActions from './store/auth.actions';

@Injectable()
export class AuthService {
  authState: Observable<fromAuth.State>;

  constructor(private authToken: Angular2TokenService,
              private store: Store<fromApp.AppState>) {
                this.authState = this.store.select('auth');
              }

  isLoggedIn() {
    let authenticated;
    this.authState
      .subscribe(
        (state) => {
          authenticated = state.authenticated;
        },
        (err) => {
          console.log('IS LOGGED IN ERROR');
        }
      );
    return authenticated;
  }

  logInUser() {
    this.authToken.signIn({
      email: 'tom@tet.com',
      password: 'password'
    })
      .subscribe(
        (response) => {
          this.store.dispatch(new authActions.Signup());
        },
        (error) => {
          const message = JSON.parse(error._body).errors[0];
          this.store.dispatch(new authActions.AuthError(message))
        }
      );
  }

  signoutUser() {
    this.authToken.signOut();
    this.store.dispatch(new authActions.Logout())
  }

  signupUser() {
  }

}
