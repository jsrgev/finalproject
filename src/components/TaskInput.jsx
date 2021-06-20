import React from 'react';

class TaskInput extends React.Component {
	render () {
		return (
			<div id="taskInput">
				<input placeholder="New item" />
				<input placeholder="Finish" />
				<i className="fas fa-plus"></i>
			</div>
		)
	}
}


export default TaskInput;