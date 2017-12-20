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
    }

    componentDidMount(){

        // load modules
        if (this.props.modules) {
            this.props.modules.forEach(function (module) {
                module(Highcharts);
            });
        }

        this.compileData(this.props.meterID, this.props.data);

        // create chart
        this.chart = new Highcharts[this.props.type || "Chart"](
            this.props.container, 
            this.chartOptions
        );

    }

    // takes data from props and compils into chart options
    compileData = (meterID, data) => {
        
        // reformat data
        let graphData = []
        for (let point of data.demand_ts) {
            let color = 'blue';
            if (parseFloat(point.demand_value) > data.threshold) {
                color = 'red';
            }
            graphData.push({
                x: Date.parse(point.timestamp), 
                y: parseFloat(point.demand_value),
                color: color
            });
        }
        
        this.chartOptions.subtitle = {
            text: meterID
        }

        this.chartOptions.series = [
            {
                name: 'Water Demand',
                type: 'column',
                data: graphData,
                color: Highcharts.getOptions().colors[0],
                tooltip: {
                    valueSuffix: ' mm'
                }
            },
            {
                name: 'Water Demand',
                yAxis: 1,
                data: graphData,
                color: Highcharts.getOptions().colors[1],
                tooltip: {
                    valueSuffix: ' mm'
                },
                //threshold: 100
            },
        ]

        this.chartOptions.xAxis = [{
            type: 'datetime',
            title: {
                text: 'Date'
            },
            crosshair: true
        }];

    }

    // unmount chart
    componentWillUnmount(){
        this.chart.destroy();
    }

    // set container to render the chart into 
    render(){
        return(
            <div id={this.props.container}></div>
        )
    }
}

export default MeterChart;
