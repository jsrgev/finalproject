export const SET_LOGIN_STATUS = 'SET_LOGIN_STATUS';
export const SET_USER = 'SET_USER';



export const setLoginStatus = (value) => {
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