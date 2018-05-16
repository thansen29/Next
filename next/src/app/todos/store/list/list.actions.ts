import { Action } from '@ngrx/store';

export const RECEIVE_LISTS = 'RECEIVE_LISTS';
export const RECEIVE_LIST = 'RECEIVE_LIST';
export const UPDATE_LIST = 'UPDATE_LIST';
export const SELECT_LIST = 'SELECT_LIST';
export const DELETE_LIST = 'DELETE_LIST';
export const CLEAR_SELECTED = 'CLEAR_SELECTED';

export class ReceiveLists implements Action {
  readonly type = RECEIVE_LISTS;
  constructor(public payload: Object ) {}
}

export class ReceiveList implements Action {
  readonly type = RECEIVE_LIST;
  constructor(public payload: Object ) {}  
}

export class UpdateList implements Action {
  readonly type = UPDATE_LIST;
  constructor(public payload: Object ) {}  
}

export class SelectList implements Action {
  readonly type = SELECT_LIST;
  constructor(public payload: Object ) {}
}

export class DeleteList implements Action {
  readonly type = DELETE_LIST;
  constructor(public payload: number ) {}
  
}

export class ClearSelected implements Action {
  readonly type = CLEAR_SELECTED;
}

export type ListActions = (
  ReceiveLists |
  ReceiveList |
  UpdateList |
  SelectList |
  DeleteList |
  ClearSelected
);
