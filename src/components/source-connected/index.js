/* eslint-disable no-console */
import React from 'react';
import {map} from 'rxjs/operators';
import mqtt from 'mqtt';
import {RxStomp} from '@stomp/rx-stomp';
import {findSource} from '../../api/sources';
import {ToasterBottom} from '../../lib/toaster';

class SourceConnectedComponent extends React.Component {

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

    init() {
        this.rxStomp = null;
        this.mqttClient = null;
        this.connectStompSource = this.connectStompSource.bind(this);
        this.connectMqttSource = this.connectMqttSource.bind(this);
        this.connectToTopic = this.connectToTopic.bind(this);
    }

    updateIntervalsFromSource() {
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
        return {newCounter, ts};
    }

    changeSpinner(value) {
        // eslint-disable-next-line react/no-unused-state
        this.setState({spinnerOpen: value});
    }

    connectStompSource(source) {
        const {name, topic} = this.state;
        try {
            const stompConfig = {
                connectHeaders: {
                    login: source.login,
                    passcode: source.passcode,
                    host: source.vhost
                },
                brokerURL: source.url
            };
            // eslint-disable-next-line no-undef
            this.rxStomp = new RxStomp.RxStomp();
            this.rxStomp.configure(stompConfig);
            this.rxStomp.activate();
            const initialReceiptId = `${name}_start`;

            this.prevTime = -1;
            this.minInterval = -1;
            this.maxInterval = -1;
            this.meanInterval = 0;

            this.rxStomp.watch(`/topic/${topic}`, {receipt: initialReceiptId}).pipe(map((message) => JSON.parse(message.body))).subscribe((payload) => {
                this.messageReceived(payload);
            });
            this.rxStomp.watchForReceipt(initialReceiptId, () => {
                this.changeSpinner(false);
            });
        } catch (e) {
            console.log(e);
        }
    }

    connectMqttSource(source) {
        const {topic} = this.state;
        try {
            const config = {
                username: source.login,
                password: source.passcode
            };

            this.mqttClient = mqtt.connect(source.url, config);
            this.mqttClient.on('connect', () => {
                this.mqttClient.subscribe(`${topic}`, (err) => {
                    if (!err) {
                        this.changeSpinner(false);
                    }
                });
            });

            this.prevTime = -1;
            this.minInterval = -1;
            this.maxInterval = -1;
            this.meanInterval = 0;

            this.mqttClient.on('message', (__, message) => {
                this.messageReceived(JSON.parse(message.toString()));
            });
        } catch (e) {
            console.log(e);
        }
    }

    async connectToTopic() {
        const {user, owner, name, source} = this.state;
        const response = await findSource(source, owner, user);
        if (response.success) {
            if (response.source.type === 'stomp') {
                this.connectStompSource(response.source);
            } else {
                this.connectMqttSource(response.source);
            }
        } else {
            ToasterBottom.show({
                intent: 'danger',
                message: response.message || `There was a problem trying to find the source for ${name}`
            });
        }
    }
}

export default SourceConnectedComponent;
