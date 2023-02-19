/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable max-len */
import React from 'react';
import {InputGroup} from '@blueprintjs/core';
/* eslint-disable import/no-unresolved */
import ReactResizeDetector from 'react-resize-detector';
import {PortalOverflowOverlay} from '../../../lib/overlays';
import {FormHeader, SettingsDiv} from '../../styled-components';
import AlertComponent from './alert';
import Toolbar from './toolbar';
import ConfirmationButtonsComponent from '../../confirmation-buttons';

class Text extends React.Component {
    constructor(props) {
        super(props);

        this.type = props.type;
        this.updateItem = props.updateItem;
        this.deleteItem = props.deleteItem;
        this.cloneComponent = props.cloneComponent;

        this.state = {
            id: props.id,
            name: props.initialState.name || 'Text',
            text: props.initialState.text || '',
            popoverOpen: false,
            deletePopupOpen: false,
            tempText: '',
            fontSize: 50
        };

        this.sendUpdate = this.sendUpdate.bind(this);
        this.delete = this.delete.bind(this);
        this.changeName = this.changeName.bind(this);
        this.openPopup = this.openPopup.bind(this);
        this.closePopup = this.closePopup.bind(this);
        this.closeConfirmPopup = this.closeConfirmPopup.bind(this);
        this.openDelete = this.openDelete.bind(this);
        this.closeDelete = this.closeDelete.bind(this);
        this.resize = this.resize.bind(this);
        this.changeText = this.changeText.bind(this);
        this.clone = this.clone.bind(this);
    }

    static getDerivedStateFromProps(props) {
        return {
            id: props.id,
            name: props.initialState.name || 'Text',
            text: props.initialState.text || ''
        };
    }

    componentDidUpdate(__, prevState) {
        const {id, text} = this.state;
        if (text !== prevState.text) {
            const height = document.getElementById(`textDiv_${id}`).offsetHeight;
            const width = document.getElementById(`textDiv_${id}`).offsetWidth;
            this.resize(width, height);
        }
    }

    sendUpdate(key, value) {
        const {id} = this.state;
        this.updateItem(id, key, value);
    }

    delete() {
        const {id} = this.state;
        this.setState({deletePopupOpen: false});
        this.deleteItem(id);
    }

    changeName(value) {
        this.sendUpdate('name', value);
    }

    openPopup() {
        const {text} = this.state;
        this.setState({
            popoverOpen: true,
            tempText: text
        });
    }

    closePopup() {
        this.setState({
            popoverOpen: false,
            tempText: ''
        });
    }

    closeConfirmPopup() {
        const {tempText} = this.state;
        this.sendUpdate('text', tempText);
        this.setState({popoverOpen: false});
    }

    openDelete() {
        this.setState({deletePopupOpen: true});
    }

    closeDelete() {
        this.setState({deletePopupOpen: false});
    }

    resize(width, height) {
        const {text} = this.state;
        this.setState({fontSize: Math.max(Math.min(height, ((2 * width) / text.length)), 12)});
    }

    changeText(event) {
        event.stopPropagation();
        this.setState({tempText: event.target.value});
    }

    clone() {
        const {id} = this.state;
        this.closePopup();
        this.cloneComponent(id);
    }

    render() {
        const {id, name, text, popoverOpen, deletePopupOpen, fontSize, tempText} = this.state;

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
                            id={`textDiv_${id}`}
                            style={{
                                width: '100%',
                                height: 'calc(100% - 35px)',
                                maxHeight: '100%',
                                marginTop: '10px',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                color: '#16335B',
                                fontSize: `${fontSize}px`,
                                wordBreak: 'break-word'
                            }}
                        >
                            {text}
                        </div>
                    )}
                </ReactResizeDetector>
            </div>,
            <PortalOverflowOverlay key="settings" id="settings" isOpen={popoverOpen} width="450px" height="auto" background="white" borderRadius="10px" padding="20px" marginLeft="auto" marginRight="auto" color="black">
                <FormHeader>
                    {`${name} Settings`}
                </FormHeader>
                <SettingsDiv>
                    <div
                        style={{
                            width: '100%', height: '100%', marginTop: '10px', display: 'flex', alignItems: 'center'
                        }}
                    >
                        <InputGroup
                            leftIcon="tag"
                            placeholder="Text"
                            onChange={this.changeText}
                            value={tempText}
                            fill
                            large
                        />
                    </div>
                    <ConfirmationButtonsComponent onCancel={this.closePopup} onSave={this.closeConfirmPopup} />
                </SettingsDiv>
            </PortalOverflowOverlay>,
            <AlertComponent open={deletePopupOpen} onCancel={this.closeDelete} onConfirm={this.delete} name={name} />
        ]);
    }
}

const createText = ({id, type, initialState, updateItem, deleteItem, cloneComponent}) => (
    <Text
        id={id}
        type={type}
        initialState={initialState}
        updateItem={updateItem}
        deleteItem={deleteItem}
        cloneComponent={cloneComponent}
    />
);

export default createText;
