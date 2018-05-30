import { ActionReducer, Action } from '@ngrx/store';
import * as _ from 'lodash';
import * as TaskActions from './task.actions';

export interface State {
  tasks: Object,
  selectedTask: Object,
  error: string
}

const initialState: State = {
  tasks: {},
  selectedTask: null,
  error: ''

}

export function taskReducer (state: State = initialState, action: TaskActions.TaskActions) {
  switch (action.type) {
    case TaskActions.RECEIVE_TASKS:
      return {
        ...state,
        tasks: action.payload,
        error: ''
      };  
    case TaskActions.RECEIVE_TASK:
      let newTask = { [action.payload['id']]: action.payload };
      let newTasks = _.assign(state.tasks, newTask);
      return {
        ...state,
        tasks: newTasks,
        error: ''
      }; 
    case TaskActions.CLEAR_TASKS:
      return {
        ...state,
        tasks: {},
        selectedTask: null,
        error: ''
      }
    case TaskActions.CLEAR_SELECTED:
      return {
        ...state,
        selectedTask: initialState.selectedTask,
        error: ''
      }
    case TaskActions.SELECT_TASK:
      return {
        ...state,
        selectedTask: action.payload,
        error: ''
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
        selectedTask: null,
        error: ''
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
        error: ''
      }
    case TaskActions.UPDATE_TASK:
      let taskList = _.assign({}, state);
      taskList.tasks[action.payload['id']] = action.payload;
      return {
        ...state,
        tasks: taskList.tasks,
        selectedTask: action.payload,
        error: ''
      } 
    case TaskActions.RECEIVE_ALL_TASKS:
      return {
        ...state,
        tasks: action.payload
      }
    case TaskActions.TASK_ERROR:
      return {
        ...state,
        error: action.payload
      }
    default:
      return state;
  }  
}

