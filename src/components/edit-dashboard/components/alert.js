/* eslint-disable react/require-default-props */
import React from 'react';
import {Alert} from '@blueprintjs/core';
import * as PropTypes from 'prop-types';

// eslint-disable-next-line react/prefer-stateless-function
class AlertComponent extends React.Component {
    render() {
        const {open, onCancel, onConfirm, name} = this.props;
        // eslint-disable-next-line max-len
        return (
            // eslint-disable-next-line max-len
            <Alert key="delete-alert" style={{background: 'white', color: 'black'}} usePortal cancelButtonText="Cancel" confirmButtonText="Delete" icon="trash" intent="danger" isOpen={open} onCancel={onCancel} onConfirm={onConfirm}>
                <p>
                    Are you sure you want to delete the component
                    {/* eslint-disable-next-line react/destructuring-assignment */}
                    <b style={{marginLeft: '5px'}}>{name}</b>
                    ?
                </p>
            </Alert>
        );
    }
}

AlertComponent.propTypes = {
    // eslint-disable react/no-unused-prop-types
    open: PropTypes.func,
    onCancel: PropTypes.func,
    onConfirm: PropTypes.func,
    name: PropTypes.string
};

export default AlertComponent;
