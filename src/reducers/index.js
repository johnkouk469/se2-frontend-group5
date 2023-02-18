/*
    Imports the reducers 
*/
import {combineReducers} from 'redux';
import auth from './auth';
import ui from './ui';

/*
    Export the combined reducers
*/
export default combineReducers({auth, ui});
