import * as TaskActions from './task.actions';
import { ActionReducer, Action } from '@ngrx/store';
import { Task } from '../../../shared/task.model';

export interface State {
  tasks: Task[],
}

const initialState: State = {
  tasks: []
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

