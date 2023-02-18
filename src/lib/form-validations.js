/* eslint-disable max-len */
import * as Yup from 'yup';

// Sets the minimum password length
export const validationConstants = {passwordMinLength: 5};

// Sets the behaviour for the different validation errors
export const validationErrors = {
    username: {required: 'Username is required'},
    password: {
        required: 'Password is required',
        minLength: (min) => `Password should contain at least ${min} characters`
    },
    type: {required: 'Broker type is required'},
    name: {required: 'Name is required'},
    url: {required: 'Url is required'},
    login: {required: 'Login is required'},
    passcode: {required: 'Passcode is required'},
    vhost: {required: 'Vhost is required'}
};

// Password prompts
export const password = Yup
    .string()
    .trim()
    .min(validationConstants.passwordMinLength, `Password should contain at least ${validationConstants.passwordMinLength} characters`)
    .required('Password is required');

// Check if passwords match 
export const confirm = password
    .oneOf([Yup.ref('password')], "Passwords don't match");

// Email insertion prompt
export const email = Yup
    .string()
    .trim()
    .email('Invalid e-mail')
    .required('Email is required');

// Username insertion prompt
export const username = Yup
    .string()
    .trim()
    .required('Username is required');
