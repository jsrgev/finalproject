import React from 'react';
import PostDisplay from './PostDisplay.jsx';
import axios from 'axios';

class Feed extends React.Component {
	componentDidMount = () => {
		this.updateFeed();
	}
	updateFeed = () => {
		console.log("updateTasks");
	    axios.get('http://localhost:4000/task/getAllPublicTasks')
	    .then(response=> {
		    console.log(response.data);
		    // this.props.setTasks(response.data.tasks);
		})
		.catch(err => console.log(err))
	}
	render () {
		return (
			<div id="feed">
				<PostDisplay />
			</div>

		)
	}
}


export default Feed;