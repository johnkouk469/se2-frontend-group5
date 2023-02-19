/* eslint-disable max-len */
import React from 'react';
import {Spinner} from '@blueprintjs/core';
/* eslint-disable import/no-unresolved */
import ReactResizeDetector from 'react-resize-detector';
import RangeComponent from '../../range';
import SourceConnectedComponent from '../../source-connected';

const objectPath = require('object-path');

class Value extends SourceConnectedComponent {
    constructor(props) {
        super(props);

        this.type = props.type;

        this.state = {
            spinnerOpen: true,
            id: props.id,
            user: props.user,
            owner: props.owner,
            name: props.initialState.name || 'Value',
            displayValue: 50,
            counter: 0,
            source: props.initialState.source || 'Select source',
            topic: props.initialState.topic || '',
            variable: props.initialState.variable || '',
            unit: props.initialState.unit || '%',
            fontSize: 50,
            width: 50,
            height: 50
        };
        this.init();
        this.messageReceived = this.messageReceived.bind(this);
        this.resize = this.resize.bind(this);
    }

    messageReceived(payload) {
        const {variable, id} = this.state;
        try {
            const {newCounter, ts} = this.updateIntervalsFromSource();
            const value = objectPath.get(payload, variable);
            this.setState({
                displayValue: value,
                counter: newCounter,
                timeSpan: `Last interval: ${ts} sec`,
                minint: `Minimum interval: ${this.minInterval} sec`,
                meanint: `Mean interval: ${(this.meanInterval / (newCounter - 1)).toFixed(3)} sec`,
                maxint: `Maximum interval: ${this.maxInterval} sec`,
                timeSpanVal: ts,
                minintVal: this.minInterval,
                meanintVal: (this.meanInterval / (newCounter - 1)).toFixed(3),
                maxintVal: this.maxInterval
            }, () => {
                const height = document.getElementById(`valueDiv_${id}`).offsetHeight;
                const width = document.getElementById(`valueDiv_${id}`).offsetWidth;
                this.resize(width, height);
            });
        } catch (e) {
            console.log(e);
        }
    }

    resize(width, height) {
        const {displayValue, unit} = this.state;
        this.setState({
            fontSize: Math.min(height, (width / (String(displayValue).length + unit.length))),
            width,
            height
        });
    }

    render() {
        const {spinnerOpen, id, name, displayValue, counter, unit, fontSize, width, height, timeSpan, minint, maxint, meanint, timeSpanVal, minintVal, meanintVal, maxintVal} = this.state;

        return (
            <div
                style={{
                    width: '100%', height: '100%', background: 'white', padding: '1%', display: 'flex', flexDirection: 'column', borderRadius: '10px', fontSize: '16px'
                }}
            >
                <RangeComponent value={name} content={timeSpan} timeSpanVal={timeSpanVal} maxIntVal={maxintVal} minInt={minint} minIntVal={minintVal} meanInt={meanint} meanIntVal={meanintVal} maxInt={maxint} onClick={this.filterMessages} counter={counter} />
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
                                fontSize: `${fontSize}px`,
                                position: 'relative'
                            }}
                        >
                            {spinnerOpen
                            && (
                                <div
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        position: 'absolute',
                                        top: '0px',
                                        left: '0px',
                                        zIndex: 1000,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        background: 'rgba(255, 255, 255, 0.6)'
                                    }}
                                >
                                    <Spinner intent="primary" size={Math.min(width / 10, height / 2)} />
                                </div>
                            )}
                            {`${displayValue}${unit}`}
                        </div>
                    )}
                </ReactResizeDetector>
            </div>
        );
    }
}

const createValue = ({id, type, initialState, user, owner}) => (
    <Value
        id={id}
        type={type}
        initialState={initialState}
        user={user}
        owner={owner}
    />
);

export default createValue;
