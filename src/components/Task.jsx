import React from 'react';
import axios from 'axios';
import Collapsible from 'react-collapsible';
import {formatDate} from '../functions';
import { isPast } from "date-fns";
import {connect} from 'react-redux';
// import {setUserTasks} from '../redux/actions';

class Task extends React.Component {
  // constructor() {
  //   super();
  //   this.state = {}
  // }
  // componentDidMount = () => {
  //   this.state = this.props.item;
  //   // console.log(this.state);
  // }
  changeTaskName = (e) => {
      // this.setState({taskName:e.target.value})
  }
  changeDateDue = (e) => {
      // this.setState({dateDue:e.target.value})
  }
  changeDateDue = (date) => {
      // this.setState({dateDue:date})
  }
  changeDescription = (e) => {
      // this.setState({description:e.target.value})
  }
  changePenalty = (e) => {
      // this.setState({penalty:e.target.value})
  }
  changeShared = (value) => {
    axios.post('http://localhost:4000/task/updateUserTask', {
      "taskId": this.props.taskId,
      "field": "shared",
      "value": value
    })
    .then(response=> {
      this.props.updateTasks();
      this.props.updateFeed();
    })
    .catch(err=>console.log(err))
  }
  changeCompleted = (value) => {
    // console.log(this.props.task.penaltyUrl + this.props.shared.shared);
    let task = this.props.tasks.find(a => a._id === this.props.taskId);
    let penalty = (task.penaltyUrl && task.shared) ? true : false;
    // console.log(penalty)
    axios.post('http://localhost:4000/task/updateUserTaskCompleted', {
      "taskId": this.props.item._id,
      "value": value,
      "penalty": penalty
    })
    .then(response=> {
      this.props.updateTasks();
    })
    .catch(err=>console.log(err))
  }

  editTask = () => {
    console.log("edit");
  }
  deleteTask = () => {
    axios.post('http://localhost:4000/task/updateUserTask', {
      "taskId": this.props.taskId,
      "field": "active",
      "value": false
    })
    .then(response=> {
      this.props.updateTasks();
    })
    .catch(err=>console.log(err))
  }
	render() {
    let task = this.props.tasks.find(a => a._id === this.props.taskId);
    let {taskName, dateDue, description, penaltyText, penaltyUrl, shared, completed} = task;

    let completedClass = completed ? "completed" : "uncompleted";
    let pastClass = !dateDue ? null : isPast(new Date(dateDue)) ? "past": null;

    let sibling = <div className="sibling" onClick={()=>this.changeCompleted(!completed)}><i className="far fa-circle"></i><i className="far fa-check-circle"></i></div>;

    let trigger = <>
        <div>{taskName}</div>
        <div>{formatDate(dateDue)}</div>  
      </>
    let descriptionDisplay = description && <div><label>Description:</label><span>{description}</span></div>
    let penaltyTextDisplay = penaltyText && <div><label>Penalty:</label><span>{penaltyText}</span></div>
    let penaltyUrlDisplay = penaltyUrl && <div className="url"><label>IFTTT URL:</label><span>{penaltyUrl}</span></div>


    return (
      <div className={`${completedClass} ${pastClass}`}>
        <Collapsible trigger={trigger} triggerSibling={() => sibling} transitionTime="70" transitionCloseTime="70">
          {descriptionDisplay}
          {penaltyTextDisplay}
          {penaltyUrlDisplay}
          {/*<div><label>Description:</label><span>{description}</span></div>*/}
          {/*<div><label>Penalty:</label><span>{penaltyText}</span></div>*/}
          {/*<div className="url"><label>IFTTT URL:</label><span>{penaltyUrl}</span></div>*/}
          <div className="controls">
            <div className={shared ? " shared" : ""} onClick={()=>this.changeShared(!shared)}>
              {shared ? "Shared" : "Share"}
              <span className="icons">
                <i className="far fa-share-square"></i>
                {/*<i className="fas fa-share-square"></i>*/}
              </span>
            </div>
            <div onClick={()=>this.editTask()}>Edit
              <span className="icons">
                <i className="far fa-edit"></i>
                {/*<i className="fas fa-edit"></i>*/}
              </span>
            </div>
            <div onClick={this.deleteTask}>Delete
              <span className="icons">
                <i className="far fa-trash-alt"></i>
                {/*<i className="far fa-trash-alt"></i>*/}
              </span>
            </div>
          </div>
        </Collapsible>
      </div>
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


