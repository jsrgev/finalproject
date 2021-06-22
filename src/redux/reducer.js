import {SET_LOGIN_STATUS, SET_USER} from './actions';


let initState = {
	user: "",
	loggedIn: false
}


export const reducer = (state = initState, action = {}) => {
	switch (action.type) {
		case SET_LOGIN_STATUS:
			return {...state,loggedIn: action.payload};
		case SET_USER:
			return {...state,user: action.payload};
		default:
			return {...state}
		}
}



