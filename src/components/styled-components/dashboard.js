import styled from 'styled-components';
import {Box} from "rebass";

export const DashboardsArea = styled.div`
    width: 100%;
    grid-template-columns: repeat(auto-fill, 150px);
    align-items: center;
    margin-top: 20px;
    flex-wrap: wrap;
`;

export const DashboardBox = styled(Box)`
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: auto;
    position: relative;
`;

