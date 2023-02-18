/* eslint-disable max-len */

// http client and prefix url of the page
import {api, prefixUrl} from '../lib/api-adapter';

// client specific for the general route
const generalApi = api.extend({prefixUrl: prefixUrl('general')});

/*
    HTTP calls regarding the general route
*/
export const getStatistics = () => generalApi.get('statistics').json();

export const getRestStatus = (url) => generalApi.get('test-url', {searchParams: {url}}).json();

export const getRestRequestStatus = (url, type, headers, body, params) => generalApi.get('test-url-request', {
    searchParams: {
        url, type, headers, body, params
    }
}).json();
