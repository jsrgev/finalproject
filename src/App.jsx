import React from 'react';
// import axios from 'axios';
import './App.css';
import NavBar from './components/NavBar.jsx';
import SplitDisplay from './components/SplitDisplay.jsx';
import Profile from './components/Profile.jsx';
import Account from './components/Account.jsx';
import Footer from './components/Footer.jsx';
import { Route, Switch } from "react-router-dom";

class App extends React.Component {
  render() {
    return (
      <>
        <NavBar />
        <Switch>
          <Route exact path="/" component={SplitDisplay} />
          <Route path="/profile" component={Profile} />
          <Route path="/account" component={Account} />
        </Switch>
        <Footer />
      </>
      );
  }
}

export default App;
