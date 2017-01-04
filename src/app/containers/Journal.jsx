import React from 'react';
import { connect } from 'react-redux';
import Journal from '../components/journal/Journal.jsx';
import {
  updateEntry,
  newEntry,
  selectEntry
} from '../actions/index';

const mapStateToProps = (state) => {
  return {
    currentEntry: state.journal.currentEntry,
    entries: state.journal.entries,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateEntry: ({id, text}) => {
      dispatch(updateEntry(id, text))
    },
    newEntry: () => {
      dispatch(newEntry());
    },
    selectEntry: (id) => {
      dispatch(selectEntry(id));
    }
  }
}

const JournalContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Journal)

export default JournalContainer;
