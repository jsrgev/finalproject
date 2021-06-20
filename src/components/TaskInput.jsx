import React from 'react';

class TaskInput extends React.Component {
	render () {
		return (
			<div id="taskInput">
				<input placeholder="New item" className="inputTaskName" />
				<input placeholder="Finish" className="inputTaskFinish" />
				<i className="fas fa-plus"></i>
			</div>
		)
	}
}


export default TaskInput;