import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import * as AuthActions from './auth.actions';
import { Router } from '@angular/router';


@Injectable()
export class AuthEffects {
  @Effect()
  authSignin = this.actions$

  // this.authToken.signIn({
  //   email: 'tom@tet.com',
  //   password: 'password'
  // })
  //   .subscribe(
  //     (response) => {
  //       this.store.dispatch(new authActions.Signup());
  //     },
  //     (error) => {
  //       const message = JSON.parse(error._body).errors[0];
  //       this.store.dispatch(new authActions.AuthError(message))
  //     }
  //   );


  constructor(private actions$: Actions,
              private router: Router) {}
}
