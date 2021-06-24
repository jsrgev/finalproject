import React from 'react';
import PostDisplay from './PostDisplay.jsx';
import axios from 'axios';
import {connect} from 'react-redux';
import {setAllPublicTasks} from '../redux/actions';

class Feed extends React.Component {
	componentDidMount = () => {
		this.updateFeed();
	}
	updateFeed = () => {
	    axios.get('http://localhost:4000/task/getAllPublicTasks')
	    .then(response=> {
		    // console.log(response.data);
		    this.props.setAllPublicTasks(response.data.tasks);
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

				<div>There are no tasks currently shared.</div>
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
  }
}


export default connect(mapStateToProps,dispatchStateToProps)(Feed);
