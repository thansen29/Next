import { Action } from '@ngrx/store';
import { Response } from '@angular/http';
import { Task } from '../../../shared/task.model';

export const RECEIVE_TASKS = 'RECEIVE_TASKS';
export const CLEAR_TASKS = 'CLEAR_TASKS';


export class ReceiveTasks implements Action {
  readonly type = RECEIVE_TASKS;
  constructor(public payload: Task[] ) {}
}

export class ClearTasks implements Action {
  readonly type = CLEAR_TASKS;
}

export type TaskActions = (
  ReceiveTasks |
  ClearTasks
);
