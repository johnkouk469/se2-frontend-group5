import styled from 'styled-components';
import {Button} from '@blueprintjs/core';

export const MenuButton = styled(Button)`
    border: 2px solid transparent;
    :hover {
        border: 2px solid #FF9D66;
        background: none!important;
        animation: blink2 0.2s linear;
    }
    :active {
        top: 2px;
        position: relative;
    }
`;

export const StyledButtonIcon = styled.img.attrs((props) => ({src: props.icon}))`
    position: relative;
`;
