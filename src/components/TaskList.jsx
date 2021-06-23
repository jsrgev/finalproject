import React from 'react';
import Task from './Task.jsx';
import axios from 'axios';
import {connect} from 'react-redux';
import TaskInput from './TaskInput.jsx';


class TaskList extends React.Component {
	componentDidMount = () => {
	    axios.post('http://localhost:4000/task/getTasks', {userId: this.props.user})
	    .then(response=> {
	    console.log(response.data);
	     // if (response.data.errors) {
	        // this.setState({errors:response.data.errors});
	    // } else if (response.data.username) {
	      // this.props.history.push('/login', { justRegistered: true });
	      // console.log("registered")
	    // }
	    // this.setState({taskName:"", dateDue:""});
		})
	}
	render () {
		let taskArray =["Practice piano","Learn Persian","Build website"];
		return (
			<><div id="taskList">
					<TaskInput />
					{taskArray.map((item,i) =>{
						return <Task item={item} key={i} />
					})}
				</div>

    </>
		)
	}
}

const mapStateToProps = (state) => {
  return {
    user: state.userReducer.user
  }
}

// const dispatchStateToProps = (dispatch) => {
//   return {
//     setLoginStatus: (value) => dispatch(setLoginStatus(value)),
//     setUser: (id) => dispatch(setUser(id)),
//   }
// }


export default connect(mapStateToProps)(TaskList);
