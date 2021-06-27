import React from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {setUserTasks,setAllPublicTasks} from '../redux/actions';
import DateInput from './DateInput';
import TextareaAutosize from 'react-textarea-autosize';
import Collapsible from 'react-collapsible';
import { isDate, isPast } from "date-fns";

class TaskInput extends React.Component {
  constructor(){
	    super();
	    this.state = {
	      taskName: "",
	      dateDue: "",
	      description: "",
	      penaltyText: "",
	      penaltyUrl: "",
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
	changePenaltyText = (e) => {
	    this.setState({penaltyText:e.target.value})
	}
	changePenaltyUrl = (e) => {
	    this.setState({penaltyUrl:e.target.value})
	}
	changeShared = (e) => {
	    this.setState({shared:e.target.checked})
	}
	handleClick = () => {
		if (this.state.taskName.length === 0) {
			return;
		};

		if (this.state.dateDue.length>0) {
			if (!isDate(this.state.dateDue)) {
				alert("There is a problem with the date or time you entered. Please correct it and try again.");
				return;
			}
			if (isPast(this.state.dateDue)) {
				alert("If you wish to include a due date, it must be in the future.");
				return;
			}
		} 

	    const newTask = { ...this.state, userId: this.props.user.id};

	    axios.post('http://localhost:4000/task/addTask', newTask)
	    .then(response=> {
	    	// console.log(response.data);
	    this.setState({taskName:"", dateDue:"", description: "", penaltyText: "", penaltyUrl: "", shared: false});
	    document.querySelector(".react-datepicker__input-container>input").value="";
	    this.props.updateTasks();
		this.props.thereAreTasks();
		this.updateFeed();
	  })
	    .catch(err=>console.log(err))
	  }

	updateFeed = () => {
	    axios.get('http://localhost:4000/task/getAllPublicTasks')
	    .then(response=> {
		    this.props.setAllPublicTasks(response.data.tasks);
		    ((response.data.result) && response.data.tasks.length===0) && this.setState({sharedTasks: false});
		})
		.catch(err => console.log(err))
	}
	render () {
		let trigger =  <>
			<TextareaAutosize type="text" placeholder="New task" id="mainInput" className="inputTaskName" value={this.state.taskName} onChange={this.changeTaskName} />
			</>

		let sibling = <>
			<DateInput changeDateDue={this.changeDateDue} dateDue={this.state.dateDue} />
			<div className="i-wrapper" onClick={this.handleClick}>
				<i className="fas fa-plus"></i>
				<i className="far fa-circle"></i>
			</div>
			</>
		let triggerDisabled: false;
		if (this.state.taskName.length>0 && document.getElementById("mainInput").closest(".is-open")) {
			triggerDisabled = true;
		}
		// console.log(this.state.taskName.length>0);
		// console.log(document.getElementById("mainInput").closest(".is-open"));
		// console.log(this.state.taskName.length>0 && document.getElementById("mainInput").closest(".is-open"));
		return (
			<div id="taskInput">
			    <Collapsible
				    trigger={trigger}
				    triggerSibling={() => sibling}
				    transitionTime="70"
				    transitionCloseTime="70"
				    triggerDisabled={triggerDisabled}
				    >
				    <div>
					    <label>Description</label>
				    	<TextareaAutosize value={this.state.description} onChange={this.changeDescription} />
				    </div>
				    <div>
					    <label>PenaltyText</label>
					    <TextareaAutosize value={this.state.penaltyText} onChange={this.changePenaltyText} />
				    </div>
				    <div>
					    <label>Penalty Url</label>
					    <input value={this.state.penaltyUrl} onChange={this.changePenaltyUrl} />
				    </div>
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
    setAllPublicTasks: (array) => dispatch(setAllPublicTasks(array)),
  }
}
export default connect(mapStateToProps,dispatchStateToProps)(TaskInput);

