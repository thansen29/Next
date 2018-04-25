import { Action } from '@ngrx/store';
import { Response } from '@angular/http';

export const RECEIVE_TASKS = 'RECEIVE_TASKS';

export class ReceiveTasks implements Action {
  readonly type = RECEIVE_TASKS;
  constructor(public payload: Response ) {}
}

export type TaskActions = (
  ReceiveTasks
);
