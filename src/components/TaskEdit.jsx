import React from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import DateInput from './DateInput';
import TextareaAutosize from 'react-textarea-autosize';
import Collapsible from 'react-collapsible';
import { isDate, isPast } from "date-fns";

class TaskEdit extends React.Component {
  constructor(){
	    super();
	    this.state = {
	      taskName: "",
	      dateDue: "",
	      description: "",
	      penaltyText: "",
	      penaltyUrl: "",
	      shared: false,
	      dateShared: "",
	      // expanded: false
		}
	}
	componentDidMount = () => {
		let {taskName, dateDue, description, penaltyText, penaltyUrl, shared, dateShared} = this.props.task;
		this.setState({
			taskName,
      dateDue,
      description,
      penaltyText,
      penaltyUrl,
      shared,
      dateShared
      // expanded: false
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
	    let date = value ? new Date() : "";
		  this.setState({dateShared:date});
	}
	handleClick = () => {
		let {taskName, penaltyUrl, penaltyText, dateDue} = this.state;
		if (taskName.length === 0) {
			return;
		};

		if (dateDue.length>0) {
			if (!isDate(dateDue)) {
				alert("There is a problem with the date or time you entered. Please correct it and try again.");
				return;
			}
			if (isPast(dateDue)) {
				alert("If you wish to include a due date, it must be in the future.");
				return;
			}
		} 

		if (penaltyUrl.length>0) {
			if (dateDue.length===0 && penaltyText.length===0) {
				alert("If you include a penalty URL, you must add a description of it and a due date.");
				return;
			}
			if (dateDue.length===0) {
				alert("If you include a penalty URL, you must add a due date.");
				return;
			}
			if (penaltyText.length===0) {
				alert("If you include a penalty URL, you must add a description of it.");
				return;
			}
		}

	    const thisTask = {...this.state, userId: this.props.user._id};
	    const {expanded, ...newTask} = thisTask;
	    axios.post('http://localhost:4000/task/addTask', newTask)
	    .then(response=> {
	    this.setState({taskName:"", dateDue:"", description: "", penaltyText: "", penaltyUrl: "", shared: false, dateShared: ""});
	    document.querySelector(".react-datepicker__input-container>input").value="";
	    this.props.updateTasks();
		this.props.thereAreTasks();
		this.props.updateFeed();
	  })
	    .catch(err=>console.log(err))
	  }
	setExpanded = (value) => {
		this.setState({expanded:value});
	}
	saveTask = () => {
		console.log(this.state);
	    // this.setState({shared:true})
	    // let date = new Date();
		  // this.setState({dateShared:date});

    // axios.post('http://localhost:4000/task/updateUserTaskShared', {
    //   "taskId": this.props.task._id,
    //   "field": "shared",
    //   "dateShared": date
    // })
    // .then(response=> {
    //   // this.props.updateTasks();
    //   // this.props.updateFeed();
    //   console.log(response);
    // })
    // .catch(err=>console.log(err))


	}
	render () {
		  // console.log(this.state);
		let {taskName, dateDue, description, penaltyText, penaltyUrl, shared} = this.state;
		let trigger =  <>
			<TextareaAutosize type="text" name="taskName" placeholder="New task" id="mainInput" className="inputTaskName" value={taskName} onChange={this.changeField} />
			</>

		let sibling = <>
			<DateInput name="dateDue" changeDateDue={this.changeDateDue} dateDue={dateDue} />
			<div className="i-wrapper" onClick={this.handleClick}>
				<i className="fas fa-plus"></i>
				<i className="far fa-circle"></i>
			</div>
			</>
		return (
			<div id="taskInput">
			    <Collapsible
				    trigger={trigger}
				    triggerSibling={() => sibling}
				    transitionTime="70"
				    transitionCloseTime="70"
				    triggerDisabled="true"
				    open="true"
				    onOpening={()=>this.setExpanded(true)}
				    onClosing={()=>this.setExpanded(false)}
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
					    <label>IFTTT URL</label>
					    <input name="penaltyUrl" value={penaltyUrl} onChange={this.changeField} />
					    {/*<input name="penaltyUrl" value={penaltyUrl} onChange={this.changeField} />*/}
				    </div>
				    <div>
					    <label>Privacy</label>
					    <span name="shared" onClick={()=>this.changeShared(!shared)}>{shared ? "Public" : "Private"}</span>
				    </div>
            <div className="controls">
              <div onClick={()=>this.props.editTask(false)}>Cancel
                <span className="icons">
                  <i className="fas fa-times"></i>
                </span>
              </div>
              <div onClick={this.saveTask}>Save
                <span className="icons">
                  <i className="fas fa-check"></i>
                </span>
              </div>
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

