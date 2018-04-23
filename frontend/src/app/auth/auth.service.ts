import { Injectable } from '@angular/core';
import { Angular2TokenService } from 'angular2-token';
import { Response, Headers } from '@angular/http';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { State as AuthState } from './store/auth.reducer';
import { AppState } from '../store/app.reducer';
import * as authActions from './store/auth.actions';

@Injectable()
export class AuthService {
  authState: Observable<AuthState>;

  constructor(private authToken: Angular2TokenService,
              private store: Store<AppState>,
              private router: Router) {
                this.authState = this.store.select('auth');
              }

  // TODO: unsubscribe?
  logInUser(email: string, password: string) {
    this.authToken.signIn({ email, password })
      .subscribe(
        (response: Response) => {
          this.store.dispatch(new authActions.Signin());
          const token = response.headers.get('access-token');
          localStorage.setItem('token', token);
          this.router.navigate(['/todos']);

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
    this.router.navigate(['/login']);
  }

  signupUser(email: string, password: string) {
    this.authToken.registerAccount({ email, password, passwordConfirmation: password })
      .subscribe(
        (response: Response) => {
          this.store.dispatch(new authActions.Signup());
          const token = response.headers.get('access-token');

          localStorage.setItem('token', token);
          this.router.navigate(['/todos']);
        },
        (error) => {
          const message = JSON.parse(error._body).errors.full_messages[0];
          this.store.dispatch(new authActions.AuthError(message))
        }
      )
  }

}
