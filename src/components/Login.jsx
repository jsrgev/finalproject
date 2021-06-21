import React from 'react';
import axios from 'axios';
import '../App.css';

class Login extends React.Component {
  constructor(){
    super();
    this.state = {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: ""
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
    const registered = {
      username: this.state.username,
      password: this.state.password
    }
    console.log(registered);
    axios.post('http://localhost:4000/app/login', registered)
    .then(response=>console.log(response))

    this.setState({
      username: "",
      password: "",
    })
  }
  render() {
    return (
          <main id="register">
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
          </main>
      );
  }
}

export default Login;
