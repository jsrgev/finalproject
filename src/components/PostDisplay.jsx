import React from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom'
// import {setAllPublicTasks} from '../redux/actions';
import { format, isToday, isTomorrow, isYesterday } from "date-fns";

class PostDisplay extends React.Component {
	constructor() {
		super();
		this.state ={
			liked: false,
			comment: ""
		}
	}
	formatDate =  (date) => {
    	let newDate = new Date(date);
	      if (isToday(newDate)) {
	          return (`Today ${format(newDate, "p")}`);
	      } else if (isTomorrow(newDate)) {
	          return (`Tomorrow ${format(newDate, "p")}`);
	      } else if (isYesterday(newDate)) {
	          return (`Yesterday ${format(newDate, "p")}`);
	      } else {
	        return format(newDate, "d MMM, yyyy p");
	      } 
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
    getUsername = (id) => {
    	// if tries to get do 'find' before 'users' is populated, causes crash
    	if (this.props.users.length>0) {
    	let user = this.props.users.find(a => a._id === id);
    	return user.username;
	    }
	     else {
	    	return ""
	    }
    }
    handleClick = (e) => {
    	if (this.state.liked) {
    		this.setState({liked: false});
    		this.updateTaskLikes(false);
    	} else {
    		this.setState({liked: true});
    		this.updateTaskLikes(true)
    	}
    }
    updateTaskLikes = (value) => {
    	let updateInfo = {
    		"taskId": this.props.id,
    		"field": "likes",
    		"userId": this.props.user.id,
    		"add": value
    	};
    	// console.log(updateInfo);		

	    axios.post('http://localhost:4000/task/updatePublicTask', {
    		"taskId": this.props.id,
    		"field": "likes",
    		"userId": this.props.user.id,
    		"add": value
	    })
	    .then(response=> {
	    	// console.log(response.data);
	    	this.props.updateFeed();
	    // this.setState({taskName:"", dateDue:"", description: "", penalty: "", shared: ""});
	    // this.props.updateTasks();
		// this.props.thereAreTasks();
		// this.updateFeed();
	  })
	    .catch(err=>console.log(err))
	  // }
    }
   	render () {
    	// console.log(this.state.liked);
		let taskId = this.props.id;
		let item = this.props.allPublicTasks.find(a => a._id === taskId);
		let {completed, dateDue, description, penalty, taskName, userId, dateEntered, likes} = item;
	    // Null date will be interpreted as 1/Jan/1970 if passed thru formatter!
	    let dateElement = dateDue &&
	      <div>Due: {this.formatDate(dateDue)}</div>;
	    let username = this.getUsername(userId);
	    console.log(taskName)
	    console.log(likes)
		return (
			<div className="postDisplay">
				<div className="postHeader">
					<div>{taskName}</div>
					{completed && <div>Completed</div>}
					{dateElement}
				</div>
				<p>
					<Link to={`/profile/${username}`}>
						{this.getFullName(userId)}
					</Link>
				</p>
				<p>{description}</p>
				<p>Penalty: {penalty}</p>
				<p></p>
				<div className="postBottom"><button onClick={this.handleClick}>Like</button> <div>{likes.length} Likes</div><div>Added: {this.formatDate(dateEntered)}</div></div>
				<div>Add comment:</div>
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

// const dispatchStateToProps = (dispatch) => {
//   return {
//     setAllPublicTasks: (array) => dispatch(setAllPublicTasks(array)),
//   }
// }


export default connect(mapStateToProps)(PostDisplay);