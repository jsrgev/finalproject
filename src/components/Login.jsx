import React from 'react';
import axios from 'axios';
import '../App.css';
import {Link} from 'react-router-dom';

class Login extends React.Component {
  constructor(){
    super();
    this.state = {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      justRegistered: false
    }
  }
  changeUsername = (e) => {
    this.setState({username:e.target.value})
  }
  changePassword = (e) => {
    this.setState({password:e.target.value})
  }
  onSubmit = (e) => {
    e.preventDefault();
    const login = {
      username: this.state.username,
      password: this.state.password
    }
    // console.log(login);
    axios.post('http://localhost:4000/app/login', login)
    .then(response=>console.log(response))

    this.setState({
      username: "",
      password: "",
    })
  }
  render() {
    // console.log(this.props)
    let message = this.props.location.state ? (<div className="messageSection">You're signed up! Now you can log in.</div>) : null;

    return (
          <main id="register">
          {message}
          <h2>Login</h2>
          {/*{errorDisplay}*/}
            <form onSubmit={this.onSubmit}>
              <div><label>Username</label>
              <input type="text"
              onChange={this.changeUsername}
              value={this.state.username}
              /></div>
              <div><label>Password</label>
              <input type="password"
              onChange={this.changePassword}
              value={this.state.password}
              /></div>
              <div id="submitDiv">
                <input type="submit" value='Submit' />
              </div>
            </form>
            <div>Not registered? <Link to='/register/'>Sign up</Link></div>
          </main>
      );
  }
}

export default Login;
