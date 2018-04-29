import { Action } from '@ngrx/store';
import { Task } from '../../../shared/task.model';

export const RECEIVE_TASKS = 'RECEIVE_TASKS';
export const RECEIVE_TASK = 'RECEIVE_TASK';
export const SELECT_TASK = 'SELECT_TASK';
export const CLEAR_SELECTED = 'CLEAR_SELECTED';
export const CLEAR_TASKS = 'CLEAR_TASKS';


export class ReceiveTasks implements Action {
  readonly type = RECEIVE_TASKS;
  constructor(public payload: Object ) {}
}

export class ReceiveTask implements Action {
  readonly type = RECEIVE_TASK;
  constructor(public payload: Object ) {}
}


export class SelectTask implements Action {
  readonly type = SELECT_TASK;
  constructor(public payload: Task ) {}
}

export class ClearSelected implements Action {
  readonly type = CLEAR_SELECTED;
}

export class ClearTasks implements Action {
  readonly type = CLEAR_TASKS;
}

export type TaskActions = (
  ReceiveTasks |
  ReceiveTask |
  SelectTask |
  ClearSelected |
  ClearTasks
);
