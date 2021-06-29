import { format, isToday, isTomorrow, isYesterday } from "date-fns";
// import {connect} from 'react-redux';
// import { useSelector } from 'react-redux'

export const formatDate =  (date,includeTime = true) => {
    // Null date will be interpreted as 1/Jan/1970 if passed thru formatter!
	if (!date) {
    // console.log(`function says no date`)
		return "";
	}
    // console.log(`function says there is a date`)
	let time = includeTime ? ` ${format(new Date(date), "p")}` : "";
	let newDate = new Date(date);
      if (isToday(newDate)) {
          // console.log (`Today${time}`);
          return (`Today${time}`);
      } else if (isTomorrow(newDate)) {
          // console.log (`Today${time}`);
          return (`Today${time}`);
      } else if (isYesterday(newDate)) {
          // console.log (`Yesterday${time}`);
          return (`Yesterday${time}`);
      } else {
        // console.log(format(newDate, "d MMM, yyyy")+time);
        return format(newDate, "d MMM, yyyy")+time;
      } 
}

// export const getFullName = (id) => {
  // let res = useSelector(state => state.user);
  // return "asd"
  // if tries to get do 'find' before 'users' is populated, causes crash
  // if (this.props.users.length>0) {
  // let user = this.props.users.find(a => a._id === id);
  // return `${user.firstName} ${user.lastName}`;
  // }
   // else {
    // return ""
  // }
// }


// export const getUsername = (id) => {
// 	// if tries to get do 'find' before 'users' is populated, causes crash
// 	if (this.props.users.length>0) {
// 	let user = this.props.users.find(a => a._id === id);
// 	return user.username;
//     }
//      else {
//     	return ""
//     }
// }



// const mapStateToProps = (state) => {
//   return {
//     user: state.userReducer.user,
//     users: state.allUserReducer.users,
//     tasks: state.userTaskReducer.tasks,
//     allPublicTasks: state.allPublicTaskReducer.tasks
//   }
// }


// export default 
// connect(mapStateToProps)(getFullName);