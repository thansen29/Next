import { Injectable } from '@angular/core';
import { Angular2TokenService } from 'angular2-token';
import { Response, Headers } from '@angular/http';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { State as AuthState } from './store/auth.reducer';
import { AppState } from '../store/app.reducer';
import * as authActions from './store/auth.actions';

// import { AuthService as SocialService, SocialUser } from "angular4-social-login";
// import { FacebookLoginProvider, GoogleLoginProvider } from "angular4-social-login";

@Injectable()
export class AuthService {
  authState: Observable<AuthState>;
  // user: SocialUser;

  constructor(private authToken: Angular2TokenService,
              private store: Store<AppState>,
              private router: Router,
              ) {

                this.authState = this.store.select('auth');
                // private socialService: SocialService
                // this.socialService.authState.subscribe(
                //   (user) => {
                //     if (user) {
                //       this.user = user;

                //     }
                //   }, 
                //   (error) => {
                //     debugger
                //   }
                // );
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

  // googleSignin() {
  //   this.authToken.signInOAuth('google')
  //     .subscribe(
  //       (response) => {
  //         debugger
  //       },
  //       (error) => {
  //         debugger
  //       }
  //     )
  // }

  // processOAuthCallback() {
  //   debugger
  // }

  // googleSignin() {
  //   this.socialService.signIn(GoogleLoginProvider.PROVIDER_ID);
  //   console.log(this.user);
    
  // }

  // authSignout() {
  //   this.socialService.signOut();
  // }

  // processOAuthCallback() {
  //   debugger
  //   this.authToken.processOAuthCallback();
  // }

}
