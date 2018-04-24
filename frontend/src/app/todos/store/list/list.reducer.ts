import * as ListActions from './list.actions';
import { ActionReducer, Action } from '@ngrx/store';

export interface State {
  lists: Object,
}

const initialState: State = {
  lists: Object,
}

export const listReducer = (state: State = initialState, action: ListActions.ListActions) => {
  switch (action.type) {
    case ListActions.RECEIVE_LISTS:
      return {
        ...state,
        lists: action.payload
      };  
    case ListActions.RECEIVE_LIST:
      return {
        ...state
      };
    case ListActions.CREATE_LIST:
      return {
        ...state
      };
    case ListActions.EDIT_LIST:
      return {
        ...state
      };
    case ListActions.DELETE_LIST:
      return {
        ...state
      }
    default:
      return state;
  }  
}

