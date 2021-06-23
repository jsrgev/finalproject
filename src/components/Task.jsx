import React from 'react';
import Collapsible from 'react-collapsible';
import { format } from "date-fns";

class Task extends React.Component {
	render() {
    // console.log(this.props)
		let {taskName, dateDue, description, penalty} = this.props.item;
		// let headline = item;
    let date = dateDue ?
      <p>Due: {format(new Date(dateDue), "d MMM, yyyy p")}</p> :
      null;
  return (
    <Collapsible trigger={taskName} transitionTime="70" transitionCloseTime="70">
      <p>{description}</p>
      <p>{penalty}</p>
      <p>{date}</p>
    </Collapsible>
  );
};
}

export default Task;

