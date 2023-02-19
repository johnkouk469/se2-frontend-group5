/* eslint-disable react/require-default-props,react/no-unused-state,react/no-unused-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import {getStatistics} from '../../api/general';
import {ToasterBottom} from '../../lib/toaster';

class BaseComponent extends React.Component {
    constructor(props) {
        super(props);

        this.pushHistory = props.history.push;

        this.state = {
            users: null,
            dashboards: null,
            views: null,
            sources: null,
            top: 100,
            left: 100,
            width: 100,
            height: 100
        };

        this.resize = this.resize.bind(this);
        this.fetchStatistics = this.fetchStatistics.bind(this);
    }

    componentDidMount() {
        this.fetchStatistics();
        setTimeout(this.resize, 200);
        window.addEventListener('resize', this.resize);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.resize);
    }

    resize() {
        const img = document.getElementById('infographics');
        const infoDiv = document.getElementById('infographicDiv');
        this.setState({
            top: (infoDiv.offsetHeight - img.offsetHeight) / 2,
            left: (infoDiv.offsetWidth - img.offsetWidth) / 2,
            width: img.offsetWidth,
            height: img.offsetHeight
        });
    }

    async fetchStatistics() {
        const response = await getStatistics();
        if (response.success) {
            this.setState({
                users: response.users,
                dashboards: response.dashboards,
                views: response.views,
                sources: response.sources
            });
        } else {
            ToasterBottom.show({
                intent: 'danger',
                message: response.message || 'There was a problem trying to fetch the statistics'
            });
        }
    }
}

BaseComponent.propTypes = {
    users: PropTypes.number,
    dashboards: PropTypes.number,
    views: PropTypes.number,
    sources: PropTypes.number
};

export default BaseComponent;
