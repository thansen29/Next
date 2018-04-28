import * as TaskActions from './task.actions';
import { ActionReducer, Action } from '@ngrx/store';

export interface State {
  tasks: Object,
  selectedTask: Object
}

const initialState: State = {
  tasks: {},
  selectedTask: null

}

export const taskReducer = (state: State = initialState, action: TaskActions.TaskActions) => {
  switch (action.type) {
    case TaskActions.RECEIVE_TASKS:
      return {
        ...state,
        tasks: action.payload
      };  
    case TaskActions.CLEAR_TASKS:
      return {
        ...state,
        tasks: {},
        selectedTask: null
      }
    case TaskActions.CLEAR_SELECTED:
      return {
        ...state,
        selectedTask: initialState.selectedTask
      }
    case TaskActions.SELECT_TASK:
      return {
        ...state,
        selectedTask: action.payload
      }
    default:
      return state;
  }  
}

