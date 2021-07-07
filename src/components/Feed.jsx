import React from 'react';
import PostDisplay from './PostDisplay.jsx';
import axios from 'axios';
import {connect} from 'react-redux';
import {setAllPublicTasks, setAllUsers} from '../redux/actions';
import { BASE_API_URL } from '../utils/constants';
import { isPast, compareDesc } from "date-fns";

class Feed extends React.Component {
	constructor(){
		super();
		this.state = {
			tasksFetched: false
		}
	}
	componentDidMount = () => {
		this.updateFeed();
		this.getUsers();
	}
	updateFeed = () => {
	    axios.get(`${BASE_API_URL}/task/getAllPublicTasks`)
	    .then(response=> {
		    this.props.setAllPublicTasks(response.data.tasks);
		    this.setState({tasksFetched:true});
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
	    axios.get(`${BASE_API_URL}/user/getUsers`)
	    .then(response=> {
		    this.props.setAllUsers(response.data.users);
		})
		.catch(err => console.log(err))
	}

	setStatus = (completed, dateDue) => {
    if (completed) {
	    return "completed"
    } else if (!dateDue) {
    	return "shared"
    } else {
    	if (isPast(new Date(dateDue))) {
	    	return "failed"
    	} else {
	    	return "shared"
    	}
    }
	}
	sortPosts = (tasksToDisplay) => {
		let newArray = [];
		for (let item of tasksToDisplay) {
			let status = this.setStatus(item.completed, item.dateDue);
			let sortDate = (status === "completed") ?
					new Date(item.dateCompleted) :
					(status === "shared") ?
					new Date(item.dateShared) :
					new Date(item.dateDue);
			let obj = {...item, status, sortDate};
			newArray.push(obj);
		}
		let sortedArray = newArray.sort((a,b)=>{
			return compareDesc(a.sortDate,b.sortDate);
		});
		return sortedArray;
	}

	render() {
		let {allPublicTasks, userId}  = this.props;

		let tasksToDisplay = (userId) ?
			allPublicTasks.filter(a => a.userId === userId) :
			allPublicTasks;

		let sortedArray = this.sortPosts(tasksToDisplay);
		let heading = (userId) ?
			<div className="heading" > {
				(this.props.users) ?
				`${
					(userId === this.props.user._id) ?
					"My" :
					`${this.getFullName(userId)}'s`
				} Shared Tasks`
				 :
				"Loading"
			}
			</div> :
			null;

		return (
			<div id="feed">
				{heading}
				{(!this.state.tasksFetched) ?
					// at first, assume there are shared tasks
					<div className="loadingScreen">Loading ...</div> :

					(sortedArray.length===0 && userId) ?
					<div className="loadingScreen">This user is not sharing any tasks right now.</div> :

					(sortedArray.length===0 && !userId) ?
					<div className="loadingScreen">There are currently no shared tasks to show.</div> :

					sortedArray.map(({_id},i) => {
						return(
							<PostDisplay id={_id} key={i} updateFeed={this.updateFeed} />
							)
					})
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
