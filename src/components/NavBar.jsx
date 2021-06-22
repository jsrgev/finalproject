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
		return (
			<nav>
				<NavLink exact to='/'>Home</NavLink>
				<ul>
					<li><NavLink to='/about'>About</NavLink></li>

				{!this.props.loggedIn ?
					<>
					<li><NavLink to='/login'>Log In</NavLink></li>
					<li><NavLink to='/register'>Register</NavLink></li> 
					</>
					:

					<>
					<li><NavLink to='/profile'>Profile</NavLink></li>
					<li><NavLink to='/account'>Account</NavLink></li>
					<li><NavLink to={{ pathname: '/login/', loggedOut: true }} onClick={this.logout}>Log Out</NavLink></li>
					</>
				}
				</ul>
			</nav>
		)
	}
}

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

export default connect(mapStateToProps, dispatchStateToProps)(NavBar);

// export default NavBar;