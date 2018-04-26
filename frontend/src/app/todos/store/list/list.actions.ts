import { Action } from '@ngrx/store';
import { Response } from '@angular/http';
import { List } from '../../../shared/list.model';

export const FETCH_LISTS = 'FETCH_LISTS';
export const RECEIVE_LISTS = 'RECEIVE_LISTS';
export const RECEIVE_LIST = 'RECEIVE_LIST';
export const SELECT_LIST = 'SELECT_LIST';
export const CREATE_LIST = 'CREATE_LIST';
export const EDIT_LIST = 'EDIT_LIST';
export const DELETE_LIST = 'DELETE_LIST';

export class FetchLists implements Action {
  readonly type = FETCH_LISTS;
}

export class ReceiveLists implements Action {
  readonly type = RECEIVE_LISTS;
  constructor(public payload: List[] ) {}
}

export class ReceiveList implements Action {
  readonly type = RECEIVE_LIST;
}

export class SelectList implements Action {
  readonly type = SELECT_LIST;
  constructor(public payload: List ) {}
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

export type ListActions = (
  ReceiveLists |
  ReceiveList |
  SelectList |
  CreateList |
  EditList |
  DeleteList 
);
