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
  console.log(this.props);
  (this.props.loggedIn === false) && this.setState({confirmation: "You've successfully logged out."})
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
    axios.post('http://localhost:4000/app/login', login)
    .then(response=> {
      if (response.data.auth) {
        console.log(response.data);
        this.setState({confirmation:"You've successfully logged in."})
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", response.data.user._id);
        this.props.setLoginStatus(true);
        this.props.setUser(response.data.user._id)
        this.props.history.push('/');
      } else {
        this.setState({errors: response.data.message})
        console.log(this.state)
      }
    })
  }
  handleClick = () => {
    console.log(localStorage.getItem("token"));
    axios.get('http://localhost:4000/app/isUserAuthenticated', {
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
    let messageSection = (this.state.confirmation) ?
      <div className="messageSection">{this.state.confirmation}</div> :
      (this.state.errors) ?
      <div className="messageSection error">{this.state.errors}</div> : null
  // }

    // console.log(this.props.loggedIn);
    return (
          <main id="login">
          <h2>Login</h2>
          {messageSection}
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

export default connect(mapStateToProps,dispatchStateToProps)(Login);


