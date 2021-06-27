import React from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {setUser} from '../redux/actions';
import DateInput from './DateInput';
import TextareaAutosize from 'react-textarea-autosize';
import Collapsible from 'react-collapsible';
import { isDate, isPast } from "date-fns";

class ProfileInput extends React.Component {
  constructor(){
	    super();
	    this.state = {
	      firstName: "",
	      lastName: "",
	      location: "",
	      about: "",
	      gender: "",
	      birthdate: "",
	      shareBirthyear: "",
	      avatar: "",
	      links: []
		}
	}
	componentDidMount = () => {
		this.setState({
	      firstName: this.props.user.firstName,
	      lastName: this.props.user.lastName,
	      location: this.props.user.location,
	      gender: this.props.user.gender,
	      birthdate: this.props.user.birthdate,
	      shareBirthyear: this.props.user.shareBirthyear,
	      avatar: this.props.user.avatar,
	      links: this.props.user.links
		})
	}
	updateField = (e) => {
	  this.setState({[e.target.name]:e.target.value})
	  // console.log(e.target.value)
	}
	handleSubmit = () => {
		// console.log(this.state);
		let user = {...this.state}
		let data = {
			userId : this.props.user._id,
			user :{...this.state}
		}
		axios.post('http://localhost:4000/user/updateProfile', data)
	    .then(res => {
	  	console.log(res.data);
	  	// console.log(JSON.stringify.res.data)
      localStorage.setItem("user", JSON.stringify(res.data));
      this.props.setUser(res.data);
			this.props.getUsers();
			this.props.editProfile(false);
	  })
	   .catch(err=>console.log(err))
	}

	// updateFeed = () => {
	//     axios.get('http://localhost:4000/task/getAllPublicTasks')
	//     .then(response=> {
	// 	    this.props.setAllPublicTasks(response.data.tasks);
	// 	    ((response.data.result) && response.data.tasks.length===0) && this.setState({sharedTasks: false});
	// 	})
	// 	.catch(err => console.log(err))
	// }
	render () {
		let {firstName, lastName, location, gender, birthdate, avatar, links, dateEntered} = this.props.user._id;
		return (
			<div id="profileInput">
					<div id="profileGrid">
						{/*<div>Location</div><div><input value={this.state.location} name="location" onChange={this.updateField} /></div>*/}
						<div>Avatar link</div><div><TextareaAutosize value={this.state.avatar} name="avatar" onChange={this.updateField} /></div>
						{/*<div>Birthday</div><div><div>{this.state.birthdate}</div></div>*/}
						{/*<div>Links</div><div><div>{this.state.links}</div></div>*/}
						<div>About</div><div><input value={this.state.about} name="about" onChange={this.updateField} /></div>
						{/*<div>Current Tasks</div>*/}
						<div>Gender</div>
				      <div name="gender" value={this.state.gender} onChange={this.updateField} >
				        <input type="radio" checked={this.state.gender === "male"} value="male" name="gender" /> Male
				        <input type="radio" checked={this.state.gender === "female"} value="female" name="gender" /> Female
				        <input type="radio" checked={this.state.gender === "noAnswer"} value="noAnswer" name="gender" /> No answer
				      </div>
					</div>
					<button onClick={()=>this.props.editProfile(false``)}>Cancel</button>
					<button onClick={this.handleSubmit}>Submit</button>
				</div>
		)
	}
}


						{/*<div>First Name</div><div><input value={this.state.firstName} name="firstName" onChange={this.updateField} /></div>*/}
						{/*<div>Last Name</div><div><input value={this.state.lastName} name="lastName" onChange={this.updateField} /></div>*/}



const mapStateToProps = (state) => {
	return { 
		user: state.userReducer.user
	}
}

const dispatchStateToProps = (dispatch) => {
  return {
    // setUserTasks: (array) => dispatch(setUserTasks(array)),
    // setAllPublicTasks: (array) => dispatch(setAllPublicTasks(array)),
    setUser: (info) => dispatch(setUser(info)),
  }
}

export default connect(mapStateToProps, dispatchStateToProps)(ProfileInput);

