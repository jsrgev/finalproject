import React from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {setAllPublicTasks, setAllUsers} from '../redux/actions';
import {formatDate} from '../functions';
import ProfileInput from './ProfileInput';

class Profile extends React.Component {

	render () {
		let user = this.props.users.find(a => a._id === this.props.userId);
		let {username, firstName, lastName, location, gender, birthdate, avatar, links, dateEntered, about} = user;
		console.log(gender);
		let image = avatar ?
			avatar :
			gender ?
			`https://joeschmoe.io/api/v1/${gender}/${username}` :
			`https://joeschmoe.io/api/v1/${username}`
		let editButton  = (username === this.props.user.username) ?
				<button onClick={()=>this.props.editProfile(true)}>Edit</button>  :
				null;
		return (
			<>
				<h2>{`${firstName} ${lastName}`}</h2>
				<img className="avatar-medium" src={image} alt="avatar" />
				<div id="profileGrid">
					<div>Location</div><div>{location}</div>
					{/*<div>Birthday</div><div>{birthdate}</div>*/}
					{/*<div>Links</div><div>{links}</div>*/}
					<div>About</div><div>{about}</div>
					<div>Member since</div><div>{formatDate(dateEntered,false)}</div>
					{/*<div>Current Tasks</div>*/}
					{/*<div>{gender}</div>*/}
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