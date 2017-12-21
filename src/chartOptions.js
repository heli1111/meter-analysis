import Highcharts from 'highcharts';

// set chart options

export default {
    chart: {
        zoomType: 'x'
    },
    title: {
        text: 'Hourly Water Demand'
    },
    yAxis: [{ // Primary yAxis
        labels: {
            format: '{value:,.0f} m3',
            style: {
                color: '#5c83e8',
            }
        },
        title: {
            text: 'Water Demand in m3',
            style: {
                color: '#5c83e8',
            }
        }
    }, { // Secondary yAxis
        title: {
            text: 'Water Demand in USG',
            style: {
                color: '#5c83e8',
            }
        },
        labels: {
            format: '{value:,.0f} USG',
            style: {
                color: Highcharts.getOptions().colors[0]
            }
        },
        opposite: true
    }],
    xAxis: [{
        type: 'datetime',
        title: {
            text: 'Time'
        },
        crosshair: true
    }],
    tooltip: {
        shared: true
    },
    legend: {
        layout: 'horizontal',
        align: 'bottom',
        //x: 50,
        //verticalAlign: 'bottom',
        y: 10,
        floating: false,
        shadow: false,
        backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
    },
    plotOptions: {
        column: {
            //stacking: 'normal',
            grouping: false,
            shadow: false,
            borderWidth: 0
        }
    }
}