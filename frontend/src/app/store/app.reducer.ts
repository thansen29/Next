import { ActionReducerMap } from '@ngrx/store';
import { authReducer, State as auth } from '../auth/store/auth.reducer';
import { listReducer, State as list } from '../todos/store/list/list.reducer'
import { taskReducer, State as task } from '../todos/store/task/task.reducer'


export interface AppState {
  auth,
  list,
  task
}

export const reducers: ActionReducerMap<AppState> = {
  auth: authReducer,
  list: listReducer,
  task: taskReducer
};
