import React from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom'
import { format, isToday, isTomorrow, isYesterday } from "date-fns";
import { BASE_API_URL } from '../utils/constants';

class CommentDisplay extends React.Component {
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
    updateTaskLikes = (value) => {
	    axios.post(`${BASE_API_URL}/task/updatePublicTask`, {
    		"taskId": this.props.id,
    		"field": "likes",
    		"userId": this.props.user._id,
    		"add": value
	    })
	    .then(response=> {
	   	this.props.updateFeed()
		})
	    .catch(err=>console.log(err))
    }
   	render () {
		let {userId, text, date} = this.props.item;
	    let username = this.getUsername(userId);
		return (
			<div className="commentDisplay">
				<div>{text}</div>
				<div>
					<div>— <Link to={`/profile/${username}`}>
							{this.props.avatarDisplay(userId,"mini")}
							{this.getFullName(userId)}
					</Link></div>
					<div>{this.formatDate(date)}</div>
				</div>
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


export default connect(mapStateToProps)(CommentDisplay);