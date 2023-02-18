/* eslint-disable max-len */

// http client and prefix url of the page
import {api, prefixUrl} from '../lib/api-adapter';

// client specific for the users route
const usersApi = api.extend({prefixUrl: prefixUrl('users')});

/*
    HTTP calls regarding the users
*/
export const authenticateUser = (data) => usersApi.post('authenticate', {json: data}).json();

export const forgotPassword = (data) => usersApi.post('resetpassword', {json: data}).json();

export const changePassword = (data, token) => usersApi.post('changepassword', {
    json: data,
    headers: {Authorization: `Bearer ${token}`}
}).json();

export const createUser = (data) => usersApi.post('create', {json: data}).json();
