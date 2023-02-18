/* eslint-disable react/require-default-props */
import React from 'react';
import {
    EditableText, ProgressBar, Tag, Text, Tooltip
} from '@blueprintjs/core';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faChartBar} from '@fortawesome/free-solid-svg-icons';
import * as PropTypes from 'prop-types';

// eslint-disable-next-line react/prefer-stateless-function
class RangeComponent extends React.Component {
    render() {
        const {componentName, onClick, counter, content, timeSpanVal, minIntVal, maxIntVal, meanIntVal, minInt, meanInt, maxInt} = this.props;
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
                <EditableText disabled className="name-no-edit" placeholder="Component Name" value={componentName} />
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
                    <Tooltip
                        popoverClassName="item-info-tooltip"
                        content={(
                            <div>
                                <div>
                                    <div>
                                        <Text>{content}</Text>
                                        <ProgressBar
                                            intent="primary"
                                            animate={false}
                                            stripes={false}
                                            value={timeSpanVal / maxIntVal}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <div>
                                        <Text>{minInt}</Text>
                                        <ProgressBar
                                            intent="success"
                                            animate={false}
                                            stripes={false}
                                            value={minIntVal / maxIntVal}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <div>
                                        <Text>{meanInt}</Text>
                                        <ProgressBar
                                            intent="warning"
                                            animate={false}
                                            stripes={false}
                                            value={meanIntVal / maxIntVal}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <div>
                                        <Text>{maxInt}</Text>
                                        <ProgressBar
                                            intent="danger"
                                            animate={false}
                                            stripes={false}
                                            value={maxIntVal / maxIntVal}
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                        interactionKind="hover"
                    >
                        <Tag
                            round
                            intent="primary"
                            style={{
                                background: '#16335B',
                                color: '#aaaaaa',
                                fontSize: '13px'
                            }}
                        >
                            <FontAwesomeIcon
                                icon={faChartBar}
                                style={{
                                    color: '#aaaaaa',
                                    paddingRight: '4px',
                                    fontSize: '13px',
                                    cursor: 'pointer'
                                }}
                                onClick={onClick}
                            />
                            {counter}
                        </Tag>
                    </Tooltip>
                </div>
            </div>
        );
    }
}

RangeComponent.propTypes = {
    componentName: PropTypes.number,
    content: PropTypes.string,
    timeSpanVal: PropTypes.number,
    maxIntVal: PropTypes.number,
    minInt: PropTypes.string,
    minIntVal: PropTypes.number,
    meanInt: PropTypes.string,
    meanIntVal: PropTypes.number,
    maxInt: PropTypes.string,
    onClick: PropTypes.func,
    counter: PropTypes.number
};

export default RangeComponent;
