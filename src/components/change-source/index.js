/* eslint-disable react/require-default-props */
import React from 'react';
import {
    InputGroup, Menu, Popover
} from '@blueprintjs/core';
import * as PropTypes from 'prop-types';
import {PortalOverflowOverlay} from '../../lib/overlays';
import {FormHeader, SettingsDiv} from '../styled-components';
import {BlueBorderButton, BlueButton} from '../../lib/buttons';

// eslint-disable-next-line react/prefer-stateless-function
class ChangeSourceComponent extends React.Component {
    render() {
        const {open, name, tempSource, availableSources, mapFunc, onTopicChange, topic, onVariableChange, variable, onCancelClick, onSaveClick} = this.props;
        return (
            <PortalOverflowOverlay key="settings" id="settings" isOpen={open} width="450px" height="auto" background="white" borderRadius="10px" padding="20px" marginLeft="auto" marginRight="auto" color="black">
                <FormHeader>
                    {`${name} Settings`}
                </FormHeader>
                <SettingsDiv>
                    <Popover popoverClassName="custom-popover">
                        <BlueBorderButton type="button" width="410px" rightIcon="caret-down">
                            {tempSource}
                        </BlueBorderButton>
                        <Menu>
                            {availableSources.map(mapFunc)}
                        </Menu>
                    </Popover>
                    <div
                        style={{
                            width: '100%', height: '100%', marginTop: '10px', display: 'flex', alignItems: 'center'
                        }}
                    >
                        <InputGroup
                            leftIcon="tag"
                            placeholder="Topic"
                            onChange={onTopicChange}
                            value={topic}
                            fill
                            large
                        />
                    </div>
                    <div
                        style={{
                            width: '100%', height: '100%', marginTop: '10px', display: 'flex', alignItems: 'center'
                        }}
                    >
                        <InputGroup
                            leftIcon="variable"
                            placeholder="Variable"
                            onChange={onVariableChange}
                            value={variable}
                            fill
                            large
                        />
                    </div>
                    <div
                        style={{
                            width: '300px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-evenly',
                            marginTop: '10px'
                        }}
                    >
                        <BlueBorderButton
                            id="cancel"
                            type="button"
                            onClick={onCancelClick}
                        >
                            Cancel
                        </BlueBorderButton>
                        <BlueButton
                            id="save"
                            type="button"
                            onClick={onSaveClick}
                        >
                            Save
                        </BlueButton>
                    </div>
                </SettingsDiv>
            </PortalOverflowOverlay>
        );
    }
}

ChangeSourceComponent.propTypes = {
    open: PropTypes.bool,
    name: PropTypes.string,
    tempSource: PropTypes.string,
    // eslint-disable-next-line react/forbid-prop-types
    availableSources: PropTypes.array,
    mapFunc: PropTypes.func,
    onTopicChange: PropTypes.func,
    topic: PropTypes.string,
    onVariableChange: PropTypes.func,
    variable: PropTypes.string,
    onCancelClick: PropTypes.func,
    onSaveClick: PropTypes.func
};

export default ChangeSourceComponent;
