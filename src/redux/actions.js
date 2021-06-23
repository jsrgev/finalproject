export const SET_LOGIN_STATUS = 'SET_LOGIN_STATUS';
export const SET_USER = 'SET_USER';
export const GET_TASKS = 'GET_TASKS';



export const setLoginStatus = (value) => {
	// console.log(value);
	return {
		type: SET_LOGIN_STATUS,
		payload: value
	}
}

export const setUser = (id) => {
	return {
		type: SET_USER,
		payload: id
	}
}


export const getTasks = (a) => {
	return {
		type: GET_TASKS,
		payload: a
	}
}