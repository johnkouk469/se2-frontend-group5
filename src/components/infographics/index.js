/* eslint-disable react/require-default-props */
import React from 'react';
import * as PropTypes from 'prop-types';
import {StyledBox} from '../styled-components';
import infographicIcon from '../../assets/infographic.png';

// eslint-disable-next-line react/prefer-stateless-function
class InfographicsComponent extends React.Component {
    render() {
        const {width, height, top, left, views, dashboards, users, sources} = this.props
        return (
            <StyledBox>
                <div
                    id="infographicDiv"
                    style={{
                        width: '100%',
                        height: '100%',
                        padding: '20px',
                        display: 'flex',
                        flexDirection: 'column',
                        position: 'relative',
                        justifyContent: 'center'
                    }}
                >
                    <img id="infographics" src={infographicIcon} alt="" style={{maxWidth: '100%', maxHeight: '100%'}} />
                    <div
                        style={{
                            width: `${width * 0.164}px`,
                            height: `${width * 0.164}px`,
                            borderRadius: `${width * 0.164}px`,
                            position: 'absolute',
                            top: `${(height * 0.37) + top}px`,
                            left: `${(width * 0.07) + left}px`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            fontWeight: 'bold',
                            fontSize: `${(width * 0.164) / 4}px`
                        }}
                    >
                        {views}
                    </div>
                    <div
                        style={{
                            width: `${width * 0.28}px`,
                            borderRadius: `${width * 0.164}px`,
                            position: 'absolute',
                            top: `${(height * 0.95) + top}px`,
                            left: `${(width * 0.03) + left}px`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            fontWeight: 'bold',
                            fontSize: `${((width * 0.164) + 20) / 7}px`,
                            textAlign: 'center'
                        }}
                    >
                        Dashboards Views
                    </div>
                    <div
                        style={{
                            width: `${width * 0.164}px`,
                            height: `${width * 0.164}px`,
                            borderRadius: `${width * 0.164}px`,
                            position: 'absolute',
                            top: `${(height * 0.37) + top}px`,
                            left: `${(width * 0.302) + left}px`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            fontWeight: 'bold',
                            fontSize: `${(width * 0.164) / 4}px`
                        }}
                    >
                        {dashboards}
                    </div>
                    <div
                        style={{
                            width: `${width * 0.28}px`,
                            borderRadius: `${width * 0.164}px`,
                            position: 'absolute',
                            top: (width < 547) ? `${(height * -0.07) + top}px` : `${(height * 0.001) + top}px`,
                            left: `${(width * 0.24) + left}px`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            fontWeight: 'bold',
                            fontSize: `${((width * 0.164) + 20) / 7}px`,
                            textAlign: 'center'
                        }}
                    >
                        Dashboards Created
                    </div>
                    <div
                        style={{
                            width: `${width * 0.164}px`,
                            height: `${width * 0.164}px`,
                            borderRadius: `${width * 0.164}px`,
                            position: 'absolute',
                            top: `${(height * 0.37) + top}px`,
                            left: `${(width * 0.534) + left}px`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            fontWeight: 'bold',
                            fontSize: `${(width * 0.164) / 4}px`
                        }}
                    >
                        {users}
                    </div>
                    <div
                        style={{
                            width: `${width * 0.28}px`,
                            borderRadius: `${width * 0.164}px`,
                            position: 'absolute',
                            top: `${(height * 0.95) + top}px`,
                            left: `${(width * 0.49) + left}px`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            fontWeight: 'bold',
                            fontSize: `${((width * 0.164) + 20) / 7}px`,
                            textAlign: 'center'
                        }}
                    >
                        Codin Users
                    </div>
                    <div
                        style={{
                            width: `${width * 0.164}px`,
                            height: `${width * 0.164}px`,
                            borderRadius: `${width * 0.164}px`,
                            position: 'absolute',
                            top: `${(height * 0.37) + top}px`,
                            left: `${(width * 0.766) + left}px`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            fontWeight: 'bold',
                            fontSize: `${(width * 0.164) / 4}px`
                        }}
                    >
                        {sources}
                    </div>
                    <div
                        style={{
                            width: `${width * 0.28}px`,
                            borderRadius: `${width * 0.164}px`,
                            position: 'absolute',
                            top: (width < 547) ? `${(height * -0.07) + top}px` : `${(height * 0.001) + top}px`,
                            left: `${(width * 0.70) + left}px`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            fontWeight: 'bold',
                            fontSize: `${((width * 0.164) + 20) / 7}px`,
                            textAlign: 'center'
                        }}
                    >
                        Sources Connected
                    </div>
                </div>
            </StyledBox>
        );
    }
}

InfographicsComponent.propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    top: PropTypes.number,
    left: PropTypes.number,
    views: PropTypes.number,
    dashboards: PropTypes.number,
    users: PropTypes.number,
    sources: PropTypes.number
};

export default InfographicsComponent;
