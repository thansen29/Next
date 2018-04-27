import * as AuthActions from './auth.actions';
import { ActionReducer, Action } from '@ngrx/store';

export interface State {
  currentUser: Object,
  authenticated: boolean,
  error: string
}

const initialState: State = {
  currentUser: {},
  authenticated: false,
  error: ''
}

export const authReducer = (state: State = initialState, action: AuthActions.AuthActions) => {
  switch (action.type) {
    case AuthActions.SIGNUP:
      case AuthActions.SIGNIN:
        return {
          ...state,
          authenticated: true
        };
    case AuthActions.LOGOUT:
      return {
        ...state,
        authenticated: false
      };
    case AuthActions.AUTH_ERROR:
      return {
        ...state,
        error: action.payload
      }
    case AuthActions.CLEAR_ERRORS:
      return {
        ...state,
        error: ''
      }
    default:
      return state;
  }
}

