import React from 'react';
import Task from './Task.jsx';

class Tasks extends React.Component {
	render () {
		return (
			<div id="tasks">
				<Task />
				<Task />
			</div>
		)
	}
}


export default Tasks;