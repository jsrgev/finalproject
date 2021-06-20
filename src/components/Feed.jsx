import React from 'react';
import Post from './Post.jsx';

class Feed extends React.Component {
	render () {
		return (

			<div id="feed">
				<Post />
				<Post />
			</div>

		)
	}
}


export default Feed;