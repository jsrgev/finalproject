import React from 'react';
import Feed from './Feed.jsx';
import TaskSection from './TaskSection.jsx';

class Home extends React.Component {
  render() {
    return (
      <>
        <main className="splitScreen">
          <Feed />    
          <TaskSection />
        </main>
      </>
      );
  }
}

export default Home;
