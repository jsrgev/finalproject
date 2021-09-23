import React from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {setUser} from '../redux/actions';
// import DateInput from './DateInput';
import TextareaAutosize from 'react-textarea-autosize';
import { BASE_API_URL } from '../utils/constants';

class ProfileEdit extends React.Component {
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
	      avatarUrl: "",
	      links: []
		}
	}
	componentDidMount = () => {
		this.setState({
	      firstName: this.props.user.firstName,
	      lastName: this.props.user.lastName,
	      location: this.props.user.location,
	      gender: this.props.user.gender,
	      about: this.props.user.about,
	      birthdate: this.props.user.birthdate,
	      shareBirthyear: this.props.user.shareBirthyear,
	      avatarUrl: this.props.user.avatarUrl,
	      links: this.props.user.links
		})
	}
	updateField = (e) => {
	  this.setState({[e.target.name]:e.target.value})
	}
	updateGender = (e) => {
	  if (e.target.name === "gender") {
	  	let {avatarUrl} = this.state;
	  	let newAvatarUrl = avatarUrl;
	  	if (e.target.value === "male") {
	  		if (avatarUrl.includes("/female/")) {
	  			newAvatarUrl = avatarUrl.replace('/female/', '/male/');
	  		} else {
	  			newAvatarUrl = avatarUrl.replace('https://joeschmoe.io/api/v1/', 'https://joeschmoe.io/api/v1/male/');
	  		}
	  	} else if (e.target.value === "female") {
	  		if (avatarUrl.includes("/male/")) {
	  			newAvatarUrl = avatarUrl.replace('/male/', '/female/');
	  		} else {
	  			newAvatarUrl = avatarUrl.replace('https://joeschmoe.io/api/v1/', 'https://joeschmoe.io/api/v1/female/');
	  		}
	  	} else if (e.target.value === "noAnswer") {
	  		if (avatarUrl.includes("/male/")) {
	  			newAvatarUrl = avatarUrl.replace('/male/', '/');
	  		} else {
	  			newAvatarUrl = avatarUrl.replace('/female/', '/');
	  		}
	  	}
	  	this.setState({avatarUrl:newAvatarUrl});
	  }
	}
	handleSubmit = () => {
		let data = {
			userId: this.props.user._id,
			user: {...this.state}
		}
		axios.post(`${BASE_API_URL}/user/updateProfile`, data)
	    .then(res => {
      localStorage.setItem("user", JSON.stringify(res.data));
      this.props.setUser(res.data);
			this.props.getUsers();
			this.props.editProfile(false);
	  })
	   .catch(err=>console.log(err))
	}
	render () {
		let {firstName, lastName, avatarUrl} = this.state;
		return (
			<>
				<div className="profileHeader">
					<h3>{`${firstName} ${lastName}`}</h3>
					<img className="avatar-medium" src={avatarUrl} alt="avatar" />
				</div>
				<div id="profileInput">
					<div id="profileGrid">
						{/*<div>Location</div><div><input value={this.state.location} name="location" onChange={this.updateField} /></div>*/}
						<label>Avatar link</label><div><TextareaAutosize value={this.state.avatarUrl} name="avatarUrl" onChange={this.updateField} /></div>
						{/*<div>Birthday</div><div><div>{this.state.birthdate}</div></div>*/}
						{/*<div>Links</div><div><div>{this.state.links}</div></div>*/}
						<label>About</label><div><TextareaAutosize value={this.state.about} name="about" onChange={this.updateField} /></div>
						<label>Gender</label>
				      <div name="gender" value={this.state.gender} onChange={this.updateField} >
				        <span><input type="radio" checked={this.state.gender === "male"} onChange={this.updateGender} value="male" name="gender" />
				        <label>Male</label></span>
				        <span><input type="radio" checked={this.state.gender === "female"} onChange={this.updateGender} value="female" name="gender" />
				        <label>Female</label></span>
				        <span><input type="radio" checked={this.state.gender === "noAnswer"} onChange={this.updateGender} value="noAnswer" name="gender" />
				        <label>No answer</label></span>
				      </div>
					</div>
					<div className="controls">
						<button onClick={()=>this.props.editProfile(false)}>Cancel<i className="fas fa-times"></i></button>
						<button onClick={this.handleSubmit}>Save<i className="fas fa-check"></i></button>
					</div>
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

const dispatchStateToProps = (dispatch) => {
  return {
    setUser: (info) => dispatch(setUser(info)),
  }
}

export default connect(mapStateToProps, dispatchStateToProps)(ProfileEdit);

