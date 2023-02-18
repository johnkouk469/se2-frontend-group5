// Imports
import {T, cond} from 'ramda';
import {persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import {reducer} from '../lib/redux-helpers';

// Storage key
const storageKey = 'codin-auth';

export const initialState = {user: {}, token: null};

const set = reducer('AUTH.SET', (state, {payload}) => ({
    ...state,
    user: payload.user,
    token: payload.token
}));

/*
    Clear authentication
*/
const clear = reducer('AUTH.CLEAR', (state) => ({
    ...state,
    user: {},
    token: null
}));

/*
    Authenticate user
*/
const setUser = reducer('AUTH.SETUSER', (state, {payload}) => ({
    ...state,
    user: payload
}));

// Default case
const defaultCase = [T, (state) => state || initialState];

const persistedReducer = persistReducer(
    {key: storageKey, storage},
    cond([set, clear, setUser, defaultCase])
);

export default persistedReducer;
