import React from 'react';
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
		let {taskName, dateDue, description, penalty, shared} = this.props.item;
    let dateElement = dateDue ?
      <p>Due: {this.formatDate(dateDue)}</p> :
      null;
  return (
    <Collapsible trigger={taskName} transitionTime="70" transitionCloseTime="70">
      <p>{description}</p>
      <p>Penalty: {penalty}</p>
      {dateElement}
      <div>Shared <input type="checkbox"
      checked={shared}
      onChange={this.changeShared}
      />
      </div>
    </Collapsible>
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


