import React from 'react';
// import axios from 'axios';
import './App.css';
import NavBar from './components/NavBar.jsx';
import SplitDisplay from './components/SplitDisplay.jsx';
import Profile from './components/Profile.jsx';
import About from './components/About.jsx';
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';
import Account from './components/Account.jsx';
import Footer from './components/Footer.jsx';
import Logout from './components/Logout.jsx';
import { Route, Switch } from "react-router-dom";
import {connect} from 'react-redux';
import {setLoginStatus,setUser} from './redux/actions';

class App extends React.Component {
  componentDidMount = () => {
    if (localStorage.getItem("token")) {
    // console.log(localStorage.getItem("token"));

      this.props.setLoginStatus(true);
      this.props.setUser(localStorage.getItem("user"));
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
              <Route path="/" component={Login} />
        </Switch>
            </>
           :
            <>
        <Switch>
          <Route path="/about" component={About} />
          <Route path="/profile" component={Profile} />
          <Route path="/account" component={Account} />
          <Route path="/logout" component={Logout} />
          <Route path="/" component={SplitDisplay} />
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
    loggedIn: state.loggedIn
  }
}

const dispatchStateToProps = (dispatch) => {
  return {
    setLoginStatus: (value) => dispatch(setLoginStatus(value)),
    setUser: (id) => dispatch(setUser(id)),
  }
}


export default connect(mapStateToProps, dispatchStateToProps)(App);

// export default App;
