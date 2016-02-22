import React  from 'react';

import Button from 'react-bootstrap/lib/Button';
import Input  from 'react-bootstrap/lib/Input';
import Grid   from 'react-bootstrap/lib/Grid';
import Row    from 'react-bootstrap/lib/Row';
import Col    from 'react-bootstrap/lib/Col';

import './CreateTask.less';


export default class CreateTask extends React.Component {
    state = {
        inputValue: ''
    };

    handleSubmitClick = () => {
        const inputValue = this.refs.newTaskNameInput.getValue();
        this.props.onSubmit(inputValue);
        this.setState({inputValue: ''});
    };

    handleInputChange = () => {
        this.setState({
            inputValue: this.refs.newTaskNameInput.getValue()
        });
    };


    render() {

        return (
            <Grid fluid>
                <Row>
                    <Col md={10} sm={10}>
                        <Input  type        = 'text'
                                ref         = 'newTaskNameInput'
                                placeholder = 'New task'
                                value       = {this.state.inputValue}
                                onChange    = {this.handleInputChange}
                        />
                    </Col>
                    <Col md={2} sm={2} className='text-center'>
                        <Button className = 'CreateTask__createButton'
                                onClick   = {this.handleSubmitClick}
                        >
                            Create
                        </Button>
                    </Col>
                </Row>
            </Grid>

        );
    }
}
