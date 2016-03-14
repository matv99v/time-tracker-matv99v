import React  from 'react';
import Grid   from 'react-bootstrap/lib/Grid';
import Row    from 'react-bootstrap/lib/Row';
import Col    from 'react-bootstrap/lib/Col';

import moment from 'moment';
import 'moment-duration-format';

import './ActiveTask.less';



export default class ActiveTask extends React.Component {
    render() {
        const str = this.props.activeTask
                        ?  `${this.props.activeTask.name}
                            ${moment.duration(this.props.activeTask.spentTime).format({
                                template: 'HH:mm:ss',
                                trim: false
                            })}`
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
