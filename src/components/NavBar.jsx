import React from 'react';
import {NavLink} from 'react-router-dom'
import {connect} from 'react-redux'
import {setLoginStatus,setUser} from '../redux/actions';

class NavBar extends React.Component {
	logout = () => {
	    this.props.setUser("");
	    this.props.setLoginStatus(false);
	    localStorage.removeItem("token");
	    localStorage.removeItem("user");
	}
	render () {
		const username = this.props.user.username;
		// if user is guest, logout redirects to home(landing page). otherwise redirects to login page
		let logout = (this.props.user._id === "615ec31650cfa00b8de0f3dd") ?
			<li><NavLink exact to={{pathname: '/', loggedOut: true}} onClick={this.logout} activeClassName="">Log Out</NavLink></li>
			:
			<li><NavLink to={{pathname: '/login', loggedOut: true}} onClick={this.logout}>Log Out</NavLink></li>
		return (
			<header>
				<div>
					<NavLink exact to='/'><span id="title">Finish It!</span></NavLink>
				{/*<NavLink exact to='/'>Home</NavLink>*/}
				</div>
				<ul>
				<NavLink exact to='/'>Home</NavLink>
					<li><NavLink to='/about'>About</NavLink></li>

				{!this.props.loggedIn ?
					<>
					<li><NavLink to='/login'>Log In</NavLink></li>
					<li><NavLink to='/register'>Register</NavLink></li> 
					</>
					:

					<>
					<li><NavLink to={`/profile/${username}`}>Profile</NavLink></li>
					<li><NavLink to='/account'>Account</NavLink></li>
					{logout}
					</>
				}
				</ul>
			</header>
		)
	}
}

const mapStateToProps = (state) => {
  return {
  	user: state.userReducer.user,
    loggedIn: state.userReducer.loggedIn
  }
}

const dispatchStateToProps = (dispatch) => {
  return {
    setLoginStatus: (value) => dispatch(setLoginStatus(value)),
    setUser: (id) => dispatch(setUser(id)),
  }
}

export default connect(mapStateToProps, dispatchStateToProps)(NavBar);

// export default NavBar;