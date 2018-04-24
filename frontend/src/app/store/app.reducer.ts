import { ActionReducerMap } from '@ngrx/store';
import { authReducer, State as auth } from '../auth/store/auth.reducer';
import { listReducer, State as list } from '../todos/store/list/list.reducer'

export interface AppState {
  auth,
  list
}

export const reducers: ActionReducerMap<AppState> = {
  auth: authReducer,
  list: listReducer
};
