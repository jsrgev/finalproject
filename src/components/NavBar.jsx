import React from 'react';
import {Link} from 'react-router-dom'

class NavBar extends React.Component {
	render () {
		return (
			<nav>
				<ul>
					<li><Link to='/'>Home</Link></li>
					<li><Link to='/about'>About</Link></li>
					<li><Link to='/register'>Register</Link></li>
					<li><Link to='/profile'>Profile</Link></li>
					<li><Link to='/account'>Account</Link></li>
				</ul>
			</nav>
		)
	}
}


export default NavBar;