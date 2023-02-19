/* eslint-disable react/no-unused-state */
import React from 'react';

// eslint-disable-next-line react/prefer-stateless-function
class BaseEditComponent extends React.Component {
    constructor(props) {
        super(props);

        this.changeName = this.changeName.bind(this);
        this.clone = this.clone.bind(this);
        this.sendUpdate = this.sendUpdate.bind(this);
        this.delete = this.delete.bind(this);
        this.openDelete = this.openDelete.bind(this);
        this.closeDelete = this.closeDelete.bind(this);
    }
    
    changeName(value) {
        this.sendUpdate('name', value);
    }
    
    clone() {
        const {id} = this.state;
        this.closePopup();
        this.cloneComponent(id);
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

    openDelete() {
        this.setState({deletePopupOpen: true});
    }

    closeDelete() {
        this.setState({deletePopupOpen: false});
    }
}

export default BaseEditComponent;
