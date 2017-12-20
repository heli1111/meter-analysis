import React, {Component} from 'react';
import Highcharts from 'highcharts';
import chartOptions from './chartOptions';
import Export from 'highcharts/modules/exporting';
import Data from 'highcharts/modules/data';

class MeterChart extends Component {

    constructor(props){
        super(props);
        this.state = {};
        this.optionsData = chartOptions;
    }

    /*
    ComponentDidMount() => data is available
    since it is created whenever marker is created
    */

    componentDidMount(){

        // load modules
        if (this.props.modules) {
            this.props.modules.forEach(function (module) {
                module(Highcharts);
            });
        }

        // TODO: pass this.props.meterID
        // insert data into optionsData
        // this.props.data
        // parent should pass results[0]
        this.insertData(this.props.data);

        // create chart
        this.chart = new Highcharts[this.props.type || "Chart"](
            this.props.container, 
            this.optionsData
        );

    }

    insertData = (data) => {
        this.optionsData.series = [
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
        this.optionsData.xAxis = [{
            categories: data.demand_ts.map(d => {return parseFloat(d.timestamp)}),
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
