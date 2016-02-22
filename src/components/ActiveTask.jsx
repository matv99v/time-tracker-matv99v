import React from 'react';

import Grid  from 'react-bootstrap/lib/Grid';
import Row   from 'react-bootstrap/lib/Row';
import Col   from 'react-bootstrap/lib/Col';


export default class ActiveTask extends React.Component {
    render() {
        return (
            <div className='text-center'>
                <h2>Active task: none</h2>
            </div>
        );
    }
}
