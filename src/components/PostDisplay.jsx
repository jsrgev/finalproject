import React from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom'
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
		let {completed, dateCompleted, dateDue, description, penaltyText, taskName, userId, likes, comments, dateShared} = item;
	    
	    // Null date will be interpreted as 1/Jan/1970 if passed thru formatter!
	    let dateElement = formatDate(dateDue) ?
	      <div>Due: {formatDate(dateDue)}</div> :
	      null;

	    let username = this.getUsername(userId);

	    let likeCountDisplay;
	    if (likes.length === 0) {
	    	likeCountDisplay = "0 likes"
	    } else if (likes.length === 1) {
	    	likeCountDisplay = "1 like"
	    } else {
	    	likeCountDisplay = `${likes.length} likes`
	    }

	    let thisUserLiked = likes.some(a => a === this.props.user._id)

	    let likeUnlike = thisUserLiked ?
		    <><i className="far fa-thumbs-down"></i></> :
		    <><i className="far fa-thumbs-up"></i></>;

	    const trigger = <><div>Comments</div><div><i className="fas fa-chevron-down"></i></div></>;
	    let status;
	    if (completed) {
		    status = "completed"
	    } else if (!dateDue) {
	    	status = "shared"
	    } else {
	    	if (isPast(new Date(dateDue))) {
		    	status = "failed"
	    	} else {
		    	status = "shared"
	    	}
	    }

	    let headline = (status === "shared") ?
	    	<>
				<div>
					<Link to={`/profile/${username}`}>
						{this.getFullName(userId)}
					</Link> shared a task.
	    	</div>

	    	<div>{formatDate(dateShared)}</div>
	    	</>
	    	:
	    	(status === "failed") ?
	    	<>
				<div>
					<Link to={`/profile/${username}`}>
						{this.getFullName(userId)}
					</Link> didn't finish a task on time!
	    	</div>

	    	<div>{formatDate(dateDue)}</div></>
	    	:
	    	<>
					<div>
						<Link to={`/profile/${username}`}>
							{this.getFullName(userId)}
						</Link> finished a task!</div>
		    	<div>{formatDate(dateCompleted)}</div>
	    	</>
		return (
			<div className={`postDisplay post-${status}`}>
				<div className="postHeader">
					<div>
						<Link to={`/profile/${username}`}>
							{this.avatarDisplay(userId,"small")}
						</Link>
					</div>
					{headline}
				</div>
				<div className="postContent">
					<div className="post-taskName">{taskName}</div>
	    		{ description && 
	    			<div className="post-description">{description}</div>
	    		}
	    		{ penaltyText &&
	    			<div className="post-penalty">Penalty: {penaltyText}</div>
	    		}
	    		{dateElement}
				</div>
				{/*<div className="postBottom">*/}
					{/*<div>{likeCountDisplay}</div>*/}
					{/*<div>Added: {formatDate(dateEntered)}</div>*/}
				{/*</div>*/}
				<div className="commentInputWrapper">
					<div className="commentInput">
						<div>
							{this.avatarDisplay(this.props.user._id,"mini")}
						</div>
						<div>
				    <TextareaAutosize placeholder="Write a comment" value={this.state.comment} onChange={this.changeComment} />
				    </div>
			    </div>
			  </div>
		    <div className="controls">
					<div className="post-likes">
		    		{/*{(likes.length>0) && `${likeCountDisplay}`}*/}
		    		{likeCountDisplay}
		    		<button onClick={() => this.handleClickLike(thisUserLiked)}>
		    		{likeUnlike}
		    		</button>
	    		</div>
			    <button onClick={this.handleClickComment}>Comment<i className="far fa-comment"></i></button>
			  </div>
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


export default connect(mapStateToProps)(PostDisplay);