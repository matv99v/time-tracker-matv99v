import React       from 'react';
import Grid        from 'react-bootstrap/lib/Grid';
import Row         from 'react-bootstrap/lib/Row';
import Col         from 'react-bootstrap/lib/Col';
import UserSection from './UserSection.jsx';

// import './colorMe.less';

export default class Header extends React.Component {
    render() {
        return (
            <Grid fluid>
                <Row >

                    <Col md={9} mdOffset={1}
                         sm={8} smOffset={1}
                         xs={8} xsOffset={1}>
                        <h1 className='text-center'>Time tracker</h1>
                    </Col>

                    <Col md={1} sm={2} xs={2} >
                        <h2  className='text-center'><UserSection/></h2>
                    </Col>

                    <Col md={1} sm={1} xs={1}></Col>

                </Row>
            </Grid>

        );
    }
}
