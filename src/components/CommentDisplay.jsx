import React from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
// import {Link} from 'react-router-dom'
// import {setAllPublicTasks} from '../redux/actions';
import { format, isToday, isTomorrow, isYesterday } from "date-fns";
// import TextareaAutosize from 'react-textarea-autosize';
// import Collapsible from 'react-collapsible';

class CommentDisplay extends React.Component {
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
    handleClickLike = (e) => {
    	if (this.state.liked) {
    		this.setState({liked: false});
    		this.updateTaskLikes(false);
    	} else {
    		this.setState({liked: true});
    		this.updateTaskLikes(true)
    	}
    }
    handleClickComment = () => {
    	if (this.state.comment.length > 0) {
    		// console.log(this.state.comment)
    		this.submitComment(true);
    	}
    }
    submitComment = (value) => {
	    axios.post('http://localhost:4000/task/addComment', {
    		"taskId": this.props.id,
    		"field": "comments",
    		"userId": this.props.user.id,
    		"add": value,
    		"text": this.state.comment
	    })
	    .then(response=> {
	   	this.props.updateFeed()
		})
	    .catch(err=>console.log(err))
    }
    updateTaskLikes = (value) => {
	    axios.post('http://localhost:4000/task/updatePublicTask', {
    		"taskId": this.props.id,
    		"field": "likes",
    		"userId": this.props.user.id,
    		"add": value
	    })
	    .then(response=> {
	   	this.props.updateFeed()
		})
	    .catch(err=>console.log(err))
    }
    changeComment = (e) => {
    	this.setState({comment: e.target.value})
    }
   	render () {
		let {userId, text, date} = this.props.item;
		// let taskId = this.props.id;
		// let item = this.props.allPublicTasks.find(a => a._id === taskId);
		// let {completed, dateDue, description, penalty, taskName, userId, dateEntered, likes} = item;
	    // Null date will be interpreted as 1/Jan/1970 if passed thru formatter!
	    // let dateElement = dateDue &&
	      // <div>Due: {this.formatDate(dateDue)}</div>;
	    // let username = this.getUsername(userId);
		return (
			<>
				<div>{text}</div>
				<div>
					<div>{this.getFullName(userId)}</div><div>{this.formatDate(date)}</div>
				</div>
		</>
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


export default connect(mapStateToProps)(CommentDisplay);