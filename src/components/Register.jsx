import React from 'react';
import axios from 'axios';
import '../App.css';
import {Link} from 'react-router-dom';

class RegisterForm extends React.Component {
  constructor(){
    super();
    this.state = {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
      password2: "",
      errors: [],
      cleared: false
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
  changePassword2 = (e) => {
    this.setState({password2:e.target.value})
  }
  checkForErrors = async () => {
    let errors = [];
    // Check form for errors
    const {firstName, lastName, username, email, password, password2} = this.state;
    if (!firstName || !lastName || !email || !username || !password || !password2) {
      errors.push ({msg: 'Please fill in all fields.'})
    }
    if (password !== password2 && password.length>0 && password2.length>0) {
      errors.push ({msg: 'Passwords do not match.'})
    }
    if (password.length<6 && password.length>0) {
      errors.push ({msg: 'Password must be at least 6 characters.'})
    }
    if (password === username) {
      errors.push ({msg: 'Password cannot match username.'})
    }
    if (password === email) {
      errors.push ({msg: 'Password cannot match email.'})
    }
    if (password === firstName || password === lastName || password === firstName+lastName) {
      errors.push ({msg: 'Password cannot be your name.'})
    }
    if (password === "password") {
      errors.push ({msg: 'Password is too easy to guess. Please choose a different one.'})
    }

    let ok = await this.setState({"errors": errors, cleared: true});
    // console.log(errors);
    // setTimeout(()=>{console.log(this.state.errors)},500);
  }
  onSubmit = async (e) => {
    e.preventDefault();
    // this.setState({errors: []});
    await this.checkForErrors();
    const registered = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
      // password2: this.state.password2
    }
    console.log(this.state.errors);
    if (this.state.errors.length>0)  {
      return;
    }
    return;
    // console.log(registered);
    axios.post('http://localhost:4000/user/register', registered)
    .then(response=> {
    // console.log(response.data);
     if (response.data.errors) {
        this.setState({errors:response.data.errors});
    } else if (response.data.username) {
      this.props.history.push('/login', { justRegistered: true });
      // console.log("registered")
    }
  })
    .catch(err=>console.log(err))

  }
  render() {
    let alerts = this.state.errors && (
        <div className="alerts">
        {
          this.state.errors.map((item,i) => {
          return <div className="error" key={i}>{item.msg}</div>
        })
        }
        </div>
      )
    // this.state.errors.map((item,i) => {
      // return (
        // <div className="alerts error" key={i}>{item.msg}</div>
        // )
    // });

    return (
          <main id="register">
            <h2>Register</h2>
            {alerts}
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
              onChange={this.changePassword2}
              value={this.state.password2}
              /></div>
              <div id="submitDiv">
                <input type="submit" value='Submit' />
              </div>
            </form>
            <div>Already registered? <Link to='/login/'>Login</Link></div>
          </main>
      );
  }
}

export default RegisterForm;
