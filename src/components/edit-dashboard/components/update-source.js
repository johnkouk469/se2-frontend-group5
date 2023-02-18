/* eslint-disable react/no-unused-state */
import React from 'react';

class UpdateSourceComponent extends React.Component {
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
        const {source, topic, variable} = this.state;
        this.setState({
            popoverOpen: true,
            tempSource: source,
            tempTopic: topic,
            tempVariable: variable
        });
    }

    closePopup() {
        this.setState({
            popoverOpen: false,
            tempSource: 'Select source',
            tempTopic: '',
            tempVariable: ''
        });
    }

    closeConfirmPopup() {
        const {tempSource, tempTopic, tempVariable} = this.state;
        this.sendUpdate('source', tempSource);
        this.sendUpdate('topic', tempTopic);
        this.sendUpdate('variable', tempVariable);
        this.setState({popoverOpen: false});
    }

    openDelete() {
        this.setState({deletePopupOpen: true});
    }

    closeDelete() {
        this.setState({deletePopupOpen: false});
    }

    changeSource(value) {
        this.setState({tempSource: value});
    }

    changeTopic(event) {
        event.stopPropagation();
        this.setState({tempTopic: event.target.value});
    }

    changeVariable(event) {
        event.stopPropagation();
        this.setState({tempVariable: event.target.value});
    }

    clone() {
        const {id} = this.state;
        this.closePopup();
        this.cloneComponent(id);
    }
}

export default UpdateSourceComponent;
