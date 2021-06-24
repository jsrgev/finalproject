import React from 'react';
import Task from './Task.jsx';
import axios from 'axios';
import {connect} from 'react-redux';
import TaskInput from './TaskInput.jsx';
import {setUserTasks} from '../redux/actions';


class TaskList extends React.Component {
	constructor() {
		super();
		this.state = {
			isUserSet: false,
			tasksUpdated: false
		}
	}
	componentDidMount = () => {
		// console.log(this.props.user.id);
		// this.updateTasks();
		// setTimeout(()=>{this.updateTasks()},100);
	}
	updateTasks = () => {
		// console.log(this.props.user.id);
		// console.log("updating tasks");
	    axios.post('http://localhost:4000/task/getUserTasks', {id: this.props.user.id})
	    .then(response=> {
	    	// why is this runing twice when first part only runs once??
		    // console.log(response.data);
		    this.setState({tasksUpdated:true});
		    this.props.setUserTasks(response.data.tasks);
		})
		.catch(err => console.log(err))
	}
	// componentDidUpdate = () => {
		// console.log(this.props.user.id);
		// if (!this.state.isUserSet) {
			// this.setState({isUserSet:true});
			// this.updateTasks();
		// }
	// }
	displayTasks = () => {
		// if (!this.state.tasksUpdated) {
			// console.log(this.props.tasks);
		// }
		this.props.tasks.map((item,i) =>{
			return <Task item={item} key={i} />
		})
	}
	render () {
		// let user = this.props.user;
		if (this.props.user && !this.state.tasksUpdated) {
			this.updateTasks();
		};

		let taskList = this.props.tasks ?
			this.props.tasks.map((item,i) =>{
				return <Task item={item} key={i} />
			})
				:
			<div>Loading Tasks...</div>;

		return (
			<div id="taskList">
				<TaskInput />
				{taskList}
			</div>
		)
	}
}

const mapStateToProps = (state) => {
  return {
    user: state.userReducer.user,
    tasks: state.userTaskReducer.tasks
  }
}

const dispatchStateToProps = (dispatch) => {
  return {
    setUserTasks: (array) => dispatch(setUserTasks(array)),
  }
}


export default connect(mapStateToProps,dispatchStateToProps)(TaskList);
