import React from 'react';
import Task from './Task.jsx';
import TaskInput from './TaskInput.jsx';

let taskArray =["Practice piano","Learn Persian","Build website"];

class Tasks extends React.Component {
	render () {
		return (
			<><div id="taskList">
					<TaskInput />
					{taskArray.map((item,i) =>{
						return <Task item={item} key={i} />
					})}
				</div>

    </>
		)
	}
}


export default Tasks;