import { SET_EMPLOYEE } from '../actionTypes'

export default (state = {}, action) => {
	switch (action.type) {
		case SET_EMPLOYEE:
			return {
				employee: action
			};
		default:
			return state;
	}
};
