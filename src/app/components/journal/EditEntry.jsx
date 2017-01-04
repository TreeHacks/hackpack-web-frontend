import React from 'react';
import _ from 'lodash';

const EditEntry = ({
  entries,
  currentEntry,
  updateEntry
}) => {
  let entry = _.find(entries, (e) => {
    return e.id === currentEntry;
  });

  return (
    <textarea
      id="editEntry"
      className="edit-entry"
      name="editEntry"
      value={entry.text}
      onChange={(e) => {
        updateEntry({
          id: currentEntry,
          text: document.getElementById('editEntry').value
        });
      }}>
    </textarea>
  )
}

export default EditEntry;
