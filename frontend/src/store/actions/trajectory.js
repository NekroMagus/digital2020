import { SET_TRAJECTORY } from '../actionTypes'

export const setTrajectory = trajectory => ({
	type: SET_TRAJECTORY,
	trajectory
});

export const dispatchTrajectory = data => dispatch => dispatch(setTrajectory(data));
