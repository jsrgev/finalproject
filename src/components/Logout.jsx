import React from 'react';
import axios from 'axios';
import '../App.css';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {setLoginStatus,setUser} from '../redux/actions';

class Logout extends React.Component {
  // constructor(){
    // super();
    // this.state = {
      // username: "",
      // password: "",
      // errors: "",
      // confirmation: ""
    // }
  // }
  componentDidMount = () => {
    this.props.setUser("");
    this.props.setLoginStatus(false);
    localStorage.removeItem("token");
  }
  render() {
    let messageSection = (this.props.loggedIn) ?
      <div>You have been logged out.</div> :
      <div>You are being logged out...</div>
    return (
          <main id="logout">
          {/*<h2>Login</h2>*/}
          {messageSection}
          </main>
      );
  }
}

// export default Login;

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

export default connect(mapStateToProps,dispatchStateToProps)(Logout);


