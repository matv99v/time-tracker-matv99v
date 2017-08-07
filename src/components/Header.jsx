import React       from 'react';
import Grid        from 'react-bootstrap/lib/Grid';
import Row         from 'react-bootstrap/lib/Row';
import Col         from 'react-bootstrap/lib/Col';
import UserSection from './UserSection.jsx';

import moment from 'moment';
import 'moment-duration-format';

import './Header.less';



export default class Header extends React.Component {
    formatTime = () => moment.duration(this.props.generalTime).format({
        template: 'HH:mm:ss',
        trim: false
    });

    render() {
        return (
            <Grid fluid className = {this.props.isVisible ? 'Header__container__visible' : 'Header__container__hidden'}
            >
                <Row >

                    <Col>
                        <h1 className='text-center'>General time {this.formatTime()} </h1>
                    </Col>

                </Row>
            </Grid>

        );
    }
}
