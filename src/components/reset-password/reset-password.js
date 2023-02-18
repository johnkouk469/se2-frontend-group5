/* eslint-disable max-len */
import React from 'react';
import {connect} from 'react-redux';
import {Formik} from 'formik';
import {
    path, pipe, ifElse, startsWith, isNil, slice
} from 'ramda';
import TextInput from '../../lib/text-input';
import {OrangeButton} from '../../lib/buttons';
import {handleSubmit, validationSchema} from './form-handler';
import {ToasterBottom} from '../../lib/toaster';
import {getStatistics} from '../../api/general';
import contactIcon from '../../assets/contact.png';
import contactHoverIcon from '../../assets/contactHover.png';
import {
    StyledSubHeader, StyledHeader, StyledBox, StyledForm, StyledDivider, OrangeLink, Contact, SignUpText
} from '../styled-components';
import InfographicsComponent from '../infographics';

export class ResetPasswordPage extends React.Component {
    constructor(props) {
        super(props);

        this.pushHistory = props.history.push;
        this.token = pipe(
            (h) => path(['location', 'search'], h),
            ifElse(
                (s) => !isNil(s) && startsWith('?token=', s),
                (t) => slice(7, t.length, t).trimLeft(),
                () => null
            )
        )(props.history);

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

    render() {
        const {users, dashboards, views, sources, top, left, width, height} = this.state;

        return (
            <div 
                style={{
                    width: '100%', height: '100%', margin: '0px', padding: '0px', display: 'flex'
                }}
            >
                <StyledBox>
                    <div style={{width: '300px', display: 'flex', flexDirection: 'column'}}>
                        <StyledHeader>
                            Change your password
                        </StyledHeader>
                        <StyledSubHeader>
                            to Codin Platform
                        </StyledSubHeader>
                        <Formik
                            initialValues={{password: '', confirm: ''}}
                            validationSchema={validationSchema}
                            onSubmit={(...formikArgs) => handleSubmit(...formikArgs, this.token, {pushHistory: this.pushHistory})}
                        >
                            {(formikProps) => (
                                <StyledForm onSubmit={formikProps.handleSubmit} id="signInForm">
                                    <TextInput
                                        name="password"
                                        type="password"
                                        leftIcon="lock"
                                        placeholder="Password"
                                        width="300px"
                                        formikProps={{...formikProps}}
                                        fill
                                    />
                                    <TextInput
                                        name="confirm"
                                        type="password"
                                        leftIcon="confirm"
                                        placeholder="Confirm Password"
                                        width="300px"
                                        formikProps={{...formikProps}}
                                        fill
                                    />
                                    <OrangeButton
                                        id="signin"
                                        type="submit"
                                        disabled={formikProps.isSubmitting}
                                        loading={formikProps.isSubmitting}
                                        width="160px"
                                    >
                                        Change Password
                                    </OrangeButton>
                                </StyledForm>
                            )}
                        </Formik>
                        <StyledDivider />
                        <SignUpText>
                            Otherwise
                            {' '}
                            <OrangeLink href="/">
                                sign in here
                            </OrangeLink>
                        </SignUpText>
                    </div>
                    <Contact
                        onMouseOver={() => { document.getElementById('contactImg').src = contactHoverIcon; }}
                        onFocus={() => { document.getElementById('contactImg').src = contactHoverIcon; }}
                        onMouseOut={() => { document.getElementById('contactImg').src = contactIcon; }}
                        onBlur={() => { document.getElementById('contactImg').src = contactIcon; }}
                    >
                        <a href="mailto:karanikio@auth.gr" target="_blank" rel="noopener noreferrer">
                            <img id="contactImg" src={contactIcon} alt="" style={{width: '100%', height: '100%', objectFit: 'contain'}} />
                        </a>
                    </Contact>
                </StyledBox>
                <InfographicsComponent width={width} height={height} top={top} left={left} views={views} dashboards={dashboards} users={users} sources={sources} />
            </div>
        );
    }
}

export default connect(
    null,
    null
)(ResetPasswordPage);
