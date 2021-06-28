import React from 'react';
import Task from './Task.jsx';
import axios from 'axios';
import {connect} from 'react-redux';
import TaskInput from './TaskInput.jsx';
import {setUserTasks, setAllPublicTasks} from '../redux/actions';
import Collapsible from 'react-collapsible';


class TaskSection extends React.Component {
	constructor() {
		super();
		this.state = {
			areTasks: true,
			tasksUpdated: false
		}
	}
	thereAreTasks = () => {
		this.setState({areTasks: true});
	}
	updateTasks = () => {
	    axios.post('http://localhost:4000/task/getUserTasks', {id: this.props.user._id})
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
	updateFeed = () => {
	    axios.get('http://localhost:4000/task/getAllPublicTasks')
	    .then(response=> {
		    this.props.setAllPublicTasks(response.data.tasks);
		    ((response.data.result) && response.data.tasks.length===0) && this.setState({sharedTasks: false});
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
		// let scheduled = [];
		// let unscheduled = [];
		let uncompleted = [];
		let completed = [];
		if (this.props.tasks) {
			this.props.tasks.forEach(a => {
				(a.dateDue && !a.completed) && uncompleted.push(a);
			});
			this.props.tasks.forEach(a => {
				(!a.dateDue && !a.completed) && uncompleted.push(a);
			});
			this.props.tasks.forEach(a => {
				(a.completed) && completed.push(a);
			});
			// this.props.tasks.forEach(a => {
			// 	(!a.dateDue && a.completed) && completed.push(a);
			// });
			// allUncompleted = scheduled.concat(unscheduled);
		}
		// let completedReverse = [...completed];
		completed.reverse();

		let taskList = (!this.state.areTasks) ?
			"You currently have no tasks."
			:
			(uncompleted.length===0) ?
			"You have no outstanding tasks." :
			(this.props.tasks.length > 0) ?
			uncompleted.map((item,i) =>{
				return <Task taskId={item._id} key={i} updateTasks={this.updateTasks} updateFeed={this.updateFeed} />
			})
			:
			"Loading Tasks...";

    const trigger = <><div>Completed Tasks</div><div><i className="fas fa-chevron-down"></i></div></>;

		let completedTaskList = completed.length>0 ?
				<Collapsible trigger={trigger} transitionTime="70" transitionCloseTime="70">
				<div className="taskList ">
	      {completed.map((item,i) => {
	      	return <Task taskId={item._id} key={i} updateTasks={this.updateTasks} updateFeed={this.updateFeed} />
	      })
	      }
	      </div>
	    </Collapsible>
	    :
	    null;
		return (
			<div id="taskSection">
				<TaskInput thereAreTasks={this.thereAreTasks} updateTasks={this.updateTasks} updateFeed={this.updateFeed} />
				<div className="taskList">{taskList}</div>
				<div className="completedTaskList">{completedTaskList}</div>
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
    setAllPublicTasks: (array) => dispatch(setAllPublicTasks(array))
  }
}


export default connect(mapStateToProps,dispatchStateToProps)(TaskSection);
