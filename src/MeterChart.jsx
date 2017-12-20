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
        this.chartOptions.series = [
            {
                name: 'Water Demand',
                type: 'column',
                data: data.demand_ts.map(d => {return parseFloat(d.demand_value)}),
                color: Highcharts.getOptions().colors[0],
                tooltip: {
                    valueSuffix: ' mm'
                }
            },
            {
                name: 'Water Demand',
                yAxis: 1,
                data: data.demand_ts.map(d => {return parseFloat(d.demand_value)}),
                color: Highcharts.getOptions().colors[1],
                tooltip: {
                    valueSuffix: ' mm'
                }
            }
        ];
        this.chartOptions.xAxis = [{
            categories: data.demand_ts.map(d => {return parseFloat(d.timestamp)}),
            crosshair: true
        }];
        this.chartOptions.subtitle = {
            text: meterID
        }
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
