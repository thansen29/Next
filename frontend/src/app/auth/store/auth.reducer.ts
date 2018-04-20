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
        debugger
        return {
          authenticated: true
        };
    case AuthActions.LOGOUT:
      debugger
      return {
        authenticated: false
      };
    case AuthActions.AUTH_ERROR:
      return {
        ...state,
        error: action.payload
      }
    default:
      return state;
  }
}
