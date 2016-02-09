import React from 'react';

import Table from 'react-bootstrap/lib/Table';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';

export default props => (
    <Table striped bordered condensed hover>

        <thead >
            <tr>
                <th>Name</th>
                <th>Spent time</th>
                <th>Start/Stop</th>
                <th></th>
                <th></th>
            </tr>
        </thead>

        <tbody>
            <tr>
                <td>Drink tea</td>
                <td>5m</td>
                <td>
                    <Glyphicon glyph="unchecked" style={{ color: 'grey', fontSize: 17 }}/>
                </td>
                <td>Clear</td>
                <td>Del</td>
            </tr>

            <tr>
                <td>Development</td>
                <td>3h</td>
                <td>
                    <Glyphicon glyph="expand" style={{ color: 'grey', fontSize: 17 }}/>
                </td>
                <td>Clear</td>
                <td>Del</td>
            </tr>

            <tr>
                <td>Read books</td>
                <td>2h</td>
                <td>
                    <Glyphicon glyph="unchecked" style={{ color: 'grey', fontSize: 17 }}/>
                </td>
                <td>Clear</td>
                <td>Del</td>
            </tr>
        </tbody>
    </Table>
);
