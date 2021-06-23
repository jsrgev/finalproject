import {SET_LOGIN_STATUS, SET_USER, SET_TASKS} from './actions';
import {combineReducers} from 'redux';

let userInitState = {
	user: "",
	loggedIn: true
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

const taskReducer = (state = {tasks: []}, action = {}) => {
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

