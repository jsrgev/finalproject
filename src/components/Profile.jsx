import React from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {setAllPublicTasks, setAllUsers} from '../redux/actions';

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
		// console.log(this.props.users);
		let user = this.props.users.find(a => a.username === username);
		// console.log(user);
		let {firstName, lastName, date} = user;
		return (
	      <main id="profile">
				<h2>{`${firstName} ${lastName}`}</h2>
				<p>Info</p>
				<p>Current Tasks</p>
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