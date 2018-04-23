import { ActionReducerMap } from '@ngrx/store';
import { authReducer } from '../auth/store/auth.reducer';
import { State as auth} from '../auth/store/auth.reducer';

export interface AppState {
  auth
}

export const reducers: ActionReducerMap<AppState> = {
  auth: authReducer
};
