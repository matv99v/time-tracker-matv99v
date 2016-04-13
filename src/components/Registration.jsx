import React       from 'react';
import Input       from 'react-bootstrap/lib/Input';
import Button      from 'react-bootstrap/lib/Button';
import Col         from 'react-bootstrap/lib/Col';
import Row         from 'react-bootstrap/lib/Row';
import Grid        from 'react-bootstrap/lib/Grid';
import {Link}      from 'react-router';

import {validateRegistrationData} from '../validators.js';

export default class Registration extends React.Component {
    state = {
        inputs: {
            name       : {error: null, inputStyle: null},
            email      : {error: null, inputStyle: null},
            username   : {error: null, inputStyle: null},
            password   : {error: null, inputStyle: null},
            repassword : {error: null, inputStyle: null},
            birthday   : {error: null, inputStyle: null},
            phone      : {error: null, inputStyle: null},
            male       : {error: null, inputStyle: null},
            female     : {error: null, inputStyle: null}
        },
        isFormValid : false
    };


    getErrors = () => {
        const inputData = {};

        Object.keys(this.refs).forEach( (field) => {
            const value = this.refs[field].getValue();

            if (field === 'birthday' &&  value) {
                const date = this.refs.birthday.refs.input.valueAsDate;
                inputData.day = date.getDate();
                inputData.month = date.getMonth();
                inputData.year = date.getFullYear();
            } else if (field === 'gender') {
                inputData.gender = this.refs.gender.getChecked() ? 'm' : 'f';
            } else inputData[field] = this.refs[field].getValue();
        });
        return validateRegistrationData( inputData );
    };


    handleFormChange = (e) => {
        const keyChanged   = e.target.attributes.label.textContent.toLowerCase();
        const valueChanged = e.target.value;
        const errors       = this.getErrors();
        const newState     = {
            inputs: JSON.parse(JSON.stringify(this.state.inputs))  // clone object
        };

        newState.isFormValid = !Object.keys(errors).length;

        newState.inputs[keyChanged].error      = errors[keyChanged];
        newState.inputs[keyChanged].inputStyle = newState.inputs[keyChanged].error
                                                 ? 'error'
                                                 : 'success';
        this.setState(newState);
    };

    handleSubmitForm = () => {
        const errors = this.getErrors();
        const newState = JSON.parse(JSON.stringify(this.state));

        Object.keys(errors).forEach( (field) => {
            newState.inputs[field] = {
                error     : errors[field],
                inputStyle: newState.inputs[field].error && newState.isValid
                            ? 'success'
                            : 'error'
            };
        });

        this.setState(newState);

    };

    shouldComponentUpdate = (nextProps, nextState) => {
        return JSON.stringify(this.state) !== JSON.stringify(nextState);
    };

    render() {
        return (
            <Grid fluid>
                <Row>
                    <Col xs={10} xsOffset={1}
                         sm={6}  smOffset={3}
                         md={6}  mdOffset={3} >

                        <form onChange={this.handleFormChange} >
                            <Input type     = 'text'
                                    help    = {this.state.inputs.name.error}
                                    label   = 'Name'
                                    ref     = 'name'
                                    bsStyle = {this.state.inputs.name.inputStyle}
                                    hasFeedback
                                    required />

                            <Input type     = 'email'
                                    help    = {this.state.inputs.email.error}
                                    label   = 'Email'
                                    ref     = 'email'
                                    bsStyle = {this.state.inputs.email.inputStyle}
                                    hasFeedback
                                    required />

                            <Input type     = 'text'
                                    help    = {this.state.inputs.username.error}
                                    label   = 'Username'
                                    ref     = 'username'
                                    bsStyle = {this.state.inputs.username.inputStyle}
                                    hasFeedback
                                    required />

                            <Input type     = 'password'
                                    help    = {this.state.inputs.password.error}
                                    label   = 'Password'
                                    ref     = 'password'
                                    bsStyle = {this.state.inputs.password.inputStyle}
                                    hasFeedback
                                    required />

                            <Input type     = 'password'
                                    help    = {this.state.inputs.repassword.error}
                                    label   = 'Repassword'
                                    ref     = 'repassword'
                                    bsStyle = {this.state.inputs.repassword.inputStyle}
                                    hasFeedback
                                    required />

                            <Input type     = 'date'
                                    help    = {this.state.inputs.birthday.error}
                                    label   = 'Birthday'
                                    ref     = 'birthday'
                                    bsStyle = {this.state.inputs.birthday.inputStyle}
                                    hasFeedback />

                            <Input type     = 'tel'
                                    help    = {this.state.inputs.phone.error}
                                    label   = 'Phone'
                                    ref     = 'phone'
                                    bsStyle = {this.state.inputs.phone.inputStyle}
                                    hasFeedback />

                            <Input type   = 'radio'
                                    ref   = 'gender'
                                    label = 'Male'
                                    name  = 'sex'
                                    defaultChecked />

                            <Input type   = 'radio'
                                    label = 'Female'
                                    name  = 'sex' />

                            <Col className = 'text-center' >
                                <Link to = {this.state.isFormValid
                                    ? 'time-tracker-matv99v/public/tracker'
                                    : 'time-tracker-matv99v/public/'} >
                                    <Button bsStyle = 'success' onClick={this.handleSubmitForm}>
                                        Submit
                                    </Button>
                                </Link>

                            </Col>

                        </form>

                    </Col>
                </Row>
            </Grid>
        );
    }
}
