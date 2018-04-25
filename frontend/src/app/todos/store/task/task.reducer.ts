import * as TaskActions from './task.actions';
import { ActionReducer, Action } from '@ngrx/store';

export interface State {
  tasks: Object,
}

const initialState: State = {
  tasks: Object,
}

export const taskReducer = (state: State = initialState, action: TaskActions.TaskActions) => {
  switch (action.type) {
    case TaskActions.RECEIVE_TASKS:
      return {
        ...state,
        tasks: action.payload
      };  

    default:
      return state;
  }  
}

