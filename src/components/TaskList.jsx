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
			areTasks: true,
			tasksUpdated: false
		}
	}
	componentDidMount = () => {
		// console.log(this.props.user.id);
		// this.updateTasks();
		// setTimeout(()=>{this.updateTasks()},100);
	}
	thereAreTasks = () => {
		console.log("running");
		this.setState({areTasks: true});
	}
	updateTasks = () => {
		// console.log(this.props.user.id);
		// console.log("updating tasks");
	    axios.post('http://localhost:4000/task/getUserTasks', {id: this.props.user.id})
	    .then(response=> {
		// console.log(this.props.tasks.length);
	    	// console.log(response.data)
	    	// why is this runing twice when first part only runs once??
		    this.setState({tasksUpdated:true});
		    this.props.setUserTasks(response.data.tasks);
		    if ((response.data.result) && response.data.tasks.length===0) {
		    	this.setState({areTasks: false});
		    } else if ((response.data.result) && response.data.tasks.length>0) {
		    	this.setState({areTasks: true});
		    }
		})
		.catch(err => console.log(err))
	}

	displayTasks = () => {

		this.props.tasks.map((item,i) =>{
			return <Task item={item} key={i} />
		})
	}
	render () {
		// let user = this.props.user;
		if (this.props.user && !this.state.tasksUpdated) {
			this.updateTasks();
		};

		let taskList = (!this.state.areTasks) ?
			<div>You currently have no tasks.</div>
			:
			(this.props.tasks.length > 0) ?
			this.props.tasks.map((item,i) =>{
				return <Task item={item} key={i} updateTasks={this.updateTasks} />
			})
			:
			<div>Loading Tasks...</div>;

		return (
			<div id="taskList">
				<TaskInput thereAreTasks={this.thereAreTasks} updateTasks={this.updateTasks} />
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
