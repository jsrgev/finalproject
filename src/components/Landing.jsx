import React from 'react';
import axios from 'axios';
import '../App.css';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {setLoginStatus,setUser} from '../redux/actions';
import { BASE_API_URL } from '../utils/constants';

class Landing extends React.Component {
  // constructor(){
  //   super();
  //   this.state = {
  //     username: "",
  //     password: "",
  //     errors: "",
  //     confirmation: ""
  //   }
  // }
  onSubmit = (e) => {
    e.preventDefault();
    const login = {
      username: "guest",
      password: "123456"
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
  render() {
    return (
          <main class="splitScreen">
            <div class="generic">
              <p>Welcome to Finish It!</p>
              <p>Are you having trouble getting things done? This site allows you to keep track of your tasks and share your progress with the community. You can give and get feedback, and set penalties if you wish for tasks you haven't completed on time. <Link to='/about/'>Read more</Link></p>
            </div>
            <div class="generic">
              <p>Already a member? <Link to='/login/'>Log In</Link></p>
              <p>Not yet a member? <Link to='/register/'>Register</Link></p>
              <p>Just want to take a look? Click below to instantly sign in as a guest:</p>
              <div id="submitDiv">
                <input onClick={this.onSubmit} type="submit" value="Guest Login" />
              </div>
              <p>(As a guest you will be able to do anything except change account details, <strong>but</strong> your changes can be written over by written over by anyone else who uses this account.)</p>
            </div>
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

export default connect(null,dispatchStateToProps)(Landing);


