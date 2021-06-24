import React from 'react';
import axios from 'axios';
import '../App.css';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {setLoginStatus,setUser} from '../redux/actions';

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
    // console.log(this.props.location);
  // logout sets loggedOut to true, so following message can be displayed
  (this.props.location.loggedOut === true) && this.setState({confirmation: "You've successfully logged out."})
  // successful register sets state.justRegistered to true, so following message can be displayed
  this.props.location.state && this.setState({confirmation: "You're signed up! Now you can log in."})
  }
  changeUsername = (e) => {
    this.setState({username:e.target.value})
  }
  changePassword = (e) => {
    this.setState({password:e.target.value})
  }
  onSubmit = (e) => {
    e.preventDefault();
    this.setState({errors: "", confirmation: ""});
    const login = {
      username: this.state.username,
      password: this.state.password
    }
    axios.post('http://localhost:4000/user/login', login)
    .then(response => {
      if (response.data.auth) {
        // console.log(response.data);
        this.setState({confirmation:"You've successfully logged in."})
        localStorage.setItem("token", response.data.token);
        // console.log(response.data);
        localStorage.setItem("user", response.data.userInfo);
        this.props.setLoginStatus(true);
        this.props.setUser(response.data.userInfo)
    // console.log(this.props);
        this.props.history.push('/');
      } else {
        this.setState({errors: response.data.message})
        // console.log(this.state)
      }
    })
  }
  handleClick = () => {
    console.log(localStorage.getItem("token"));
    axios.get('http://localhost:4000/user/isUserAuthenticated', {
      headers: {
        "x-access-token": localStorage.getItem("token")
      }
    })
    .then(response => {
      if (response) {
        console.log(response);
      } else {
        console.log(response)
      }
    })
    .catch(err =>console.log(err))
  }
  render() {
    // console.log(this.props)
    // console.log(this.state);
    let alerts = (this.state.confirmation) ?
      <div className="alerts"><div>{this.state.confirmation}</div></div> :
      (this.state.errors) ?
      <div className="alerts"><div className="error">{this.state.errors}</div></div> : null
  // }

    // console.log(this.props.loggedIn);
    return (
          <main id="login">
          <h2>Login</h2>
          {alerts}
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
                <button onClick={this.handleClick}>authenticated?</button>
              </div>
            </form>
            <div>Not registered? <Link to='/register/'>Sign up</Link></div>
          </main>
      );
  }
}

// export default Login;

// const mapStateToProps = (state) => {
//   return {
//     loggedIn: state.userReducer.loggedIn
//   }
// }

const dispatchStateToProps = (dispatch) => {
  return {
    setLoginStatus: (value) => dispatch(setLoginStatus(value)),
    setUser: (id) => dispatch(setUser(id)),
  }
}

export default connect(null,dispatchStateToProps)(Login);


