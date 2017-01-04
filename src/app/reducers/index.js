import { combineReducers } from 'redux';
import * as actionTypes from '../actions/actionTypes';
import lodash from 'lodash';
import shortid from 'shortid';

let entries;
try {
  entries = JSON.parse(localStorage.getItem('entries'));
  if(entries === null) {
    throw "entries can't be null";
  }

  if(entries.length === 0) {
    throw "entries can't be empty";
  }
} catch(e) {
  localStorage.setItem('entries', JSON.stringify([{
    id: shortid.generate(),
    text: '',
    date: new Date()
  }]));

  entries = JSON.parse(localStorage.getItem('entries'));
}

const initialState = {
  currentEntry: entries[0].id,
  entries
}

const journalReducer = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.UPDATE_ENTRY:
      return Object.assign({}, state, {
        entries: action.entries,
        currentEntry: action.id
      });
    case actionTypes.NEW_ENTRY:
      return Object.assign({}, state, {
        entries: action.entries,
        currentEntry: action.id
      });
    case actionTypes.SELECT_ENTRY:
      return Object.assign({}, state, {
        currentEntry: action.id
      });
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  state: (state = {}) => state,
  journal: journalReducer
});

export default rootReducer;
