import React from 'react';

import Button from 'react-bootstrap/lib/Button';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';



export default class StoredTask extends React.Component {

    render() {
        return (
                <Grid fluid>
                    <Row>
                        <Col xs={2}>
                            Name
                        </Col>
                        <Col xs={2}>
                            Spent time
                        </Col>
                        <Col xs={2}>
                            Start/Stop
                        </Col>
                        <Col xs={2}>
                            Clear
                        </Col>
                        <Col xs={3}>
                            Delete
                        </Col>
                    </Row>
                </Grid>


        );
    }
}
