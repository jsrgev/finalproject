import React from 'react';
import Collapsible from 'react-collapsible';

class Task extends React.Component {
	render() {
    // console.log(this.props)
		let {taskName, dateDue} = this.props.item;
		// let headline = item;
  return (
  	<>
    <Collapsible trigger={taskName} transitionTime="70" transitionCloseTime="70">
      <p>
        {dateDue}. This is the collapsible content. It can be any element or React
        component you like.
      </p>
      <p>
        It can even be another Collapsible component. Check out the next
        section!
      </p>
    </Collapsible>
    </>
  );
};
}

export default Task;

