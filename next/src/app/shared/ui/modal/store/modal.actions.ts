import { Action } from '@ngrx/store';

export const OPEN_MODAL = 'OPEN_MODAL';
export const CLOSE_MODAL = 'CLOSE_MODAL';

export class OpenModal implements Action {
  readonly type = OPEN_MODAL;
}

export class CloseModal implements Action {
  readonly type = CLOSE_MODAL;
}


export type ModalActions = (
  OpenModal |
  CloseModal
);
