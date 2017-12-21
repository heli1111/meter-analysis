import React, {Component} from 'react';
import {Navbar} from 'react-bootstrap';

class Navigation extends Component {
    render() {
        return (
            <Navbar>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="#">Water Smart</a>
                    </Navbar.Brand>
                </Navbar.Header>
            </Navbar>
        );
    }
}

export default Navigation;
