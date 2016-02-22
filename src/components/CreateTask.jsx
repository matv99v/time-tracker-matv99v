import React  from 'react';

import Button from 'react-bootstrap/lib/Button';
import Input  from 'react-bootstrap/lib/Input';
import Grid   from 'react-bootstrap/lib/Grid';
import Row    from 'react-bootstrap/lib/Row';
import Col    from 'react-bootstrap/lib/Col';

import './CreateTask.less';



export default class CreateTask extends React.Component {
    state = {
        inputValue: '',
        isValid: true
    };

    handleSubmitClick = () => {
        const inputValue = this.refs.newTaskNameInput.getValue();
        this.props.onSubmit(inputValue);
        this.setState({inputValue: ''});
    };

    handleInputChange = () => {

        const input = this.refs.newTaskNameInput.getValue();
        const reg = /^[a-zа-я\u0451\u0491\u0454\u0456\u0457\u2019\u0020]*$/i;

        if (reg.test(input) ) {
            this.setState({
                isValid: true,
                inputValue: input
            });
        } else {
            this.setState({
                isValid: false,
                inputValue: input
            });
        }
    };


    render() {

        const submitButton =    <Button className = 'CreateTask__createButton'
                                        onClick   = {this.handleSubmitClick}
                                        disabled  = {!this.state.isValid}
                                >
                                    {this.state.isValid ? 'Create' : 'only letters'}
                                </Button>;

        return (
            <Grid >
                <Row>
                    <Col>
                        <Input  type        = 'text'
                                ref         = 'newTaskNameInput'
                                placeholder = 'New task'
                                value       = {this.state.inputValue}
                                onChange    = {this.handleInputChange}
                                bsStyle     = {this.state.isValid ? 'success' : 'error'}
                                buttonAfter = {submitButton}
                        />
                    </Col>
                </Row>
            </Grid>
        );
    }
}
