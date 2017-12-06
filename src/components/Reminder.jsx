import React       from 'react';
import Grid        from 'react-bootstrap/lib/Grid';
import Row         from 'react-bootstrap/lib/Row';
import Col         from 'react-bootstrap/lib/Col';
import Button      from 'react-bootstrap/lib/Button';
import Modal      from 'react-bootstrap/lib/Modal';
import tabTitler   from '../tabTitler.js';


export default class Reminder extends React.Component {
    state = {
        reminderTime: (1000 * 60) * 30, // minutes
        absenceTime: (1000 * 60) * 10, // minutes
        isWatcherActive: false,
        isReminderVisible: false,
        isAway: false
    };

    remindIntervalId = null;

    startInterval = () => {
        console.log('set new interval');

        const tick = () => {
            tabTitler.startTitleSprites();
            this.startAbsenceTimer();
            this.setState({
                isReminderVisible: true
            });
        };

        this.remindIntervalId = setTimeout(tick, this.state.reminderTime);
    };

    stopInterval = () => {
        console.log('delete interval');
        clearTimeout(this.remindIntervalId);
    };

    handleReminderWatcherClick = () => {
        const newState = {isWatcherActive: !this.state.isWatcherActive};
        this.setState(newState);
        if (!newState.isWatcherActive) {
            this.stopInterval();
        } else {
            this.startInterval();
        }
    };

    confirmPresenceClickHandler = () => {
        console.log('confirmPresenceClickHandler');
        tabTitler.stopTitleSprites();
        this.setState({isReminderVisible: false});
        this.startInterval();
    };

    startAbsenceTimer = () => {
        this.absenceTimerId = setTimeout(() => {
            console.log('you are away');
            this.props.stopActiveTask();
            this.setState({
                isReminderVisible: false,
                isAway: true
            });
        }, this.state.absenceTime);

    };

    iAmHereClickHandler = () => {
        this.setState({
            isAway: false
        });

        tabTitler.stopTitleSprites();
        this.startInterval();

    };



    // componentWillUpdate = (nextProps, nextState) => {
    //     console.log(this.state, nextState);
    // };



    render() {
        return (
            <Grid fluid>
                <Row>
                    <span>Reminder</span>
                        <Button onClick = {this.handleReminderWatcherClick}
                        bsStyle = {this.state.isWatcherActive ? 'info' : 'default' }
                        bsSize = 'xsmall'
                        >
                        {this.state.isWatcherActive ? 'On' : 'Off' }
                        </Button>
                </Row>

                <Modal show={this.state.isReminderVisible} bsSize='sm'>
                    <Modal.Header closeButton>
                        <Modal.Title>Reminder</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        Are you still working on active task?
                    </Modal.Body>

                    <Modal.Footer>
                        <Button
                            bsStyle="primary"
                            onClick = {this.confirmPresenceClickHandler}
                        >
                            Yes
                        </Button>
                    </Modal.Footer>
                </Modal>

                <Modal show={this.state.isAway} bsSize='sm'>
                    <Modal.Header closeButton>
                        <Modal.Title>You are away!</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        All timers have been stopped
                    </Modal.Body>

                    <Modal.Footer>
                        <Button
                            bsStyle="primary"
                            onClick = {this.iAmHereClickHandler}
                        >
                            I am here
                        </Button>
                    </Modal.Footer>
                </Modal>

            </Grid>
        );
    }
}
