import React, { Component } from 'react';

class Map extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    // Connect the initMap() function within this class to the global window context,
    window.initMap = this.initMap;
  }

  initMap = () => {
    this.map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 43.6532, lng: -79.3832},
      zoom: 8
    });
  }

  render() {
    return (
      <div id="map" style={{height:'500px', width:'100%'}}></div>
    )
  }
}

export default Map;