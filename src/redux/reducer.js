import {SET_LOGIN_STATUS} from './actions';


let initState = {
	user: "",
	loggedIn: false
}


export const reducer = (state = initState, action = {}) => {
	console.log(action.payload);
	switch (action.type) {
		case SET_LOGIN_STATUS:
			return {...state,loggedIn: action.payload};
		default:
			return {...state}
		}
}



