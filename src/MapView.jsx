import React, { Component } from 'react';
import {Grid, Row, Col} from 'react-bootstrap';
import MeterChart from './MeterChart';
import Export from 'highcharts/modules/exporting';

class MapView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            chart: null
        };
        this.map = null;
        this.markers = [];
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

            // add cluster support
            let markerCluster = new MarkerClusterer(this.map, this.markers,
                {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
    
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
            this.getClickHandler(meterID, meterData, marker));

        this.markers.push(marker);
    }

    // closure function to pass data to clickhandler
    getClickHandler = (meterID, meterData, marker) => {
        return () => {
            // add new chart
            let newChart = <MeterChart 
                modules={[Export]}
                container="chart"
                meterID={meterID}
                data={meterData}
            />;
            this.setState({chart: null});
            this.setState({chart: newChart});
            google.maps.event.trigger(map, 'resize');
            this.map.setCenter(marker.getPosition());
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
                height='500px'
                width='100%'
            />;
            this.setState({chart: newChart});
        }
    }
    render() {
        let mapWidth = this.state.chart ? 4 : 12;
        let textStyle = {textAlign: 'center', paddingTop: '180px', color: 'grey'};
        let text = this.state.chart ? null : <h4 style={textStyle}>Please click on a marker to display graph</h4>;
        return (
            <Grid fluid={true}>
                <Row className="show-grid">
                    <Col xs={12} md={mapWidth}>
                        <div id="map" style={{height:'400px', width:'100%'}}></div>        
                    </Col>
                    <Col xs={12} md={8}>
                        {this.state.chart}
                    </Col>
                </Row>
            </Grid>
        );
    }
}

export default MapView;
