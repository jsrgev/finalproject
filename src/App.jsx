import React from 'react';
// import axios from 'axios';
import './App.css';
import NavBar from './components/NavBar.jsx';
import Home from './components/Home.jsx';
import Profile from './components/Profile.jsx';
import About from './components/About.jsx';
import Landing from './components/Landing.jsx';
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';
import Account from './components/Account.jsx';
import Footer from './components/Footer.jsx';
import { Route, Switch } from "react-router-dom";
import {connect} from 'react-redux';
import {setLoginStatus,setUser} from './redux/actions';

class App extends React.Component {
  componentDidMount = () => {
    if (localStorage.getItem("token")) {
      this.props.setLoginStatus(true);
      this.props.setUser(JSON.parse(localStorage.getItem("user")));
    }
  }
  render() {
            // console.log(this.props)
    return (
      <>
        <NavBar />
          {!this.props.loggedIn ?
            <>
        <Switch>
          <Route path="/register" component={Register} />
          <Route path="/about" component={About} />
          <Route path="/login" component={Login} />
          <Route path="/" component={Landing} />
       </Switch>
            </>
           :
            <>
        <Switch>
          <Route path="/about" component={About} />
          <Route path="/profile/:username" component={Profile} />
          <Route path="/account" component={Account} />
          <Route path="/" component={Home} />
        </Switch>
          </>
          }

        <Footer />
      </>
      );
  }
}

const mapStateToProps = (state) => {
  return {
    loggedIn: state.userReducer.loggedIn
  }
}

const dispatchStateToProps = (dispatch) => {
  return {
    setLoginStatus: (value) => dispatch(setLoginStatus(value)),
    setUser: (info) => dispatch(setUser(info)),
  }
}

export default connect(mapStateToProps, dispatchStateToProps)(App);

