import React from 'react';

import Input from 'react-bootstrap/lib/Input';
import ButtonInput from 'react-bootstrap/lib/ButtonInput';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

import './NewTask.css';


export default React.createClass({
    render() {
        return (
            <Grid>
                <Row className='show-grid'>
                    <Col md={10} sm={10} xs={12} >
                        <Input type='text' label='' placeholder='New task' />
                    </Col>

                    <Col md={2} sm={2} xs={12} className='text-center' >
                        <ButtonInput value='Create' className='NewTask__button-input' bsStyle='success'/>
                    </Col>
                </Row>
            </Grid>
        );
    }
});
