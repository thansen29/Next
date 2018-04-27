import { Action } from '@ngrx/store';

export const FETCH_LISTS = 'FETCH_LISTS';
export const RECEIVE_LISTS = 'RECEIVE_LISTS';
export const RECEIVE_LIST = 'RECEIVE_LIST';
export const SELECT_LIST = 'SELECT_LIST';
export const CREATE_LIST = 'CREATE_LIST';
export const EDIT_LIST = 'EDIT_LIST';
export const DELETE_LIST = 'DELETE_LIST';
export const CLEAR_SELECTED = 'CLEAR_SELECTED';

export class FetchLists implements Action {
  readonly type = FETCH_LISTS;
}

export class ReceiveLists implements Action {
  readonly type = RECEIVE_LISTS;
  constructor(public payload: Object ) {}
}

export class ReceiveList implements Action {
  readonly type = RECEIVE_LIST;
}

export class SelectList implements Action {
  readonly type = SELECT_LIST;
  constructor(public payload: Object ) {}
}

export class CreateList implements Action {
  readonly type = CREATE_LIST;
}

export class EditList implements Action {
  readonly type = EDIT_LIST;
}

export class DeleteList implements Action {
  readonly type = DELETE_LIST;
}

export class ClearSelected implements Action {
  readonly type = CLEAR_SELECTED;
}

export type ListActions = (
  ReceiveLists |
  ReceiveList |
  SelectList |
  CreateList |
  EditList |
  DeleteList |
  ClearSelected
);
