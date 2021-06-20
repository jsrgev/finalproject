import React from 'react';
import {connect} from 'react-redux';

class TaskInput extends React.Component {
	render () {
		console.log(this.props.user)
		return (
			<div id="taskInput">
				<input placeholder="New item" className="inputTaskName" />
				<input placeholder="Finish" className="inputTaskFinish" />
				<i className="fas fa-plus"></i>
			</div>
		)
	}
}


const mapStateToProps = (state) => {
	return { 
		user: state.user
	}
}

export default connect(mapStateToProps)(TaskInput);