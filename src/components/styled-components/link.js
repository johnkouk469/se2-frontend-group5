import styled from 'styled-components';

export const StyledLink = styled.a`
    :hover {
        text-decoration: none;
    }
`;

export const OrangeLink = styled(StyledLink)`
    color: #FFC4A3;
    :hover {
        color: #ffae80;
    }
`;
