/* eslint-disable max-len */
/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import {Formik} from 'formik';
import styled from 'styled-components';
import TextInput from '../../lib/text-input';
import {OrangeButton} from '../../lib/buttons';
import {handleSubmit, validationSchema} from './form-handler';
import contactIcon from '../../assets/contact.png';
import contactHoverIcon from '../../assets/contactHover.png';
import {
    StyledHeader, StyledBox, StyledForm, StyledDivider, OrangeLink, Contact as ContactDiv, SignUpText
} from '../styled-components';
import InfographicsComponent from '../infographics';
import BaseComponent from '../base-component';

const StyledSubHeader = styled.h2`
    width: 100%;
    text-align: left;
    color: #FF9D66;
    margin: 0px;
    margin-bottom: 20px;
    font-size: 25px;
    font-weight: normal;
`;

export class ForgotPasswordPage extends BaseComponent {
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
                            Trouble Signing In?
                        </StyledHeader>
                        <StyledSubHeader>
                            Enter your username and we'll send you a link to get back into your account
                        </StyledSubHeader>
                        <Formik
                            initialValues={{username: ''}}
                            validationSchema={validationSchema}
                            onSubmit={(...formikArgs) => handleSubmit(...formikArgs, {pushHistory: this.pushHistory})}
                        >
                            {(formikProps) => (
                                <StyledForm onSubmit={formikProps.handleSubmit} id="signInForm">
                                    <TextInput
                                        name="username"
                                        type="text"
                                        leftIcon="person"
                                        placeholder="Username"
                                        formikProps={{...formikProps}}
                                        width="300px"
                                        fill
                                    />
                                    <OrangeButton
                                        id="signin"
                                        type="submit"
                                        disabled={formikProps.isSubmitting}
                                        loading={formikProps.isSubmitting}
                                    >
                                        Send
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
                    <ContactDiv
                        onMouseOver={() => { document.getElementById('contactImg').src = contactHoverIcon; }}
                        onFocus={() => { document.getElementById('contactImg').src = contactHoverIcon; }}
                        onMouseOut={() => { document.getElementById('contactImg').src = contactIcon; }}
                        onBlur={() => { document.getElementById('contactImg').src = contactIcon; }}
                    >
                        <a href="mailto:karanikio@auth.gr" target="_blank" rel="noopener noreferrer">
                            <img id="contactImg" src={contactIcon} alt="" style={{width: '100%', height: '100%', objectFit: 'contain'}} />
                        </a>
                    </ContactDiv>
                </StyledBox>
                <InfographicsComponent width={width} height={height} top={top} left={left} views={views} dashboards={dashboards} users={users} sources={sources} />
            </div>
        );
    }
}

export default ForgotPasswordPage;
