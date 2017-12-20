import Highcharts from 'highcharts';

// set chart options

export default {
    chart: {
        zoomType: 'x'
    },
    title: {
        text: 'Water Demand'
    },
    lang: {
        thousandsSep: ','
    },
    yAxis: [{ // Primary yAxis
        labels: {
            format: '{value}m3',
            style: {
                color: Highcharts.getOptions().colors[1]
            }
        },
        title: {
            text: 'Hourly Water Demand in m3',
            style: {
                color: Highcharts.getOptions().colors[1]
            }
        }
    }, { // Secondary yAxis
        title: {
            text: 'Hourly Water Demand in USG',
            style: {
                color: Highcharts.getOptions().colors[0]
            }
        },
        labels: {
            format: '{value} USG',
            style: {
                color: Highcharts.getOptions().colors[0]
            }
        },
        opposite: true
    }],
    xAxis: [{
        type: 'datetime',
        title: {
            text: 'Date'
        },
        crosshair: true
    }],
    tooltip: {
        shared: true
    },
    legend: {
        layout: 'vertical',
        align: 'left',
        x: 120,
        verticalAlign: 'top',
        y: 100,
        floating: true,
        backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
    },
}