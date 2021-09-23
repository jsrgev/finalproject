import React from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {setAllPublicTasks, setAllUsers} from '../redux/actions';
// import {formatDate} from '../functions';
import Feed from './Feed';
import ProfileEdit from './ProfileEdit';
import ProfileDisplay from './ProfileDisplay';
import { BASE_API_URL } from '../utils/constants';

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
	    axios.get(`${BASE_API_URL}/user/getUsers`)
	    .then(response=> {
		    // console.log(response.data);
		    this.props.setAllUsers(response.data.users);
		})
		.catch(err => console.log(err))
	}
	editProfile = (value) => {
		this.setState({editMode: value})
	}
	getUserId = () => {
			let username = this.props.match.params.username;
			return this.props.users.find(a => a.username === username)._id;
	}
	render () {
			let userId = this.props.users.length>0 && this.getUserId();
			return (
				<>
		      <main className="splitScreen">
		      <Feed userId={userId} />
		      <div id="profile">
		      	{ this.props.users.length===0 ?
				<div>Loading ...</div> :
		      		this.state.editMode ?
						<ProfileEdit editProfile={this.editProfile} getUsers={this.getUsers} /> :
		      	<ProfileDisplay userId={userId} editProfile={this.editProfile} />
		      	}
		      	</div>
		      </main>
		      </>
			)

	}
}

const mapStateToProps = (state) => {
  return {
    user: state.userReducer.user,
    users: state.allUserReducer.users,
  }
}

const dispatchStateToProps = (dispatch) => {
  return {
    setAllPublicTasks: (array) => dispatch(setAllPublicTasks(array)),
    setAllUsers: (array) => dispatch(setAllUsers(array)),
  }
}


export default connect(mapStateToProps, dispatchStateToProps)(Profile);