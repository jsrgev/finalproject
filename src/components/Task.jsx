import React from 'react';
import axios from 'axios';
import Collapsible from 'react-collapsible';
import {formatDate} from '../functions';
import { isPast } from "date-fns";
import {connect} from 'react-redux';
import TaskEdit from './TaskEdit';
// import {setUserTasks} from '../redux/actions';
import { BASE_API_URL } from '../utils/constants';

class Task extends React.Component {
  constructor() {
    super();
    this.state = {
      // taskName: "",
      // dateDue: "",
      // description: "",
      // penaltyText: "",
      // penaltyUrl: "",
      // shared: "",
      // dateShared: "",
      editMode: false
      // expanded: false
    }
  }
  // componentDidMount = () => {
  //   this.state = this.props.item;
  //   // console.log(this.state);
  // }
  changeField = (e) => {
      // this.setState({[e.target.name]:e.target.value})
  }
  changeDateDue = (date) => {
      // this.setState({dateDue:date})
  }
  changeShared = (value) => {
      let date = value ? new Date() : "";
      // this.setState({dateShared:date});

    axios.post(`${BASE_API_URL}/task/updateUserTask`, {
      "taskId": this.props.taskId,
      "field": "shared",
      "value": value,
      "dateShared": date
    })
    .then(response=> {
      this.props.updateTasks();
      this.props.updateFeed();
    })
    .catch(err=>console.log(err))
  }
  changeCompleted = (value,penaltyUrl,shared) => {
    let penalty = (penaltyUrl && shared) ? true : false;
      axios.post(`${BASE_API_URL}/task/updateUserTaskCompleted`, {
      "taskId": this.props.taskId,
      "value": value,
      "penalty": penalty
    })
    .then(response=> {
      this.props.updateTasks();
      this.props.updateFeed();
    })
    .catch(err=>console.log(err))
  }

  editTask = (value) => {
    this.setState({editMode:value})
  }
  deleteTask = () => {
    axios.post(`${BASE_API_URL}/task/updateUserTask`, {
      "taskId": this.props.taskId,
      "field": "active",
      "value": false
    })
    .then(response=> {
      this.props.updateTasks();
      this.props.updateFeed();
    })
    .catch(err=>console.log(err))
  }
	render() {
    let task = this.props.tasks.find(a => a._id === this.props.taskId);
    let {taskName, dateDue, description, penaltyText, penaltyUrl, shared, completed} = task;

    let completedClass = completed ? "completed" : "uncompleted";
    let pastClass = !dateDue ? null : isPast(new Date(dateDue)) ? "past": null;

    let sibling = <div className="sibling" onClick={()=>this.changeCompleted(!completed, penaltyUrl, shared)}><i className="far fa-circle"></i><i className="far fa-check-circle"></i></div>;

    let trigger = <>
        <div>{taskName}</div>
        <div>{formatDate(dateDue)}</div>  
      </>
    let descriptionDisplay = description && <div><label>Description:</label><span>{description}</span></div>
    let penaltyTextDisplay = penaltyText && <div><label>Penalty:</label><span>{penaltyText}</span></div>
    let penaltyUrlDisplay = penaltyUrl && <div className="url"><label>IFTTT URL:</label><span>{penaltyUrl}</span></div>

    return (
      <>
      {this.state.editMode ?
        <TaskEdit task={task} taskId={this.props.taskId} editTask={this.editTask} /> :
        <div className={`${completedClass} ${pastClass}`}>
          <Collapsible trigger={trigger} triggerSibling={() => sibling} transitionTime="70" transitionCloseTime="70">
            {descriptionDisplay}
            {penaltyTextDisplay}
            {penaltyUrlDisplay}
            <div><label>Privacy:</label><span>{shared ? "Public" : "Private"}</span></div>
            {/*<div><label>Description:</label><span>{description}</span></div>*/}
            {/*<div><label>Penalty:</label><span>{penaltyText}</span></div>*/}
            {/*<div className="url"><label>IFTTT URL:</label><span>{penaltyUrl}</span></div>*/}
            <div className="controls">
              <button onClick={()=>this.editTask(true)}>
                Edit <i className="far fa-edit"></i>
              </button>
              <button onClick={this.deleteTask}>
                Delete<i className="far fa-trash-alt"></i>
              </button>
            </div>
          </Collapsible>
        </div>
      }
        </>
      );
  };
}

const mapStateToProps = (state) => {
  return { 
    user: state.userReducer.user,
    tasks: state.userTaskReducer.tasks
  }
}

// const dispatchStateToProps = (dispatch) => {
//   return {
//     setUserTasks: (array) => dispatch(setUserTasks(array)),
//   }
// }

export default connect(mapStateToProps)(Task);


