import React from 'react';
import _ from 'lodash';
import { Link } from 'react-router';

const Sidebar = ({

}) => {
  let displayEntries = [];
  let entries = [{
    id: '1',
    text: 'Hello world',
    date: new Date()
  }];
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

      }}>New</div>
      <ul>
        {displayEntries}
      </ul>

    </div>
  );
}

export default Sidebar;
