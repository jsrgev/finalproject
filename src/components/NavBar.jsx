import React from 'react';
import {NavLink} from 'react-router-dom'

class NavBar extends React.Component {
	render () {
		return (
			<nav>
				<ul>
					<li><NavLink to='/'>Home</NavLink></li>
					<li><NavLink to='/about'>About</NavLink></li>
					<li><NavLink to='/login'>Log In</NavLink></li>
					<li><NavLink to='/register'>Register</NavLink></li>
					<li><NavLink to='/profile'>Profile</NavLink></li>
					<li><NavLink to='/account'>Account</NavLink></li>
					<li><NavLink to='/logout'>Log Out</NavLink></li>
				</ul>
			</nav>
		)
	}
}


export default NavBar;