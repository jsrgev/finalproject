// export const GET_USER = 'GET_USER';
export const SET_LOGIN_STATUS = 'SET_LOGIN_STATUS';


// export const enterText = (string) => {
// 	return {
// 		type: GET_USER,
// 		payload: string
// 	}
// }

export const setLoginStatus = (value) => {
	return {
		type: SET_LOGIN_STATUS,
		payload: value
	}
}