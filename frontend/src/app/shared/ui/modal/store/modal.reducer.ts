import * as ModalActions from './modal.actions';
import { ActionReducer, Action } from '@ngrx/store';

export interface State {
  isOpen: boolean
}

const initialState: State = {
  isOpen: false
}

export const modalReducer = (state: State = initialState, action: ModalActions.ModalActions) => {
  switch (action.type) {
    case ModalActions.OPEN_MODAL:
      return {
        ...state,
        isOpen: true
      };  
    case ModalActions.CLOSE_MODAL:
      return {
        ...state,
        isOpen: false
      }
    default:
      return state;
  }  
}

