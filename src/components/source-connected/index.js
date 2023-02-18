/* eslint-disable no-console */
import React from 'react';
import {map} from 'rxjs/operators';
import mqtt from 'mqtt';
import {RxStomp} from '@stomp/rx-stomp';
import {findSource} from '../../api/sources';
import {ToasterBottom} from '../../lib/toaster';

class SourceConnectedComponent extends React.Component {
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
