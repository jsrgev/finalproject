import React from 'react';
import axios from 'axios';
import '../App.css';
import {Link} from 'react-router-dom';
import { BASE_API_URL } from '../utils/constants';

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
    }
  }
  changeField = (e) => {
    this.setState({[e.target.name]:e.target.value})
  }
  checkForErrors = () => {
      let errors = [];
      let passwordErrors = [];
      // Check form for errors
      const {firstName, lastName, username, email, password, password2} = this.state;
      if (!firstName || !lastName || !email || !username || !password || !password2) {
         errors.push ({msg: 'Please fill in all fields.'})
      }

      if (password.length>0) {
         if (password.length<6) {
           passwordErrors.push ({msg: 'Password must be at least 6 characters.'})
         } else {

            if (password === username) {
               passwordErrors.push ({msg: 'Password cannot match username.'})
            }
            if (password === email) {
               passwordErrors.push ({msg: 'Password cannot match email.'})
            }
            if (password === firstName || password === lastName || password === firstName+lastName) {
               passwordErrors.push ({msg: 'Password cannot be your name.'})
            }
            if (password === "password") {
               passwordErrors.push ({msg: 'Password is too easy to guess. Please choose a different one.'})
            }
         }
         if (passwordErrors.length===0 && password !== password2 && password2.length>0) {
            passwordErrors.push ({msg: 'Passwords do not match.'})
         }
      }
      this.setState({"errors": [...errors,...passwordErrors]});
      return errors;
  }
  onSubmit = async (e) => {
    e.preventDefault();
    await this.checkForErrors();
    // const registered = {
    //   firstName: this.state.firstName,
    //   lastName: this.state.lastName,
    //   username: this.state.username,
    //   email: this.state.email,
    //   password: this.state.password,
    // }
    if (this.state.errors.length>0)  {
      return;
    }
    const {password2, errors, ...registered} = this.state;
    // console.log({registered, registered2});
    // return;
    axios.post(`${BASE_API_URL}/user/register`, registered)
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

    return (
          <main id="register">
            <h2>Register</h2>
            {alerts}
            <form onSubmit={this.onSubmit}>
              <div><label>First Name</label>
              <input type="text"
              name="firstName"
              onChange={this.changeField}
              value={this.state.firstName}
              /></div>
              <div><label>Last Name</label>
              <input type="text"
              name="lastName"
              onChange={this.changeField}
              value={this.state.lastName}
              /></div>
              <div><label>Username</label>
              <input type="text"
              name="username"
              onChange={this.changeField}
              value={this.state.username}
              /></div>
              <div><label>Email</label>
              <input type="email"
              name="email"
              onChange={this.changeField}
              value={this.state.email}
              /></div>
              <div><label>Password</label>
              <input type="password"
              name="password"
              onChange={this.changeField}
              value={this.state.password}
              /></div>
              <div><label>Confirm password</label>
              <input type="password"
              name="password2"
              onChange={this.changeField}
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
