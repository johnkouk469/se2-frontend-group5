import styled from 'styled-components';

export const StyledIcon = styled.img`
    width: 100px;
    height: 100px;
    margin-bottom: 10px;
    flex-direction: column;
`;

export const SmallStyledIcon = styled.img.attrs((props) => ({src: props.icon}))`
    width: 60px;
    height: 60px;
    margin-bottom: 10px;
    flex-direction: column;
`;

