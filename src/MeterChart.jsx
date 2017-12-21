import React, {Component} from 'react';
import Highcharts from 'highcharts';
import chartOptions from './chartOptions';
import Export from 'highcharts/modules/exporting';
import Data from 'highcharts/modules/data';

class MeterChart extends Component {

    constructor(props){
        super(props);
        this.state = {};
        this.chartOptions = chartOptions;
        this.avgData = []
        this.maxData = []
        this.colorAvg = '#5c83e8';
        this.colorMax = '#1c3cdc';
        this.colorUSG = '#80c6e8';
        this.colorThreshold = '#fe6754';
    }

    componentDidMount(){

        // load modules
        if (this.props.modules) {
            this.props.modules.forEach(function (module) {
                module(Highcharts);
            });
        }

        this.compileData(this.props.data);

        // (total sum / sample number) * cost (2017 October Vancouver Rate)
        let hourlySum = this.avgData.reduce((total, val) => { return total + val.y }, 0);
        let hourlyCost = (2.688 * (hourlySum / this.avgData.length)).toFixed(2);

        this.chartOptions.subtitle = {
            text: "Meter ID: " + this.props.meterID
        }

        this.chartOptions.series = [
            {
                name: 'Hourly Average (m3)',
                type: 'column',
                data: this.avgData,
                color: this.colorAvg,
                tooltip: {
                    valueSuffix: ' m3',
                    valueDecimals: 2
                },
            },
            {
                name: 'Hourly Maximum (m3)',
                type: 'column',
                data: this.maxData,
                color: this.colorMax,
                tooltip: {
                    valueSuffix: ' m3',
                    valueDecimals: 2
                },
            },
            {
                name: 'Hourly Average (USG)',
                type: 'spline',
                yAxis: 1,
                data: this.avgData.map(d => {
                    return {
                        x: d.x, 
                        y: d.y * 264.17, 
                        color: d.color
                    }
                }),
                color: this.colorUSG,
                tooltip: {
                    valueSuffix: ' USG',
                    valueDecimals: 2
                },
                marker: {
                    enabled: false
                }
            },
            {
                name: 'Average Hourly Cost: $' + hourlyCost.toString(),
                color: 'white'
            },
            {
                name: 'Threshold: ' + this.props.data.threshold.toString(),
                color: 'white'
            }
        ]

        Highcharts.setOptions({
            lang: {
                thousandsSep: ','
            }
        });

        // create chart
        this.chart = new Highcharts[this.props.type || "Chart"](
            this.props.container, 
            this.chartOptions
        );

    }

    // takes data from props and compils into chart options
    compileData = (data) => {

        let sumValue = 0.0;
        let countValue = 0;
        let maxValue = 0.0;
        let targetDateHour = null;
        
        for (let point of data.demand_ts) {
            
            // get current data point timestamp and convert it to javascript Date object
            // injecting UTC timezone (:00.000Z) to force this timestamp as UTC timezone
            // or else this timestamp will be converted to local timezone to this machine
            let curDateHour = new Date(point.timestamp + ':00.000Z');
            // remove minutes/seconds/milliseconds from data point time
            curDateHour.setMinutes(0);
            curDateHour.setSeconds(0, 0);
            
            // if targetDateHour is null, this is our first iteration
            // reset targetDateHour, sumValue, countValue to start calculating
            if (targetDateHour === null) {
                targetDateHour = curDateHour;
                let val = parseFloat(point.demand_value);
                sumValue = val;
                maxValue = val;
                countValue = 1;
                continue;
            }
            
            if (targetDateHour.getTime() === curDateHour.getTime()) {
                // if current data point date/hour is same as targetDateHour date/hour
                let value = parseFloat(point.demand_value);
                sumValue += value;
                maxValue = Math.max(maxValue, value);
                countValue++;

            } else {
                // if current date point date/hour is different from targetDateHour date/hour,    
                // calculate & push
                this.pushResult(this.avgData, targetDateHour, sumValue/countValue, data.threshold, this.colorAvg);
                this.pushResult(this.maxData, targetDateHour, maxValue, data.threshold, this.colorMax);
                
                // reset targetDateHour, sumValue, countValue
                targetDateHour = curDateHour;
                let val = parseFloat(point.demand_value);
                sumValue = val;
                maxValue = val;
                countValue = 1;
            }
        }

        // we still need to calculate final value and push
        this.pushResult(this.avgData, targetDateHour, sumValue/countValue, data.threshold, this.colorAvg);
        this.pushResult(this.maxData, targetDateHour, maxValue, data.threshold, this.colorMax);
    }

    pushResult = (arr, timestamp, value, threshold, color) => {
        if (value > threshold) {
            color = this.colorThreshold;
        }
        arr.push({
            x: timestamp,
            y: parseFloat(value),
            color: color
        });
    }

    // unmount chart
    componentWillUnmount(){
        this.chart.destroy();
    }

    // set container to render the chart into 
    render(){
        let chartStyle = {
            height: this.props.height,
            width: this.props.width
        }
        return(
            <div id={this.props.container} style={chartStyle}></div>
        )
    }
}

export default MeterChart;
