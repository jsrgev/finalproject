import React from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
// import {setUserTasks} from '../redux/actions';
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
	      shared: false,
	      dateShared: "",
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
	changeShared = (value) => {
	    this.setState({shared:value})
	    let date = value ? new Date() : "";
		  this.setState({dateShared:date});
	}
	handleClick = () => {
		// console.log(this.state);
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

	    const newTask = { ...this.state, userId: this.props.user._id};

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

	render () {
		let {taskName, dateDue, description, penaltyText, penaltyUrl, shared} = this.state;
		let trigger =  <>
			<TextareaAutosize type="text" placeholder="New task" id="mainInput" className="inputTaskName" value={taskName} onChange={this.changeTaskName} />
			</>

		let sibling = <>
			<DateInput changeDateDue={this.changeDateDue} dateDue={dateDue} />
			<div className="i-wrapper" onClick={this.handleClick}>
				<i className="fas fa-plus"></i>
				<i className="far fa-circle"></i>
			</div>
			</>
		let triggerDisabled: false;
		if (taskName.length>0 && document.getElementById("mainInput").closest(".is-open")) {
			triggerDisabled = true;
		}
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
				    	<TextareaAutosize value={description} onChange={this.changeDescription} />
				    </div>
				    <div>
					    <label>PenaltyText</label>
					    <TextareaAutosize value={penaltyText} onChange={this.changePenaltyText} />
				    </div>
				    <div>
					    <label>Penalty URL</label>
					    <input value={penaltyUrl} onChange={this.changePenaltyUrl} />
				    </div>
	          <div className="controls">
		          <div></div>
	            <div className={shared ? " shared" : ""} onClick={()=>this.changeShared(!shared)}>
	              {shared ? "Shared" : "Share"}
	              <span className="icons">
	                <i className="far fa-share-square"></i>
	                {/*<i className="fas fa-share-square"></i>*/}
	              </span>
	            </div>
		          <div></div>
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

// const dispatchStateToProps = (dispatch) => {
//   return {
//     // setUserTasks: (array) => dispatch(setUserTasks(array)),
//     // setAllPublicTasks: (array) => dispatch(setAllPublicTasks(array)),
//   }
// }
export default connect(mapStateToProps)(TaskInput);

