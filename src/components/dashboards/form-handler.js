// Imports
import * as Yup from 'yup';
import {validationErrors} from '../../lib/form-validations';

const {name} = validationErrors;

/*
    Export validation schema
*/
export const validationSchema = Yup.object(({
    name: Yup
        .string()
        .required(name.required)
}));

/*
    Export handle for submission of new dashboard
*/
export const handleSubmit = async (values, {setSubmitting}, {saveFormPopup}) => {
    try {
        setSubmitting(true);
        saveFormPopup(values);
    } catch (error) {
        setSubmitting(false);
    }
};
