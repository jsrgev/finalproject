import React from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {setAllPublicTasks, setAllUsers} from '../redux/actions';
import {formatDate} from '../functions';

class Profile extends React.Component {
	componentDidMount() {
		this.getUsers();
	}
	getUsers = () => {
	    axios.get('http://localhost:4000/user/getUsers')
	    .then(response=> {
		    // console.log(response.data);
		    this.props.setAllUsers(response.data.users);
		})
		.catch(err => console.log(err))
	}
	render () {
		let username = this.props.match.params.username;
		let user = this.props.users.find(a => a.username === username);
		let {firstName, lastName, location, gender, birthdate, avatar, links, dateEntered} = user;
		
		let image = avatar ? avatar :
			gender ?
			`https://joeschmoe.io/api/v1/${gender}/${username}` :
			`https://joeschmoe.io/api/v1/${username}`
		let data = user ?
			(
			<>
				<h2>{`${firstName} ${lastName}`}</h2>
				<img className="avatar-medium" src={image} alt="avatar" />
				<div>Info</div>
				<div>Member since {formatDate(dateEntered,false)}</div>
				<div>Current Tasks</div>
				{/*<div>{gender}</div>*/}
				<div>{location}</div>
				<div>{birthdate}</div>
				<div>{links}</div>
			</>
			)
			:
			<p>Loading...</p>;
		return (
	      <main id="profile">
	      	{data}
	      </main>
		)
	}
}

const mapStateToProps = (state) => {
  return {
    // user: state.userReducer.user,
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