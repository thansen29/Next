import { Action } from '@ngrx/store';
import { Response } from '@angular/http';

export const RECEIVE_TASKS = 'RECEIVE_TASKS';
export const CLEAR_TASKS = 'CLEAR_TASKS';


export class ReceiveTasks implements Action {
  readonly type = RECEIVE_TASKS;
  constructor(public payload: Response ) {}
}

export class ClearTasks implements Action {
  readonly type = CLEAR_TASKS;
}

export type TaskActions = (
  ReceiveTasks |
  ClearTasks
);
