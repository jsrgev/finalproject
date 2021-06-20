import React from 'react';
import axios from 'axios';
import './App.css';
import NavBar from './components/NavBar.jsx';
import Feed from './components/Feed.jsx';
import Tasks from './components/Tasks.jsx';
import Footer from './components/Footer.jsx';

class App extends React.Component {
  constructor(){
    super();
  }
  render() {
    return (
      <>
        <NavBar />
        <main>
          <Feed />
          <Tasks />
        </main>
        <Footer />
      </>
      );
  }
}

export default App;
