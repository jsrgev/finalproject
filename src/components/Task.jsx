import React from 'react';
import Collapsible from 'react-collapsible';

class Task extends React.Component {
	render() {
		let {item} = this.props;
		let headline = item;
  return (
  	<>
    <Collapsible trigger={headline} transitionTime="70" transitionCloseTime="70">
      <p>
        This is the collapsible content. It can be any element or React
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



// import React from 'react';
// import Collapsible from 'react-collapsible';

// class Task extends React.Component {
// 	render () {
// 		console.log("a");
// 		return (

//     <Collapsible transitionTime="100" transitionCloseTime="100" trigger="Start here">
//       <p>
//         This is the collapsible content. It can be any element or React
//         component you like.
//       </p>
//       <p>
//         It can even be another Collapsible component. Check out the next
//         section!
//       </p>
//     </Collapsible>


// 			// <div className="task">
// 			// 	<p>Task name</p>
// 			// 	<p>Lorem ipsum dolor.</p>
// 			// 	<p>Due</p>
// 			// 	<p>Penalty</p>
// 			// </div>
// 		)
// 	}
// }


// export default Task;