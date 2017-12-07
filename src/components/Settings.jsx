import React       from 'react';
import Button      from 'react-bootstrap/lib/Button';
import Grid        from 'react-bootstrap/lib/Grid';
import Row         from 'react-bootstrap/lib/Row';
import Col         from 'react-bootstrap/lib/Col';
import Panel         from 'react-bootstrap/lib/Panel';

import moment from 'moment';
import 'moment-duration-format';




export default class Reminder extends React.Component {
    state = {
        // isWatcherActive: false,
        // isReminderVisible: false,
        // isAway: false
    };

    confirmPresenceClickHandler = () => {
        console.log('confirmPresenceClickHandler');
    };

    startAbsenceTimer = () => {
        console.log('startAbsenceTimer');
    };

    iAmHereClickHandler = () => {
        console.log('iAmHereClickHandler');
    };

    formatTime = () => moment.duration(this.props.generalTime).format({
        template: 'HH:mm:ss',
        trim: false
    });



    // componentWillUpdate = (nextProps, nextState) => {
    //     console.log(this.state, nextState);
    // };


    render() {
        return (
            <Panel>
                <Row>
                    <Col xs={2}>
                        <span>Reminder</span>

                    </Col>

                    <Col xs={10}>
                        <Button
                            onClick = {this.props.toggleWatcher}
                            bsStyle = {this.props.isWatcherActive ? 'info' : 'default' }
                            bsSize = 'xsmall'
                        >
                            {this.props.isWatcherActive ? 'On' : 'Off' }
                        </Button>
                    </Col>
                </Row>

                <Row>
                    <Col xs={2}>
                        <span>General time</span>

                    </Col>

                    <Col xs={10}>
                        {this.formatTime()}
                    </Col>
                </Row>


            </Panel>


        );
    }
}
