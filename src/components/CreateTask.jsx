import React  from 'react';

import Button from 'react-bootstrap/lib/Button';
import Input  from 'react-bootstrap/lib/Input';
import Col  from 'react-bootstrap/lib/Col';

export default class CreateTask extends React.Component {
    state = {
        inputValue: '',
        isValid: true
    };

    handleSubmitClick = () => {
        const inputValue = this.refs.newTaskNameInput.getValue();
        if (inputValue) {
            this.props.onSubmit(inputValue);
            this.setState({inputValue: ''});
        } else {
            this.setState({
                isValid: false,
                inputValue
            });
        }
    };

    handleInputChange = () => {

        const inputValue = this.refs.newTaskNameInput.getValue();
        // const reg = /^[a-z0-9][a-z0-9 ]*$/i;
        const reg = /[a-z0-9-]*$/i;

        if (reg.test(inputValue)) {
            this.setState({
                isValid: true,
                inputValue
            });
        } else {
            this.setState({
                isValid: false,
                inputValue
            });
        }
    };


    render() {
        const submitButton =    <Button className = 'CreateTask__createButton'
                                        onClick   = {this.handleSubmitClick}
                                        disabled  = {!this.state.isValid}
                                        bsStyle   = {this.state.isValid ? 'success' : 'danger'} >
                                    {this.state.isValid ? 'Create' : 'Invalid input'}
                                </Button>;

        return (
            <Col xs={12} sm={10} smOffset={1}>
                <Input  type        = 'text'
                        ref         = 'newTaskNameInput'
                        placeholder = 'New task'
                        value       = {this.state.inputValue}
                        onChange    = {this.handleInputChange}
                        bsStyle     = {this.state.isValid ? 'success' : 'error'}
                        buttonAfter = {submitButton}
                />
            </Col>
        );
    }
}
