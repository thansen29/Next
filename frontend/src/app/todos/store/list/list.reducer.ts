import { ActionReducer, Action } from '@ngrx/store';
import * as _ from 'lodash';
import * as ListActions from './list.actions';

export interface State {
  lists: Object,
  selectedList: Object
}

const initialState: State = {
  lists: {},
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
      let newList = { [action.payload['id']]: action.payload }
      let newLists = _.assign(state.lists, newList);
      return {
        ...state,
        lists: newLists
      };
    case ListActions.UPDATE_LIST:
      let updatedLists = _.assign({}, state.lists);
      let oldList = updatedLists[action.payload['id']];
      oldList.title = action.payload['title'];
      return {
        ...state,
        lists: updatedLists
      }
    default:
      return state;
  }  
}

