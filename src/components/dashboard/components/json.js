/* eslint-disable max-len */
import React from 'react';
import {Spinner} from '@blueprintjs/core';
/* eslint-disable import/no-unresolved */
import ReactResizeDetector from 'react-resize-detector';
/* eslint-disable import/no-unresolved */
import ReactJson from 'react-json-view';
import RangeComponent from '../../range';
import SourceConnectedComponent from '../../source-connected';

const objectPath = require('object-path');

const isValidJson = (input) => {
    try {
        return (typeof input === 'object' && input !== null);
    } catch {
        return false;
    }
};

class Json extends SourceConnectedComponent {
    constructor(props) {
        super(props);

        this.type = props.type;

        this.state = {
            spinnerOpen: true,
            id: props.id,
            user: props.user,
            owner: props.owner,
            name: props.initialState.name || 'Json Viewer',
            value: {},
            counter: 0,
            source: props.initialState.source || 'Select source',
            topic: props.initialState.topic || '',
            variable: props.initialState.variable || '',
            fontSize: 14,
            width: 50,
            height: 50
        };
        this.rxStomp = null;
        this.mqttClient = null;

        this.changeSpinner = this.changeSpinner.bind(this);
        this.messageReceived = this.messageReceived.bind(this);
        this.connectStompSource = this.connectStompSource.bind(this);
        this.connectMqttSource = this.connectMqttSource.bind(this);
        this.connectToTopic = this.connectToTopic.bind(this);
        this.resize = this.resize.bind(this);
    }

    componentDidMount() {
        this.connectToTopic();
    }

    componentWillUnmount() {
        if (this.rxStomp !== null) {
            this.rxStomp.deactivate();
        }
        if (this.mqttClient !== null) {
            this.mqttClient.end();
        }
    }

    changeSpinner(value) {
        this.setState({spinnerOpen: value});
    }

    messageReceived(payload) {
        const {variable} = this.state;
        try {
            const {counter} = this.state;
            const newCounter = counter + 1;
            let ts = (new Date() - this.prevTime) / 1000.0;
            if (this.prevTime < 0) {
                ts = '-';
                this.minInterval = 1000000000;
                this.maxInterval = 0;
                this.meanInterval = 0;
            } else {
                if (ts < this.minInterval) {
                    this.minInterval = ts;
                }
                if (ts > this.maxInterval) {
                    this.maxInterval = ts;
                }
                this.meanInterval += ts;
            }
            this.prevTime = new Date();

            const value = objectPath.get(payload, variable);
            if (isValidJson(value)) {
                this.setState({
                    value,
                    counter: newCounter,
                    timeSpan: `Last interval: ${ts} sec`,
                    minint: `Minimum interval: ${this.minInterval} sec`,
                    meanint: `Mean interval: ${(this.meanInterval / (newCounter - 1)).toFixed(3)} sec`,
                    maxint: `Maximum interval: ${this.maxInterval} sec`,
                    timeSpanVal: ts,
                    minintVal: this.minInterval,
                    meanintVal: (this.meanInterval / (newCounter - 1)).toFixed(3),
                    maxintVal: this.maxInterval
                });
            } else {
                this.setState({
                    counter: newCounter,
                    timeSpan: `Last interval: ${ts} sec`,
                    minint: `Minimum interval: ${this.minInterval} sec`,
                    meanint: `Mean interval: ${(this.meanInterval / (newCounter - 1)).toFixed(3)} sec`,
                    maxint: `Maximum interval: ${this.maxInterval} sec`,
                    timeSpanVal: ts,
                    minintVal: this.minInterval,
                    meanintVal: (this.meanInterval / (newCounter - 1)).toFixed(3),
                    maxintVal: this.maxInterval
                });
            }
        } catch {}
    }

    resize(width, height) {
        let fontSize = 14;
        if (width < 300) {
            fontSize = 12;
            if (height < 200) {
                fontSize = 10;
            }
        } else if (height < 200) {
            fontSize = 12;
        }
        this.setState({
            fontSize,
            width,
            height
        });
    }

    render() {
        const {spinnerOpen, id, name, value, counter, timeSpan, minint, maxint, meanint, timeSpanVal, minintVal, meanintVal, maxintVal, fontSize, width, height} = this.state;

        return (
            <div
                style={{
                    width: '100%',
                    height: '100%',
                    background: 'white',
                    padding: '1%',
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: '10px',
                    fontSize: '16px'
                }}
            >
                <RangeComponent value={name} content={timeSpan} timeSpanVal={timeSpanVal} maxIntVal={maxintVal} minInt={minint} minIntVal={minintVal} meanInt={meanint} meanIntVal={meanintVal} maxInt={maxint} onClick={this.filterMessages} counter={counter} />
                <ReactResizeDetector onResize={this.resize}>
                    {() => (
                        <div
                            id={`jsonDiv_${id}`}
                            style={{
                                width: '100%',
                                height: 'calc(100% - 35px)',
                                marginTop: '10px',
                                overflowY: 'auto',
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
                            <ReactJson
                                src={value}
                                theme="google"
                                style={{width: '100%', height: '100%'}}
                                iconStyle="triangle"
                                enableClipboard
                                displayObjectSize={false}
                                displayDataTypes={false}
                                quotesOnKeys={false}
                                displayArrayKey={false}
                            />
                        </div>
                    )}
                </ReactResizeDetector>
            </div>
        );
    }
}

const createJson = ({id, type, initialState, user, owner}) => (
    <Json
        id={id}
        type={type}
        initialState={initialState}
        user={user}
        owner={owner}
    />
);

export default createJson;
