import React, {Component} from 'react';

const Details = props => (
    <ul>
        <li>{props.meter_id}</li>
        <li>{props.threshold}</li>
        <li>{props.average}</li>
        <li>{props.cost}</li>
    </ul>
);

export default Details;