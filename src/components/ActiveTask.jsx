import React from 'react';

import Grid  from 'react-bootstrap/lib/Grid';
import Row   from 'react-bootstrap/lib/Row';
import Col   from 'react-bootstrap/lib/Col';

import './ActiveTask.less';



export default class ActiveTask extends React.Component {
    render() {
        const str = this.props.activeTask
                        ?   this.props.activeTask.name
                                + ' '
                                + this.props.parseTimeString(this.props.activeTask.spentTime)
                        :   'none';
        return (
            <Grid className = {this.props.activeTask ? 'text-center' : 'ActiveTask__container'}>
                <Row>
                    <Col xs={12}>
                        <h2>{str}</h2>
                    </Col>
                </Row>
            </Grid>
        );
    }
}
