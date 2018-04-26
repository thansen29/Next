import * as ListActions from './list.actions';
import { ActionReducer, Action } from '@ngrx/store';
import { List } from '../../../shared/list.model';

export interface State {
  lists: List[],
selectedList: List
}

const initialState: State = {
  lists: [],
  selectedList: null
}

export const listReducer = (state: State = initialState, action: ListActions.ListActions) => {
  switch (action.type) {
    case ListActions.RECEIVE_LISTS:
      return {
        ...state,
        lists: action.payload
      };  
    case ListActions.SELECT_LIST:
      return {
        ...state,
        selectedList: action.payload
      }
    case ListActions.CLEAR_SELECTED:
      return {
        ...state,
        selectedList: null
      }
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

