import React from 'react';

import Input from 'react-bootstrap/lib/Input';
import ButtonInput from 'react-bootstrap/lib/ButtonInput';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';


export default props => (
    <Grid>
        <Row className="show-grid">
            <Col md={10} sm={10} xs={12} >
                <Input type="text" label="" placeholder="New task"/>
            </Col>

            <Col md={2} sm={2} xs={12} style={{ textAlign: 'center'}} >
                <ButtonInput value="Create" style={{ width: '100%', maxWidth:150 }}/>
            </Col>
        </Row>
    </Grid>

);
