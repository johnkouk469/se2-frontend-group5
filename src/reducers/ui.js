// Imports
import {T, cond} from 'ramda';
import shortid from 'shortid';
import {reducer} from '../lib/redux-helpers';

/*
    Non erroneous initial state
*/
export const initialState = {errors: []};

/* 
    Addition of errors in display
*/
const addError = reducer('UI.ADD_ERROR', (state, {payload}) => ({
    ...state,
    errors: state.errors.concat([{...payload, id: shortid.generate()}])
}));

/* 
    Removal of errors in display
*/
const removeError = reducer('UI.REMOVE_ERROR', (state, {payload: id}) => ({
    ...state,
    errors: state.errors.filter((error) => error.id !== id)
}));

// Default case
const defaultCase = [T, (state) => state || initialState];

// Export modules
export default cond([addError, removeError, defaultCase]);
