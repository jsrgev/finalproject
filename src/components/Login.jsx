import React from 'react';
import axios from 'axios';
import '../App.css';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {setLoginStatus,setUser} from '../redux/actions';
import { BASE_API_URL } from '../utils/constants';

class Login extends React.Component {
  constructor(){
    super();
    this.state = {
      username: "",
      password: "",
      errors: "",
      confirmation: ""
    }
  }
  componentDidMount = () => {
  // logout sets loggedOut to true, so following message can be displayed
  (this.props.location.loggedOut === true) && this.setState({confirmation: "You've successfully logged out."})
  // successful register sets state.justRegistered to true, so following message can be displayed
  this.props.location.state && this.setState({confirmation: "You're signed up! Now you can log in."})
  }
  changeField = (e) => {
    this.setState({[e.target.name]:e.target.value})
  }
  onSubmit = (e) => {
    e.preventDefault();
    this.setState({errors: "", confirmation: ""});
    const login = {
      username: this.state.username,
      password: this.state.password
    }
    axios.post(`${BASE_API_URL}/user/login`, login)
    .then(response => {
      if (response.data.auth) {
        this.setState({confirmation:"You've successfully logged in."})
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.userInfo));
        this.props.setLoginStatus(true);
        this.props.setUser(response.data.userInfo)
        this.props.history.push('/');
      } else {
        this.setState({errors: response.data.message})
      }
    })
  }
  // handleClick = () => {
  //   console.log(localStorage.getItem("token"));
  //   axios.get(`${BASE_API_URL}/user/isUserAuthenticated`, {
  //     headers: {
  //       "x-access-token": localStorage.getItem("token")
  //     }
  //   })
  //   .then(response => {
  //     if (response) {
  //       console.log(response);
  //     } else {
  //       console.log(response)
  //     }
  //   })
  //   .catch(err =>console.log(err))
  // }
  render() {
    let alerts = (this.state.confirmation) ?
      <div className="alerts"><div>{this.state.confirmation}</div></div> :
      (this.state.errors) ?
      <div className="alerts"><div className="error">{this.state.errors}</div></div> : null
    return (
          <main id="login">
          <h2>Login</h2>
          {alerts}
            <form onSubmit={this.onSubmit}>
              <div><label>Username</label>
              <input type="text"
              name="username"
              onChange={this.changeField}
              value={this.state.username}
              /></div>
              <div><label>Password</label>
              <input type="password"
              name="password"
              onChange={this.changeField}
              value={this.state.password}
              /></div>
              <div id="submitDiv">
                <input type="submit" value='Submit' />
                {/*<button onClick={this.handleClick}>authenticated?</button>*/}
              </div>
            </form>
            <div>Not registered? <Link to='/register/'>Sign up</Link></div>
          </main>
      );
  }
}


const dispatchStateToProps = (dispatch) => {
  return {
    setLoginStatus: (value) => dispatch(setLoginStatus(value)),
    setUser: (info) => dispatch(setUser(info)),
  }
}

export default connect(null,dispatchStateToProps)(Login);


