import { Action } from '@ngrx/store';

export const SIGNUP = 'SIGNUP';
export const SIGNIN = 'SIGNIN';
export const LOGOUT = 'LOGOUT';
export const AUTH_ERROR = 'AUTH_ERROR';

export class Signup implements Action {
  readonly type = SIGNUP;
}

export class Signin implements Action {
  readonly type = SIGNIN;
}

export class Logout implements Action {
  readonly type = LOGOUT;
}

export class AuthError implements Action {
  readonly type = AUTH_ERROR;

  constructor(public payload: string) {}
}

export type AuthActions = (
  Signup |
  Signin |
  Logout |
  AuthError
);
