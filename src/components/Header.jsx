import React       from 'react';
import Grid        from 'react-bootstrap/lib/Grid';
import Row         from 'react-bootstrap/lib/Row';
import Col         from 'react-bootstrap/lib/Col';
import UserSection from './UserSection.jsx';

export default class Header extends React.Component {
    render() {
        return (
            <Grid fluid>
                <Row >

                    <Col md={2} sm={2} xs={2}></Col>

                    <Col md={8} sm={8} xs={8} >
                        <h1 className='text-center'>Time tracker</h1>
                    </Col>

                    <Col md={2} sm={2} xs={2} >
                        <h2><UserSection/></h2>
                    </Col>

                </Row>
            </Grid>

        );
    }
}
