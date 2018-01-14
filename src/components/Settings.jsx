import React      from 'react';
import Button     from 'react-bootstrap/lib/Button';
// import Grid       from 'react-bootstrap/lib/Grid';
import Row        from 'react-bootstrap/lib/Row';
import Col        from 'react-bootstrap/lib/Col';
import Modal  from 'react-bootstrap/lib/Modal';

import Logger  from './Logger.jsx';


import ts              from '../timersStorage.js';
import utils              from '../utils.js';


export default class Settings extends React.Component {
    state = {
        remindTimeout   : this.props.settings.remindTimeout,
        isWatcherActive : this.props.settings.isWatcherActive
    };

    toggleWatcher = () => {
        this.setState({isWatcherActive: !this.state.isWatcherActive});
    };

    changeRemindTime = (event) => { // add debounce func
        const val = utils.secondsToMs(event.target.value);
        this.setState({remindTimeout: val});
    };

    render() {
        const aTime = ts.getTimer('absence').getSpentTime();
        const sTime = ts.getTimer('session').getSpentTime();

        const aTimeStr = utils.formatTime(aTime);
        const sTimeStr = utils.formatTime(sTime);
        const rt = utils.msToSeconds(this.state.remindTimeout);

        return (

            <Modal
                show={this.props.isVisible}
                bsSize='lg'
            >
                <Modal.Header>
                    <Modal.Title>Settings</Modal.Title>
                </Modal.Header>

                <Modal.Body>

                    <Row>
                        <Col xs={3}>
                            Session time
                        </Col>

                        <Col xs={9}>
                            {sTimeStr}
                        </Col>
                    </Row>

                    <Row>
                        <Col xs={3}>
                            Absence time
                        </Col>

                        <Col xs={9}>
                            {aTimeStr}
                        </Col>
                    </Row>

                    <Row>
                        <Col xs={3}>
                            <span>Reminder</span>
                        </Col>

                        <Col xs={9}>
                            <Button
                                onClick = {this.toggleWatcher}
                                bsStyle = {this.state.isWatcherActive ? 'info' : 'default' }
                                bsSize = 'xsmall'
                            >
                                {this.state.isWatcherActive ? 'On' : 'Off' }
                            </Button>
                        </Col>
                    </Row>

                    <Row>
                        <Col xs={3}>
                            Reminder minutes
                        </Col>

                        <Col xs={2}>
                            {rt}
                        </Col>

                        <Col xs={7}>
                            <input
                                type="range"
                                min="1" max="60" step="1"
                                value={rt}
                                onChange={this.changeRemindTime}
                            />
                        </Col>
                    </Row>


                    <Row>
                        <Col xs={12}>
                            <Logger />
                        </Col>
                    </Row>



                </Modal.Body>

                <Modal.Footer>
                    <Button
                        bsStyle="primary"
                        onClick = {this.props.updateSettings.bind(this, this.state)}
                    >
                        Update
                    </Button>
                </Modal.Footer>
            </Modal>





        );
    }
}
