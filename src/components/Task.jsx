import React from 'react';
import Collapsible from 'react-collapsible';
import { format } from "date-fns";

class Task extends React.Component {
	render() {
    // console.log(this.props)
		let {taskName, dateDue} = this.props.item;
		// let headline = item;
    let date = dateDue ?
      <p>Due: {format(new Date(dateDue), "d MMM, yyyy p")}</p> :
      null;
  return (
    <Collapsible trigger={taskName} transitionTime="70" transitionCloseTime="70">
    <>
      {date}
        <p>This is the collapsible content. It can be any element or React
        component you like.
      </p>
      <p>
        It can even be another Collapsible component. Check out the next
        section!
      </p>
      </>
    </Collapsible>
  );
};
}

export default Task;

