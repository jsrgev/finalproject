import React from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {setTasks} from '../redux/actions';
import DateInput from './DateInput';

class TaskInput extends React.Component {
  constructor(){
	    super();
	    this.state = {
	      taskName: "",
	      dateDue: ""
		}
	}
	changeTaskName = (e) => {
	    this.setState({taskName:e.target.value})
	}
	changeDateDue = (e) => {
	    this.setState({dateDue:e.target.value})
	}
	handleDateChange = (date) => {
		// console.log(date);
	    this.setState({dateDue:date})
	}
	handleClick = () => {
		if (this.state.taskName.length === 0) {
			return;
		};
	    const newTask = {
	      taskName: this.state.taskName,
	      dateDue: this.state.dateDue,
	      userId: this.props.user,
	    }
	    // console.log(newTask);
	    axios.post('http://localhost:4000/task/addTask', newTask)
	    .then(response=> {
	    // console.log(response.data);
	     // if (response.data.errors) {
	        // this.setState({errors:response.data.errors});
	    // } else if (response.data.username) {
	      // this.props.history.push('/login', { justRegistered: true });
	      // console.log("registered")
	    // }
	    this.setState({taskName:"", dateDue:""});
	    this.updateTasks();
	    // console.log(this.state);
	  })
	    .catch(err=>console.log(err))
	  }
	updateTasks = () => {
	    axios.post('http://localhost:4000/task/getTasks', {userId: this.props.user})
	    .then(response=> {
		    // console.log(response.data);
		    this.props.setTasks(response.data.tasks);
		})
		.catch(err => console.log(err))
	}
	render () {
		// console.log(this.props)
		return (
			<div id="taskInput">
				<input type="text" placeholder="New item" className="inputTaskName" value={this.state.taskName} onChange={this.changeTaskName} />

				{/*<input type="date" placeholder="Finish" className="inputDateDue" value={this.state.dateDue} onChange={this.changeDateDue} />
				*/}

				<DateInput handleDateChange={this.handleDateChange} />
				<i className="fas fa-plus" onClick={this.handleClick}></i>
			</div>
		)
	}
}


const mapStateToProps = (state) => {
	return { 
		user: state.userReducer.user
	}
}

const dispatchStateToProps = (dispatch) => {
  return {
    setTasks: (array) => dispatch(setTasks(array)),
  }
}
export default connect(mapStateToProps,dispatchStateToProps)(TaskInput);