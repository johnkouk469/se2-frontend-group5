import styled from 'styled-components';
import {Box} from "rebass";

export const ButtonsArea = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    margin-top: 20px;
`;

export const StyledArea = styled(Box)`
    width: 750px;
    min-height: 500px;
    display: block;
    flex-direction: column;
    justify-content: center;
    padding: 20px;
    padding-top: 30px;
    padding-bottom: 30px;
    margin: auto!important;
`;

export const SourcesArea = styled.div`
    width: 100%;
    grid-template-columns: repeat(auto-fill, 150px);
    align-items: center;
    margin-top: 20px;
    flex-wrap: wrap;
`;

