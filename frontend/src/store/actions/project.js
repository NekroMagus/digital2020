import { SET_PROJECT } from '../actionTypes'

export const setProject = project => ({
	type: SET_PROJECT,
	project
});

export const dispatchProject = data => dispatch => dispatch(setProject(data));
