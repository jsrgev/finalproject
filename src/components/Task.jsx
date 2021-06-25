import React from 'react';
import axios from 'axios';
import Collapsible from 'react-collapsible';
import { format, isToday, isTomorrow, isYesterday } from "date-fns";
import {connect} from 'react-redux';
import {setUserTasks} from '../redux/actions';

class Task extends React.Component {
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
  changeShared = (e) => {
    console.log(e.target.checked);
      // this.setState({shared:e.target.checked})
  }
  changeCompleted = (value) => {
    // console.log(this.props.item._id);
    // updateTaskLikes = (value) => {
      axios.post('http://localhost:4000/task/updateUserTask', {
        "taskId": this.props.item._id,
        "field": "completed",
        // "userId": this.props.user.id,
        "value": value
      })
      .then(response=> {
        console.log(response.data);
      this.props.updateTasks();
    })
      .catch(err=>console.log(err))
    // }
  }
  formatDate =  (date) => {
    let newDate = new Date(date);
      if (isToday(newDate)) {
          return (`Today ${format(newDate, "p")}`);
      } else if (isTomorrow(newDate)) {
          return (`Tomorrow ${format(newDate, "p")}`);
      } else if (isYesterday(newDate)) {
          return (`Yesterday ${format(newDate, "p")}`);
      } else {
        return format(newDate, "d MMM, yyyy p");
      } 
    }
	render() {
		let {taskName, dateDue, description, penalty, shared, completed} = this.props.item;
    let completedClass = completed ? "completed" : "uncompleted";

    // Null date will be interpreted as 1/Jan/1970 if passed thru formatter!
    let dateElement = dateDue &&
      this.formatDate(dateDue);

    let sibling = <div className="sibling" onClick={()=>this.changeCompleted(!completed)}><i className="far fa-circle"></i><i className="far fa-check-circle"></i></div>;

    let trigger = <>
          <div>{taskName}</div>
          <div>{dateElement}</div>
          
        </>
  return (
    <div className={completedClass}>
      <Collapsible trigger={trigger} triggerSibling={() => sibling} transitionTime="70" transitionCloseTime="70">
        <p>{description}</p>
        <p>Penalty: {penalty}</p>
        <div>Shared <input type="checkbox"
        checked={shared}
        onChange={this.changeShared}
        />
        </div>
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


