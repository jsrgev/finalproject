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
			// errors: [],
		}
	}
	componentDidMount = () => {
		this.setState({
	      firstName: this.props.user.firstName,
	      lastName: this.props.user.lastName,
	      username: this.props.user.username,
	      email: this.props.user.email,
		})
	}
	handleSubmit = async () => {
	    let errors = await this.checkForErrors();
	    if (errors.length > 0)  {
	      return;
	    }
		let {password, password2, ...user} = this.state;
		let data = {
			userId: this.props.user._id,
			user
		}
		axios.post(`${BASE_API_URL}/user/updateAccount`, data)
	    .then(res => {
	    // console.log(response.data);
	    	if (res.data.errors) {
	    		this.props.addErrors(res.data.errors);
	        	// this.setState({errors:response.data.errors});
		    } else if (res.data.username) {
		    	this.props.addConfirmation("Your changes have been saved.")
		     	localStorage.setItem("user", JSON.stringify(res.data));
		    	this.props.setUser(res.data);
				// this.props.getUsers();
		    	this.props.editAccount(false);
		    }
		})
		.catch(err=>console.log(err))
	}
	changeField = (e) => {
	  this.setState({[e.target.name]:e.target.value})
	}	
  checkForErrors = () => {
      let errors = [];
      let passwordErrors = [];
      // Check form for errors
      const {firstName, lastName, username, email, password, password2} = this.state;
      // console.log(this.state);
      if (!firstName || !lastName || !email || !username) {
         errors.push ({msg: 'Please fill in all fields.'})
      }

      if (password.length>0) {
         if (password.length<6) {
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
      (errors.length>0) && errors.push({msg: 'Your changes have not been saved.'});
      this.props.addErrors([...errors,...passwordErrors]);
      // this.setState({"errors": [...errors,...passwordErrors]});
      return errors;
	}
   	render () {
		let {firstName, lastName, username, email} = this.state;
    // let alerts = this.state.errors && (
    //     <div className="alerts">
    //     {
    //       this.state.errors.map((item,i) => {
    //       return <div className="error" key={i}>{item.msg}</div>
    //     })
    //     }
    //     </div>
      // )
		return (
			<>
            {/*{alerts}*/}
            <form>
				<div><label>First Name</label>
				<input value={this.state.firstName} name="firstName" onChange={this.changeField} /></div>
				<div><label>Last Name</label>
				<input value={this.state.lastName} name="lastName" onChange={this.changeField} /></div>
				<div><label>Username</label>
				<input value={this.state.username} name="username" onChange={this.changeField} /></div>
				<div><label>Email</label>
				<input value={this.state.email} name="email" onChange={this.changeField} /></div>
				<div><label>Password</label>
				<div>******</div></div>
				{/*<div>Member since</div><div>{formatDate(dateEntered, false)}</div>*/}
			</form>
			<div className="controls">
				<button onClick={()=>this.props.editAccount(false)}>Cancel<i className="fas fa-times"></i></button>
				<button onClick={this.handleSubmit}>Save<i className="fas fa-check"></i></button>
			</div>
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