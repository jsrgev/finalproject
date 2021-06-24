import React from 'react';
import PostDisplay from './PostDisplay.jsx';
import axios from 'axios';
import {connect} from 'react-redux';
import {setAllPublicTasks, setAllUsers} from '../redux/actions';

class Feed extends React.Component {
	componentDidMount = () => {
		this.updateFeed();
		this.getUsers();
	}
	updateFeed = () => {
	    axios.get('http://localhost:4000/task/getAllPublicTasks')
	    .then(response=> {
		    // console.log(response.data);
		    this.props.setAllPublicTasks(response.data.tasks);
		})
		.catch(err => console.log(err))
	}
	getUsers = () => {
	    axios.get('http://localhost:4000/user/getUsers')
	    .then(response=> {
		    // console.log(response.data);
		    this.props.setAllUsers(response.data.users);
		})
		.catch(err => console.log(err))

	}
	render () {
		let allPublicTasks = this.props.allPublicTasks;
		return (
			<div id="feed">
				{allPublicTasks.length>0 ?
					allPublicTasks.map(({_id},i) => {
						return(
							<PostDisplay id={_id} key={i} />
							)
					})
				 :

				<div className="loadingScreen">Loading ...</div>
				}
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

const dispatchStateToProps = (dispatch) => {
  return {
    setAllPublicTasks: (array) => dispatch(setAllPublicTasks(array)),
    setAllUsers: (array) => dispatch(setAllUsers(array)),
  }
}


export default connect(mapStateToProps,dispatchStateToProps)(Feed);
