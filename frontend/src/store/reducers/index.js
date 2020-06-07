import { combineReducers } from "redux";
import currentUser from "./currentUser";
import errors from "./errors";
import employee from './employee';
import trajectory from './trajectory'
import project from './project'

const rootReducer = combineReducers({
	currentUser,
	errors,
	employee,
	trajectory,
	project
});

export default rootReducer;
