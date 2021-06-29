import React from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom'
// import {setAllPublicTasks} from '../redux/actions';
import { isPast } from "date-fns";
import {formatDate} from '../functions';
import TextareaAutosize from 'react-textarea-autosize';
import Collapsible from 'react-collapsible';
import CommentDisplay from './CommentDisplay';
import { BASE_API_URL } from '../utils/constants';

class PostDisplay extends React.Component {
	constructor() {
		super();
		this.state ={
			comment: ""
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
    avatarDisplay = (id, size) => {
    	// if tries to get do 'find' before 'users' is populated, causes crash
    	if (this.props.users.length>0) {
    	let user = this.props.users.find(a => a._id === id);
    	return <img className={`avatar-${size}`} src={user.avatarUrl} alt="avatar" />;
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
    		this.setState({comment:""});
    	}
    }
    submitComment = (value) => {
	    axios.post(`${BASE_API_URL}/task/addComment`, {
    		"taskId": this.props.id,
    		"field": "comments",
    		"userId": this.props.user._id,
    		"add": value,
    		"text": this.state.comment
	    })
	    .then(response=> {
	   	this.props.updateFeed()
		})
	    .catch(err=>console.log(err))
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
    changeComment = (e) => {
    	this.setState({comment: e.target.value})
    }
    
   	render () {
		let taskId = this.props.id;
		let item = this.props.allPublicTasks.find(a => a._id === taskId);
		let {completed, dateCompleted, dateDue, description, penaltyText, taskName, userId, dateEntered, likes, comments, dateShared} = item;
	    
	    // Null date will be interpreted as 1/Jan/1970 if passed thru formatter!
	    let dateElement = formatDate(dateDue) ?
	      <div>Due: {formatDate(dateDue)}</div> :
	      null;

	    let username = this.getUsername(userId);

	    let thisUserLiked = likes.some(a => a === this.props.user._id)

	    let likeCountDisplay;
	    if (likes.length === 0) {
	    	likeCountDisplay = ""
	    } else if (likes.length === 1) {
	    	likeCountDisplay = "1 like"
	    } else {
	    	likeCountDisplay = `${likes.length} likes`
	    }
	    const trigger = <><div>Comments</div><div><i className="fas fa-chevron-down"></i></div></>;
	    let penaltyDisplay = penaltyText && <div>Penalty: {penaltyText}</div>
	    let status;
	    if (!completed) {
	    	status = "shared"
	    } else {
	    	if (isPast(dateDue)) {
		    	status = "failed"
	    	} else {
		    	status = "completed"
	    	}
	    }
	    let headline = (status === "shared") ?
	    	<>
				<div>
					<Link to={`/profile/${username}`}>
						{this.avatarDisplay(userId,"small")}
						{this.getFullName(userId)}
					</Link>
	    	shared a task.</div>
	    	<div>{formatDate(dateShared)}</div>
	    	</> :
	    	(status === "failed") ?
	    	<>
				<div>
					<Link to={`/profile/${username}`}>
						{this.avatarDisplay(userId,"small")}
						{this.getFullName(userId)}
					</Link>
	    	didn't finish a task on time!</div>
	    	<div>{formatDate(dateDue)}</div></> :
	    	<>
				<div>
					<Link to={`/profile/${username}`}>
						{this.avatarDisplay(userId,"small")}
						{this.getFullName(userId)}
					</Link>
	    	finished a task!</div>
	    	<div>{formatDate(dateCompleted)}</div>
	    	</>
		return (
			<div className="postDisplay">
				<div className="postHeader">
{/*						<Link to={`/profile/${username}`}>
							{this.avatarDisplay(userId,"small")}
							{this.getFullName(userId)}
						</Link>*/}
					{headline}

				</div>
					<div>{taskName}</div>
					{dateElement}
				<div className="postContent">
					{/*<div>
						<Link to={`/profile/${username}`}>
							{this.avatarDisplay(userId,"small")}
							{this.getFullName(userId)}
						</Link>
					</div>
*/}					<div>{description}</div>
					{penaltyDisplay}
				</div>
				<div className="postBottom">
					<button onClick={() => this.handleClickLike(thisUserLiked)}>Like</button>
					<div>{likeCountDisplay}</div>
					<div>Added: {formatDate(dateEntered)}</div>
				</div>
				<div className="commentInput">
				{this.avatarDisplay(this.props.user._id,"mini")}
			    <TextareaAutosize placeholder="Write a comment" value={this.state.comment} onChange={this.changeComment} /><button onClick={this.handleClickComment}>Submit</button></div>

			    {comments.length>0 &&
			    	// <div className="commentList">
						<Collapsible trigger={trigger} transitionTime="70" transitionCloseTime="70">
					      {comments.map((item,i) =>{
					      	return <CommentDisplay avatarDisplay={this.avatarDisplay} item={item} key={i} />
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