import React from 'react';
import axios from 'axios';
import {connect} from 'react-redux';

class TaskInput extends React.Component {
  constructor(){
	    super();
	    this.state = {
	      taskName: "",
	      dateDue: ""
		}
	}
	changeTaskName = (e) => {
	    this.setState({taskName:e.target.value})
	}
	changeDateDue = (e) => {
	    this.setState({dateDue:e.target.value})
	}
	handleClick = () => {
	if (this.state.taskName.length === 0) {
		return;
	};
	console.log("clicked");

    // this.setState({errors: []});
    const newTask = {
      taskName: this.state.taskName,
      dateDue: this.state.dateDue,
      userId: this.props.user,
    }
    console.log(newTask);
    axios.post('http://localhost:4000/task/addTask', newTask)
    .then(response=> {
    console.log(response.data);
     // if (response.data.errors) {
        // this.setState({errors:response.data.errors});
    // } else if (response.data.username) {
      // this.props.history.push('/login', { justRegistered: true });
      // console.log("registered")
    // }
    this.setState({taskName:"", dateDue:""});

  })
    .catch(err=>console.log(err))

  }

	render () {
		// console.log(this.props)
		return (
			<div id="taskInput">
				<input type="text" placeholder="New item" className="inputTaskName" onChange={this.changeTaskName} />
				<input type="date" placeholder="Finish" className="inputDateDue" onChange={this.changeDateDue} />
				<i className="fas fa-plus" onClick={this.handleClick}></i>
			</div>
		)
	}
}


const mapStateToProps = (state) => {
	return { 
		user: state.user
	}
}

export default connect(mapStateToProps)(TaskInput);