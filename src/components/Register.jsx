import React from 'react';
import axios from 'axios';
import '../App.css';

class RegisterForm extends React.Component {
  constructor(){
    super();
    this.state = {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: ""
    }
  }
  changeFirstName = (e) => {
    this.setState({firstName:e.target.value})
  }
  changeLastName = (e) => {
    this.setState({lastName:e.target.value})
  }
  changeUsername = (e) => {
    this.setState({username:e.target.value})
  }
  changeEmail = (e) => {
    this.setState({email:e.target.value})
  }
  changePassword = (e) => {
    this.setState({password:e.target.value})
  }
  onSubmit = (e) => {
    e.preventDefault();
    const registered = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      username: this.state.username,
      email: this.state.email,
      password: this.state.password
    }
    console.log(registered);
    axios.post('http://localhost:4000/app/register', registered)
    .then(response=>console.log(response))

    this.setState({
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: ""
    })
  }
  render() {
    return (
          <main id="register">
            <form onSubmit={this.onSubmit}>
              <div><label>First Name</label>
              <input type="text"
              onChange={this.changeFirstName}
              value={this.state.firstName}
              /></div>
              <div><label>Last Name</label>
              <input type="text"
              onChange={this.changeLastName}
              value={this.state.lastName}
              /></div>
              <div><label>Username</label>
              <input type="text"
              onChange={this.changeUsername}
              value={this.state.username}
              /></div>
              <div><label>Email</label>
              <input type="email"
              onChange={this.changeEmail}
              value={this.state.email}
              /></div>
              <div><label>Password</label>
              <input type="password"
              onChange={this.changePassword}
              value={this.state.password}
              /></div>
              <div><label>Confirm password</label>
              <input type="password"
              // onChange={this.changePassword}
              // value={this.state.confirmPassword}
              /></div>
              <div id="submitDiv">
                <input type="submit" value='Submit' />
              </div>
            </form>
          </main>
      );
  }
}

export default RegisterForm;
