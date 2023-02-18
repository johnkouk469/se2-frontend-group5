/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable max-len */
import React from 'react';
import {
    InputGroup, Menu, MenuItem, Popover
} from '@blueprintjs/core';
/* eslint-disable import/no-unresolved */
import ReactResizeDetector from 'react-resize-detector';
import {PortalOverflowOverlay} from '../../../lib/overlays';
import {BlueBorderButton, BlueButton} from '../../../lib/buttons';
import {FormHeader, SettingsDiv} from '../../styled-components';
import AlertComponent from './alert';
import Toolbar from './toolbar';
import UpdateSourceComponent from './update-source';

class Value extends UpdateSourceComponent {
    constructor(props) {
        super(props);

        this.type = props.type;
        this.updateItem = props.updateItem;
        this.deleteItem = props.deleteItem;
        this.cloneComponent = props.cloneComponent;

        this.state = {
            id: props.id,
            availableSources: props.availableSources,
            name: props.initialState.name || 'Value',
            source: props.initialState.source || 'Select source',
            topic: props.initialState.topic || '',
            variable: props.initialState.variable || '',
            unit: props.initialState.unit || '%',
            popoverOpen: false,
            deletePopupOpen: false,
            tempSource: 'Select source',
            tempTopic: '',
            tempVariable: '',
            tempUnit: '%',
            fontSize: 50
        };
        this.value = 50;

        this.sendUpdate = this.sendUpdate.bind(this);
        this.delete = this.delete.bind(this);
        this.changeName = this.changeName.bind(this);
        this.openPopup = this.openPopup.bind(this);
        this.closePopup = this.closePopup.bind(this);
        this.closeConfirmPopup = this.closeConfirmPopup.bind(this);
        this.openDelete = this.openDelete.bind(this);
        this.closeDelete = this.closeDelete.bind(this);
        this.resize = this.resize.bind(this);
        this.changeSource = this.changeSource.bind(this);
        this.changeTopic = this.changeTopic.bind(this);
        this.changeVariable = this.changeVariable.bind(this);
        this.changeUnit = this.changeUnit.bind(this);
        this.clone = this.clone.bind(this);
    }

    static getDerivedStateFromProps(props) {
        return {
            id: props.id,
            availableSources: props.availableSources,
            name: props.initialState.name || 'Value',
            source: props.initialState.source || 'Select source',
            topic: props.initialState.topic || '',
            variable: props.initialState.variable || '',
            unit: props.initialState.unit || '%'
        };
    }

    componentDidUpdate(__, prevState) {
        const {id, unit} = this.state;
        if (unit !== prevState.unit) {
            const height = document.getElementById(`valueDiv_${id}`).offsetHeight;
            const width = document.getElementById(`valueDiv_${id}`).offsetWidth;
            this.resize(width, height);
        }
    }

    openPopup() {
        const {source, topic, variable, unit} = this.state;
        this.setState({
            popoverOpen: true,
            tempSource: source,
            tempTopic: topic,
            tempVariable: variable,
            tempUnit: unit
        });
    }

    closePopup() {
        this.setState({
            popoverOpen: false,
            tempSource: 'Select source',
            tempTopic: '',
            tempVariable: '',
            tempUnit: '%'
        });
    }

    closeConfirmPopup() {
        const {tempSource, tempTopic, tempVariable, tempUnit} = this.state;
        this.sendUpdate('source', tempSource);
        this.sendUpdate('topic', tempTopic);
        this.sendUpdate('variable', tempVariable);
        this.sendUpdate('unit', tempUnit);
        this.setState({popoverOpen: false});
    }

    resize(width, height) {
        const {unit} = this.state;
        this.setState({fontSize: Math.min(height, (width / (String(this.value).length + unit.length)))});
    }

    changeUnit(event) {
        event.stopPropagation();
        this.setState({tempUnit: event.target.value});
    }

    render() {
        const {id, availableSources, name, unit, popoverOpen, deletePopupOpen, fontSize, tempSource, tempTopic, tempVariable, tempUnit} = this.state;

        return ([
            <div
                style={{
                    width: '100%', height: '100%', background: 'white', padding: '1%', display: 'flex', flexDirection: 'column', borderRadius: '10px', fontSize: '16px'
                }}
            >
                <Toolbar onMouseDown={(e) => e.stopPropagation()} onChange={this.changeName} value={name} cloneItem={this.clone} editItem={this.openPopup} deleteItem={this.openDelete} />
                <ReactResizeDetector onResize={this.resize}>
                    {() => (
                        <div
                            id={`valueDiv_${id}`}
                            style={{
                                width: '100%',
                                height: 'calc(100% - 35px)',
                                maxHeight: '100%',
                                marginTop: '10px',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                color: '#16335B',
                                fontSize: `${fontSize}px`
                            }}
                        >
                            {`${this.value}${unit}`}
                        </div>
                    )}
                </ReactResizeDetector>
            </div>,
            <PortalOverflowOverlay key="settings" id="settings" isOpen={popoverOpen} width="450px" height="auto" background="white" borderRadius="10px" padding="20px" marginLeft="auto" marginRight="auto" color="black">
                <FormHeader>
                    {`${name} Settings`}
                </FormHeader>
                <SettingsDiv>
                    <Popover popoverClassName="custom-popover">
                        <BlueBorderButton type="button" width="410px" rightIcon="caret-down">
                            {tempSource}
                        </BlueBorderButton>
                        <Menu>
                            {availableSources.map((s) => (
                                <MenuItem text={s} onClick={() => this.changeSource(s)} />
                            ))}
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
                            onChange={this.changeTopic}
                            value={tempTopic}
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
                            onChange={this.changeVariable}
                            value={tempVariable}
                            fill
                            large
                        />
                    </div>
                    <div
                        style={{
                            width: '100%', height: '100%', marginTop: '10px', display: 'flex', alignItems: 'center'
                        }}
                    >
                        <div
                            style={{
                                width: '50%', height: '100%', display: 'flex', alignItems: 'center', color: '#16335B', fontSize: '16px'
                            }}
                        >
                            Unit:
                        </div>
                        <div style={{width: '50%', height: '100%', display: 'flex', alignItems: 'center'}}>
                            <InputGroup
                                leftIcon="numerical"
                                placeholder="Unit"
                                onChange={this.changeUnit}
                                value={tempUnit}
                                fill
                                large
                            />
                        </div>
                    </div>
                    <div
                        style={{
                            width: '300px', display: 'flex', alignItems: 'center', justifyContent: 'space-evenly', marginTop: '10px'
                        }}
                    >
                        <BlueBorderButton
                            id="cancel"
                            type="button"
                            onClick={this.closePopup}
                        >
                            Cancel
                        </BlueBorderButton>
                        <BlueButton
                            id="save"
                            type="button"
                            onClick={this.closeConfirmPopup}
                        >
                            Save
                        </BlueButton>
                    </div>
                </SettingsDiv>
            </PortalOverflowOverlay>,
            <AlertComponent open={deletePopupOpen} onCancel={this.closeDelete} onConfirm={this.delete} name={name} />
        ]);
    }
}

const createValue = ({id, type, initialState, updateItem, deleteItem, cloneComponent, sources}) => (
    <Value
        id={id}
        type={type}
        initialState={initialState}
        updateItem={updateItem}
        deleteItem={deleteItem}
        cloneComponent={cloneComponent}
        availableSources={sources}
    />
);

export default createValue;
