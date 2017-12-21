import React, {Component} from 'react';
import {Navbar, Nav} from 'react-bootstrap';

const Navigation = props => (
    <Navbar>
        <Navbar.Header>
            <Navbar.Brand>
                <a href="/">Water Smart</a>
            </Navbar.Brand>
        </Navbar.Header>
        <Nav>
            <p style={{color: 'white', paddingTop: '15px', paddingLeft: '80px'}}>Click on a marker to view water demand chart</p>
        </Nav>
    </Navbar>
);

export default Navigation;
