import movies from './movies_reducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
	movies
});

export default rootReducer;