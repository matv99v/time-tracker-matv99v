import React       from 'react';
import Modal      from 'react-bootstrap/lib/Modal';
import Button      from 'react-bootstrap/lib/Button';



export default class ModalDialog extends React.Component {
    render() {
        return (

            <Modal show={this.props.isVisible} bsSize='sm'>
                <Modal.Header>
                    <Modal.Title>{this.props.header}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    {this.props.body}
                </Modal.Body>

                <Modal.Footer>
                    <Button
                        bsStyle="primary"
                        onClick = {this.props.clickYesCb}
                    >
                        {this.props.btnWording}
                    </Button>
                </Modal.Footer>
            </Modal>

        );
    }
}
