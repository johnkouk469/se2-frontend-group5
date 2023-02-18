import {
    allPass,
    isNil,
    path,
    isEmpty,
} from 'ramda';

export const getFormErrorsField = (field, errors, touched) =>
    errors[field] && touched[field] && errors[field];

export const checkIsAuthenticated = allPass([
    (state) => !isNil(path(['auth', 'token'], state)),
    (state) => !isEmpty(path(['auth', 'user'], state))
]);

export const formatDate = (date, onlyHours = false) => {
    const day = ((String(date.getDate())).length === 1) ? `0${String(date.getDate())}` : String(date.getDate());
    const month = ((String(date.getMonth() + 1)).length === 1) ? `0${String(date.getMonth() + 1)}` : String(date.getMonth() + 1);
    const year = date.getFullYear();
    const hours = ((String(date.getHours())).length === 1) ? `0${String(date.getHours())}` : String(date.getHours());
    const minutes = ((String(date.getMinutes())).length === 1) ? `0${String(date.getMinutes())}` : String(date.getMinutes());
    const seconds = ((String(date.getSeconds())).length === 1) ? `0${String(date.getSeconds())}` : String(date.getSeconds());
    if (onlyHours) {
        return (`${hours}:${minutes}:${seconds}`);
    }
    return (`${day}/${month}/${year}, ${hours}:${minutes}:${seconds}`);
};
