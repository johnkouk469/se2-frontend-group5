/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable max-len */
import React from 'react';
import {InputGroup, NumericInput} from '@blueprintjs/core';
/* eslint-disable import/no-unresolved */
import ReactResizeDetector from 'react-resize-detector';
import {PortalOverflowOverlay} from '../../../lib/overlays';
import {FormHeader, SettingsDiv} from '../../styled-components';
import AlertComponent from './alert';
import Toolbar from './toolbar';
import ConfirmationButtonsComponent from '../../confirmation-buttons';

const formatStatusColor = (status) => {
    const statusString = status.toString()[0];
    switch (statusString) {
    case '1':
        return '#d0d5de';
    case '2':
        return '#57ae13';
    case '3':
        return '#1e3e60';
    case '4':
        return '#de152e';
    case '5':
        return '#a71022';
    default:
        return '#FF9D66';
    }
};

class Rest extends React.Component {
    constructor(props) {
        super(props);

        this.type = props.type;
        this.updateItem = props.updateItem;
        this.deleteItem = props.deleteItem;
        this.cloneComponent = props.cloneComponent;

        this.state = {
            id: props.id,
            name: props.initialState.name || 'Rest Status',
            url: props.initialState.url || '',
            interval: props.initialState.interval || 5000,
            popoverOpen: false,
            deletePopupOpen: false,
            tempUrl: '',
            tempInterval: 5000,
            activeText: true,
            smallIcon: false,
            fontSize: 18,
        };

        this.sendUpdate = this.sendUpdate.bind(this);
        this.delete = this.delete.bind(this);
        this.changeName = this.changeName.bind(this);
        this.openPopup = this.openPopup.bind(this);
        this.closePopup = this.closePopup.bind(this);
        this.closeConfirmPopup = this.closeConfirmPopup.bind(this);
        this.openDelete = this.openDelete.bind(this);
        this.closeDelete = this.closeDelete.bind(this);
        this.changeUrl = this.changeUrl.bind(this);
        this.changeInterval = this.changeInterval.bind(this);
        this.resize = this.resize.bind(this);
        this.clone = this.clone.bind(this);
    }

    static getDerivedStateFromProps(props) {
        return {
            id: props.id,
            name: props.initialState.name || 'Rest Status',
            url: props.initialState.url || '',
            interval: props.initialState.interval || 5000
        };
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
        const {url, interval} = this.state;
        this.setState({
            popoverOpen: true,
            tempUrl: url,
            tempInterval: interval
        });
    }

    closePopup() {
        this.setState({
            popoverOpen: false,
            tempUrl: '',
            tempInterval: 5000
        });
    }

    closeConfirmPopup() {
        const {tempUrl, tempInterval} = this.state;
        this.sendUpdate('url', tempUrl);
        this.sendUpdate('interval', tempInterval);
        this.setState({popoverOpen: false});
    }

    openDelete() {
        this.setState({deletePopupOpen: true});
    }

    closeDelete() {
        this.setState({deletePopupOpen: false});
    }

    changeUrl(event) {
        event.stopPropagation();
        this.setState({tempUrl: event.target.value});
    }

    changeInterval(value) {
        this.setState({tempInterval: value});
    }

    resize(width, height) {
        let fontSize = 18;
        if (width < 200) {
            fontSize = 16;
        }
        if (width > 300) {
            fontSize = 26;
        }
        this.setState({
            activeText: (height > 40 && width > 90),
            smallIcon: (height < 40 || width < 40),
            fontSize
        });
    }

    clone() {
        const {id} = this.state;
        this.closePopup();
        this.cloneComponent(id);
    }

    render() {
        const {id, name, popoverOpen, deletePopupOpen, tempUrl, tempInterval, activeText, smallIcon, fontSize} = this.state;

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
                            id={`restDiv_${id}`}
                            style={{
                                width: '100%',
                                height: 'calc(100% - 35px)',
                                maxHeight: '100%',
                                marginTop: '10px',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                        >
                            <div
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                            >
                                <div
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        maxWidth: '200px',
                                        maxHeight: '50px',
                                        color: formatStatusColor(200),
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        borderRadius: '10px',
                                        fontSize,
                                        fontWeight: 'bold',
                                    }}
                                >
                                    <div
                                        style={{
                                            width: `${(smallIcon) ? fontSize : fontSize + 10}px`,
                                            height: `${(smallIcon) ? fontSize : fontSize + 10}px`,
                                            borderRadius: `${fontSize + 10}px`,
                                            background: '#7ABF43',
                                            marginRight: (activeText) ? '10px' : '0px',
                                            filter: 'blur(2px)',
                                            animation: 'blink 2s linear infinite'
                                        }}
                                    />
                                    {activeText && '200'}
                                </div>
                            </div>
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
                            leftIcon="globe-network"
                            placeholder="Url"
                            onChange={this.changeUrl}
                            value={tempUrl}
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
                            Interval (ms):
                        </div>
                        <div style={{width: '50%', height: '100%', display: 'flex', alignItems: 'center'}}>
                            <NumericInput
                                className="numeric-input"
                                clampValueOnBlur
                                minorStepSize={10}
                                onValueChange={this.changeInterval}
                                placeholder="Interval"
                                stepSize={100}
                                majorStepSize={1000}
                                defaultValue={+tempInterval.toFixed(0)}
                                fill
                            />
                        </div>
                    </div>
                    <ConfirmationButtonsComponent onCancel={this.closePopup} onSave={this.closeConfirmPopup} />
                </SettingsDiv>
            </PortalOverflowOverlay>,
            <AlertComponent open={deletePopupOpen} onCancel={this.closeDelete} onConfirm={this.delete} name={name} />
        ]);
    }
}

const createRest = ({id, type, initialState, updateItem, deleteItem, cloneComponent}) => (
    <Rest
        id={id}
        type={type}
        initialState={initialState}
        updateItem={updateItem}
        deleteItem={deleteItem}
        cloneComponent={cloneComponent}
    />
);

export default createRest;
