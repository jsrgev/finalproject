export const SET_LOGIN_STATUS = 'SET_LOGIN_STATUS';
export const SET_USER = 'SET_USER';
export const SET_TASKS = 'SET_TASKS';



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


export const setTasks = (array) => {
	return {
		type: SET_TASKS,
		payload: array
	}
}