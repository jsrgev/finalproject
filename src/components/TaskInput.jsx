import React from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {setUserTasks} from '../redux/actions';
import DateInput from './DateInput';
import TextareaAutosize from 'react-textarea-autosize';
import Collapsible from 'react-collapsible';

class TaskInput extends React.Component {
  constructor(){
	    super();
	    this.state = {
	      taskName: "",
	      dateDue: "",
	      description: "",
	      penalty: "",
	      shared: false
		}
	}
	changeTaskName = (e) => {
	    this.setState({taskName:e.target.value})
	}
	changeDateDue = (e) => {
	    this.setState({dateDue:e.target.value})
	}
	changeDateDue = (date) => {
	    this.setState({dateDue:date})
	}
	changeDescription = (e) => {
	    this.setState({description:e.target.value})
	}
	changePenalty = (e) => {
	    this.setState({penalty:e.target.value})
	}
	changeShared = (e) => {
	    this.setState({shared:e.target.checked})
	}
	handleClick = () => {
		if (this.state.taskName.length === 0) {
			return;
		};
	    // const newTask = {
	    //   taskName: this.state.taskName,
	    //   dateDue: this.state.dateDue,
	    //   userId: this.props.user,
	    //   description: this.state.description,
	    //   penalty: this.state.penalty
	    // }

	    const newTask = { ...this.state, userId: this.props.user};
	    //   taskName: this.state.taskName,
	    //   dateDue: this.state.dateDue,
	    //   userId: this.props.user,
	    //   description: this.state.description,
	    //   penalty: this.state.penalty
	    // }

	    axios.post('http://localhost:4000/task/addTask', newTask)
	    .then(response=> {
	    this.setState({taskName:"", dateDue:"", description: "", penalty: "", shared: ""});
	    this.updateTasks();
	  })
	    .catch(err=>console.log(err))
	  }
	updateTasks = () => {
	    axios.post('http://localhost:4000/task/getUserTasks', {userId: this.props.user})
	    .then(response=> {
		    this.props.setUserTasks(response.data.tasks);
		})
		.catch(err => console.log(err))
	}
	render () {
		let trigger =  <><input type="text" placeholder="New task" id="mainInput" className="inputTaskName" value={this.state.taskName} onChange={this.changeTaskName} />

				<DateInput changeDateDue={this.changeDateDue} dateDue={this.state.dateDue} />
				<i className="fas fa-plus" onClick={this.handleClick}>
				</i>
				</>
		return (
			<div id="taskInput">

    <Collapsible
	    trigger={trigger}
	    transitionTime="70"
	    transitionCloseTime="70"
	    triggerDisabled={(this.state.taskName.length>0 && document.getElementById("mainInput").closest(".is-open")) ? true : false}
	    >
    <>
    <TextareaAutosize placeholder="Description" value={this.state.description} onChange={this.changeDescription} />
    <TextareaAutosize placeholder="Penalty" value={this.state.penalty} onChange={this.changePenalty} />
      </>
      <div>Shared <input type="checkbox" checked={this.state.shared} onChange={this.changeShared}/></div>
    </Collapsible>


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
    setUserTasks: (array) => dispatch(setUserTasks(array)),
  }
}
export default connect(mapStateToProps,dispatchStateToProps)(TaskInput);

