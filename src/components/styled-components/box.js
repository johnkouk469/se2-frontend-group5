import styled from "styled-components";
import {Box} from "rebass";

export const StyledBox = styled(Box)`
    height: 100%;
    width: 50%;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 0px;
    position: relative;
`;


export const FullStyledBox = styled(Box)`
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: auto;
`;
