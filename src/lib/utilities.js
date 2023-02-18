// Imports
import {
    allPass,
    isNil,
    path,
    isEmpty,
} from 'ramda';

/*
    Exports the error codes and messages
*/
export const getFormErrorsField = (field, errors, touched) =>
    errors[field] && touched[field] && errors[field];

/*
    Checks for authentication
*/
export const checkIsAuthenticated = allPass([
    (state) => !isNil(path(['auth', 'token'], state)),
    (state) => !isEmpty(path(['auth', 'user'], state))
]);
