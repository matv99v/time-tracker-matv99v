import React from 'react';

import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';

export default class UserSection extends React.Component {
    render() {
        return (

            <Grid fluid>
                <Row className="text-center">

                        <Glyphicon glyph="user" />
                </Row>
                <Row className="text-center">

                        <h5><a>Logout</a></h5>

                </Row>
            </Grid>

        );
    }
}
