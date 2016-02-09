import React from 'react';

import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

import UserSection from './Header/UserSection.jsx';

export default React.createClass({
    render() {
        return (
            <Grid>
                <Row className="show-grid">

                    <Col md={10} sm={10} xs={8} >
                        <h1 style={{ textAlign: 'center' }}>Time tracker</h1>
                    </Col>

                    <Col md={2} sm={2} xs={4} >
                        <h2><UserSection/></h2>
                    </Col>
                </Row>
            </Grid>
        );
    }
});
