import { SET_EMPLOYEE} from '../actionTypes'

export const setEmployee = employee => ({
	type: SET_EMPLOYEE,
	employee
});

export const dispatchEmployee = data => dispatch => dispatch(setEmployee(data))
