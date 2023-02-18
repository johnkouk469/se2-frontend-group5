/* eslint-disable react/require-default-props,react/forbid-prop-types */
import React from 'react';
import {
    Borders,
    DiscreteColorLegend,
    Highlight,
    HorizontalGridLines,
    VerticalGridLines,
    XAxis,
    XYPlot,
    YAxis
} from 'react-vis';
import * as PropTypes from 'prop-types';

// eslint-disable-next-line react/prefer-stateless-function
class PlotComponent extends React.Component {
    render() {
        const {width, height, lastDrawLocation, verticalGrid, horizontalGrid, plots, xAxis, yAxis, tickFormat, tickValues, legend, legendPosition, onDrag, onBrushEnd, items} = this.props;
        return (
            <XYPlot
                height={height}
                width={width}
                margin={{bottom: 60}}
                xDomain={
                    lastDrawLocation && [
                        lastDrawLocation.left,
                        lastDrawLocation.right
                    ]
                }
                yDomain={
                    lastDrawLocation && [
                        lastDrawLocation.bottom,
                        lastDrawLocation.top
                    ]
                }
            >
                {verticalGrid && <VerticalGridLines />}
                {horizontalGrid && <HorizontalGridLines />}
                {plots}
                <Borders style={{
                    bottom: {fill: '#fff'},
                    left: {fill: '#fff'},
                    right: {fill: '#fff'},
                    top: {fill: '#fff'}
                }}
                />
                {xAxis
                && <XAxis tickFormat={tickFormat} tickLabelAngle={-45} tickValues={tickValues} />}
                {yAxis && <YAxis />}
                {legend
                && (
                    <DiscreteColorLegend
                        items={items}
                        style={{
                            position: 'absolute',
                            top: ((legendPosition === 'topRight') || (legendPosition === 'topLeft')) ? '0px' : '',
                            bottom: ((legendPosition === 'bottomRight') || (legendPosition === 'bottomLeft')) ? '0px' : '',
                            left: ((legendPosition === 'topLeft') || (legendPosition === 'bottomLeft')) ? '0px' : '',
                            right: ((legendPosition === 'topRight') || (legendPosition === 'bottomRight')) ? '0px' : ''
                        }}
                    />
                )}
                <Highlight
                    onBrushEnd={onBrushEnd}
                    onDrag={onDrag}
                />
            </XYPlot>
        );
    }
}

PlotComponent.propTypes = {
    height: PropTypes.number,
    width: PropTypes.number,
    lastDrawLocation: PropTypes.object,
    verticalGrid: PropTypes.object,
    horizontalGrid: PropTypes.object,
    plots: PropTypes.array,
    xAxis: PropTypes.object,
    tickFormat: PropTypes.func,
    tickValues: PropTypes.arrayOf(PropTypes.any),
    yAxis: PropTypes.any,
    legend: PropTypes.any,
    items: PropTypes.arrayOf(PropTypes.any),
    legendPosition: PropTypes.any,
    onBrushEnd: PropTypes.func,
    onDrag: PropTypes.func
};

export default PlotComponent;
