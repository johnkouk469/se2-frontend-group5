/* eslint-disable react/require-default-props */
import React from 'react';
import {EditableText, Tooltip} from '@blueprintjs/core';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
    faClone, faCog, faTrashAlt
} from '@fortawesome/free-solid-svg-icons';
import * as PropTypes from 'prop-types';

// eslint-disable-next-line react/prefer-stateless-function
class Toolbar extends React.Component {
    render() {
        const {onMouseDown, onChange, value, cloneItem, editItem, deleteItem} = this.props;
        return (
            <div
                style={{
                    width: '100%',
                    height: '25px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    background: '#16335B',
                    borderTopLeftRadius: '10px',
                    borderTopRightRadius: '10px',
                    position: 'relative',
                    fontSize: '13px'
                }}
            >
                {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
                <div onMouseDown={onMouseDown}>
                    <EditableText
                        className="name-edit"
                        onChange={onChange}
                        onMouseDown={onMouseDown}
                        placeholder="Component Name"
                        value={value}
                    />
                </div>
                <div
                    style={{
                        height: '100%',
                        position: 'absolute',
                        top: '0px',
                        right: '2%',
                        display: 'flex',
                        alignItems: 'center'
                    }}
                >
                    <div style={{paddingRight: '5px'}}>
                        <Tooltip content="Clone component" popoverClassName="item-info-tooltip">
                            <FontAwesomeIcon
                                icon={faClone}
                                style={{color: 'white', fontSize: '13px', cursor: 'pointer'}}
                                onClick={cloneItem}
                            />
                        </Tooltip>
                    </div>
                    <FontAwesomeIcon
                        icon={faCog}
                        style={{color: 'white', cursor: 'pointer'}}
                        onClick={editItem}
                    />
                </div>
                <div
                    style={{
                        height: '100%',
                        position: 'absolute',
                        top: '0px',
                        left: '2%',
                        display: 'flex',
                        alignItems: 'center'
                    }}
                >
                    <FontAwesomeIcon
                        icon={faTrashAlt}
                        style={{color: '#DE162F', cursor: 'pointer'}}
                        onClick={deleteItem}
                    />
                </div>
            </div>
        );
    }
}

Toolbar.propTypes = {
    onMouseDown: PropTypes.func,
    onChange: PropTypes.func,
    value: PropTypes.string,
    cloneItem: PropTypes.func,
    editItem: PropTypes.func,
    deleteItem: PropTypes.func
};

export default Toolbar;
