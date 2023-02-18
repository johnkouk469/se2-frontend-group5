/* eslint-disable max-len */
/* eslint-disable react/react-in-jsx-scope */
import {
    Classes, Overlay, Spinner
} from '@blueprintjs/core';
import styled from 'styled-components';
import classNames from 'classnames';

/*
    Component for the whole screen
*/
const WholeScreen = styled.div`
    width: 100%;
    height: 100%;
    overflow-x: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

/*
    Component for the whole overflow screen
*/
const WholeOverflowScreen = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
`;

/*
    Main component to put new components up on
*/
const MainBox = styled.div`
    background: radial-gradient(#313132, #030305);
    padding: 20px;
    box-shadow: 1px 1px 3px 1px rgba(0,0,0,0.25);
    border-radius: 10px;
    color: white;
`;

const classes = classNames(
    Classes.OVERLAY_SCROLL_CONTAINER
);

/*
    The specific implementation of OverflowOverlay 
    given the contents of
    Overlay, WholeOverflowScreen and MainBox
*/
export const OverflowOverlay = ({
    children,
    id,
    width,
    height,
    isOpen,
    ...props
}) => (
    <Overlay key={id} className={classes} isOpen={isOpen} usePortal={false} transitionDuration={0} canEscapeKeyClose={false} canOutsideClickClose={false}>
        <WholeOverflowScreen>
            <MainBox style={{
                width: width || '500px',
                height: height || '250px',
                margin: 'auto',
                ...props
            }}
            >
                {children}
            </MainBox>
        </WholeOverflowScreen>
    </Overlay>
);


/*
    The specific implementation of PortalOverflowOverlay
    given the contents of
    Overlay, WholeOverflowScreen and MainBox
*/
export const PortalOverflowOverlay = ({
    children,
    id,
    width,
    height,
    isOpen,
    ...props
}) => (
    <Overlay key={id} className={classes} isOpen={isOpen} usePortal transitionDuration={0} canEscapeKeyClose={false} canOutsideClickClose={false}>
        <WholeOverflowScreen onMouseDown={(e) => e.stopPropagation()}>
            <MainBox style={{
                width: width || '500px',
                height: height || '250px',
                margin: 'auto',
                ...props
            }}
            >
                {children}
            </MainBox>
        </WholeOverflowScreen>
    </Overlay>
);

/*
    CustomSpinner is the component
    shown when the client waits for the server
    response
*/
export const CustomSpinner = ({isOpen}) => (
    <Overlay key="spinnerOverlay" className={classes} isOpen={isOpen} usePortal transitionDuration={0} canEscapeKeyClose={false} canOutsideClickClose={false}>
        <WholeScreen>
            <Spinner intent="primary" size={100} />
        </WholeScreen>
    </Overlay>
);
