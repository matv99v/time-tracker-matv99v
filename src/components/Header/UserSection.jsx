import React from 'react';

import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Panel from 'react-bootstrap/lib/Panel';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';

export default React.createClass({
    render() {
        return (

            <Grid fluid>
                <Row className="show-grid">

                    <Col md={6} className="text-center">
                        <Glyphicon glyph="user" />
                    </Col>

                    <Col md={6} className="text-center">
                        <h5><a>Logout</a></h5>
                    </Col>

                </Row>
            </Grid>

        );
    }
});
