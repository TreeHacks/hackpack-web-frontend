# Web Frontend Hackpack

We are going to build a journaling/note web app that looks like this:

![sample](https://cloud.githubusercontent.com/assets/3401801/21839837/cc082120-d78e-11e6-836e-0cad2e505736.png)

To build this, we are going to use React and Redux. To store our data, we are going to use LocalStorage, which allows you to have a sort of little datastore in your browser.

There are a bunch of different approaches and frameworks that we could use to create the same app, but I like React + Redux because together they give you a very clean and logical way of handling interactions, flowing data through, and creating new features for your app.

This tutorial includes code that uses a lot of ES6 (and updated version of JavaScript) syntax. If you're not familiar with some syntax, [this](http://es6-features.org/) is a great source to refer to. If you're not familiar with JavaScript, [this](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference) is a great reference tool and [this](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps/A_first_splash) and [this](https://www.codecademy.com/) are great learning resources.

To start, make sure you have git installed and clone this repository:

```
git clone https://github.com/TreeHacks/hackpack-web-frontend
```
If you haven't already, install Node.js by following the instructions [here](https://nodejs.org/en/download/package-manager/).

Go into the folder you cloned your repository into and install the necessary packages:

```
cd hackpack-web-frontend
npm install
```

This might take a while, but once it finishes, make sure you can run the app by running:

```
npm run dev
```

This command runs a dev server (you can check what the actual command is in `package.json`) that autoreloads your app as you make changes. You don't need to worry too much about what's going on with that for this tutorial (but if you're interested, the app is using [react hot loading](https://www.youtube.com/watch?v=xsSnOQynTHs).

Go to [http://localhost:3000](http://localhost:3000) and you should see something similar to the picture below.

Now that you've successfully installed and run the app, lets get coding.

In React, each part of your app (button, header, etc.) can be defined as a 'component' which you can reuse wherever you need to. 

Redux essentially allows us to have a centralized store for data that we can flow through our app and dispatch actions to mutate it (don't worry if this doesn't completely make sense right now! you'll see what I mean in a bit).

### Building blocks (components)

For the journal interface, we'll need a sidebar and an editing interface component. The sidebar will list your entries, and you can either click on one to edit it or create a new entry. The editing interface will be a plain text input area. Lets define these components a bit further.

In `src/app/components/journal/Sidebar.jsx`, replace the contents with:

```
import React from 'react';
import _ from 'lodash';
import { Link } from 'react-router';

const Sidebar = ({
  // props go here
}) => {
  let displayEntries = [];
  let entries = [{
    id: '1',
    text: 'Hello world',
    date: new Date()
  }]

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
        // actions to dispatch go here
      }}>New</div>
      <ul>
        {displayEntries}
      </ul>
    </div>
  );
}

export default Sidebar;
```

The declaration syntax is defining a new React 'component'.

Here, we hard-code the variable `entries` and then iterate through them to display a `li` item for each of them.

Next, in `src/app/components/journal/EditEntry.jsx` change the contents to the following:

```
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
```

This `textarea` will always display `Hello world` from the `entry` variable we defined.

The default component to be displayed right now is `src/app/components/Journal.jsx`. In that file, we'll need to add the `Sidebar` and `EditEntry` to the `Journal` component so they'll be rendered when we open the website. in `Journal.jsx`, change it to the following:

```
import React from 'react';
import Sidebar from './Sidebar';
import EditEntry from './EditEntry';
import './journal.scss';

const Journal = ({
  // props go here
}) => {
  return (
    <div className="journal">
      <Sidebar />
      <EditEntry />
    </div>
  )
}

export default Journal;
```

You'll see here that we import both of the components at the top and then add them to what's rendered.

Try opening the app again, and you'll see that you can't edit the content of the `textarea`. That's because its value isn't updating when it changes. I left some placeholder comments where we're going to add in some **action**! Now we're going to make everything actually functional.

### Action!
For this iteration of the website, we're going to support 3 actions:

1. The user can edit the current entry (most recent will appear when the site is opened).
2. The user can select a different entry to edit.
3. The user can create a new entry.

In `src/app/actions/actionTypes.js` add these:

```
export const NEW_ENTRY = 'NEW_ENTRY';
export const UPDATE_ENTRY = 'UPDATE_ENTRY';
export const SELECT_ENTRY = 'SELECT_ENTRY';
```

We'll use these constants so we'll have a consistent action type name throughout our app.

In `src/app/actions/index.js` add the following:

```
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
      entries.splice(entryIndex, 1);
      entries.unshift({
        id,
        text,
        date: new Date()
      });
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
```

This is a lot of code. What's going on here?

We are defining the three actions that can occur with our app. We are storing our `entries` in `localStorage`. Since `localStorage` stores our data in a string, we have to use `JSON.parse` and `JSON.stringify` to convert back and forth between string and object when we retrieve and save. 

`updateEntry` has some logic to either save a new entry or update an existing one based on the `id`.

`newEntry` creates and saves a new entry in our store.

`selectEntry` simply returns the selected id.

Each of the actions ultimately returns an object with `type` and other data points. Our `localStorage` functionality is imitating that of a basic database. Often, these actions would call to some API (Application Program Interface) to update or retrieve data. Otherwise, the actions may simply pass down data, like `selectEntry` to notify the rest of the app of some user input.

### Reduce!

Now that we've defined the actions, lets figure out how to use those actions and update our app state accordingly.

In `src/app/reducers/index.js` change it to the following:

```
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
```

This is again a lot of code. At the top, we have some logic to initialize `entries` in localStorage if it is either empty or invalid. Usually you wouldn't run into any errors, but there are some edge cases where your localStorage object may go haywire.

Then, we define `initialState` which is the default state when the app opens (before any user interaction goes on).

After that, we define a reducer, which takes whatever action that has been `dispatch`ed and decides how to update the state with the action's data. If you haven't seen the `Object.assign({}, state, { DATA })` syntax before, it is merging `{ DATA }` onto `state` in a new object (in other words, it returns an updated state with whatever was in `{ DATA }`). The reducer returns this updated state. The application's state is then updated to that new state.

Now that the actions actually **do** things, lets start adding in data and actions to the components.

Change `src/app/containers/Journal.jsx` to:

```
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
```

`JournalContainer` here wraps the `Journal` component we defined earler and ties it to Redux's datastore by calling `connect`.

In this, we also pass in two functions: `mapStateToProps` and `mapDispatchToProps`. We have these functions to filter out what parts of the state that we want to pass into `Journal`. The `dispatch` function essentially sends the data from a given action to the reducers, which again decide how to take that data and update the overall state of the app.

In `src/app/components/journal/Journal.jsx` update the `Journal` variable to:

```
const Journal = ({
  entries,
  currentEntry,
  newEntry,
  selectEntry,
  updateEntry
}) => {
  return (
    <div className="journal">
      <Sidebar
        newEntry={newEntry}
        selectEntry={selectEntry}
        entries={entries} />
      <EditEntry
        entries={entries}
        currentEntry={currentEntry}
        updateEntry={updateEntry} />
    </div>
  )
}
```

Here, we get all of those `props` we just made in `JournalContainer` and give `Sidebar` and `EditEntry` access to them.

Now, lets use those `props`. In `src/app/components/journal/Sidebar.jsx`, change `Sidebar` to:

```
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
```

and your `EditEntry` component to:

```
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
```

Instead of the hard-coded variables we had earlier, we use the `props` (state data and dispatch functions) that are passed down.

Now your app should be fully functional! You can edit entries and create new ones.

### Linking to a new page
Since you'll probably find yourself needing to do this in the future, here's how to add a link to a page.

In your `Sidebar` component, add `<Link to='/about'>About</Link>` after `</ul>` towards the end of your definition. At the top of the file, you'll see we already `import`ed `{ Link } from 'react-router';`. After adding this, you'll be able to click on that link which goes to `/about`. You can check out that component in `src/app/components/about/About.jsx`.

### Moving forward
You've successfully built a basic React + Redux app -- components, actions, reducers, and all! React + Redux is known to have a steep learning curve at first, so it's okay if you still have questions about exactly what's going on in the app.

To solidify your understanding, here are a few additions you can add to your app:

- Delete function (let the user delete an entry)
- Display the date created/edited in the sidebar under each entry in the list
- Add a title attribute to each entry and display that in the sidebar

Beyond that, you could add a bunch of features to this journal app, scrap the entire journal app and use your newfound knowledge to go build something completely different, hook up your app to a backend server (through your actions!) instead of using `localStorage`. The possibilities are endless.

Hit me up @organizer-btroo on Slack if you ran into any issues or want to chat about where to go from here!

### Credit
Created by Brandon Truong

This hackpack is based on [express-react-redux-starter](https://github.com/DimitriMikadze/express-react-redux-starter).
