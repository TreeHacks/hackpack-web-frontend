import * as actionTypes from './actionTypes';
import lodash from 'lodash';
import shortid from 'shortid';

export const updateEntry = (id, text) => {
  let entries = JSON.parse(localStorage.getItem('entries'));
  if(id === undefined || id === "") {
    id = shortid.generate();
    entries.unshift({
      id,
      text,
      date: new Date()
    })
  } else {
    let entryIndex = _.findIndex(entries, (entry) => { return id === entry.id; });
    if(entryIndex === 0) {
      entries[entryIndex]= {
        id,
        text,
        date: new Date()
      }
    } else {
      console.log(entries[0].id);
      entries.splice(entryIndex, 1);
      console.log(entries[0].id);
      entries.unshift({
        id,
        text,
        date: new Date()
      });
      console.log(entries[0].id);
    }
  }

  localStorage.setItem('entries', JSON.stringify(entries));

  return {
    type: actionTypes.UPDATE_ENTRY,
    id,
    entries
  };
}

export const newEntry = () => {
  let entries = JSON.parse(localStorage.getItem('entries'));
  let id = shortid.generate();
  let entry = {
    id,
    text: '',
    date: new Date()
  };

  entries.unshift(entry);
  localStorage.setItem('entries', JSON.stringify(entries));

  return {
    type: actionTypes.NEW_ENTRY,
    id,
    entries
  };
}

export const selectEntry = (id) => {
  return {
    type: actionTypes.SELECT_ENTRY,
    id
  };
}
