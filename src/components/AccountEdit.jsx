import React from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {setUser} from '../redux/actions';
import { BASE_API_URL } from '../utils/constants';

class AccountEdit extends React.Component {
	constructor () {
		super();
		this.state = {
    		firstName: "",
			lastName: "",
			username: "",
			email: "",
			password: "",
			password2: "",
			originalState: {},
		}
	}
	componentDidMount = () => {
		this.setState({
		    firstName: this.props.user.firstName,
		    lastName: this.props.user.lastName,
		    username: this.props.user.username,
		    email: this.props.user.email,
		})
		this.setState({originalState: {
		    firstName: this.props.user.firstName,
		    lastName: this.props.user.lastName,
		    username: this.props.user.username,
		    email: this.props.user.email,
			password: "",
			password2: "",
			}})
	}
	handleSubmit = async () => {
	    let errors = await this.checkForErrors();
	    if (errors.length > 0)  {
	      errors.push({msg: 'Your changes have not been saved.'});
	      this.props.addErrors(errors);
	      return;
	    }
		let data = {
			userId: this.props.user._id,
			user: {...this.state}
		}
		axios.post(`${BASE_API_URL}/user/updateAccount`, data)
	    .then(res => {
	    	if (res.data.errors) {
	    		this.props.addErrors(res.data.errors);
		    } else if (res.data.username) {
		    	this.props.addConfirmation("Your changes have been saved.")
		     	localStorage.setItem("user", JSON.stringify(res.data));
		    	this.props.setUser(res.data);
		    	this.props.editAccount(false);
		    }
		})
		.catch(err=>console.log(err))
	}
	changeField = (e) => {
		this.setState({[e.target.name]:e.target.value});
	}
  checkForErrors = () => {
      let errors = [];
      let passwordErrors = [];
      // Check form for errors
      const {firstName, lastName, username, email, password, password2} = this.state;
      if (!firstName || !lastName || !email || !username) {
         errors.push ({msg: 'Please fill in all fields.'})
      }
      if ((password && !password2) || (!password && password2)) {
         errors.push ({msg: 'Please enter the new password twice.'})
      }

      if (password.length>0 || password2.length>0) {
         if (password.length<6 || password2.length<6) {
           passwordErrors.push ({msg: 'Password must be at least 6 characters.'})
         } else {
            if (password === username) {
               passwordErrors.push ({msg: 'Password cannot match username.'})
            }
            if (password === email) {
               passwordErrors.push ({msg: 'Password cannot match email.'})
            }
            if (password === firstName || password === lastName || password === firstName+lastName) {
               passwordErrors.push ({msg: 'Password cannot be your name.'})
            }
            if (password === "password") {
               passwordErrors.push ({msg: 'Password is too easy to guess. Please choose a different one.'})
            }
         }
         if (passwordErrors.length===0 && password !== password2 && password2.length>0) {
            passwordErrors.push ({msg: 'Passwords do not match.'})
         }
      }
      return [...errors,...passwordErrors];
	}
   	render () {
		let {firstName, lastName, username, email, password, password2} = this.state;
		let {originalState, ...currentState} = this.state;
		let isDisabled = (JSON.stringify(originalState) === JSON.stringify(currentState)) ? true : false;
		let conditionalDisplay = (this.props.user._id === "615ec31650cfa00b8de0f3dd") ?
				<>
					<div><label>Username</label><div>{username}</div></div>
					<div><label>Email</label><div>{email}</div></div>
					<div><label>Password</label><div>* * * * * * * * * *</div></div>
				</>
				:
				<>
				<div><label>Username</label>
				<input value={username} name="username" onChange={this.changeField} /></div>
				<div><label>Email</label>
				<input value={email} name="email" onChange={this.changeField} /></div>
				<div><label>New Password</label>
				<input type="password" value={password} name="password" onChange={this.changeField} /></div>
				<div><label>Confirm Password</label>
				<input type="password" value={password2} name="password2" onChange={this.changeField} /></div>
				</>
		let guestMessage = (this.props.user._id === "615ec31650cfa00b8de0f3dd") ?
			<div className="message">(Username, email, and password are not editable on guest account.)</div> : null;
		return (
			<>
            <form>
				<div><label>First Name</label>
				<input value={firstName} name="firstName" onChange={this.changeField} /></div>
				<div><label>Last Name</label>
				<input value={lastName} name="lastName" onChange={this.changeField} /></div>
				{conditionalDisplay}
			</form>
			<div className="controls">
				<button onClick={()=>this.props.editAccount(false)}>Cancel<i className="fas fa-times"></i></button>
				<button disabled={isDisabled} onClick={this.handleSubmit}>Save<i className="fas fa-check"></i></button>
			</div>
			{guestMessage}
			</>
		)
	}
}


const mapStateToProps = (state) => {
  return {
    user: state.userReducer.user,
  }
}

const dispatchStateToProps = (dispatch) => {
  return {
    setUser: (info) => dispatch(setUser(info)),
  }
}

export default connect(mapStateToProps, dispatchStateToProps)(AccountEdit);