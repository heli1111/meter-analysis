import React, { Component } from 'react';
import MeterChart from './MeterChart';
import Export from 'highcharts/modules/exporting';

class Map extends Component {

    constructor(props) {
        super(props);
        this.state = {
            chart: null
        };
    }

    componentDidMount() {
        // Connect the initMap() function within this class to the global window context
        window.initMap = this.initMap;
    }

    initMap = () => {
        this.generateMap();
    }

    // read all meter's Geo Data from API
    // initialize the map with one Geo Data
    // loop through the Geo Data and call the addMarker function to add each meter onto the map

    generateMap = () => {
        // fetch data from API
        fetch(
            // use cors-anywhere to solve the cors issue
            'https://cors-anywhere.herokuapp.com/https://lilcortexbucket.blob.core.windows.net/public/meters.json',
        ).then(response => {
            console.log(response);
            if (response.status !== 200) {
                console.log('ERROR - failed to get json data');
                return;
            }
            return response.json();
        }).then(results =>{
            /***** CREATING MAP *****/

            // loop through the data to obatin the avg lat & lng values as center for the map initialization
            let numMeters = 0;
            let sumlat = 0;
            let sumlng = 0;
            for (let meterID in results){
                sumlat += parseFloat(results[meterID].meter_latitude);
                sumlng += parseFloat(results[meterID].meter_longitude);
                numMeters ++;
            }

            // initialize map with averaged value of center
            this.map = new google.maps.Map(document.getElementById('map'), {
                center: {lat: sumlat/numMeters, lng: sumlng/numMeters},
                zoom: 10
            });

            // add meter markers to map
            for (let meterID in results){
                this.addMarker(meterID, results[meterID]);
            }
        }). catch(err => {
            console.log(err);
        })
    }

    // function to add a meter location to the map as a marker
    addMarker = (meterID, meterData) => {
        let marker = new google.maps.Marker({
            position: {
                lat: parseFloat(meterData.meter_latitude),
                lng: parseFloat(meterData.meter_longitude)
            },
            label: meterID,
            map: this.map
        })
        
        marker.addListener('click', 
            this.getClickHandler(meterID, meterData));
    }

    // closure function to pass data to clickhandler
    getClickHandler = (meterID, meterData) => {
        return () => {
            let newChart = <MeterChart 
                modules={[Export]}
                container="chart"
                meterID={meterID}
                data={meterData}
            />;
            this.setState({chart: null});
            this.setState({chart: newChart});
        }
    }

    // event listener for the marker, when clicked, pass props to generate new chart
    handleClick = () => {
        return function(marker) {
            let newChart = <MeterChart 
                modules={[Export]}
                container="myChart"
                meterID={meterID}
                data={meterData}
            />;
            this.setState({chart: newChart});
        }
    }
    render() {
        return (
            <div>
                <div id="map" style={{height:'300px', width:'100%'}}></div>
                {this.state.chart}
            </div>
        );
    }
}

export default Map;
