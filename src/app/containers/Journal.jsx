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
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

const JournalContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Journal)

export default JournalContainer;
