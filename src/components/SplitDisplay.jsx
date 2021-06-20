import React from 'react';
import Feed from './Feed.jsx';
import TaskList from './TaskList.jsx';

class SplitDisplay extends React.Component {
  render() {
    return (
      <>
        <main id="splitMain">
          <Feed />    
          <TaskList />
        </main>
      </>
      );
  }
}

export default SplitDisplay;
