import React from 'react';
import Task from './Task.jsx';
import axios from 'axios';
import {connect} from 'react-redux';
import TaskInput from './TaskInput.jsx';
import {setTasks} from '../redux/actions';


class TaskList extends React.Component {
	constructor() {
		super();
		this.state = {
			isUserSet: false
		}
	}
	componentDidMount = () => {
	}
	updateTasks = () => {
		// console.log("updateTasks");
	    axios.post('http://localhost:4000/task/getTasks', {userId: this.props.user})
	    .then(response=> {
		    // console.log(response.data);
		    this.props.setTasks(response.data.tasks);
		})
		.catch(err => console.log(err))
	}
	componentDidUpdate = () => {
		if (!this.state.isUserSet) {
			this.setState({isUserSet:true});
			this.updateTasks();
		}
	}
	render () {
		// this.props.user below only to trigger update when store is updated, to trigger componentDidUpdate → updateTasks
		let user = this.props.user;
		return (
			<div id="taskList">
				<TaskInput />
				{this.props.tasks.map((item,i) =>{
					return <Task item={item} key={i} />
				})}
			</div>
		)
	}
}

const mapStateToProps = (state) => {
  return {
    user: state.userReducer.user,
    tasks: state.taskReducer.tasks
  }
}

const dispatchStateToProps = (dispatch) => {
  return {
    setTasks: (array) => dispatch(setTasks(array)),
  }
}


export default connect(mapStateToProps,dispatchStateToProps)(TaskList);
