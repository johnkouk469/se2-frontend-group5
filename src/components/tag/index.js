import React from 'react';
import {Tag} from '@blueprintjs/core';
import * as PropTypes from 'prop-types';

// eslint-disable-next-line react/prefer-stateless-function
class TagComponent extends React.Component {
    render() {
        const {counter} = this.props;
        return (
            <div
                style={{
                    position: 'absolute',
                    top: '50%',
                    right: '2%',
                    transform: 'translateY(-50%)',
                    display: 'flex',
                    alignItems: 'center'
                }}
            >
                <Tag
                    round
                    intent="primary"
                    style={{
                        background: '#16335b',
                        color: '#888888',
                        fontSize: '13px'
                    }}
                >
                    {counter}
                </Tag>
            </div>
        );
    }
}

// eslint-disable-next-line react/require-default-props
TagComponent.propTypes = {counter: PropTypes.string};

export default TagComponent;
