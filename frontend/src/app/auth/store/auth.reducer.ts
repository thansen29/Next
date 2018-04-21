import * as AuthActions from './auth.actions';

export interface State {
  authenticated: boolean,
  error: string
}

const initialState: State = {
  authenticated: false,
  error: ''
}

export function authReducer(state = initialState, action: AuthActions.AuthActions) {
  switch (action.type) {
    case AuthActions.SIGNUP:
      case AuthActions.SIGNIN:
        return {
          authenticated: true
        };
    case AuthActions.LOGOUT:
      return {
        authenticated: false
      };
    case AuthActions.AUTH_ERROR:
      return {
        ...state,
        error: action.payload
      }
    case AuthActions.CLEAR_ERRORS:
      console.log('CLEARING ERRORS');
      return {
        ...state,
        error: ''
      }
    default:
      return state;
  }
}
