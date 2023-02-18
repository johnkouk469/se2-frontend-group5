// Imports
import {compose} from 'ramda';
import initializeStore from './initialize-store';

const loadPlugins = compose(initializeStore);

/*
    Export plugins
*/
export default loadPlugins;
