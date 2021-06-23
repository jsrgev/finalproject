import {SET_LOGIN_STATUS, SET_USER, SET_TASKS} from './actions';
import {combineReducers} from 'redux';

let userInitState = {
	user: "",
	loggedIn: true
}


const userReducer = (state = userInitState, action = {}) => {
	// console.log("userReducer");
	// console.log(action)
	switch (action.type) {
		case SET_LOGIN_STATUS:
			return {...state,loggedIn: action.payload};
		case SET_USER:
	console.log("setting user")
			return {...state,user: action.payload};
		default:
	// console.log("default")
			return {...state}
		}
}

// let taskInitState = {
// 	taskName: "",
// 	dateDue: "",
// 	details: "",
// 	penalty: "",
// 	completed: ""
// }


const taskReducer = (state = {tasks: []}, action = {}) => {
	// console.log("taskReducer")
	// console.log(action)
	switch (action.type) {
		case SET_TASKS:
			return {...state,tasks: action.payload};
		default:
			return {...state}
		}
}


export const reducer = combineReducers(
	{
		userReducer,
		taskReducer
	}
)

