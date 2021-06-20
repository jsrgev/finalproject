import React from 'react';
import PostDisplay from './PostDisplay.jsx';

class Feed extends React.Component {
	render () {
		return (

			<div id="feed">
				<PostDisplay />
				<PostDisplay />
			</div>

		)
	}
}


export default Feed;