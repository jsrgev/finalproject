import React from 'react';
import {connect} from 'react-redux';
// import {setAllPublicTasks} from '../redux/actions';
import { format, isToday, isTomorrow, isYesterday } from "date-fns";

class PostDisplay extends React.Component {

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
   	render () {
		// console.log(this.props);
		let id = this.props.id;
		let item = this.props.allPublicTasks.find(a => a._id == id);
		let {completed, dateDue, description, penalty, taskName, userId} = item;
		return (
			<div className="postDisplay">
				<h3>{taskName}</h3>
				<p>{userId}</p>
				<p>{description}</p>
				<p>Due: {this.formatDate(dateDue)}</p>
				<p>Penalty: {penalty}</p>
			</div>
		)
	}
}



const mapStateToProps = (state) => {
  return {
    user: state.userReducer.user,
    tasks: state.userTaskReducer.tasks,
    allPublicTasks: state.allPublicTaskReducer.tasks
  }
}

// const dispatchStateToProps = (dispatch) => {
//   return {
//     setAllPublicTasks: (array) => dispatch(setAllPublicTasks(array)),
//   }
// }


export default connect(mapStateToProps)(PostDisplay);