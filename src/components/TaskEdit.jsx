import React from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import DateInput from './DateInput';
import TextareaAutosize from 'react-textarea-autosize';
import Collapsible from 'react-collapsible';
import { isDate, isPast } from "date-fns";
import { BASE_API_URL } from '../utils/constants';

class TaskEdit extends React.Component {
  constructor(){
	    super();
	    this.state = {
	      taskName: "",
	      dateDue: "",
	      description: "",
	      penaltyText: "",
	      penaltyName: "",
	      penaltyKey: "",
	      shared: false,
	      dateShared: "",
	      // completed: false,
		}
	}
	componentDidMount = () => {
		let {taskName, dateDue, description, penaltyText, penaltyName, penaltyKey, shared, dateShared, completed} = this.props.task;
		this.setState({
			taskName,
      dateDue,
      description,
      penaltyText,
      penaltyName,
	    penaltyKey,
      shared,
      dateShared,
      completed,
      // open
		})
	}
	changeField = (e) => {
	  this.setState({[e.target.name]:e.target.value})
	}
	changeDateDue = (date) => {
	    this.setState({dateDue:date})
	}
	changeShared = (value) => {
	    this.setState({shared:value})
	   //  let date = value ? new Date() : "";
		  // this.setState({dateShared:date});
	}
	saveTask = () => {
		let {taskName, penaltyName, penaltyKey, penaltyText, dateDue, shared, dateShared} = this.state;
		let convertedDate = new Date(dateDue);
		if (taskName.length === 0) {
			return;
		};

		if (convertedDate.length>0) {
			if (!isDate(convertedDate)) {
				alert("There is a problem with the date or time you entered. Please correct it and try again.");
				// return;
			}
			if (isPast(convertedDate)) {
				alert("If you wish to include a due date, it must be in the future.");
				// return;
			}
		} 

		if ( (penaltyName.length>0 && penaltyKey.length===0) ||
			(penaltyKey.length===0 && penaltyName.length>0) ) {
			alert("To use an IFTTT penalty you must include both the name and the key");
			return;
		}

		if (penaltyName.length>0) {
			if (convertedDate.length===0 && penaltyText.length===0) {
				alert("If you include a penalty URL, you must add a description of it and a due date.");
				return;
			}
			if (convertedDate.length===0) {
				alert("If you include a penalty URL, you must add a due date.");
				return;
			}
			if (penaltyText.length===0) {
				alert("If you include a penalty URL, you must add a description of it.");
				return;
			}
		}

			// set dateShared before sending
			if (!dateShared && shared) {
			  this.setState({dateShared:new Date()});
			} else if (dateShared && !shared) {
			  this.setState({dateShared:null});
			}

	    axios.post(`${BASE_API_URL}/task/updateUserTaskAllFields`, {
	    	taskId: this.props.taskId, 
	    	thisTask: {...this.state}, 
	    })
	    .then(response=> {
	    this.props.updateTasks();
			this.props.updateFeed();
			this.props.editTask(false)
	  })

	    .catch(err=>console.log(err))
	  }

	render () {
		let {taskName, dateDue, description, penaltyText, penaltyName, penaltyKey, shared, completed} = this.state;
		let trigger =  <>
			<TextareaAutosize type="text" name="taskName" placeholder="New task" id="mainInput" className="inputTaskName" value={taskName} onChange={this.changeField} />
			</>

		let sibling =
			<div className="sibling">
				<DateInput name="dateDue" changeDateDue={this.changeDateDue} dateDue={this.props.task.dateDue} />
        <i className="far fa-circle"></i>
        <i className="far fa-check-circle" onClick={()=>this.props.changeCompleted(!completed, penaltyName, shared)}></i>
      </div>;

		let completedClass = completed ? "completed" : "uncompleted";

		return (
			<div className={`${completedClass} taskInput`}>
			    <Collapsible
				    trigger={trigger}
				    triggerSibling={() => sibling}
				    transitionTime="70"
				    transitionCloseTime="70"
				    triggerDisabled="true"
				    open="true"
				    // open={this.state.open}
				    >
				    <div>
					    <label>Description</label>
				    	<TextareaAutosize name="description" value={description} onChange={this.changeField} />
				    </div>
				    <div>
					    <label>Penalty</label>
					    <TextareaAutosize name="penaltyText" value={penaltyText} onChange={this.changeField} />
				    </div>
				    <div>
					    <label>IFTTT Name</label>
					    <input name="penaltyName" value={penaltyName} onChange={this.changeField} />
				    </div>
				    <div>
					    <label>IFTTT Key</label>
					    <input name="penaltyKey" value={penaltyKey} onChange={this.changeField} />
				    </div>
				    <div>
					    <label>Privacy</label>
					    <span name="shared" onClick={()=>this.changeShared(!shared)}>{shared ? "Public" : "Private"}</span>
				    </div>
            <div className="controls">
                <button onClick={()=>this.props.editTask(false)}>
                  Cancel<i className="fas fa-times"></i>
                </button>
                <button onClick={this.saveTask}>
                  Save<i className="fas fa-check"></i>
                </button>
            </div>
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

export default connect(mapStateToProps)(TaskEdit);

