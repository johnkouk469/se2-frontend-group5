/* eslint-disable max-len */
import React from 'react';
import {Spinner} from '@blueprintjs/core';
import {map} from 'rxjs/operators';
/* eslint-disable import/no-unresolved */
import ReactResizeDetector from 'react-resize-detector';
import {formatDate} from '../../../lib/utilities';
import RangeComponent from '../../range';
import SourceConnectedComponent from '../../source-connected';

const mqtt = require('mqtt');

class Alive extends SourceConnectedComponent {
    constructor(props) {
        super(props);

        this.type = props.type;

        this.state = {
            spinnerOpen: true,
            id: props.id,
            user: props.user,
            owner: props.owner,
            name: props.initialState.name || 'Value',
            lastSend: null,
            active: false,
            remaining: 0,
            counter: 0,
            minint: 0,
            maxint: 0,
            meanint: 0,
            timeSpan: 0,
            source: props.initialState.source || 'Select source',
            topic: props.initialState.topic || '',
            timeout: props.initialState.timeout || 1000,
            lastSendOpen: true,
            activeText: true,
            smallIcon: false,
            fontSize: 16,
            fontSize2: 16,
            width: 50,
            height: 50
        };
        this.interval = null;
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
        this.interval = setInterval(() => {
            const {lastSend, timeout} = this.state;
            const dateNow = new Date();
            if (lastSend === null) {
                this.setState({
                    active: false,
                    remaining: ''
                });
            } else {
                let rem = '';
                if (dateNow.getTime() - lastSend.getTime() <= timeout) {
                    rem = ((timeout - (dateNow.getTime() - lastSend.getTime())) / 1000.0).toFixed(0);
                    rem = `${rem} sec to timeout`;
                }
                this.setState({
                    active: (dateNow.getTime() - lastSend.getTime() <= timeout),
                    remaining: rem
                });
            }
        }, 200);
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

    messageReceived() {
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

            this.setState({
                lastSend: new Date(),
                timeSpan: `Last interval: ${ts} sec`,
                minint: `Minimum interval: ${this.minInterval} sec`,
                meanint: `Mean interval: ${(this.meanInterval / (newCounter - 1)).toFixed(3)} sec`,
                maxint: `Maximum interval: ${this.maxInterval} sec`,
                timeSpanVal: ts,
                minintVal: this.minInterval,
                meanintVal: (this.meanInterval / (newCounter - 1)).toFixed(3),
                maxintVal: this.maxInterval,
                counter: newCounter
            });
        } catch {}
    }

    resize(width, height) {
        let fontSize = 16;
        let fontSize2 = 16;
        if (width < 200) {
            fontSize = 14;
            fontSize2 = 13;
        }
        if (width > 300) {
            fontSize = 24;
            fontSize2 = 16;
        }
        this.setState({
            lastSendOpen: (height > 135 && width > 100),
            activeText: (height > 40 && width > 90),
            smallIcon: (height < 40 || width < 40),
            fontSize,
            fontSize2,
            width,
            height
        });
    }

    render() {
        const {spinnerOpen, id, name, lastSend, counter, timeSpan, minint, maxint, meanint, timeSpanVal, minintVal, meanintVal, maxintVal, active, lastSendOpen, activeText, smallIcon, fontSize, fontSize2, width, height, remaining} = this.state;
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
                            id={`aliveDiv_${id}`}
                            style={{
                                width: '100%',
                                height: 'calc(100% - 35px)',
                                maxHeight: '100%',
                                marginTop: '10px',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
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
                            <div
                                style={{
                                    width: '100%',
                                    height: (lastSendOpen) ? '50%' : '100%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderBottom: (lastSendOpen) ? '2px solid #D0D6DE' : ''
                                }}
                            >
                                <div
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        maxWidth: '200px',
                                        maxHeight: '50px',
                                        color: '#16335B',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        borderRadius: '10px',
                                        fontSize: '13px',
                                        fontWeight: 'bold'
                                    }}
                                >
                                    <div
                                        style={{
                                            width: `${(smallIcon) ? fontSize : fontSize + 10}px`,
                                            height: `${(smallIcon) ? fontSize : fontSize + 10}px`,
                                            borderRadius: `${fontSize + 10}px`,
                                            background: (active) ? '#7ABF43' : '#DE162F',
                                            marginRight: (activeText) ? '10px' : '0px',
                                            filter: (active) ? 'blur(2px)' : '',
                                            animation: (active) ? 'blink 3s linear infinite' : ''
                                        }}
                                    />
                                    {activeText && ((active) ? 'ACTIVE' : 'INACTIVE')}
                                </div>
                            </div>
                            {lastSendOpen
                            && (
                                <div
                                    style={{
                                        width: '100%',
                                        height: '50%',
                                        maxHeight: '100px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        borderBottom: '2px solid #D0D6DE',
                                        padding: '10px',
                                        flexWrap: 'wrap',
                                        fontSize: fontSize2
                                    }}
                                >
                                    <div
                                        style={{
                                            color: '#16335B',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            marginRight: '10px',
                                            fontSize: '13px'
                                        }}
                                    >
                                        Last:
                                    </div>
                                    <div
                                        style={{
                                            color: '#FF9D66',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontWeight: 'bold',
                                            fontSize: '13px',
                                        }}
                                    >
                                        {(lastSend !== null) ? formatDate(lastSend) : 'No message'}
                                    </div>
                                    <div
                                        style={{
                                            color: '#aaaaaa',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            // fontWeight: 'bold',
                                            fontSize: '11px',
                                        }}
                                    >
                                        {remaining}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </ReactResizeDetector>
            </div>
        );
    }
}

const createAlive = ({id, type, initialState, user, owner}) => (
    <Alive
        id={id}
        type={type}
        initialState={initialState}
        user={user}
        owner={owner}
    />
);

export default createAlive;
