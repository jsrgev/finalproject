import React from 'react';
import PostDisplay from './PostDisplay.jsx';
import axios from 'axios';
import {connect} from 'react-redux';
import {setAllPublicTasks, setAllUsers} from '../redux/actions';
import {getFullName} from '../functions';

class Feed extends React.Component {
	constructor(){
		super();
		this.state = {
			sharedTasks: true
		}
	}
	componentDidMount = () => {
		this.updateFeed();
		this.getUsers();
	}
	updateFeed = () => {
	    axios.get('http://localhost:4000/task/getAllPublicTasks')
	    .then(response=> {
		    this.props.setAllPublicTasks(response.data.tasks);
		    ((response.data.result) && response.data.tasks.length===0) && this.setState({sharedTasks: false});
		})
		.catch(err => console.log(err))
	}
  getFullName = (id) => {
  	// if tries to get do 'find' before 'users' is populated, causes crash
  	if (this.props.users.length>0) {
  	let user = this.props.users.find(a => a._id === id);
  	return `${user.firstName} ${user.lastName}`;
    }
     else {
    	return ""
    }
  }
	getUsers = () => {
	    axios.get('http://localhost:4000/user/getUsers')
	    .then(response=> {
		    this.props.setAllUsers(response.data.users);
		})
		.catch(err => console.log(err))
	}

	// filterPosts = (userId) => {
	// 	let allPublicTasks = this.props.allPublicTasks;
	// 	let userPublicTasks = allPublicTasks.filter(a => a.userId === userId);
	// 	// console.log(userPublicTasks);
	// }
	
	render() {
		console.log(this.props);
		let {allPublicTasks, userId}  = this.props;

		let tasksToDisplay = (userId) ?
			allPublicTasks.filter(a => a.userId === userId) :
			allPublicTasks;
		
		let heading = (userId) ?
			<div className="heading" > {
				(this.props.users) ?
				`${this.getFullName(userId)}'s Shared Tasks`
				 :
				"Loading"
			}
			</div> :
			<div className="heading">Newsfeed</div>;

		// console.log(tasksToDisplay)
		return (
			<div id="feed">
				{heading}
				{(!this.state.sharedTasks) ?
					<div className="loadingScreen">There are currently no shared tasks.</div>
					:
					tasksToDisplay.length>0 ?
					tasksToDisplay.map(({_id},i) => {
						return(
							<PostDisplay id={_id} key={i} updateFeed={this.updateFeed} />
							)
					})
				 :
				<div className="loadingScreen">Loading ...</div>
				}
			</div>

		)
	}
}


const mapStateToProps = (state) => {
  return {
    user: state.userReducer.user,
    users: state.allUserReducer.users,
    tasks: state.userTaskReducer.tasks,
    allPublicTasks: state.allPublicTaskReducer.tasks
  }
}

const dispatchStateToProps = (dispatch) => {
  return {
    setAllPublicTasks: (array) => dispatch(setAllPublicTasks(array)),
    setAllUsers: (array) => dispatch(setAllUsers(array)),
  }
}


export default connect(mapStateToProps,dispatchStateToProps)(Feed);
