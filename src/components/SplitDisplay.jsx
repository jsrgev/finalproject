import React from 'react';
import Feed from './Feed.jsx';
import TaskSection from './TaskSection.jsx';

class SplitDisplay extends React.Component {
  render() {
    return (
      <>
        <main id="splitMain">
          <Feed />    
          <TaskSection />
        </main>
      </>
      );
  }
}

export default SplitDisplay;
