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


  logInUser(email: string, password: string) {
    this.authToken.signIn({ email, password })
      .subscribe(
        (response) => {
          this.store.dispatch(new authActions.Signin());
          const token = response.headers._headers.get("access-token")[0];
          localStorage.setItem('token', token);
          //navigate elsewhere
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
    localStorage.removeItem('token');
  }

  signupUser(email: string, password: string) {
    this.authToken.registerAccount({ email, password })
      .subscribe(
        (response) => {
          this.store.dispatch(new authActions.Signup());
          //navigate elsewhere
        },
        (error) => {
          const message = JSON.parse(error._body).errors.full_messages[0];
          this.store.dispatch(new authActions.AuthError(message))
        }
      )
  }

}
