import {SET_LOGIN_STATUS, SET_USER, GET_TASKS} from './actions';
import {combineReducers} from 'redux';

let userInitState = {
	user: "",
	loggedIn: false
}


const userReducer = (state = userInitState, action = {}) => {
	switch (action.type) {
		case SET_LOGIN_STATUS:
			return {...state,loggedIn: action.payload};
		case SET_USER:
			return {...state,user: action.payload};
		default:
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


const taskReducer = (state = [], action = {}) => {
	switch (action.type) {
		case GET_TASKS:
			return {...state,loggedIn: action.payload};
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

