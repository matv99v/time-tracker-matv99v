import React from 'react';

import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Panel from 'react-bootstrap/lib/Panel';

import UserSection from './UserSection.jsx';



export default props => (
    <Grid fluid>
        <Row className="show-grid">
            <Col md={10} >
                <Panel bsStyle="success">
                    <h2>Time tracker</h2>
                </Panel>
            </Col>

            <Col md={2} >
                <Panel bsStyle="danger">
                    <h2><UserSection/></h2>
                </Panel>
            </Col>
        </Row>
    </Grid>

);
