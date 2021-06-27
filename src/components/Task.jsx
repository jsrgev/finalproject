import React from 'react';
import axios from 'axios';
import Collapsible from 'react-collapsible';
import {formatDate} from '../functions';
import { isPast } from "date-fns";
import {connect} from 'react-redux';
import {setUserTasks} from '../redux/actions';

class Task extends React.Component {
  constructor() {
    super();
    // this.state = {
    //   s
    // }
  }
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
    // console.log(e.target.checked);
    console.log(value);
    // this.setState({shared:false});
    // axios.post('http://localhost:4000/task/updateUserTaskCompleted', {
    //   "taskId": this.props.item._id,
    //   "value": value
    // })
    // .then(response=> {
    //   // console.log(response.data);
    //   // console.log(this.props.updateTasks)
    //   this.props.updateTasks();
    // })
    // .catch(err=>console.log(err))
  }
  changeCompleted = (value) => {
    axios.post('http://localhost:4000/task/updateUserTaskCompleted', {
      "taskId": this.props.item._id,
      "value": value
    })
    .then(response=> {
      this.props.updateTasks();
    })
    .catch(err=>console.log(err))
  }

  // testCron = (taskName, dateDue) => {
  //     axios.get('http://localhost:4000/task/startCronJobs')
  //     .then(response=> {
  //       console.log(response.data);
  //   })
  //     .catch(err => console.log(err))
  // }
  stopCron = (taskName, dateDue) => {
      axios.post('http://localhost:4000/task/stopCron', {
        // "taskId": this.props.item._id,
        // "field": "completed",
        // "value": value
        taskName,
        dateDue
      })
      .then(response=> {
        console.log(response.data);
    })
      .catch(err => console.log(err))
  }
	render() {
		let {taskName, dateDue, description, penaltyText, penaltyUrl, shared, completed} = this.props.item;
    let completedClass = completed ? "completed" : "uncompleted";
    let pastClass = !dateDue ? null : isPast(new Date(dateDue)) ? "past": null;

    let sibling = <div className="sibling" onClick={()=>this.changeCompleted(!completed)}><i className="far fa-circle"></i><i className="far fa-check-circle"></i></div>;

    let trigger = <>
          <div>{taskName}</div>
          <div>{formatDate(dateDue)}</div>
          
        </>
  return (
    <div className={`${completedClass} ${pastClass}`}>
      <Collapsible trigger={trigger} triggerSibling={() => sibling} transitionTime="70" transitionCloseTime="70">
        <div><label>Description:</label><span>{description}</span></div>
        <div><label>Penalty:</label><span>{penaltyText}</span></div>
        <div><label>IFTTT URL:</label><span>{penaltyUrl}</span></div>
        <div><label>Shared</label><input type="checkbox"
        checked={shared}
        onChange={this.changeShared(!shared)}
        />
        </div>
        {/*<div>*/}
          {/*<button onClick={()=>this.testCron(taskName, dateDue)}>Start cron jobs</button>*/}
          <button onClick={()=>this.stopCron(taskName, dateDue)}>Stop Cron</button>
          <button>Delete</button>
        {/*</div>*/}
      </Collapsible>
    </div>
  );
};
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

export default connect(mapStateToProps,dispatchStateToProps)(Task);


