/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable max-len */
import React from 'react';
import {InputGroup} from '@blueprintjs/core';
import {PortalOverflowOverlay} from '../../../lib/overlays';
import {BlueBorderButton, BlueButton} from '../../../lib/buttons';
import {FormHeader, SettingsDiv} from '../../styled-components';
import AlertComponent from './alert';
import Toolbar from "./toolbar";

class Iframe extends React.Component {
    constructor(props) {
        super(props);

        this.type = props.type;
        this.updateItem = props.updateItem;
        this.deleteItem = props.deleteItem;
        this.cloneComponent = props.cloneComponent;

        this.state = {
            id: props.id,
            name: props.initialState.name || 'Iframe',
            url: props.initialState.url || '',
            popoverOpen: false,
            deletePopupOpen: false,
            tempUrl: ''
        };

        this.sendUpdate = this.sendUpdate.bind(this);
        this.delete = this.delete.bind(this);
        this.changeName = this.changeName.bind(this);
        this.openPopup = this.openPopup.bind(this);
        this.closePopup = this.closePopup.bind(this);
        this.closeConfirmPopup = this.closeConfirmPopup.bind(this);
        this.changeUrl = this.changeUrl.bind(this);
        this.openDelete = this.openDelete.bind(this);
        this.closeDelete = this.closeDelete.bind(this);
        this.clone = this.clone.bind(this);
    }

    static getDerivedStateFromProps(props) {
        return {
            id: props.id,
            name: props.initialState.name || 'Iframe',
            url: props.initialState.url || ''
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
        const {url} = this.state;
        this.setState({popoverOpen: true, tempUrl: url});
    }

    closePopup() {
        this.setState({popoverOpen: false, tempUrl: ''});
    }

    closeConfirmPopup() {
        const {tempUrl} = this.state;
        this.sendUpdate('url', tempUrl);
        this.setState({popoverOpen: false});
    }

    changeUrl(event) {
        event.stopPropagation();
        this.setState({tempUrl: event.target.value});
    }

    openDelete() {
        this.setState({deletePopupOpen: true});
    }

    closeDelete() {
        this.setState({deletePopupOpen: false});
    }

    clone() {
        const {id} = this.state;
        this.closePopup();
        this.cloneComponent(id);
    }

    render() {
        const {id, name, url, popoverOpen, deletePopupOpen, tempUrl} = this.state;
        const formattedUrl = (url.startsWith('http://') || url.startsWith('https://')) ? url : `http://${url}`;

        return ([
            <div
                style={{
                    width: '100%', height: '100%', background: 'white', padding: '1%', display: 'flex', flexDirection: 'column', borderRadius: '10px', fontSize: '16px'
                }}
            >
               <Toolbar onMouseDown={(e) => e.stopPropagation()} onChange={this.changeName} value={name} cloneItem={this.clone} editItem={this.openPopup} deleteItem={this.openDelete} />
                <div
                    id={`iframeDiv_${id}`}
                    style={{
                        width: '100%',
                        height: 'calc(100% - 35px)',
                        maxHeight: '100%',
                        marginTop: '10px'
                    }}
                >
                    <iframe allowFullScreen title="Iframe" name="Iframe" src={formattedUrl || ''} />
                </div>
            </div>,
            <PortalOverflowOverlay key="settings" id="settings" isOpen={popoverOpen} width="450px" height="auto" background="white" borderRadius="10px" padding="20px" marginLeft="auto" marginRight="auto" color="black">
                <FormHeader>
                    {`${name} Settings`}
                </FormHeader>
                <SettingsDiv>
                    <InputGroup
                        leftIcon="link"
                        placeholder="Url"
                        onChange={this.changeUrl}
                        value={tempUrl}
                        fill
                        large
                    />
                    <div
                        style={{
                            width: '300px', display: 'flex', alignItems: 'center', justifyContent: 'space-evenly', marginTop: '15px'
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

const createIframe = ({id, type, initialState, updateItem, deleteItem, cloneComponent}) => (
    <Iframe
        id={id}
        type={type}
        initialState={initialState}
        updateItem={updateItem}
        deleteItem={deleteItem}
        cloneComponent={cloneComponent}
    />
);

export default createIframe;
