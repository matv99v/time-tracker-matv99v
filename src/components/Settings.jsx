import React       from 'react';
import Button      from 'react-bootstrap/lib/Button';
import Grid        from 'react-bootstrap/lib/Grid';
import Row         from 'react-bootstrap/lib/Row';
import Col         from 'react-bootstrap/lib/Col';
import Panel         from 'react-bootstrap/lib/Panel';
import PanelGroup         from 'react-bootstrap/lib/PanelGroup';

import moment from 'moment';
import 'moment-duration-format';

import notifyMe    from '../notifyMe';


import './Settings.less';





export default class Reminder extends React.Component {
    state = {
        // isWatcherActive: false,
        // isReminderVisible: false,
        // isAway: false
        // reminderTime: 30
        // isNotificationSupported:

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

    formatTime = (ms) => moment.duration(ms).format({
        template: 'HH:mm:ss',
        trim: false
    });

    rangeChangeHanlde = (event) => {
        this.setState({reminderTime: event.target.value});
    };


    render() {
        const settingsPanel = (
            <Panel collapsible defaultExpanded header="Settings" eventKey="1">
                <Row>
                    <Col xs={3}>
                        <span>Reminder</span>

                    </Col>

                    <Col xs={9}>
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
                    <Col xs={3}>
                        Reminder time
                    </Col>

                    <Col xs={2} className="Settings__reminder-time-val">
                        {this.props.remindTime} min
                    </Col>

                    <Col xs={3} className="Settings__reminder-time-val">
                        <input
                            id="reminder-slider"
                            type="range"
                            min="1" max="60" step="1"
                            value={this.props.remindTime}
                            onChange={this.props.changeRemindTime}
                        />
                    </Col>
                </Row>
            </Panel>
        );

        const timeCalculationsPanel = (
            <Panel collapsible header="Time calculations" eventKey="2">

                <Row>
                    <Col xs={3}>
                        <span>Total time</span>

                    </Col>

                    <Col xs={9}>
                        {this.formatTime(this.props.generalTime)}
                    </Col>
                </Row>

                <Row>
                    <Col xs={3}>
                        <span>Session time</span>

                    </Col>

                    <Col xs={9}>

                    </Col>
                </Row>

                <Row>
                    <Col xs={3}>
                        Reminder timeout
                    </Col>

                    <Col xs={9}>
                        {this.formatTime(this.props.idleTime)}
                    </Col>
                </Row>

            </Panel>
        );

        const browserNotificationsPanel = (
            <Panel collapsible header="Browser notifications" eventKey="3">
                <Row>
                    <Col xs={5}>
                        Browser notifications supported
                    </Col>

                    <Col xs={2}>
                        {notifyMe.isSupported() ? 'yes' : 'no'}
                    </Col>
                </Row>

                <Row>
                    <Col xs={5}>
                        Browser notifications access granted
                    </Col>

                    <Col xs={2}>
                        {notifyMe.isPermissionGranted() ? 'yes' : 'no'}
                    </Col>
                </Row>

                <Row hidden={notifyMe.isPermissionGranted()}>
                    <Col xs={5}>
                        Request browser notifications access
                    </Col>

                    <Col xs={2}>
                        <Button
                            onClick = {notifyMe.requestPermission()}
                            bsSize = 'xsmall'
                        >
                            Request
                        </Button>
                    </Col>
                </Row>

            </Panel>
        );

        return (

            <PanelGroup>
                {settingsPanel}
                {timeCalculationsPanel}
                {browserNotificationsPanel}
            </PanelGroup>


        );
    }
}
