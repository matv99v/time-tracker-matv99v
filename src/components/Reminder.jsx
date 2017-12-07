import React       from 'react';
import Grid        from 'react-bootstrap/lib/Grid';
import Row         from 'react-bootstrap/lib/Row';
import Col         from 'react-bootstrap/lib/Col';
import Button      from 'react-bootstrap/lib/Button';


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



    // componentWillUpdate = (nextProps, nextState) => {
    //     console.log(this.state, nextState);
    // };



    render() {
        return (
            <Grid fluid>
                <Row>
                    <Col sm={10} smOffset={1}>
                    <span>Reminder</span>
                        <Button
                            onClick = {this.props.toggleWatcher}
                            bsStyle = {this.props.isWatcherActive ? 'info' : 'default' }
                            bsSize = 'xsmall'
                        >
                            {this.props.isWatcherActive ? 'On' : 'Off' }
                        </Button>
                    </Col>
                </Row>
            </Grid>
        );
    }
}
