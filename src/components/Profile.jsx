import React from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {setAllPublicTasks, setAllUsers} from '../redux/actions';
// import {formatDate} from '../functions';
import ProfileInput from './ProfileInput';
import ProfileDisplay from './ProfileDisplay';

class Profile extends React.Component {
	constructor () {
		super();
		this.state = {
			editMode: false
		}
	}
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
	editProfile = (value) => {
		this.setState({editMode: value})
		// console.log("edit");
	}
	getUserId = () => {
			let username = this.props.match.params.username;
			return this.props.users.find(a => a.username === username)._id
	}
	render () {
		// if (this.props.users.length===0) {
			// return (
				// <div className="loadingScreen">Loading ...</div>
			// )
		// } else {
			// let username = this.props.match.params.username;
			// let userId = this.props.users.find(a => a.username === username)._id
			return (
				<>
		      <main id="profile">
		      	{ this.props.users.length===0 ?
				<div className="loadingScreen">Loading ...</div> :
		      		this.state.editMode ?
						<ProfileInput editProfile={this.editProfile} getUsers={this.getUsers} /> :
		      	<ProfileDisplay userId={this.getUserId()} editProfile={this.editProfile} />
		      	}
		      </main>
		      </>
			)

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