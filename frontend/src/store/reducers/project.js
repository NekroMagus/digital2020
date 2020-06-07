import { SET_PROJECT } from '../actionTypes'

export default (state = {}, action) => {
	switch (action.type) {
		case SET_PROJECT:
			return action;
		default:
			return state;
	}
};
