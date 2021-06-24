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
			isUserSet: false
		}
	}
	componentDidMount = () => {
	}
	updateTasks = () => {
		// console.log("updateTasks");
	    axios.post('http://localhost:4000/task/getUserTasks', {userId: this.props.user.id})
	    .then(response=> {
		    // console.log(response.data);
		    this.props.setUserTasks(response.data.tasks);
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
    tasks: state.userTaskReducer.tasks
  }
}

const dispatchStateToProps = (dispatch) => {
  return {
    setUserTasks: (array) => dispatch(setUserTasks(array)),
  }
}


export default connect(mapStateToProps,dispatchStateToProps)(TaskList);
