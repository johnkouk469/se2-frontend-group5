/* eslint-disable react/require-default-props */
import React from 'react';
import * as PropTypes from 'prop-types';
import {BlueBorderButton, BlueButton} from '../../lib/buttons';

// eslint-disable-next-line react/prefer-stateless-function
class ConfirmationButtonsComponent extends React.Component {
    render() {
        const {onCancel, onSave} = this.props;

        return (
            <div
                style={{
                    width: '300px', display: 'flex', alignItems: 'center', justifyContent: 'space-evenly', marginTop: '10px'
                }}
            >
                <BlueBorderButton
                    id="cancel"
                    type="button"
                    onClick={onCancel}
                >
                    Cancel
                </BlueBorderButton>
                <BlueButton
                    id="save"
                    type="button"
                    onClick={onSave}
                >
                    Save
                </BlueButton>
            </div>
        );
    }
}

ConfirmationButtonsComponent.propTypes = {
    onCancel: PropTypes.func,
    onSave: PropTypes.func
};

export default ConfirmationButtonsComponent;
