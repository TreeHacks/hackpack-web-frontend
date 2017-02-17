import React from 'react';
import _ from 'lodash';

const EditEntry = ({
  // props go here
}) => {
  let entry = {
    id: '1',
    text: 'Hello world',
    date: new Date()
  }

  return (
    <textarea
      id="editEntry"
      className="edit-entry"
      name="editEntry"
      value={entry.text}
      onChange={(e) => {
        // action to call on change
      }}>
    </textarea>
  )
}

export default EditEntry;
