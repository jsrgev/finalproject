import React from 'react';
import Feed from './Feed.jsx';
import Tasks from './Tasks.jsx';

class SplitDisplay extends React.Component {
  constructor(){
    super();
  }
  render() {
    return (
      <>
        <main id="splitMain">
          <Feed />
          <Tasks />
        </main>
      </>
      );
  }
}

export default SplitDisplay;
