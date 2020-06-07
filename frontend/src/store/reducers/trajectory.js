import { SET_TRAJECTORY } from '../actionTypes'

export default (state = {}, action) => {
	switch (action.type) {
		case SET_TRAJECTORY:
			return action;
		default:
			return state;
	}
};
