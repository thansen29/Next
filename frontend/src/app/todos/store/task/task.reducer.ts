import { ActionReducer, Action } from '@ngrx/store';
import * as _ from 'lodash';
import * as TaskActions from './task.actions';

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
    case TaskActions.RECEIVE_TASK:
      let newTask = { [action.payload['id']]: action.payload };
      let newTasks = _.assign(state.tasks, newTask);
      return {
        ...state,
        tasks: newTasks
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
    case TaskActions.DELETE_TASKS:
      let oldTasks = _.assign({}, state);
      let filteredTasks = _.filter(oldTasks.tasks, task => {
        return !action.payload.includes(task.id);
      });
      filteredTasks = _.keyBy(filteredTasks, 'id')
      return {
        ...state,
        tasks: filteredTasks,
        selectedTask: null
      }
    case TaskActions.UPDATE_TASKS:
      let updatedTasks = _.assign({}, state);
      _.forEach(updatedTasks.tasks, task => {
        if (action.payload.includes(task.id)) {
          task.completed = !task.completed;
        }
      });
      return {
        ...state,
        tasks: updatedTasks.tasks,
      }
    default:
      return state;
  }  
}

