import { format, isToday, isTomorrow, isYesterday } from "date-fns";

export const formatDate =  (date,includeTime = true) => {
    // Null date will be interpreted as 1/Jan/1970 if passed thru formatter!
	if (!date) {
		return "";
	}
	let time = includeTime ? ` ${format(new Date(date), "p")}` : "";
	let newDate = new Date(date);
      if (isToday(newDate)) {
          return (`Today${time}`);
      } else if (isTomorrow(newDate)) {
          return (`Tomorrow${time}`);
      } else if (isYesterday(newDate)) {
          return (`Yesterday${time}`);
      } else {
        return format(newDate, "d MMM, yyyy")+time;
      } 
}

// export const getFullName = (id) => {
// 	// if tries to get do 'find' before 'users' is populated, causes crash
// 	if (this.props.users.length>0) {
// 	let user = this.props.users.find(a => a._id === id);
// 	return `${user.firstName} ${user.lastName}`;
//     }
//      else {
//     	return ""
//     }
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