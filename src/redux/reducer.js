import {SET_LOGIN_STATUS, SET_USER, SET_USER_TASKS, SET_ALL_PUBLIC_TASKS} from './actions';
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

const userTaskReducer = (state = {tasks: []}, action = {}) => {
	switch (action.type) {
		case SET_USER_TASKS:
			return {...state,tasks: action.payload};
		default:
			return {...state}
		}
}

const allPublicTaskReducer = (state = {tasks: []}, action = {}) => {
	switch (action.type) {
		case SET_ALL_PUBLIC_TASKS:
			return {...state,tasks: action.payload};
		default:
			return {...state}
		}
}



export const reducer = combineReducers(
	{
		userReducer,
		userTaskReducer,
		allPublicTaskReducer
	}
)

