import React from 'react';

class TaskInput extends React.Component {
	render () {
		
		return (
			<div>
				<input placeholder="New item" />
				<button><i className="fas fa-plus"></i></button>
			</div>
		)
	}
}


export default TaskInput;