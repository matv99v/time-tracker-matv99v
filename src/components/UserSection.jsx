import React from 'react';

import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Panel from 'react-bootstrap/lib/Panel';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';

export default props => (
    <Grid >
        <Row className="show-grid">
            <Col md={6} xs={6} >
                <Glyphicon glyph="user" style={{ color: 'grey' }}/>
            </Col>

            <Col md={6} xs={6}>
                <h4>Logout</h4>
            </Col>
        </Row>
    </Grid>


);
