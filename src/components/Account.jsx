import React from 'react';
import {connect} from 'react-redux';
// import {formatDate} from '../functions';
import AccountDisplay from './AccountDisplay';
import AccountEdit from './AccountEdit';

class Account extends React.Component {
	constructor () {
		super();
		this.state = {
			editMode: false,
			confirmation: "",
			errors: []
		}
	}
	editAccount = (value) => {
		this.setState({editMode: value});
		if (value) {
			this.setState({confirmation: ""})
		} else {
			this.setState({errors: []});
		};
	}
	addErrors = (array) => {
		this.setState({errors: array})
	}
	addConfirmation = (msg) => {
		this.setState({confirmation:msg})
	}
	render () {
    let alerts = (this.state.confirmation) ?
		    <div className="alerts"><div>{this.state.confirmation}</div></div> :
		    (this.state.errors.length>0) ?
	        <div className="alerts">
	        {
	          this.state.errors.map((item,i) => {
	          		console.log(item);
		          return <div className="error" key={i}>{item.msg}</div>
	        })
	        }
	        </div> :
	        null
		return (
			<main id="account">
				<h2>My Account</h2>
				{alerts}
				{this.state.editMode ? <AccountEdit editAccount={this.editAccount} addErrors={this.addErrors} addConfirmation ={this.addConfirmation} /> : <AccountDisplay editAccount={this.editAccount} />}
			</main>
		)
	}
}

const mapStateToProps = (state) => {
  return {
    user: state.userReducer.user,
    // users: state.allUserReducer.users,
    // tasks: state.userTaskReducer.tasks,
    // allPublicTasks: state.allPublicTaskReducer.tasks
  }
}

export default connect(mapStateToProps)(Account);
