import React from 'react';
import Collapsible from 'react-collapsible';
import { format, isToday, isTomorrow, isYesterday } from "date-fns";
import {connect} from 'react-redux';
import {setTasks} from '../redux/actions';

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
	render() {
		let {taskName, dateDue, description, penalty, shared} = this.props.item;
    const dateFormat = (date) => {
      if (isToday(date)) {
          return (`Today ${format(date, "p")}`);
      } else if (isTomorrow(date)) {
          return (`Tomorrow ${format(date, "p")}`);
      } else if (isYesterday(date)) {
          return (`Yesterday ${format(date, "p")}`);
      } else {
        return format(date, "d MMM, yyyy p");
      } 
    }
    let dateElement = dateDue ?
      <p>Due: {dateFormat(new Date(dateDue))}</p> :
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
    setTasks: (array) => dispatch(setTasks(array)),
  }
}

export default connect(mapStateToProps,dispatchStateToProps)(Task);


