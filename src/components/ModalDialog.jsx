import React       from 'react';
import Modal      from 'react-bootstrap/lib/Modal';
import Button      from 'react-bootstrap/lib/Button';
import moment from 'moment';



export default class ModalDialog extends React.Component {
    formatTime = (ms) => moment.duration(ms).format({
        template: 'HH:mm:ss',
        trim: false
    });

    render() {
        return (

            <Modal show={this.props.isVisible} bsSize='sm'>
                <Modal.Header>
                    <Modal.Title>Are you here?</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    You have been away for {this.formatTime(this.props.idleTime)}
                </Modal.Body>

                <Modal.Footer>
                    <Button
                        bsStyle="primary"
                        onClick = {this.props.leaveAsIsCb}
                    >
                        Leave as is
                    </Button>
                    <Button
                        bsStyle="primary"
                        onClick = {this.props.revertTime}
                    >
                        Revert time
                    </Button>
                </Modal.Footer>
            </Modal>

        );
    }
}
