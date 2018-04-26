import * as TaskActions from './task.actions';
import * as ListActions from '../list/list.actions';
import { ActionReducer, Action } from '@ngrx/store';
import { Task } from '../../../shared/task.model';

export interface State {
  tasks: Task[],
  selectedTask: Object
}

const initialState: State = {
  tasks: [],
  selectedTask: {
    task: null,
    list: ''
  }
}

export const taskReducer = (state: State = initialState, action: TaskActions.TaskActions | ListActions.ListActions) => {
  switch (action.type) {
    case TaskActions.RECEIVE_TASKS:
      return {
        ...state,
        tasks: action.payload
      };  
    case TaskActions.CLEAR_TASKS:
      return {
        ...state,
        tasks: []
      }
    case TaskActions.CLEAR_SELECTED:
      return {
        ...state,
        selectedTask: initialState.selectedTask
      }
    case TaskActions.SELECT_TASK:
      let newTask = Object.assign({}, state.selectedTask);
      newTask['task'] = action.payload;
      return {
        ...state,
        selectedTask: newTask
      }
    case ListActions.SELECT_LIST:
    let newSelectedTask = Object.assign({}, state.selectedTask )
    newSelectedTask['list'] = action.payload.title; 
      return {
        ...state,
        selectedTask: newSelectedTask
      }
      
    default:
      return state;
  }  
}

