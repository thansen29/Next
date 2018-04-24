import { Action } from '@ngrx/store';

export const RECEIVE_LISTS = 'RECEIVE_LISTS';
export const RECEIVE_LIST = 'RECEIVE_LIST';
export const CREATE_LIST = 'CREATE_LIST';
export const EDIT_LIST = 'EDIT_LIST';
export const DELETE_LIST = 'DELETE_LIST';

export class ReceiveLists implements Action {
  readonly type = RECEIVE_LISTS;
  constructor(public payload: Object ) {}
}
export class ReceiveList implements Action {
  readonly type = RECEIVE_LIST;
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
  CreateList |
  EditList |
  DeleteList 
);
