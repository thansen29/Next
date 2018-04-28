import { Action } from '@ngrx/store';

export const RECEIVE_LISTS = 'RECEIVE_LISTS';
export const RECEIVE_LIST = 'RECEIVE_LIST';
export const SELECT_LIST = 'SELECT_LIST';
export const CLEAR_SELECTED = 'CLEAR_SELECTED';

export class ReceiveLists implements Action {
  readonly type = RECEIVE_LISTS;
  constructor(public payload: Object ) {}
}

export class ReceiveList implements Action {
  readonly type = RECEIVE_LIST;
  constructor(public payload: Object ) {}  
}

export class SelectList implements Action {
  readonly type = SELECT_LIST;
  constructor(public payload: Object ) {}
}

export class ClearSelected implements Action {
  readonly type = CLEAR_SELECTED;
}

export type ListActions = (
  ReceiveLists |
  ReceiveList |
  SelectList |
  ClearSelected
);
