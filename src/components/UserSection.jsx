import React     from 'react';

import Grid      from 'react-bootstrap/lib/Grid';
import Row       from 'react-bootstrap/lib/Row';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';

import './colorMe.less';

export default class UserSection extends React.Component {
    render() {
        return (

            <Grid fluid>

                <Row>
                    <Glyphicon glyph="user" />
                </Row>

                <Row>
                    <h5><a>Logout</a></h5>
                </Row>

            </Grid>

        );
    }
}
