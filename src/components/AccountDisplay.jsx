import React from 'react';
import {connect} from 'react-redux';

class AccountDisplay extends React.Component {
	render () {
		let {firstName, lastName, username, email, dateEntered} = this.props.user;
		return (
			<>
				<div id="accountGrid">
					<div><label>First Name</label><div>{firstName}</div></div>
					<div><label>Last Name</label><div>{lastName}</div></div>
					<div><label>Username</label><div>{username}</div></div>
					<div><label>Email</label><div>{email}</div></div>
					<div><label>Password</label><div>* * * * * * * * * *</div></div>
				</div>
				<div className="controls">
					<button onClick={()=>this.props.editAccount(true)}>Edit<i className="far fa-edit"></i></button>
				</div>
			</>
		)
	}
}


const mapStateToProps = (state) => {
  return {
    user: state.userReducer.user,
  }
}

export default connect(mapStateToProps)(AccountDisplay);
