import React from 'react';
import Collapsible from 'react-collapsible';
import { format, isToday, isTomorrow, isYesterday } from "date-fns";

class Task extends React.Component {
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
      // onChange={this.changeShared}
      />
      </div>
    </Collapsible>
  );
};
}

export default Task;

