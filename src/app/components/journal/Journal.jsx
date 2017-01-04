import React from 'react';
import Sidebar from './Sidebar';
import EditEntry from './EditEntry';
import './journal.scss';

const Journal = ({
  entries,
  currentEntry,
  newEntry,
  selectEntry,
  updateEntry
}) => {
  return (
    <div className="journal">
      <Sidebar />
      <EditEntry />
    </div>
  )
}

export default Journal;
