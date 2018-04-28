import { ActionReducerMap } from '@ngrx/store';
import { authReducer, State as auth } from '../auth/store/auth.reducer';
import { listReducer, State as list } from '../todos/store/list/list.reducer'
import { taskReducer, State as task } from '../todos/store/task/task.reducer'
import { modalReducer, State as modal } from '../shared/ui/modal/store/modal.reducer';
// should really make this a ui combined reducer


export interface AppState {
  auth,
  list,
  task,
  modal
}

export const reducers: ActionReducerMap<AppState> = {
  auth: authReducer,
  list: listReducer,
  task: taskReducer,
  modal: modalReducer
};
