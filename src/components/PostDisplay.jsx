import React from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom'
// import {setAllPublicTasks} from '../redux/actions';
import { format, isToday, isTomorrow, isYesterday } from "date-fns";
import TextareaAutosize from 'react-textarea-autosize';
import Collapsible from 'react-collapsible';
import CommentDisplay from './CommentDisplay';

class PostDisplay extends React.Component {
	constructor() {
		super();
		this.state ={
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
    handleClickLike = (value) => {
    		this.setState({liked: !value});
    		this.updateTaskLikes(!value);

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
		let taskId = this.props.id;
		let item = this.props.allPublicTasks.find(a => a._id === taskId);
		let {completed, dateDue, description, penalty, taskName, userId, dateEntered, likes, comments} = item;
	    // Null date will be interpreted as 1/Jan/1970 if passed thru formatter!
	    let dateElement = dateDue &&
	      <div>Due: {this.formatDate(dateDue)}</div>;
	    let username = this.getUsername(userId);

	    let thisUserLiked = likes.some(a => a === this.props.user.id)

	    let likeCountDisplay;
	    if (likes.length === 0) {
	    	likeCountDisplay = ""
	    } else if (likes.length === 1) {
	    	likeCountDisplay = "1 like"
	    } else {
	    	likeCountDisplay = `${likes.length} likes`
	    }
	    const trigger = <><div>Comments</div><div><i className="fas fa-chevron-down"></i></div></>;
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
				<div className="postBottom">
					<button onClick={() => this.handleClickLike(thisUserLiked)}>Like</button>
					<div>{likeCountDisplay}</div>
					<div>Added: {this.formatDate(dateEntered)}</div>
				</div>
				<div className="commentInput">
			    <TextareaAutosize placeholder="Write a comment" value={this.state.comment} onChange={this.changeComment} /><button onClick={this.handleClickComment}>Submit</button></div>

			    {comments.length>0 &&
			    	// <div className="commentList">
						<Collapsible trigger={trigger} transitionTime="70" transitionCloseTime="70">
					      {comments.map((item,i) =>{
					      	return <CommentDisplay item={item} key={i} />
					      })
					      }
					    </Collapsible>
				    // </div>
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

// const dispatchStateToProps = (dispatch) => {
//   return {
//     setAllPublicTasks: (array) => dispatch(setAllPublicTasks(array)),
//   }
// }


export default connect(mapStateToProps)(PostDisplay);