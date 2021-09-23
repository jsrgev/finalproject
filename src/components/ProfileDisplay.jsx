import React from 'react';
// import axios from 'axios';
import {connect} from 'react-redux';
import {setAllPublicTasks, setAllUsers} from '../redux/actions';
import {formatDate} from '../functions';

class Profile extends React.Component {

	render () {
		let user = this.props.users.find(a => a._id === this.props.userId);
		let {username, firstName, lastName, location, gender, birthdate, avatarUrl, links, dateEntered, about} = user;
		let editButton  = (username === this.props.user.username) ?
				<button onClick={()=>this.props.editProfile(true)}>Edit<i className="far fa-edit"></i></button>  :
				null;
		let genderDisplay = (gender === "male") ?
						<><label>Gender</label><div>Male</div></> :
					(gender === "male") ?
						<><label>Gender</label><div>Female</div></> :
						null;
		let locationDisplay = location &&
						<><label>Location</label><div>{location}</div></> ;
		let birthdateDisplay = birthdate &&
						<><label>Birthday</label><div>{birthdate}</div></> ;
		let linksDisplay = birthdate &&
						<><label>Links</label><div>{links}</div></> ;
		return (
			<>
				<div className="profileHeader">
					<h3>{`${firstName} ${lastName}`}</h3>
					<img className="avatar-medium" src={avatarUrl} alt="avatar" />
				</div>
				<div id="profileGrid">
					<label>About</label><div>{about}</div>
					{genderDisplay}
					{locationDisplay}
					{birthdateDisplay}
					{linksDisplay}
					<label>Member since</label><div>{formatDate(dateEntered,false)}</div>
				</div>
				<div className="controls">{editButton}</div>
			</>
			)
		// }
	}
}

const mapStateToProps = (state) => {
  return {
    user: state.userReducer.user,
    users: state.allUserReducer.users,
    // tasks: state.userTaskReducer.tasks,
    // allPublicTasks: state.allPublicTaskReducer.tasks
  }
}

const dispatchStateToProps = (dispatch) => {
  return {
    setAllPublicTasks: (array) => dispatch(setAllPublicTasks(array)),
    setAllUsers: (array) => dispatch(setAllUsers(array)),
  }
}


export default connect(mapStateToProps, dispatchStateToProps)(Profile);