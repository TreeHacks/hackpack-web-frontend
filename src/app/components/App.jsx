import React, { PropTypes } from 'react';

function App({ children }) {
  return (
    <div className="container">
      {children}
    </div>
  );
}

App.propTypes = { children: PropTypes.object };

export default App;
