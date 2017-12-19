import React, { Component } from 'react';
import Nav from './Nav';
import Map from './Map';

class App extends Component {
    render() {
        return (
            <div>
                <Nav />
                <Map />
            </div>
        );
    }
}
export default App;
