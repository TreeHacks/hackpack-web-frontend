import React from 'react';
import _ from 'lodash';

const Sidebar = ({
  entries,
  newEntry,
  selectEntry
}) => {
  let displayEntries = [];
  entries.forEach(entry => {
    let text = entry.text.substr(0, 20) + '...';
    displayEntries.push((
      <li key={entry.id} onClick={() => { selectEntry(entry.id); }}>
        {text}
      </li>
    ));
  })

  return (
    <div className="sidebar">
      <h2>Your entries</h2>
      <div
        className="button new-button"
        onClick={(e) => {
        e.preventDefault();
        newEntry();
      }}>New</div>
      <ul>
        {displayEntries}
      </ul>
    </div>
  );
}

export default Sidebar;
