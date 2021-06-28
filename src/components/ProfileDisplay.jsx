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
				<button onClick={()=>this.props.editProfile(true)}>Edit</button>  :
				null;
		let genderDisplay = (gender === "male") ?
						<><div>Gender</div><div>Male</div></> :
					(gender === "male") ?
						<><div>Gender</div><div>Female</div></> :
						null;
		let locationDisplay = location &&
						<><div>Location</div><div>{location}</div></> ;
		let birthdateDisplay = birthdate &&
						<><div>Birthday</div><div>{birthdate}</div></> ;
		let linksDisplay = birthdate &&
						<><div>Links</div><div>{links}</div></> ;
		return (
			<>
				<h2>{`${firstName} ${lastName}`}</h2>
				<img className="avatar-medium" src={avatarUrl} alt="avatar" />
				<div id="profileGrid">
					<div>About</div><div>{about}</div>
					<div>Member since</div><div>{formatDate(dateEntered,false)}</div>
					{genderDisplay}
					{locationDisplay}
					{birthdateDisplay}
					{linksDisplay}
				</div>
				{editButton}
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