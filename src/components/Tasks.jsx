import React from 'react';
import Task from './Task.jsx';
import TaskInput from './TaskInput.jsx';

class Tasks extends React.Component {
	render () {
		return (
			<div id="tasks">
				<TaskInput />
				<Task />
				<Task />
			</div>
		)
	}
}


export default Tasks;