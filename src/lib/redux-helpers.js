// Imports
import {
    equals, complement, isNil, ifElse
} from 'ramda';

const isNotNil = complement(isNil);

/*
    Define the actions available
*/
export const actionTypeEq = (actionType) =>
    ifElse(
        (_, {type}) => isNotNil(type),
        (_, {type}) => equals(actionType, type),
        (_, {type}) => {
            throw new Error(`Action type is ${typeof type}.`);
        }
    );

export const reducer = (type, callback) => [actionTypeEq(type), callback];
