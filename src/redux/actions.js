export const SET_LOGIN_STATUS = 'SET_LOGIN_STATUS';
export const SET_USER = 'SET_USER';
export const SET_USER_TASKS = 'SET_USER_TASKS';
export const SET_ALL_PUBLIC_TASKS = 'SET_ALL_PUBLIC_TASKS';
export const SET_ALL_USERS = 'SET_ALL_USERS';



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

export const setAllUsers = (array) => {
	return {
		type: SET_ALL_USERS,
		payload: array
	}
}

export const setUserTasks = (array) => {
	return {
		type: SET_USER_TASKS,
		payload: array
	}
}

export const setAllPublicTasks = (array) => {
	return {
		type: SET_ALL_PUBLIC_TASKS,
		payload: array
	}
}

