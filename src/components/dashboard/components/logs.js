/* eslint-disable max-len */
import React from 'react';
import {
    Drawer, InputGroup,Position, Spinner
} from '@blueprintjs/core';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
    faChevronUp, faTimes
} from '@fortawesome/free-solid-svg-icons';
/* eslint-disable import/no-unresolved */
import ReactResizeDetector from 'react-resize-detector';
import {formatDate} from '../../../lib/utilities';
import RangeComponent from '../../range';
import SourceConnectedComponent from '../../source-connected';

const objectPath = require('object-path');
const fileDownload = require('js-file-download');

class Logs extends SourceConnectedComponent {
    constructor(props) {
        super(props);

        this.type = props.type;

        this.state = {
            spinnerOpen: true,
            id: props.id,
            user: props.user,
            owner: props.owner,
            name: props.initialState.name || 'Logs',
            logs: [],
            counter: 0,
            source: props.initialState.source || 'Select source',
            topic: props.initialState.topic || '',
            variable: props.initialState.variable || '',
            maxMessages: props.initialState.maxMessages || -1,
            colorKeys: props.initialState.colorKeys || [],
            colorValues: props.initialState.colorValues || [],
            filter: '',
            filterDrawerOpen: false,
            width: 50,
            height: 50
        };
        this.init();
        this.resize = this.resize.bind(this);
        this.messageReceived = this.messageReceived.bind(this);
        this.filterMessages = this.filterMessages.bind(this);
        this.clearMessages = this.clearMessages.bind(this);
        this.exportMessages = this.exportMessages.bind(this);
        this.changeFilter = this.changeFilter.bind(this);
        this.removeFilter = this.removeFilter.bind(this);
        this.closeFilter = this.closeFilter.bind(this);
    }

    messageReceived(payload) {
        const {variable, maxMessages, id} = this.state;
        try {
            const {counter, logs} = this.state;
            const messagesList = document.getElementById(`logsDiv_${id}`);
            const toBottom = Math.abs((messagesList.scrollTop + messagesList.clientHeight) - (messagesList.scrollHeight)) < 5;

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
            logs.push({message: JSON.stringify(value), date: new Date()});
            if (logs.length > maxMessages && maxMessages !== -1) {
                logs.shift();
            }
            this.setState({
                logs,
                counter: newCounter,
                timeSpan: `Last interval: ${ts} sec`,
                minint: `Minimum interval: ${this.minInterval} sec`,
                meanint: `Mean interval: ${(this.meanInterval / (newCounter - 1)).toFixed(3)} sec`,
                maxint: `Maximum interval: ${this.maxInterval} sec`,
                timeSpanVal: ts,
                minintVal: this.minInterval,
                meanintVal: (this.meanInterval / (newCounter - 1)).toFixed(3),
                maxintVal: this.maxInterval,
            }, () => {
                if (toBottom) {
                    messagesList.scrollTop = messagesList.scrollHeight;
                }
            });
        } catch {}
    }

    filterMessages() {
        this.setState({filterDrawerOpen: true});
    }

    clearMessages() {
        this.setState({
            logs: [],
            counter: 0
        });
    }

    exportMessages() {
        const {logs} = this.state;
        let allLogs = '';

        logs.forEach((l, ind) => {
            if (ind === 0) {
                allLogs = `${formatDate(l.date)}:\n${l.message}`;
            } else {
                allLogs = `${allLogs}\n\n${formatDate(l.date)}:\n${l.message}`;
            }
        });
        fileDownload(allLogs, 'logs.txt');
    }

    changeFilter(event) {
        this.setState({filter: event.target.value});
    }

    removeFilter() {
        this.setState({filter: ''});
    }

    closeFilter() {
        this.setState({filterDrawerOpen: false});
    }

    resize(width, height) {
        this.setState({width, height});
    }

    render() {
        const {spinnerOpen, id, name, logs, counter, timeSpan, minint, maxint, meanint, timeSpanVal, minintVal, meanintVal, maxintVal, colorKeys, colorValues, filter, filterDrawerOpen, width, height} = this.state;

        const filteredLogs = [];
        logs.forEach((l) => {
            try {
                if (l.message.includes(filter) || (new RegExp(filter)).test(l.message)) {
                    let color = '#16335B';
                    for (let i = colorKeys.length - 1; i >= 0; i -= 1) {
                        if (l.message.includes(colorKeys[i]) || (new RegExp(colorKeys[i])).test(l.message)) {
                            color = colorValues[i];
                        }
                    }
                    filteredLogs.push({message: l.message, date: l.date, color});
                }
            } catch {}
        });

        return (
            <div
                style={{
                    width: '100%', height: '100%', background: 'white', padding: '1%', display: 'flex', flexDirection: 'column', borderRadius: '10px', fontSize: '16px'
                }}
            >
                <RangeComponent value={name} content={timeSpan} timeSpanVal={timeSpanVal} maxIntVal={maxintVal} minInt={minint} minIntVal={minintVal} meanInt={meanint} meanIntVal={meanintVal} maxInt={maxint} onClick={this.filterMessages} counter={counter} />
                <Drawer
                    isOpen={filterDrawerOpen}
                    position={Position.TOP}
                    usePortal={false}
                    hasBackdrop={false}
                    canEscapeKeyClose
                    transitionDuration={100}
                    style={{
                        width: '98%', height: '35px', top: 'calc(1% + 25px)', marginLeft: 'auto', marginRight: 'auto'
                    }}
                >
                    <div style={{width: '100%', height: '100%', padding: '5px', display: 'flex'}}>
                        <div style={{width: 'calc(100% - 60px)', height: '100%', display: 'flex', alignItems: 'center'}}>
                            <InputGroup
                                leftIcon="search"
                                placeholder="Filter"
                                onChange={this.changeFilter}
                                defaultValue={filter}
                                fill
                            />
                        </div>
                        <div
                            style={{
                                width: '25px', height: '100%', marginLeft: '5px', display: 'flex', alignItems: 'center', justifyContent: 'center'
                            }}
                        >
                            <FontAwesomeIcon icon={faTimes} style={{color: '#16335B', fontSize: '16px', cursor: 'pointer'}} onClick={this.removeFilter} />
                        </div>
                        <div
                            style={{
                                width: '25px', height: '100%', marginLeft: '5px', display: 'flex', alignItems: 'center', justifyContent: 'center'
                            }}
                        >
                            <FontAwesomeIcon icon={faChevronUp} style={{color: '#16335B', fontSize: '16px', cursor: 'pointer'}} onClick={this.closeFilter} />
                        </div>
                    </div>
                </Drawer>
                <ReactResizeDetector onResize={this.resize}>
                    {() => (
                        <div
                            id={`logsDiv_${id}`}
                            style={{
                                width: '100%',
                                height: 'calc(100% - 35px)',
                                maxHeight: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                overflowY: 'auto',
                                wordBreak: 'break-word',
                                fontSize: '14px',
                                padding: '10px',
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
                            {filteredLogs.map((l, ind) => (
                                <div
                                    key={`log_${ind}`}
                                    style={{
                                        width: '100%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        marginTop: '10px',
                                        borderBottom: (ind === filteredLogs.length - 1) ? '' : '2px solid #D0D6DE',
                                        padding: '5px 0px 5px 0px'
                                    }}
                                >
                                    <div style={{width: '100%', fontSize: '14px', fontWeight: 'bold', color: '#FF9D66'}}>
                                        {formatDate(l.date)}
                                    </div>
                                    <div
                                        style={{
                                            width: '100%', fontSize: '14px', color: l.color, marginTop: '5px', display: 'flex', justifyContent: 'flex-end'
                                        }}
                                    >
                                        {l.message}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </ReactResizeDetector>
            </div>
        );
    }
}

const createLogs = ({id, type, initialState, user, owner}) => (
    <Logs
        id={id}
        type={type}
        initialState={initialState}
        user={user}
        owner={owner}
    />
);

export default createLogs;
